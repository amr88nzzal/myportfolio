// Unit tests for the server helpers. Run: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  safeEqual, escapeHtml, EMAIL_PATTERN, sanitizeTelegramToken, isBotUserAgent,
  createSessionTokens, createRateLimiter, detectImageType, UPLOAD_NAME,
  referencedImageFiles, orphanedUploads
} from '../backend/utils';

test('safeEqual compares secrets exactly', () => {
  assert.equal(safeEqual('secret', 'secret'), true);
  assert.equal(safeEqual('secret', 'secreT'), false);
  assert.equal(safeEqual('short', 'longer-value'), false);
  assert.equal(safeEqual('', ''), true);
});

test('escapeHtml neutralises markup', () => {
  assert.equal(escapeHtml('<script>alert("x")</script>&'), '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;&amp;');
  assert.equal(escapeHtml(null), '');
  assert.equal(escapeHtml(undefined), '');
  assert.equal(escapeHtml(42), '42');
});

test('EMAIL_PATTERN accepts normal addresses and rejects broken ones', () => {
  for (const ok of ['a@b.co', 'name.last+tag@example.com']) assert.ok(EMAIL_PATTERN.test(ok), ok);
  for (const bad of ['', 'plain', 'a@b', '@b.com', 'a b@c.com', 'a@b .com']) assert.ok(!EMAIL_PATTERN.test(bad), bad);
});

test('session tokens: valid, tampered, expired, wrong secret', () => {
  const tokens = createSessionTokens('secret-one', 1000);
  const token = tokens.sign(10_000);
  assert.equal(tokens.verify(token, 10_500), true);          // still valid
  assert.equal(tokens.verify(token, 11_000), true);          // exactly at expiry
  assert.equal(tokens.verify(token, 11_001), false);         // expired
  const [expiry, sig] = token.split('.');
  assert.equal(tokens.verify(`${Number(expiry) + 99999}.${sig}`, 10_500), false); // expiry edited
  assert.equal(tokens.verify(`${expiry}.${sig.slice(0, -2)}xx`, 10_500), false);  // signature edited
  assert.equal(createSessionTokens('another-secret', 1000).verify(token, 10_500), false);
  for (const junk of [undefined, '', 'abc', '.', 'a.b.c', `${expiry}.`, `.${sig}`]) {
    assert.equal(tokens.verify(junk, 10_500), false, String(junk));
  }
});

test('rate limiter: blocks after max, reports retry time, window slides, keys are independent', () => {
  const rl = createRateLimiter();
  const WINDOW = 60_000;
  assert.deepEqual(rl.check('a', 2, WINDOW, 0), { ok: true, retryAfterSec: 0 });
  assert.equal(rl.check('a', 2, WINDOW, 1_000).ok, true);
  const blocked = rl.check('a', 2, WINDOW, 2_000);
  assert.equal(blocked.ok, false);
  assert.equal(blocked.retryAfterSec, 58);                    // first hit expires at 60_000
  assert.equal(rl.check('b', 2, WINDOW, 2_000).ok, true);     // another key is unaffected
  assert.equal(rl.check('a', 2, WINDOW, 60_001).ok, true);    // first hit left the window
  assert.equal(rl.check('a', 2, WINDOW, 60_002).ok, false);   // second hit still counts
});

test('rate limiter: blocked attempts do not extend the block, cleanup frees memory', () => {
  const rl = createRateLimiter();
  rl.check('x', 1, 1_000, 0);
  for (let t = 100; t < 900; t += 100) assert.equal(rl.check('x', 1, 1_000, t).ok, false);
  assert.equal(rl.check('x', 1, 1_000, 1_001).ok, true);
  assert.equal(rl.size(), 1);
  rl.cleanup(10_000_000, 3_600_000);
  assert.equal(rl.size(), 0);
});

test('detectImageType uses the real file signature', () => {
  const pad = Buffer.alloc(20);
  assert.equal(detectImageType(Buffer.concat([Buffer.from([0xff, 0xd8, 0xff, 0xe0]), pad])), 'jpg');
  assert.equal(detectImageType(Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), pad])), 'png');
  assert.equal(detectImageType(Buffer.concat([Buffer.from('GIF89a'), pad])), 'gif');
  assert.equal(detectImageType(Buffer.concat([Buffer.from('RIFF'), Buffer.alloc(4), Buffer.from('WEBP'), pad])), 'webp');
  assert.equal(detectImageType(Buffer.from('<?php echo "pwned"; ?>' + ' '.repeat(40))), null);   // script disguised as .jpg
  assert.equal(detectImageType(Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"></svg>')), null);
  assert.equal(detectImageType(Buffer.alloc(0)), null);
  assert.equal(detectImageType(Buffer.from('RIFF....WAVE' + ' '.repeat(20))), null);              // RIFF but not WEBP
});

test('UPLOAD_NAME only matches files created by the upload endpoint', () => {
  assert.ok(UPLOAD_NAME.test('user_upload_1790479373312_ab12cd.jpg'));
  assert.ok(UPLOAD_NAME.test('user_upload_1_x.PNG'));
  for (const bad of ['profile.jpg', 'pos_system_dashboard_1790474752325.jpg', '../user_upload_1_a.jpg', 'user_upload_1/../../etc/passwd.jpg', 'user_upload_1_a.svg', 'user_upload_1_a.jpg.php']) {
    assert.ok(!UPLOAD_NAME.test(bad), bad);
  }
});

test('referencedImageFiles finds every image path in nested data', () => {
  const data = {
    portraitImage: '/src/assets/images/user_upload_1_aa.jpg',
    projects: [{ image: '/src/assets/images/pos_1.jpg' }, { image: '/images/amro-portrait.jpg' }],
    note: 'see /src/assets/images/user_upload_2_bb.png too'
  };
  assert.deepEqual([...referencedImageFiles(data)].sort(), ['pos_1.jpg', 'user_upload_1_aa.jpg', 'user_upload_2_bb.png']);
  assert.equal(referencedImageFiles(null).size, 0);
});

test('orphanedUploads: only replaced admin uploads are returned, never default or still-used files', () => {
  const previous = {
    portraitImage: '/src/assets/images/user_upload_1_old.jpg',
    projects: [
      { image: '/src/assets/images/pos_original.jpg' },
      { image: '/src/assets/images/user_upload_2_keep.jpg' },
      { image: '/src/assets/images/user_upload_3_deleted.jpg' }
    ]
  };
  const next = {
    portraitImage: '/src/assets/images/user_upload_9_new.jpg',
    projects: [{ image: '/src/assets/images/user_upload_2_keep.jpg' }]   // first project removed, third removed
  };
  assert.deepEqual(orphanedUploads(previous, next).sort(), ['user_upload_1_old.jpg', 'user_upload_3_deleted.jpg']);
  assert.deepEqual(orphanedUploads(previous, previous), []);
  assert.deepEqual(orphanedUploads(null, next), []);
});

test('sanitizeTelegramToken extracts the token and never corrupts a real one', () => {
  const token = '123456789:AAH-abc_DEFghijklmnopqrstuvwxyz012';
  assert.equal(sanitizeTelegramToken(token), token);
  assert.equal(sanitizeTelegramToken(`  ${token}\n`), token);
  assert.equal(sanitizeTelegramToken(`https://api.telegram.org/bot${token}/getUpdates`), token);
  assert.equal(sanitizeTelegramToken(`bot${token}`), token);
  // regression: a token that happens to contain the letters "bot" must stay intact
  const unlucky = '987654321:AAbotXYZ_abcdefghijklmnopqrstuvw12';
  assert.equal(sanitizeTelegramToken(unlucky), unlucky);
  assert.equal(sanitizeTelegramToken(''), '');
});

test('isBotUserAgent separates crawlers/monitors from browsers', () => {
  for (const ua of ['', undefined, 'Googlebot/2.1', 'curl/8.0', 'UptimeRobot/2.0', 'Mozilla/5.0 (compatible; bingbot/2.0)', 'python-requests/2.31', 'Lighthouse', 'HeadlessChrome']) {
    assert.equal(isBotUserAgent(ua as string | undefined), true, String(ua));
  }
  for (const ua of [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
  ]) assert.equal(isBotUserAgent(ua), false, ua);
});

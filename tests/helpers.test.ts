// Tests for the client helpers (language detection, profile-link check). Run: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { isProfileUrl, detectInitialLang, SUPPORTED_LANGS, tickerText } from '../src/lib/helpers';

test('isProfileUrl: only real profile links count', () => {
  assert.equal(isProfileUrl('https://linkedin.com/in/amro-nazzal'), true);
  assert.equal(isProfileUrl('https://github.com/amr88nzzal'), true);
  assert.equal(isProfileUrl('https://linkedin.com'), false);       // placeholder: home page only
  assert.equal(isProfileUrl('https://linkedin.com/'), false);
  assert.equal(isProfileUrl(''), false);
  assert.equal(isProfileUrl('not a url'), false);
});

// --- helpers to fake the browser environment -------------------------------
function withBrowser(env: { search?: string; saved?: string | null; language?: string; storageThrows?: boolean }, fn: () => void) {
  const g = globalThis as any;
  const original = {
    window: Object.getOwnPropertyDescriptor(g, 'window'),
    localStorage: Object.getOwnPropertyDescriptor(g, 'localStorage'),
    navigator: Object.getOwnPropertyDescriptor(g, 'navigator')
  };
  const define = (name: string, value: unknown) => Object.defineProperty(g, name, { value, configurable: true, writable: true });
  define('window', { location: { search: env.search ?? '' } });
  define('localStorage', {
    getItem: (k: string) => {
      if (env.storageThrows) throw new Error('blocked');
      return k === 'lang' ? env.saved ?? null : null;
    }
  });
  define('navigator', { language: env.language ?? 'en-US' });
  try {
    fn();
  } finally {
    for (const [name, desc] of Object.entries(original)) {
      if (desc) Object.defineProperty(g, name, desc);
      else delete g[name];
    }
  }
}

test('detectInitialLang: ?lang= in the URL wins', () => {
  withBrowser({ search: '?lang=de', saved: 'ar', language: 'en-US' }, () => assert.equal(detectInitialLang(), 'de'));
});

test('detectInitialLang: saved choice beats the browser language', () => {
  withBrowser({ saved: 'ar', language: 'de-DE' }, () => assert.equal(detectInitialLang(), 'ar'));
  withBrowser({ saved: 'en', language: 'de-DE' }, () => assert.equal(detectInitialLang(), 'en'));
});

test('detectInitialLang: browser language is used on a first visit', () => {
  withBrowser({ language: 'ar-SA' }, () => assert.equal(detectInitialLang(), 'ar'));
  withBrowser({ language: 'de-AT' }, () => assert.equal(detectInitialLang(), 'de'));
  withBrowser({ language: 'fr-FR' }, () => assert.equal(detectInitialLang(), 'en'));
});

test('detectInitialLang: invalid values and blocked storage fall back safely', () => {
  withBrowser({ search: '?lang=xx', saved: 'zz', language: 'de-DE' }, () => assert.equal(detectInitialLang(), 'de'));
  withBrowser({ storageThrows: true, language: 'ar' }, () => assert.equal(detectInitialLang(), 'en'));
});

test('ticker text exists for every supported language', () => {
  for (const lang of SUPPORTED_LANGS) assert.ok(tickerText[lang].length > 10, lang);
});

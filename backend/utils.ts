// Pure helpers used by server.ts. They have no Express/Node-server dependencies,
// so they can be unit-tested (see tests/utils.test.ts).
import crypto from 'crypto';

// ---------------------------------------------------------------------------
// Strings
// ---------------------------------------------------------------------------

/** Compare two secrets in constant time (different lengths are simply "not equal"). */
export function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && crypto.timingSafeEqual(ab, bb);
}

/** Escape text before placing it inside HTML (Telegram HTML messages, e-mail templates). */
export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Accepts a bare bot token or a full Telegram API URL and returns just the token. */
export function sanitizeTelegramToken(rawToken: string): string {
  if (!rawToken) return '';
  const raw = rawToken.trim();
  // Real tokens look like 123456789:AAH... (digits, colon, 20+ URL-safe characters)
  const match = raw.match(/\d{6,}:[A-Za-z0-9_-]{20,}/);
  if (match) return match[0];
  return raw.replace(/\/getUpdates.*/, '').replace(/\/sendMessage.*/, '').replace(/\/$/, '').trim();
}

/** True for crawlers, monitors and command-line clients (they should not trigger visit alerts). */
export function isBotUserAgent(userAgent: string | undefined): boolean {
  const ua = String(userAgent || '');
  return !ua || /bot|crawl|spider|slurp|preview|monitor|uptime|curl|wget|python-requests|headless|lighthouse|facebookexternalhit/i.test(ua);
}

// ---------------------------------------------------------------------------
// Admin session tokens: "<expiry-ms>.<HMAC-SHA256(expiry)>"
// ---------------------------------------------------------------------------
export function createSessionTokens(secret: string, ttlMs: number) {
  const signature = (expiry: string) => crypto.createHmac('sha256', secret).update(expiry).digest('base64url');
  return {
    sign(now: number = Date.now()): string {
      const expiry = String(now + ttlMs);
      return `${expiry}.${signature(expiry)}`;
    },
    verify(token: string | undefined, now: number = Date.now()): boolean {
      if (!token) return false;
      const [expiry, sig] = token.split('.');
      if (!expiry || !sig || !(Number(expiry) >= now)) return false;
      return safeEqual(sig, signature(expiry));
    }
  };
}

// ---------------------------------------------------------------------------
// Sliding-window rate limiter (in memory)
// ---------------------------------------------------------------------------
export function createRateLimiter() {
  const hits = new Map<string, number[]>();
  return {
    /** Records a hit and tells whether it is allowed (at most `max` hits per `windowMs`). */
    check(key: string, max: number, windowMs: number, now: number = Date.now()): { ok: boolean; retryAfterSec: number } {
      const recent = (hits.get(key) || []).filter((t) => now - t < windowMs);
      if (recent.length >= max) {
        hits.set(key, recent);
        const retryAfterMs = windowMs - (now - recent[0]);
        return { ok: false, retryAfterSec: Math.max(1, Math.ceil(retryAfterMs / 1000)) };
      }
      recent.push(now);
      hits.set(key, recent);
      return { ok: true, retryAfterSec: 0 };
    },
    /** Drops keys that have no hits within `maxAgeMs` (keeps memory bounded). */
    cleanup(now: number = Date.now(), maxAgeMs: number = 3600 * 1000): void {
      for (const [key, times] of hits) {
        if (!times.some((t) => now - t < maxAgeMs)) hits.delete(key);
      }
    },
    size(): number {
      return hits.size;
    }
  };
}

// ---------------------------------------------------------------------------
// Uploaded images
// ---------------------------------------------------------------------------
export type ImageType = 'jpg' | 'png' | 'gif' | 'webp';

/** Detects the real image type from the first bytes (never trust the file name or MIME type). */
export function detectImageType(buffer: Buffer): ImageType | null {
  if (buffer.length < 12) return null;
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return 'jpg';
  if (buffer.subarray(0, 4).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47]))) return 'png';
  if (buffer.subarray(0, 4).toString('ascii') === 'GIF8') return 'gif';
  if (buffer.subarray(0, 4).toString('ascii') === 'RIFF' && buffer.subarray(8, 12).toString('ascii') === 'WEBP') return 'webp';
  return null;
}

/** Only files created by the admin upload endpoint match this name pattern. */
export const UPLOAD_NAME = /^user_upload_[\w-]+\.(png|jpe?g|webp|gif)$/i;

/** All file names under /src/assets/images/ that appear anywhere in the given data. */
export function referencedImageFiles(data: unknown): Set<string> {
  const found = new Set<string>();
  const text = JSON.stringify(data ?? {});
  const re = /\/src\/assets\/images\/([\w.-]+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) found.add(m[1]);
  return found;
}

/** Uploaded files that were used by `previous` but are no longer used by `next` (safe to delete). */
export function orphanedUploads(previous: unknown, next: unknown): string[] {
  const stillUsed = referencedImageFiles(next);
  return [...referencedImageFiles(previous)].filter((file) => !stillUsed.has(file) && UPLOAD_NAME.test(file));
}

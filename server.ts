import express from 'express';
import { GoogleGenAI, Type } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import fs from 'fs';
import crypto from 'crypto';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3300;

app.disable('x-powered-by');
// Behind Docker / reverse proxy: use the real client IP for rate limiting
app.set('trust proxy', 1);

// Basic security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});

// Large bodies only where really needed (admin-only routes); small limit everywhere else
app.use('/api/analyze-cv', express.json({ limit: '15mb' }));
app.use('/api/upload-image', express.json({ limit: '8mb' }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// ---------------------------------------------------------------------------
// Security helpers: rate limiting + signed admin session tokens
// ---------------------------------------------------------------------------
const rateHits = new Map<string, number[]>();
function rateLimit(name: string, max: number, windowMs: number): express.RequestHandler {
  return (req, res, next) => {
    const key = `${name}:${req.ip}`;
    const now = Date.now();
    const recent = (rateHits.get(key) || []).filter((t) => now - t < windowMs);
    if (recent.length >= max) {
      res.setHeader('Retry-After', String(Math.ceil(windowMs / 1000)));
      res.status(429).json({ error: 'Too many requests. Please try again later.' });
      return;
    }
    recent.push(now);
    rateHits.set(key, recent);
    next();
  };
}
const rateCleanup = setInterval(() => {
  const now = Date.now();
  for (const [key, times] of rateHits) {
    if (!times.some((t) => now - t < 3600 * 1000)) rateHits.delete(key);
  }
}, 10 * 60 * 1000) as unknown as { unref?: () => void };
rateCleanup.unref?.();

// Secret used to sign admin session tokens. Set SESSION_SECRET (or ADMIN_PASSWORD) in .env.
// If neither is set, a random secret is generated at boot (sessions end on restart).
const SESSION_SECRET =
  process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD || crypto.randomBytes(32).toString('hex');
const SESSION_TTL_MS = 2 * 60 * 60 * 1000; // 2 hours

function signAdminToken(): string {
  const exp = String(Date.now() + SESSION_TTL_MS);
  const sig = crypto.createHmac('sha256', SESSION_SECRET).update(exp).digest('base64url');
  return `${exp}.${sig}`;
}

function isValidAdminToken(token: string | undefined): boolean {
  if (!token) return false;
  const [exp, sig] = token.split('.');
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  const expected = crypto.createHmac('sha256', SESSION_SECRET).update(exp).digest('base64url');
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function bearerToken(req: express.Request): string | undefined {
  const header = req.headers.authorization || '';
  return header.startsWith('Bearer ') ? header.slice(7).trim() : undefined;
}

const requireAdmin: express.RequestHandler = (req, res, next) => {
  if (isValidAdminToken(bearerToken(req))) return next();
  res.status(401).json({ error: 'Unauthorized' });
};

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && crypto.timingSafeEqual(ab, bb);
}

function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Set up Gemini
const ai = new GoogleGenAI({
  apiKey: process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// API: Analyze CV using Gemini
app.post('/api/analyze-cv', requireAdmin, rateLimit('analyze-cv', 10, 60 * 60 * 1000), async (req, res) => {
  try {
    const { base64File, fileType = 'application/pdf', lang = 'en' } = req.body;
    if (!base64File) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const prompt = `You are an expert HR systems analyst and recruitment matcher.
Analyze this candidate's uploaded CV/Resume. Compare their background with Amro Nazzal's profile:
- Name: Amro Nazzal
- Profile: Financial Systems Specialist & Full-Stack Developer with 10+ years bridging ERP finance software, complex corporate accounts (BMW, Solider, Sahlisoft), and React/NodeJS development.

Extract the following information from the attached document and provide it in JSON format:
1. Candidate Name (from the CV)
2. Professional Title / Focus
3. Key Technical Skills (up to 12 items)
4. Key Soft Skills (up to 8 items)
5. Summary of overall career profile (3-4 sentences)
6. Highlighted Work History (companies, roles, years)
7. Match Assessment: A professional, personalized, and encouraging evaluation of how their background overlaps, complements, or could collaborate with Amro Nazzal's expertise (e.g., tech-finance collaboration, ERP consulting, software development synergies, or general professional fit).

IMPORTANT: Provide the entire JSON response translated to the user's requested language context: '${lang}'. Ensure high quality translation, especially for technical terminology.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash', // Using highly capable standard model
      contents: [
        {
          inlineData: {
            mimeType: fileType,
            data: base64File
          }
        },
        {
          text: prompt
        }
      ],
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            title: { type: Type.STRING },
            technicalSkills: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            softSkills: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            summary: { type: Type.STRING },
            experience: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  company: { type: Type.STRING },
                  role: { type: Type.STRING },
                  years: { type: Type.STRING }
                },
                required: ['company', 'role', 'years']
              }
            },
            matchScore: { 
              type: Type.INTEGER, 
              description: 'A computed match/collaboration score from 0 to 100 representing potential synergy with Amro Nazzal'
            },
            collaborationMatch: { type: Type.STRING }
          },
          required: ['name', 'title', 'technicalSkills', 'softSkills', 'summary', 'experience', 'matchScore', 'collaborationMatch']
        }
      }
    });

    const resultText = response.text || '{}';
    res.json(JSON.parse(resultText));
  } catch (error: any) {
    console.error('Error analyzing CV:', error);
    res.status(500).json({ error: error.message || 'Failed to analyze CV document.' });
  }
});

// In-memory store for dynamic Admin OTP passcodes (valid for 10 minutes)
let activeAdminOTP: { code: string; expiresAt: number } | null = null;

// Helper to sanitize Telegram Bot Token if full API URL was provided
function sanitizeTelegramToken(rawToken: string): string {
  if (!rawToken) return '';
  let token = rawToken.trim();
  if (token.includes('bot')) {
    const parts = token.split('bot');
    token = parts[parts.length - 1];
  }
  token = token.replace(/\/getUpdates.*/, '').replace(/\/sendMessage.*/, '').replace(/\/$/, '').trim();
  return token;
}

// API: Generate Random OTP Passcode and send via Telegram & Email
app.post('/api/request-otp', rateLimit('request-otp', 3, 15 * 60 * 1000), async (req, res) => {
  try {
    const generatedPin = crypto.randomInt(100000, 1000000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
    activeAdminOTP = { code: generatedPin, expiresAt };

    console.log('[ADMIN OTP] A new one-time code was generated (expires in 10 minutes).');

    const dispatchedTo: string[] = [];
    const alertText = `🔐 AMRO PORTFOLIO - CMS ADMIN PASSCODE\n\nYour 1-Time Security Passcode is: ${generatedPin}\n\nValid for 10 minutes. If you did not request this code, please ignore this message.`;

    // 1. Try sending via Telegram
    const rawBotToken = process.env.TELEGRAM_BOT_TOKEN || '';
    const botToken = sanitizeTelegramToken(rawBotToken);
    const chatId = (process.env.TELEGRAM_CHAT_ID || '').trim();
    let telegramError = '';

    if (botToken && chatId) {
      try {
        const tgRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text: alertText })
        });
        const tgData = await tgRes.json();
        if (tgRes.ok && tgData.ok) {
          dispatchedTo.push('Telegram');
          console.log(`[TELEGRAM SUCCESS] OTP sent to chat_id: ${chatId}`);
        } else {
          telegramError = tgData.description || 'Failed to send message via Telegram';
          console.error(`[TELEGRAM FAIL] API returned: ${telegramError}`);
        }
      } catch (tgErr: any) {
        telegramError = tgErr.message || 'Network error connecting to Telegram API';
        console.error('Telegram OTP send error:', tgErr);
      }
    } else {
      telegramError = 'TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID missing in .env';
    }

    // 2. Try sending via Nodemailer / SMTP Email
    const smtpUser = (process.env.SMTP_USER || '').trim();
    const smtpPass = (process.env.SMTP_PASS || process.env.EMAIL_APP_PASSWORD || '').trim();
    const smtpHost = (process.env.SMTP_HOST || 'smtp.gmail.com').trim();
    const smtpPort = parseInt(process.env.SMTP_PORT || '587');
    const emailTo = (process.env.EMAIL_ALERT_ADDRESS || smtpUser || 'info@amrodev.com').trim();
    let emailError = '';

    if (smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: { user: smtpUser, pass: smtpPass }
        });

        await transporter.sendMail({
          from: process.env.EMAIL_FROM || smtpUser,
          to: emailTo,
          subject: '🔐 Amro Portfolio - Dynamic Admin Passcode',
          text: alertText,
          html: `<div style="font-family: Arial, sans-serif; padding: 24px; border-radius: 12px; background: #0f172a; color: #ffffff; max-w: 500px;"><h2 style="color: #d97706; margin-top: 0;">🔐 Security Passcode Request</h2><p style="font-size: 15px; color: #cbd5e1;">Your single-use passcode to access the Admin Control Panel is:</p><div style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #f59e0b; background: #1e293b; padding: 16px; border-radius: 8px; text-align: center; margin: 20px 0; font-family: monospace;">${generatedPin}</div><p style="font-size: 12px; color: #94a3b8;">This code is valid for 10 minutes. If you did not request this, please ignore this email.</p></div>`
        });
        dispatchedTo.push(`Email (${emailTo})`);
        console.log(`[EMAIL SUCCESS] OTP email delivered to: ${emailTo}`);
      } catch (mailErr: any) {
        emailError = mailErr.message || 'SMTP delivery failed';
        console.error('Email OTP send error:', mailErr);
      }
    } else {
      emailError = 'SMTP_USER or SMTP_PASS missing in .env';
    }

    let statusMsg = '';
    if (dispatchedTo.length > 0) {
      statusMsg = `✅ OTP Code sent successfully to: ${dispatchedTo.join(' & ')}`;
    } else {
      statusMsg = '⚠️ Could not deliver the code: neither Telegram nor email is configured correctly on the server.';
    }

    return res.json({ 
      success: true, 
      codeSent: dispatchedTo.length > 0, 
      channels: dispatchedTo,
      message: statusMsg
    });
  } catch (err: any) {
    console.error('Error generating OTP:', err);
    return res.status(500).json({ error: 'Failed to generate OTP passcode' });
  }
});

// API: Secure Server-Side Admin Authentication Check
app.post('/api/verify-admin', rateLimit('verify-admin', 10, 15 * 60 * 1000), (req, res) => {
  const inputCode = String(req.body?.code ?? '').trim();
  // No built-in fallback password: the static password only works if ADMIN_PASSWORD is set in .env
  const configuredPassword = (process.env.ADMIN_PASSWORD || '').trim();

  const isStaticValid = configuredPassword.length > 0 && safeEqual(inputCode, configuredPassword);
  const isOTPValid =
    !!activeAdminOTP && Date.now() < activeAdminOTP.expiresAt && safeEqual(inputCode, activeAdminOTP.code);

  if (isStaticValid || isOTPValid) {
    if (isOTPValid) activeAdminOTP = null; // one-time use
    console.log(`[ADMIN AUTH] Admin unlocked via ${isOTPValid ? 'one-time code' : 'password'}`);
    return res.json({ success: true, token: signAdminToken() });
  }
  console.warn('[ADMIN AUTH] Failed unlock attempt');
  return res.status(401).json({ success: false, error: 'Invalid passcode or expired code' });
});

// API: Dispatch Real Telegram Alert
app.post('/api/notify-telegram', requireAdmin, async (req, res) => {
  try {
    const botToken = sanitizeTelegramToken(process.env.TELEGRAM_BOT_TOKEN || '');
    const chatId = (process.env.TELEGRAM_CHAT_ID || '').trim();
    const message = req.body.message;

    if (!botToken || !chatId || !message) {
      return res.status(400).json({ error: 'Missing Telegram botToken, chatId, or message content. Please configure TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in .env.' });
    }

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML'
      })
    });

    const result = await response.json();
    if (!result.ok) {
      throw new Error(result.description || 'Telegram API returned an error.');
    }

    res.json({ success: true, description: 'Telegram message sent successfully!' });
  } catch (error: any) {
    console.error('Error sending Telegram notification:', error);
    res.status(500).json({ error: error.message || 'Failed to dispatch Telegram message.' });
  }
});

// Data persistence directory setup
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
const portfolioStorePath = path.join(dataDir, 'portfolio-store.json');
const messagesStorePath = path.join(dataDir, 'messages-store.json');

// API: Get Persisted Portfolio Data
app.get('/api/portfolio', (req, res) => {
  try {
    if (fs.existsSync(portfolioStorePath)) {
      const raw = fs.readFileSync(portfolioStorePath, 'utf-8');
      const data = JSON.parse(raw);
      // Public visitors never receive integration secrets (bot token / chat id)
      if (!isValidAdminToken(bearerToken(req)) && data && data.integrations) {
        data.integrations = { ...data.integrations, telegramBotToken: '', telegramChatId: '' };
      }
      return res.json(data);
    }
    return res.json(null);
  } catch (err: any) {
    console.error('Error reading portfolio store:', err);
    return res.status(500).json({ error: 'Failed to read portfolio store' });
  }
});

// API: Save / Persist Portfolio Data
app.post('/api/portfolio', requireAdmin, (req, res) => {
  try {
    const d = req.body;
    const valid =
      d && typeof d === 'object' &&
      typeof d.name === 'string' && d.name.trim().length > 0 &&
      typeof d.portraitImage === 'string' && d.portraitImage.length > 0 &&
      Array.isArray(d.experiences) && Array.isArray(d.projects) &&
      Array.isArray(d.education) && Array.isArray(d.skills);
    if (!valid) {
      return res.status(400).json({ error: 'Invalid portfolio data payload' });
    }

    // Credentials live in .env only; never persist them in the JSON store
    d.integrations = { ...(d.integrations || {}), telegramBotToken: '', telegramChatId: '' };

    const previous = readStoredPortfolio();
    fs.writeFileSync(portfolioStorePath, JSON.stringify(d, null, 2), 'utf-8');

    // Remove admin-uploaded images that are no longer used anywhere (replaced photos, deleted projects)
    if (previous) {
      const stillUsed = referencedImageFiles(d);
      for (const file of referencedImageFiles(previous)) {
        if (!stillUsed.has(file) && UPLOAD_NAME.test(file)) {
          try { fs.unlinkSync(path.join(process.cwd(), 'src', 'assets', 'images', file)); } catch { /* already gone */ }
        }
      }
    }
    console.log('[PORTFOLIO SYNC] Successfully persisted portfolio changes to disk!');
    return res.json({ success: true, message: 'Portfolio data saved successfully' });
  } catch (err: any) {
    console.error('Error saving portfolio store:', err);
    return res.status(500).json({ error: 'Failed to save portfolio store' });
  }
});

// API: Reset Portfolio to Default
app.post('/api/reset-portfolio', requireAdmin, (req, res) => {
  try {
    if (fs.existsSync(portfolioStorePath)) {
      fs.unlinkSync(portfolioStorePath);
    }
    return res.json({ success: true, message: 'Portfolio reset to default successfully' });
  } catch (err: any) {
    console.error('Error resetting portfolio store:', err);
    return res.status(500).json({ error: 'Failed to reset portfolio store' });
  }
});

// API: Get Persisted Messages
app.get('/api/messages', requireAdmin, (req, res) => {
  try {
    if (fs.existsSync(messagesStorePath)) {
      const raw = fs.readFileSync(messagesStorePath, 'utf-8');
      return res.json(JSON.parse(raw));
    }
    return res.json([]);
  } catch (err: any) {
    console.error('Error reading messages store:', err);
    return res.status(500).json({ error: 'Failed to read messages store' });
  }
});

// API: Save Persisted Messages
function readMessages(): any[] {
  try {
    if (fs.existsSync(messagesStorePath)) {
      const parsed = JSON.parse(fs.readFileSync(messagesStorePath, 'utf-8'));
      if (Array.isArray(parsed)) return parsed;
    }
  } catch { /* unreadable store: treat as empty */ }
  return [];
}

// Mark one message as read (does not touch messages that arrived in the meantime)
app.patch('/api/messages/:id/read', requireAdmin, (req, res) => {
  const msgs = readMessages();
  const idx = msgs.findIndex((m) => m.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Message not found' });
  msgs[idx] = { ...msgs[idx], isRead: true };
  fs.writeFileSync(messagesStorePath, JSON.stringify(msgs, null, 2), 'utf-8');
  return res.json({ success: true });
});

// Delete one message
app.delete('/api/messages/:id', requireAdmin, (req, res) => {
  const msgs = readMessages();
  const next = msgs.filter((m) => m.id !== req.params.id);
  if (next.length === msgs.length) return res.status(404).json({ error: 'Message not found' });
  fs.writeFileSync(messagesStorePath, JSON.stringify(next, null, 2), 'utf-8');
  return res.json({ success: true });
});

// Which server-side integrations are configured (booleans only, never the secrets)
app.get('/api/integrations-status', requireAdmin, (req, res) => {
  res.json({
    telegram: !!(sanitizeTelegramToken(process.env.TELEGRAM_BOT_TOKEN || '') && (process.env.TELEGRAM_CHAT_ID || '').trim()),
    email: !!((process.env.SMTP_USER || '').trim() && (process.env.SMTP_PASS || process.env.EMAIL_APP_PASSWORD || '').trim())
  });
});


// ---------------------------------------------------------------------------
// Stored portfolio helpers (integration flags, uploaded-image bookkeeping)
// ---------------------------------------------------------------------------
function readStoredPortfolio(): any | null {
  try {
    if (fs.existsSync(portfolioStorePath)) return JSON.parse(fs.readFileSync(portfolioStorePath, 'utf-8'));
  } catch { /* unreadable store: treat as empty */ }
  return null;
}

// Defaults mirror src/data.ts. Secrets (bot token, chat id, SMTP) come from .env only.
function readIntegrations() {
  const i = readStoredPortfolio()?.integrations || {};
  return {
    telegramEnabled: i.telegramEnabled === true,
    emailEnabled: i.emailEnabled !== false,
    emailAlertAddress: typeof i.emailAlertAddress === 'string' ? i.emailAlertAddress.trim() : '',
    visitAlertsEnabled: i.visitAlertsEnabled === true
  };
}

const UPLOAD_NAME = /^user_upload_[\w-]+\.(png|jpe?g|webp|gif)$/i;
function referencedImageFiles(data: any): Set<string> {
  const found = new Set<string>();
  const text = JSON.stringify(data ?? {});
  const re = /\/src\/assets\/images\/([\w.-]+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) found.add(m[1]);
  return found;
}

// ---------------------------------------------------------------------------
// Public endpoints (strictly validated + rate limited)
// ---------------------------------------------------------------------------
async function sendServerTelegram(html: string): Promise<void> {
  const botToken = sanitizeTelegramToken(process.env.TELEGRAM_BOT_TOKEN || '');
  const chatId = (process.env.TELEGRAM_CHAT_ID || '').trim();
  if (!botToken || !chatId) return;
  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: html, parse_mode: 'HTML' })
    });
  } catch (err) {
    console.error('Telegram alert failed');
  }
}

async function sendServerEmail(subject: string, body: string, toOverride?: string): Promise<void> {
  const smtpUser = (process.env.SMTP_USER || '').trim();
  const smtpPass = (process.env.SMTP_PASS || process.env.EMAIL_APP_PASSWORD || '').trim();
  const to = (toOverride || process.env.EMAIL_ALERT_ADDRESS || smtpUser).trim();
  if (!smtpUser || !smtpPass || !to) return;
  try {
    const smtpPort = parseInt(process.env.SMTP_PORT || '587');
    const transporter = nodemailer.createTransport({
      host: (process.env.SMTP_HOST || 'smtp.gmail.com').trim(),
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass }
    });
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || smtpUser,
      to,
      subject,
      text: body
    });
  } catch (err) {
    console.error('Email alert failed');
  }
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Contact form: appends one message server-side (visitors can never read or overwrite the inbox)
app.post('/api/contact', rateLimit('contact', 5, 60 * 60 * 1000), async (req, res) => {
  try {
    const name = String(req.body?.name ?? '').trim().slice(0, 100);
    const email = String(req.body?.email ?? '').trim().slice(0, 150);
    const subject = (String(req.body?.subject ?? '').trim() || 'Direct Inquiry').slice(0, 150);
    const message = String(req.body?.message ?? '').trim().slice(0, 4000);

    if (!name || !message || !EMAIL_PATTERN.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid name, email and message.' });
    }

    const newMsg = {
      id: `msg-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`,
      name,
      email,
      subject,
      message,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      isRead: false
    };

    let existing: any[] = [];
    if (fs.existsSync(messagesStorePath)) {
      try {
        const parsed = JSON.parse(fs.readFileSync(messagesStorePath, 'utf-8'));
        if (Array.isArray(parsed)) existing = parsed;
      } catch { /* start from an empty inbox */ }
    }
    fs.writeFileSync(messagesStorePath, JSON.stringify([newMsg, ...existing].slice(0, 500), null, 2), 'utf-8');

    const integ = readIntegrations();
    await Promise.all([
      integ.telegramEnabled
        ? sendServerTelegram(
            `✉️ <b>New Contact Form Submission</b>\n\n<b>From:</b> ${escapeHtml(name)}\n<b>Email:</b> ${escapeHtml(email)}\n<b>Subject:</b> ${escapeHtml(subject)}\n<b>Message:</b>\n<i>${escapeHtml(message)}</i>`
          )
        : Promise.resolve(),
      integ.emailEnabled
        ? sendServerEmail(
            `Portfolio Contact: ${subject}`,
            `New inquiry received:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage:\n${message}`,
            integ.emailAlertAddress
          )
        : Promise.resolve()
    ]);

    return res.json({ success: true, message: newMsg });
  } catch (err) {
    console.error('Contact form error');
    return res.status(500).json({ error: 'Failed to send message' });
  }
});

// Optional silent visit alert (once per hour per IP, only if enabled in the CMS)
app.post('/api/visit', rateLimit('visit', 1, 60 * 60 * 1000), async (req, res) => {
  try {
    if (readIntegrations().visitAlertsEnabled) {
      const lang = ['en', 'ar', 'de'].includes(req.body?.lang) ? req.body.lang : 'en';
      await sendServerTelegram(`👁 <b>New Portfolio Session</b>\nTime: ${new Date().toISOString()}\nLanguage: ${lang}`);
    }
    return res.json({ success: true });
  } catch {
    return res.json({ success: true });
  }
});

// API: Send Email Alert (via SMTP Nodemailer or Logger)
app.post('/api/notify-email', requireAdmin, async (req, res) => {
  try {
    const to = req.body.to || process.env.EMAIL_ALERT_ADDRESS || process.env.SMTP_USER;
    const subject = req.body.subject;
    const body = req.body.body;

    if (!to || !subject || !body) {
      return res.status(400).json({ error: 'Missing to address, subject, or message body.' });
    }

    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_APP_PASSWORD;
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '587');

    if (smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      });

      await transporter.sendMail({
        from: process.env.EMAIL_FROM || smtpUser,
        to,
        subject,
        text: body,
        html: `<div style="font-family: Arial, sans-serif; padding: 20px; border-radius: 8px; background: #f9fafb;"><h2 style="color: #1e3a8a;">${escapeHtml(subject)}</h2><p style="font-size: 15px; color: #374151; white-space: pre-wrap;">${escapeHtml(body)}</p></div>`
      });

      console.log(`[SMTP EMAIL SENT] Successfully delivered to ${to}`);
      return res.json({ success: true, description: 'Email delivered successfully via SMTP!' });
    } else {
      console.log('--- EMAIL ALERTS DISPATCH LOG (SMTP not configured) ---');
      console.log(`To: ${to}`);
      console.log(`Subject: ${subject}`);
      console.log(`Body: ${body}`);
      console.log('-------------------------------------------------------');
      return res.json({ 
        success: true, 
        description: 'Email notification logged. Configure SMTP_USER and SMTP_PASS in .env for direct email sending.' 
      });
    }
  } catch (error: any) {
    console.error('Error sending Email notification:', error);
    res.status(500).json({ error: error.message || 'Failed to dispatch Email notification.' });
  }
});

// API: Upload custom image from device
app.post('/api/upload-image', requireAdmin, async (req, res) => {
  try {
    const { base64Data, fileName } = req.body;
    if (!base64Data) {
      return res.status(400).json({ error: 'No image data provided' });
    }

    if (typeof base64Data !== 'string' || base64Data.length > 7 * 1024 * 1024) {
      return res.status(413).json({ error: 'Image too large (max ~5 MB)' });
    }
    if (!/^data:image\/(png|jpe?g|webp|gif);base64,/i.test(base64Data)) {
      return res.status(400).json({ error: 'Only PNG, JPEG, WEBP or GIF images are allowed' });
    }

    const buffer = Buffer.from(base64Data.slice(base64Data.indexOf(',') + 1), 'base64');
    if (buffer.length < 100 || buffer.length > 5 * 1024 * 1024) {
      return res.status(413).json({ error: 'Image must be between 100 bytes and 5 MB' });
    }

    // Trust the file's real signature, not the declared MIME type
    let extension = '';
    if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) extension = 'jpg';
    else if (buffer.subarray(0, 4).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47]))) extension = 'png';
    else if (buffer.subarray(0, 4).toString('ascii') === 'GIF8') extension = 'gif';
    else if (buffer.subarray(0, 4).toString('ascii') === 'RIFF' && buffer.subarray(8, 12).toString('ascii') === 'WEBP') extension = 'webp';
    if (!extension) {
      return res.status(400).json({ error: 'File content is not a valid PNG, JPEG, WEBP or GIF image' });
    }

    const cleanFileName = `user_upload_${Date.now()}_${crypto.randomBytes(3).toString('hex')}.${extension}`;
    const targetDir = path.join(process.cwd(), 'src', 'assets', 'images');
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    const targetPath = path.join(targetDir, cleanFileName);
    fs.writeFileSync(targetPath, buffer);

    const imageUrl = `/src/assets/images/${cleanFileName}`;
    console.log(`[IMAGE UPLOAD] Saved custom profile photo to: ${targetPath}`);

    return res.json({ success: true, imageUrl, message: 'Image uploaded successfully' });
  } catch (err: any) {
    console.error('Image upload error:', err);
    return res.status(500).json({ error: 'Failed to upload image: ' + err.message });
  }
});

// Serve custom uploaded assets statically
const uploadsDir = path.join(process.cwd(), 'src', 'assets', 'images');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/src/assets/images', express.static(uploadsDir));

// Serve public assets (PDF CVs, icons, etc.)
const publicStaticDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicStaticDir)) {
  fs.mkdirSync(publicStaticDir, { recursive: true });
}
app.use(express.static(publicStaticDir));

// Serve static files or Vite middleware
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
} else {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa'
  });
  app.use(vite.middlewares);
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

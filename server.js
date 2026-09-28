// server.ts
import express from "express";
import { GoogleGenAI, Type } from "@google/genai";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import fs from "fs";
dotenv.config();
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var app = express();
var port = process.env.PORT || 3300;
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));
var ai = new GoogleGenAI({
  apiKey: process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build"
    }
  }
});
app.post("/api/analyze-cv", async (req, res) => {
  try {
    const { base64File, fileType = "application/pdf", lang = "en" } = req.body;
    if (!base64File) {
      return res.status(400).json({ error: "No file provided" });
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
      model: "gemini-2.5-flash",
      // Using highly capable standard model
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
        responseMimeType: "application/json",
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
                required: ["company", "role", "years"]
              }
            },
            matchScore: {
              type: Type.INTEGER,
              description: "A computed match/collaboration score from 0 to 100 representing potential synergy with Amro Nazzal"
            },
            collaborationMatch: { type: Type.STRING }
          },
          required: ["name", "title", "technicalSkills", "softSkills", "summary", "experience", "matchScore", "collaborationMatch"]
        }
      }
    });
    const resultText = response.text || "{}";
    res.json(JSON.parse(resultText));
  } catch (error) {
    console.error("Error analyzing CV:", error);
    res.status(500).json({ error: error.message || "Failed to analyze CV document." });
  }
});
var activeAdminOTP = null;
function sanitizeTelegramToken(rawToken) {
  if (!rawToken) return "";
  let token = rawToken.trim();
  if (token.includes("bot")) {
    const parts = token.split("bot");
    token = parts[parts.length - 1];
  }
  token = token.replace(/\/getUpdates.*/, "").replace(/\/sendMessage.*/, "").replace(/\/$/, "").trim();
  return token;
}
app.post("/api/request-otp", async (req, res) => {
  try {
    const generatedPin = Math.floor(1e5 + Math.random() * 9e5).toString();
    const expiresAt = Date.now() + 10 * 60 * 1e3;
    activeAdminOTP = { code: generatedPin, expiresAt };
    console.log(`[ADMIN OTP GENERATED] New temporary code: ${generatedPin} (Expires in 10 mins)`);
    const dispatchedTo = [];
    const alertText = `\u{1F510} AMRO PORTFOLIO - CMS ADMIN PASSCODE

Your 1-Time Security Passcode is: ${generatedPin}

Valid for 10 minutes. If you did not request this code, please ignore this message.`;
    const rawBotToken = process.env.TELEGRAM_BOT_TOKEN || "";
    const botToken = sanitizeTelegramToken(rawBotToken);
    const chatId = (process.env.TELEGRAM_CHAT_ID || "").trim();
    let telegramError = "";
    if (botToken && chatId) {
      try {
        const tgRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text: alertText })
        });
        const tgData = await tgRes.json();
        if (tgRes.ok && tgData.ok) {
          dispatchedTo.push("Telegram");
          console.log(`[TELEGRAM SUCCESS] OTP sent to chat_id: ${chatId}`);
        } else {
          telegramError = tgData.description || "Failed to send message via Telegram";
          console.error(`[TELEGRAM FAIL] API returned: ${telegramError}`);
        }
      } catch (tgErr) {
        telegramError = tgErr.message || "Network error connecting to Telegram API";
        console.error("Telegram OTP send error:", tgErr);
      }
    } else {
      telegramError = "TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID missing in .env";
    }
    const smtpUser = (process.env.SMTP_USER || "").trim();
    const smtpPass = (process.env.SMTP_PASS || process.env.EMAIL_APP_PASSWORD || "").trim();
    const smtpHost = (process.env.SMTP_HOST || "smtp.gmail.com").trim();
    const smtpPort = parseInt(process.env.SMTP_PORT || "587");
    const emailTo = (process.env.EMAIL_ALERT_ADDRESS || smtpUser || "info@amrodev.com").trim();
    let emailError = "";
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
          subject: "\u{1F510} Amro Portfolio - Dynamic Admin Passcode",
          text: alertText,
          html: `<div style="font-family: Arial, sans-serif; padding: 24px; border-radius: 12px; background: #0f172a; color: #ffffff; max-w: 500px;"><h2 style="color: #d97706; margin-top: 0;">\u{1F510} Security Passcode Request</h2><p style="font-size: 15px; color: #cbd5e1;">Your single-use passcode to access the Admin Control Panel is:</p><div style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #f59e0b; background: #1e293b; padding: 16px; border-radius: 8px; text-align: center; margin: 20px 0; font-family: monospace;">${generatedPin}</div><p style="font-size: 12px; color: #94a3b8;">This code is valid for 10 minutes. If you did not request this, please ignore this email.</p></div>`
        });
        dispatchedTo.push(`Email (${emailTo})`);
        console.log(`[EMAIL SUCCESS] OTP email delivered to: ${emailTo}`);
      } catch (mailErr) {
        emailError = mailErr.message || "SMTP delivery failed";
        console.error("Email OTP send error:", mailErr);
      }
    } else {
      emailError = "SMTP_USER or SMTP_PASS missing in .env";
    }
    let statusMsg = "";
    if (dispatchedTo.length > 0) {
      statusMsg = `\u2705 OTP Code sent successfully to: ${dispatchedTo.join(" & ")}`;
    } else {
      statusMsg = `\u26A0\uFE0F OTP Code generated (${generatedPin}). Telegram issue: [${telegramError}], Email issue: [${emailError}]`;
    }
    return res.json({
      success: true,
      codeSent: dispatchedTo.length > 0,
      channels: dispatchedTo,
      message: statusMsg,
      debug: { telegramError, emailError }
    });
  } catch (err) {
    console.error("Error generating OTP:", err);
    return res.status(500).json({ error: "Failed to generate OTP passcode" });
  }
});
app.post("/api/verify-admin", (req, res) => {
  const { code } = req.body;
  const configuredPassword = process.env.ADMIN_PASSWORD || "a123698745r";
  const inputCode = (code || "").trim();
  const isStaticValid = inputCode === configuredPassword.trim();
  const isOTPValid = activeAdminOTP && activeAdminOTP.code === inputCode && Date.now() < activeAdminOTP.expiresAt;
  if (isStaticValid || isOTPValid) {
    console.log(`[ADMIN AUTH] Admin CMS successfully unlocked via ${isOTPValid ? "Dynamic OTP" : "Static Password"}`);
    if (isOTPValid) activeAdminOTP = null;
    return res.json({ success: true, token: "admin_authenticated_" + Date.now() });
  } else {
    console.warn("[ADMIN AUTH] Failed CMS unlock attempt");
    return res.status(401).json({ success: false, error: "Invalid passcode or expired OTP" });
  }
});
app.post("/api/notify-telegram", async (req, res) => {
  try {
    const rawBotToken = req.body.botToken || process.env.TELEGRAM_BOT_TOKEN;
    const botToken = sanitizeTelegramToken(rawBotToken);
    const chatId = req.body.chatId || process.env.TELEGRAM_CHAT_ID;
    const message = req.body.message;
    if (!botToken || !chatId || !message) {
      return res.status(400).json({ error: "Missing Telegram botToken, chatId, or message content. Please configure TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in .env." });
    }
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML"
      })
    });
    const result = await response.json();
    if (!result.ok) {
      throw new Error(result.description || "Telegram API returned an error.");
    }
    res.json({ success: true, description: "Telegram message sent successfully!" });
  } catch (error) {
    console.error("Error sending Telegram notification:", error);
    res.status(500).json({ error: error.message || "Failed to dispatch Telegram message." });
  }
});
var dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
var portfolioStorePath = path.join(dataDir, "portfolio-store.json");
var messagesStorePath = path.join(dataDir, "messages-store.json");
app.get("/api/portfolio", (req, res) => {
  try {
    if (fs.existsSync(portfolioStorePath)) {
      const raw = fs.readFileSync(portfolioStorePath, "utf-8");
      const data = JSON.parse(raw);
      return res.json(data);
    }
    return res.json(null);
  } catch (err) {
    console.error("Error reading portfolio store:", err);
    return res.status(500).json({ error: "Failed to read portfolio store" });
  }
});
app.post("/api/portfolio", (req, res) => {
  try {
    const portfolioData = req.body;
    if (!portfolioData || typeof portfolioData !== "object") {
      return res.status(400).json({ error: "Invalid portfolio data payload" });
    }
    fs.writeFileSync(portfolioStorePath, JSON.stringify(portfolioData, null, 2), "utf-8");
    console.log("[PORTFOLIO SYNC] Successfully persisted portfolio changes to disk!");
    return res.json({ success: true, message: "Portfolio data saved successfully" });
  } catch (err) {
    console.error("Error saving portfolio store:", err);
    return res.status(500).json({ error: "Failed to save portfolio store: " + err.message });
  }
});
app.post("/api/reset-portfolio", (req, res) => {
  try {
    if (fs.existsSync(portfolioStorePath)) {
      fs.unlinkSync(portfolioStorePath);
    }
    return res.json({ success: true, message: "Portfolio reset to default successfully" });
  } catch (err) {
    console.error("Error resetting portfolio store:", err);
    return res.status(500).json({ error: "Failed to reset portfolio store" });
  }
});
app.get("/api/messages", (req, res) => {
  try {
    if (fs.existsSync(messagesStorePath)) {
      const raw = fs.readFileSync(messagesStorePath, "utf-8");
      return res.json(JSON.parse(raw));
    }
    return res.json([]);
  } catch (err) {
    console.error("Error reading messages store:", err);
    return res.status(500).json({ error: "Failed to read messages store" });
  }
});
app.post("/api/messages", (req, res) => {
  try {
    const msgs = req.body;
    fs.writeFileSync(messagesStorePath, JSON.stringify(msgs, null, 2), "utf-8");
    return res.json({ success: true });
  } catch (err) {
    console.error("Error saving messages store:", err);
    return res.status(500).json({ error: "Failed to save messages store" });
  }
});
app.post("/api/notify-email", async (req, res) => {
  try {
    const to = req.body.to || process.env.EMAIL_ALERT_ADDRESS || process.env.SMTP_USER;
    const subject = req.body.subject;
    const body = req.body.body;
    if (!to || !subject || !body) {
      return res.status(400).json({ error: "Missing to address, subject, or message body." });
    }
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_APP_PASSWORD;
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = parseInt(process.env.SMTP_PORT || "587");
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
        html: `<div style="font-family: Arial, sans-serif; padding: 20px; border-radius: 8px; background: #f9fafb;"><h2 style="color: #1e3a8a;">${subject}</h2><p style="font-size: 15px; color: #374151; white-space: pre-wrap;">${body}</p></div>`
      });
      console.log(`[SMTP EMAIL SENT] Successfully delivered to ${to}`);
      return res.json({ success: true, description: "Email delivered successfully via SMTP!" });
    } else {
      console.log("--- EMAIL ALERTS DISPATCH LOG (SMTP not configured) ---");
      console.log(`To: ${to}`);
      console.log(`Subject: ${subject}`);
      console.log(`Body: ${body}`);
      console.log("-------------------------------------------------------");
      return res.json({
        success: true,
        description: "Email notification logged. Configure SMTP_USER and SMTP_PASS in .env for direct email sending."
      });
    }
  } catch (error) {
    console.error("Error sending Email notification:", error);
    res.status(500).json({ error: error.message || "Failed to dispatch Email notification." });
  }
});
app.post("/api/upload-image", async (req, res) => {
  try {
    const { base64Data, fileName } = req.body;
    if (!base64Data) {
      return res.status(400).json({ error: "No image data provided" });
    }
    const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let buffer;
    let extension = "jpg";
    if (matches && matches.length === 3) {
      const mimeType = matches[1];
      if (mimeType.includes("png")) extension = "png";
      else if (mimeType.includes("webp")) extension = "webp";
      else if (mimeType.includes("gif")) extension = "gif";
      buffer = Buffer.from(matches[2], "base64");
    } else {
      buffer = Buffer.from(base64Data, "base64");
    }
    const cleanFileName = `user_upload_${Date.now()}.${extension}`;
    const targetDir = path.join(process.cwd(), "src", "assets", "images");
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    const targetPath = path.join(targetDir, cleanFileName);
    fs.writeFileSync(targetPath, buffer);
    const imageUrl = `/src/assets/images/${cleanFileName}`;
    console.log(`[IMAGE UPLOAD] Saved custom profile photo to: ${targetPath}`);
    return res.json({ success: true, imageUrl, message: "Image uploaded successfully" });
  } catch (err) {
    console.error("Image upload error:", err);
    return res.status(500).json({ error: "Failed to upload image: " + err.message });
  }
});
var uploadsDir = path.join(process.cwd(), "src", "assets", "images");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use("/src/assets/images", express.static(uploadsDir));
var publicStaticDir = path.join(process.cwd(), "public");
if (!fs.existsSync(publicStaticDir)) {
  fs.mkdirSync(publicStaticDir, { recursive: true });
}
app.use(express.static(publicStaticDir));
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
} else {
  const { createServer: createViteServer } = await import("vite");
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa"
  });
  app.use(vite.middlewares);
}
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

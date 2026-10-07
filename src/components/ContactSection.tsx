import React from 'react';
import { Mail, MessageCircle, Phone, RefreshCw, Send, SendHorizontal, ShieldCheck } from 'lucide-react';
import { translations } from '../i18n';
import type { PortfolioData } from '../types';
import { type Lang } from '../lib/helpers';

interface ContactSectionProps {
  contactForm: any;
  handleContactSubmit: (...args: any[]) => any;
  isSendingMessage: boolean;
  lang: Lang;
  lastSubmittedMessage: any;
  portfolio: PortfolioData;
  setContactForm: (value: any) => void;
  showAutoReply: boolean;
}

export default function ContactSection({ contactForm, handleContactSubmit, isSendingMessage, lang, lastSubmittedMessage, portfolio, setContactForm, showAutoReply }: ContactSectionProps) {
  return (
    <>
      <section id="contact" className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-[#14141C] p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm space-y-6">
          <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white">{translations[lang].contactHeader}</h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">{translations[lang].contactSub}</p>
          </div>

          {/* Direct Social & Quick Connect Buttons */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-3 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200/60 dark:border-slate-800 text-xs font-bold">
            {portfolio.socials.whatsapp && (
            <a href={portfolio.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] bg-emerald-500/10 text-emerald-600 rounded-lg border border-emerald-500/20 hover:bg-emerald-500/20 transition-all">
              <MessageCircle size={15} /> WhatsApp
            </a>
            )}
            {portfolio.socials.telegram && (
            <a href={portfolio.socials.telegram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] bg-sky-500/10 text-sky-600 rounded-lg border border-sky-500/20 hover:bg-sky-500/20 transition-all">
              <SendHorizontal size={15} /> Telegram
            </a>
            )}
            <a href={`mailto:${portfolio.contact.email}`} className="flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] bg-amber-500/10 text-amber-600 rounded-lg border border-amber-500/20 hover:bg-amber-500/20 transition-all">
              <Mail size={15} /> {portfolio.contact.email}
            </a>
            {portfolio.contact.phone && (
            <a href={`tel:${portfolio.contact.phone}`} className="flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] bg-slate-200/50 dark:bg-slate-800 text-slate-700 dark:text-zinc-200 rounded-lg border border-slate-300/40 dark:border-slate-700 hover:bg-slate-200 transition-all">
              <Phone size={15} /> {portfolio.contact.phone}
            </a>
            )}
          </div>

          <form onSubmit={handleContactSubmit} className="space-y-4">
            {/* Anti-spam honeypot: invisible to people, bots fill it and are ignored by the server */}
            <div aria-hidden="true" style={{ position: 'absolute', width: 1, height: 1, margin: -1, padding: 0, border: 0, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', opacity: 0 }}>
              <label>Leave this field empty
                <input type="text" name="hp-extra" tabIndex={-1} autoComplete="off" value={contactForm.website} onChange={(e) => setContactForm({ ...contactForm, website: e.target.value })} />
              </label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">{translations[lang].formName}</label>
                <input type="text" required value={contactForm.name} onChange={(e) => setContactForm({...contactForm, name: e.target.value})} placeholder={{ en: 'Your name', ar: 'اسمك', de: 'Ihr Name' }[lang]} className="w-full text-base sm:text-sm p-3 border rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:outline-none focus:border-amber-600" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">{translations[lang].formEmail}</label>
                <input type="email" required value={contactForm.email} onChange={(e) => setContactForm({...contactForm, email: e.target.value})} placeholder="name@company.com" className="w-full text-base sm:text-sm p-3 border rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:outline-none focus:border-amber-600" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">{translations[lang].formSubject}</label>
              <input type="text" value={contactForm.subject} onChange={(e) => setContactForm({...contactForm, subject: e.target.value})} placeholder={{ en: 'e.g. ERP consulting opportunity', ar: 'مثال: فرصة عمل في استشارات ERP', de: 'z. B. Stelle im ERP-Consulting' }[lang]} className="w-full text-base sm:text-sm p-3 border rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:outline-none focus:border-amber-600" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">{translations[lang].formMessage}</label>
              <textarea rows={4} required value={contactForm.message} onChange={(e) => setContactForm({...contactForm, message: e.target.value})} placeholder={{ en: 'Write your message here...', ar: 'اكتب رسالتك هنا...', de: 'Ihre Nachricht...' }[lang]} className="w-full text-base sm:text-sm p-3 border rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:outline-none focus:border-amber-600 resize-none" />
            </div>

            <button type="submit" disabled={isSendingMessage} className="w-full bg-[#1A1A1A] hover:bg-black dark:bg-amber-600 dark:hover:bg-amber-700 text-white py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50">
              {isSendingMessage ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  <span>{translations[lang].formSending}</span>
                </>
              ) : (
                <>
                  <Send size={14} />
                  <span>{translations[lang].formSend}</span>
                </>
              )}
            </button>
          </form>

          {/* Instant Auto-Response Notification Block */}
          {showAutoReply && lastSubmittedMessage && (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-2 animate-in fade-in">
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs">
                <ShieldCheck size={16} />
                <span>{translations[lang].instantResponseTitle}</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-zinc-300 leading-relaxed text-start">
                {translations[lang].instantResponseText
                  .replace('{name}', lastSubmittedMessage.name)
                  .replace('{subject}', lastSubmittedMessage.subject || 'General Inquiry')
                  .replace('{email}', lastSubmittedMessage.email)}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

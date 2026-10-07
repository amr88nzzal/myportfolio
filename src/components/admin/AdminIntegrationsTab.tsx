import React from 'react';
import { Mail, Send } from 'lucide-react';
import type { ContactMessage, PortfolioData } from '../../types';

interface AdminIntegrationsTabProps {
  handleUpdateIntegrations: (...args: any[]) => any;
  integrationsStatus: any;
  messages: ContactMessage[];
  portfolio: PortfolioData;
  tr3: (en: string, ar: string, de: string) => string;
  triggerTestEmail: (...args: any[]) => any;
  triggerTestTelegram: (...args: any[]) => any;
}

export default function AdminIntegrationsTab({ handleUpdateIntegrations, integrationsStatus, messages, portfolio, tr3, triggerTestEmail, triggerTestTelegram }: AdminIntegrationsTabProps) {
  return (
    <>
      <form onSubmit={handleUpdateIntegrations} className="space-y-4 bg-white dark:bg-[#181822] p-6 rounded-xl border border-slate-200 dark:border-slate-800/60">
        <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
          {tr3('Bot token, chat ID and mail login are kept on the server in the .env file (never in the browser). Here you only switch alerts on or off.', 'توكن البوت ومعرّف المحادثة وبيانات البريد محفوظة على الخادم في ملف .env (وليس في المتصفح). هنا فقط تفعّل التنبيهات أو توقفها.', 'Bot-Token, Chat-ID und Mail-Zugang liegen auf dem Server in der .env-Datei (nie im Browser). Hier schalten Sie Benachrichtigungen nur ein oder aus.')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase text-amber-600 border-b pb-1.5">Telegram</p>
            <label className="flex items-center justify-between gap-3 text-xs min-h-[40px]">
              <span>{tr3('Send contact-form messages to Telegram', 'إرسال رسائل نموذج التواصل إلى تيليغرام', 'Kontaktnachrichten an Telegram senden')}</span>
              <input type="checkbox" name="telegram_enabled" defaultChecked={portfolio.integrations.telegramEnabled} className="h-5 w-5 accent-amber-600 shrink-0" />
            </label>
            <label className="flex items-center justify-between gap-3 text-xs min-h-[40px]">
              <span>{tr3('Alert me about new site visits (max. once per hour per visitor)', 'تنبيهي بالزيارات الجديدة (مرة واحدة كحد أقصى في الساعة لكل زائر)', 'Bei neuen Besuchen benachrichtigen (max. 1x pro Stunde je Besucher)')}</span>
              <input type="checkbox" name="visit_alerts" defaultChecked={portfolio.integrations.visitAlertsEnabled} className="h-5 w-5 accent-amber-600 shrink-0" />
            </label>
            <p className={`text-xs font-bold ${integrationsStatus?.telegram ? 'text-emerald-600' : 'text-red-500'}`}>
              {integrationsStatus === null ? '…' : integrationsStatus.telegram
                ? tr3('Server: Telegram is configured', 'الخادم: تيليغرام مُهيّأ', 'Server: Telegram ist eingerichtet')
                : tr3('Server: not configured. Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in .env', 'الخادم: غير مُهيّأ. ضع TELEGRAM_BOT_TOKEN وTELEGRAM_CHAT_ID في ملف .env', 'Server: nicht eingerichtet. TELEGRAM_BOT_TOKEN und TELEGRAM_CHAT_ID in .env setzen')}
            </p>
            {integrationsStatus?.telegram && (
              <button type="button" onClick={triggerTestTelegram} className="text-xs bg-sky-600/10 text-sky-600 font-bold border border-sky-500/20 px-4 min-h-[44px] rounded hover:bg-sky-600/20 transition-colors">
                {tr3('Send test message', 'إرسال رسالة اختبار', 'Testnachricht senden')}
              </button>
            )}
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold uppercase text-amber-600 border-b pb-1.5">E-Mail</p>
            <label className="flex items-center justify-between gap-3 text-xs min-h-[40px]">
              <span>{tr3('E-mail me contact-form messages', 'إرسال رسائل نموذج التواصل إلى بريدي', 'Kontaktnachrichten per E-Mail senden')}</span>
              <input type="checkbox" name="email_enabled" defaultChecked={portfolio.integrations.emailEnabled} className="h-5 w-5 accent-amber-600 shrink-0" />
            </label>
            <div>
              <label className="block text-xs uppercase text-slate-500 font-bold mb-1">{tr3('Alert destination e-mail', 'بريد استلام التنبيهات', 'Ziel-E-Mail für Benachrichtigungen')}</label>
              <input type="email" name="email_address" defaultValue={portfolio.integrations.emailAlertAddress} className="w-full text-base sm:text-sm px-3 py-2 border rounded dark:bg-slate-900 dark:border-slate-700" />
            </div>
            <p className={`text-xs font-bold ${integrationsStatus?.email ? 'text-emerald-600' : 'text-red-500'}`}>
              {integrationsStatus === null ? '…' : integrationsStatus.email
                ? tr3('Server: mail (SMTP) is configured', 'الخادم: البريد (SMTP) مُهيّأ', 'Server: E-Mail (SMTP) ist eingerichtet')
                : tr3('Server: not configured. Set SMTP_USER and SMTP_PASS in .env', 'الخادم: غير مُهيّأ. ضع SMTP_USER وSMTP_PASS في ملف .env', 'Server: nicht eingerichtet. SMTP_USER und SMTP_PASS in .env setzen')}
            </p>
            {integrationsStatus?.email && (
              <button type="button" onClick={triggerTestEmail} className="text-xs bg-amber-600/10 text-amber-700 font-bold border border-amber-600/20 px-4 min-h-[44px] rounded hover:bg-amber-600/20 transition-colors">
                {tr3('Send test e-mail', 'إرسال بريد اختبار', 'Test-E-Mail senden')}
              </button>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-2 border-t">
          <button type="submit" className="bg-amber-600 text-white px-5 min-h-[44px] rounded-lg text-xs font-bold uppercase">
            {tr3('Save', 'حفظ', 'Speichern')}
          </button>
        </div>
      </form>
    </>
  );
}

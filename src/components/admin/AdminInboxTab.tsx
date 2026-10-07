import React from 'react';
import { Trash } from 'lucide-react';
import { translations } from '../../i18n';
import type { ContactMessage } from '../../types';
import { type Lang } from '../../lib/helpers';

interface AdminInboxTabProps {
  deleteMessage: (...args: any[]) => any;
  lang: Lang;
  loadMessages: (...args: any[]) => any;
  markMessageRead: (...args: any[]) => any;
  messages: ContactMessage[];
  tr3: (en: string, ar: string, de: string) => string;
}

export default function AdminInboxTab({ deleteMessage, lang, loadMessages, markMessageRead, messages, tr3 }: AdminInboxTabProps) {
  return (
    <>
      <div className="space-y-3">
        <div className="flex justify-end">
          <button type="button" onClick={loadMessages} className="text-xs font-bold px-4 min-h-[40px] border rounded-lg hover:border-amber-600/50">
            {tr3('Refresh', 'تحديث', 'Aktualisieren')}
          </button>
        </div>
        {messages.length === 0 ? (
          <p className="text-center py-6 text-xs text-gray-500">{translations[lang].adminNoMessages}</p>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {messages.map((m) => (
              <div key={m.id} className={`p-4 rounded-xl border transition-colors ${m.isRead ? 'bg-white dark:bg-[#14141d] border-slate-200 dark:border-slate-800' : 'bg-amber-500/5 border-amber-600/30'}`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-xs font-bold">{m.name}</span>
                    <span className="text-gray-400 text-[10px] block font-mono">{m.email} · {m.date}</span>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    {!m.isRead && (
                      <button onClick={() => markMessageRead(m.id)} className="px-2.5 min-h-[32px] bg-amber-600 text-white text-[11px] font-bold rounded">
                        {translations[lang].adminMarkRead}
                      </button>
                    )}
                    <button onClick={() => deleteMessage(m.id)} aria-label="Delete" className="p-2 text-red-400 hover:text-red-600"><Trash size={14} /></button>
                  </div>
                </div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-zinc-200 mb-1">{m.subject}</h4>
                <p className="text-xs text-slate-600 dark:text-zinc-300 bg-slate-50 dark:bg-slate-900 p-2.5 rounded border border-slate-100 dark:border-slate-800 leading-relaxed text-start whitespace-pre-wrap">{m.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

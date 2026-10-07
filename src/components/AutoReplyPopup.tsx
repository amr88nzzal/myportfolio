import React from 'react';
import { MessageSquare, X } from 'lucide-react';
import { translations } from '../i18n';
import { type Lang } from '../lib/helpers';

interface AutoReplyPopupProps {
  lang: Lang;
  lastSubmittedMessage: any;
  setShowAutoReply: (value: any) => void;
  showAutoReply: boolean;
  textDirection: 'rtl' | 'ltr';
}

export default function AutoReplyPopup({ lang, lastSubmittedMessage, setShowAutoReply, showAutoReply, textDirection }: AutoReplyPopupProps) {
  return (
    <>
      {showAutoReply && lastSubmittedMessage && (
        <div className="fixed bottom-6 end-6 z-50 max-w-sm w-full bg-white dark:bg-[#14141C] border-s-4 border-amber-600 p-4 rounded-e-xl shadow-2xl animate-bounce print:hidden" style={{ direction: textDirection }}>
          <div className="flex gap-3">
            <div className="bg-amber-100 dark:bg-amber-950/40 p-1.5 rounded-lg h-8 w-8 flex items-center justify-center shrink-0">
              <MessageSquare className="text-amber-700 dark:text-amber-400" size={16} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className="text-xs font-bold font-mono text-amber-600 uppercase tracking-wider">{translations[lang].instantResponseTitle}</h4>
                <button onClick={() => setShowAutoReply(false)} className="text-gray-400 hover:text-black dark:hover:text-white"><X size={14} /></button>
              </div>
              <p className="text-xs text-slate-600 dark:text-zinc-300 mt-1 leading-relaxed text-justify">
                {translations[lang].instantResponseText
                  .replace('{name}', lastSubmittedMessage.name)
                  .replace('{subject}', lastSubmittedMessage.subject)
                  .replace('{email}', lastSubmittedMessage.email)}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

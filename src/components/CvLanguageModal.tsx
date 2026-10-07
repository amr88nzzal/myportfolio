import React from 'react';
import { FileDown, X } from 'lucide-react';
import { type Lang } from '../lib/helpers';

interface CvLanguageModalProps {
  downloadCvFile: (...args: any[]) => any;
  handlePrintCV: (...args: any[]) => any;
  lang: Lang;
  setOnScreenCvLang: (value: any) => void;
  setShowCvModal: (value: any) => void;
  showCvModal: boolean;
}

export default function CvLanguageModal({ downloadCvFile, handlePrintCV, lang, setOnScreenCvLang, setShowCvModal, showCvModal }: CvLanguageModalProps) {
  return (
    <>
      {showCvModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 print:hidden" style={{ direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
          <div className="bg-white dark:bg-[#14141d] max-w-lg w-full rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4 text-center">
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-xs font-mono text-amber-600 font-bold uppercase tracking-wider">{lang === 'ar' ? 'مركز السيرة الذاتية' : lang === 'de' ? 'Bewerbungs-Center' : 'CV Document Center'}</span>
              <button onClick={() => setShowCvModal(false)} className="text-slate-400 hover:text-black"><X size={18}/></button>
            </div>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              {lang === 'ar' ? 'اختر اللغة المفضلة لعرض السيرة الذاتية على الشاشة أو طباعتها وحفظها كملف PDF:' : lang === 'de' ? 'Wählen Sie Ihre bevorzugte Sprache zum Ansehen oder Drucken als PDF:' : 'Select your preferred language to view on-screen or print/save as a PDF document:'}
            </p>
            <div className="grid grid-cols-1 gap-3 py-2 text-left">

              {/* EN Option */}
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between p-3.5 border border-slate-200 dark:border-slate-800 rounded-xl dark:bg-slate-900/60" style={{ direction: 'ltr' }}>
                <div>
                  <span className="font-bold text-xs block text-slate-800 dark:text-zinc-100">English CV / Resume</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">International business profile format</span>
                </div>
                <div className="flex flex-wrap gap-1.5 w-full sm:w-auto shrink-0 mt-2 sm:mt-0">
                  <button onClick={() => { setOnScreenCvLang('en'); setShowCvModal(false); }} className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-zinc-200 rounded-lg text-[10px] font-bold uppercase transition-all">
                    View
                  </button>
                  <button onClick={() => downloadCvFile('en')} className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-[10px] font-bold uppercase transition-all flex items-center justify-center gap-1">
                    <FileDown size={11} /> Download File
                  </button>
                  <button onClick={() => handlePrintCV('en')} className="px-2.5 py-1.5 bg-amber-600 text-white hover:bg-amber-700 rounded-lg text-[10px] font-bold uppercase transition-all flex items-center justify-center gap-1">
                    <FileDown size={11} /> Print / PDF
                  </button>
                </div>
              </div>

              {/* AR Option */}
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between p-3.5 border border-slate-200 dark:border-slate-800 rounded-xl dark:bg-slate-900/60" style={{ direction: 'rtl' }}>
                <div className="text-right">
                  <span className="font-bold text-xs block text-slate-800 dark:text-zinc-100 font-arabic">السيرة الذاتية باللغة العربية</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5 font-arabic">النسخة العربية المعتمدة للمؤسسات الإقليمية</span>
                </div>
                <div className="flex flex-wrap gap-1.5 w-full sm:w-auto shrink-0 mt-2 sm:mt-0 justify-end" style={{ direction: 'ltr' }}>
                  <button onClick={() => { setOnScreenCvLang('ar'); setShowCvModal(false); }} className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-zinc-200 rounded-lg text-[10px] font-bold uppercase transition-all">
                    عرض
                  </button>
                  <button onClick={() => handlePrintCV('ar')} className="px-2.5 py-1.5 bg-amber-600 text-white hover:bg-amber-700 rounded-lg text-[10px] font-bold uppercase transition-all flex items-center justify-center gap-1 font-arabic">
                    <FileDown size={11} /> طباعة وحفظ
                  </button>
                </div>
              </div>

              {/* DE Option */}
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between p-3.5 border border-slate-200 dark:border-slate-800 rounded-xl dark:bg-slate-900/60" style={{ direction: 'ltr' }}>
                <div>
                  <span className="font-bold text-xs block text-slate-800 dark:text-zinc-100">Deutscher Lebenslauf</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Optimiert nach deutschen Bewerbungsstandards</span>
                </div>
                <div className="flex flex-wrap gap-1.5 w-full sm:w-auto shrink-0 mt-2 sm:mt-0">
                  <button onClick={() => { setOnScreenCvLang('de'); setShowCvModal(false); }} className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-zinc-200 rounded-lg text-[10px] font-bold uppercase transition-all">
                    Ansehen
                  </button>
                  <button onClick={() => downloadCvFile('de')} className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-[10px] font-bold uppercase transition-all flex items-center justify-center gap-1">
                    <FileDown size={11} /> Datei Herunterladen
                  </button>
                  <button onClick={() => handlePrintCV('de')} className="px-2.5 py-1.5 bg-amber-600 text-white hover:bg-amber-700 rounded-lg text-[10px] font-bold uppercase transition-all flex items-center justify-center gap-1">
                    <FileDown size={11} /> Drucken / PDF
                  </button>
                </div>
              </div>

            </div>
            <p className="text-[10px] text-slate-400">
              {lang === 'ar' ? 'تلميح: عند الطباعة، قم بتفعيل خيار "رسومات الخلفية" في إعدادات متصفحك لحفظ الألوان والخطوط.' : 'Tip: In the print settings, make sure "Background graphics" is enabled to preserve colors and typography.'}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

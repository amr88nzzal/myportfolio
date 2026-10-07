import React from 'react';
import { FileDown, X } from 'lucide-react';
import type { PortfolioData } from '../types';

interface CvViewerOverlayProps {
  onScreenCvLang: any;
  portfolio: PortfolioData;
  setCvLanguage: (value: any) => void;
  setOnScreenCvLang: (value: any) => void;
}

export default function CvViewerOverlay({ onScreenCvLang, portfolio, setCvLanguage, setOnScreenCvLang }: CvViewerOverlayProps) {
  return (
    <>
      {onScreenCvLang && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0a0a0c]/90 backdrop-blur-md flex justify-center p-4 sm:p-8 print:hidden" dir={onScreenCvLang === 'ar' ? 'rtl' : 'ltr'}>
          <div className="max-w-4xl w-full bg-white dark:bg-[#121218] text-slate-900 dark:text-slate-100 p-6 sm:p-12 rounded-2xl shadow-2xl relative border border-slate-200 dark:border-slate-800 flex flex-col justify-between h-fit animate-in fade-in zoom-in-95 duration-200">
            {/* Close & Action floating panel */}
            <div className={`absolute top-4 ${onScreenCvLang === 'ar' ? 'left-4' : 'right-4'} flex gap-2`}>
              <button 
                onClick={() => {
                  setCvLanguage(onScreenCvLang);
                  setTimeout(() => window.print(), 100);
                }}
                className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all flex items-center gap-1 shadow-md hover:scale-[1.02]"
              >
                <FileDown size={12} />
                <span>{onScreenCvLang === 'ar' ? 'طباعة / PDF' : onScreenCvLang === 'de' ? 'Drucken / PDF' : 'Print / PDF'}</span>
              </button>
              <button 
                onClick={() => setOnScreenCvLang(null)}
                className="bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all flex items-center gap-1 shadow-md hover:scale-[1.02]"
              >
                <X size={12} />
                <span>{onScreenCvLang === 'ar' ? 'إغلاق' : onScreenCvLang === 'de' ? 'Schließen' : 'Close'}</span>
              </button>
            </div>

            {/* Document Content */}
            <div className="font-serif text-[11px] leading-relaxed mt-10 bg-white dark:bg-[#121218] p-2 text-slate-800 dark:text-slate-200">
              <div className="border-b-2 border-slate-800 dark:border-slate-700 pb-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                <div>
                  <div className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white font-sans">{portfolio.name}</div>
                  <p className="text-xs uppercase tracking-wider text-amber-600 dark:text-amber-500 font-bold mt-1 font-mono">{portfolio.title[onScreenCvLang]}</p>
                </div>
                <div className={`text-[10.5px] text-slate-700 dark:text-slate-300 space-y-0.5 ${onScreenCvLang === 'ar' ? 'text-right' : 'text-left sm:text-end'}`}>
                  <p>📧 {portfolio.contact.email}</p>
                  <p>📞 {portfolio.contact.phone}</p>
                  <p>📍 {portfolio.contact.location[onScreenCvLang]}</p>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-sm font-bold uppercase border-b border-slate-300 dark:border-slate-800 pb-1 mb-2 tracking-wider text-slate-800 dark:text-slate-200 font-sans">{onScreenCvLang === 'ar' ? 'الملخص المهني' : onScreenCvLang === 'de' ? 'Berufliches Profil' : 'Professional Profile'}</h2>
                <p className="text-justify text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed font-sans">{portfolio.summary[onScreenCvLang]}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-5">
                  <h2 className="text-sm font-bold uppercase border-b border-slate-300 dark:border-slate-800 pb-1 mb-3 tracking-wider text-slate-800 dark:text-slate-200 font-sans">{onScreenCvLang === 'ar' ? 'الخبرة المهنية' : onScreenCvLang === 'de' ? 'Berufserfahrung' : 'Work Experience'}</h2>
                  {portfolio.experiences.map((exp) => (
                    <div key={exp.id} className="text-[11px] space-y-1">
                      <div className="flex justify-between font-bold text-slate-900 dark:text-white font-sans text-xs">
                        <span>{exp.company} &middot; {exp.role[onScreenCvLang]}</span>
                        <span className="font-mono text-[10px] shrink-0 text-slate-600 dark:text-slate-400"><bdi dir="ltr">{exp.period}</bdi></span>
                      </div>
                      <p className="text-amber-600 dark:text-amber-500 italic text-[10px] mt-0.5">{exp.location[onScreenCvLang]}</p>
                      <ul className="list-disc ps-4 pe-4 space-y-1 text-slate-700 dark:text-slate-300 text-[10.5px] mt-1.5 text-justify font-sans">
                        {exp.highlights[onScreenCvLang].map((hl, idx) => (
                          <li key={idx}>{hl}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="md:col-span-1 space-y-6">
                  <div>
                    <h2 className="text-sm font-bold uppercase border-b border-slate-300 dark:border-slate-800 pb-1 mb-3 tracking-wider text-slate-800 dark:text-slate-200 font-sans">{onScreenCvLang === 'ar' ? 'الكفاءات الأساسية' : onScreenCvLang === 'de' ? 'Kompetenzen' : 'Core Skills'}</h2>
                    {portfolio.skills.map((cat) => (
                      <div key={cat.id} className="mb-3">
                        <p className="font-bold text-[9px] text-slate-500 dark:text-slate-400 uppercase border-b border-slate-100 dark:border-slate-800 pb-0.5 mb-1.5 font-sans">{cat.title[onScreenCvLang]}</p>
                        <ul className="space-y-1 text-[10.5px] text-slate-700 dark:text-slate-300 font-sans">
                          {cat.skills.map((sk, idx) => (
                            <li key={idx} className="flex justify-between items-center">
                              <span>{sk.name}</span>
                              <span className="font-mono text-[9px] text-amber-600 dark:text-amber-500 font-bold">{sk.level}/5</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h2 className="text-sm font-bold uppercase border-b border-slate-300 dark:border-slate-800 pb-1 mb-3 tracking-wider text-slate-800 dark:text-slate-200 font-sans">{onScreenCvLang === 'ar' ? 'المؤهلات العلمية' : onScreenCvLang === 'de' ? 'Akademische Ausbildung' : 'Education'}</h2>
                    {portfolio.education.map((edu) => (
                      <div key={edu.id} className="mb-3 text-[10.5px] space-y-0.5 font-sans">
                        <p className="font-bold text-slate-800 dark:text-slate-200">{edu.degree[onScreenCvLang]}</p>
                        <p className="text-slate-500 dark:text-slate-400 font-mono text-[9px]"><bdi dir="ltr">{edu.period}</bdi></p>
                        <p className="text-slate-400 dark:text-slate-500 italic">{edu.school[onScreenCvLang]}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 dark:border-slate-800 mt-10 pt-4 text-center text-[9px] text-slate-400 dark:text-slate-500 font-mono">
                {portfolio.name} &middot; {portfolio.contact.email}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

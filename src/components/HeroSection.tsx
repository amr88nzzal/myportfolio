import React from 'react';
import { FileDown, Mail, Sparkles } from 'lucide-react';
import { translations } from '../i18n';
import type { PortfolioData } from '../types';
import { type Lang } from '../lib/helpers';

interface HeroSectionProps {
  lang: Lang;
  portfolio: PortfolioData;
  setShowCvModal: (value: any) => void;
}

export default function HeroSection({ lang, portfolio, setShowCvModal }: HeroSectionProps) {
  return (
    <>
      <section id="about" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-amber-600">
            <Sparkles size={13} />
            <span>{portfolio.contact.location[lang]}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1] text-wrap-balance">
            {translations[lang].heroHeading}
          </h1>

          <p className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed max-w-2xl text-start">
            {portfolio.summary[lang]}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a href="#contact" className="px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider bg-[#1A1A1A] dark:bg-amber-600 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-1.5">
              <Mail size={13} />
              <span>{translations[lang].navContact}</span>
            </a>
            <button onClick={() => setShowCvModal(true)} className="px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider bg-white dark:bg-[#1C1C24] text-slate-900 dark:text-white rounded-lg border border-slate-300/60 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors flex items-center gap-1.5">
              <FileDown size={13} />
              <span>{translations[lang].downloadCV}</span>
            </button>
          </div>

          {/* Proof Indicators */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">{translations[lang].keyMetricsTitle}</p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-base sm:text-2xl font-mono font-bold text-amber-600 whitespace-nowrap">{translations[lang].metric1Val}</p>
                <p className="text-[11px] text-slate-500 mt-1 uppercase tracking-wider leading-tight">{translations[lang].metric1Lbl}</p>
              </div>
              <div>
                <p className="text-base sm:text-2xl font-mono font-bold text-amber-600 whitespace-nowrap">{translations[lang].metric2Val}</p>
                <p className="text-[11px] text-slate-500 mt-1 uppercase tracking-wider leading-tight">{translations[lang].metric2Lbl}</p>
              </div>
              <div>
                <p className="text-base sm:text-2xl font-mono font-bold text-amber-600 whitespace-nowrap">{translations[lang].metric3Val}</p>
                <p className="text-[11px] text-slate-500 mt-1 uppercase tracking-wider leading-tight">{translations[lang].metric3Lbl}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Visual Right */}
        <div className="lg:col-span-5 relative">
          <div className="relative aspect-[4/5] max-w-xs mx-auto rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-slate-100 dark:bg-slate-900">
            <img
              src={portfolio.portraitImage}
              alt={`${portfolio.name} portrait`}
              className="absolute inset-0 w-full h-full object-cover object-top"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-3 start-3 end-3 bg-white/95 dark:bg-[#1A1A22]/95 p-3 rounded-lg border border-slate-200/50 dark:border-slate-800 backdrop-blur-sm flex items-center justify-between gap-2 shadow-sm">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase truncate">{portfolio.name}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{portfolio.contact.location[lang]}</p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span className="text-[11px] uppercase tracking-wide text-emerald-600 font-bold">{{ en: 'Open to new roles', ar: 'متاح لفرص جديدة', de: 'Offen für neue Rollen' }[lang]}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

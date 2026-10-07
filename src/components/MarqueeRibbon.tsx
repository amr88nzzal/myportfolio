import React from 'react';
import { tickerText, type Lang } from '../lib/helpers';

interface MarqueeRibbonProps {
  lang: Lang;
}

export default function MarqueeRibbon({ lang }: MarqueeRibbonProps) {
  return (
    <>
      <div dir="ltr" aria-hidden="true" className="w-full overflow-hidden bg-white dark:bg-slate-900/60 text-amber-700 dark:text-amber-500 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 relative print:hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-12 text-[11px] font-bold tracking-widest uppercase font-mono">
          <span>{tickerText[lang]}</span>
          <span>{tickerText[lang]}</span>
        </div>
      </div>
    </>
  );
}

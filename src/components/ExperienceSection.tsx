import React from 'react';
import { Briefcase } from 'lucide-react';
import { translations } from '../i18n';
import { type Lang } from '../lib/helpers';

interface ExperienceSectionProps {
  activeExperienceTab: any;
  getFilteredExperiences: (...args: any[]) => any;
  lang: Lang;
  setActiveExperienceTab: (value: any) => void;
  setShowAllExperience: (value: any) => void;
  showAllExperience: boolean;
}

export default function ExperienceSection({ activeExperienceTab, getFilteredExperiences, lang, setActiveExperienceTab, setShowAllExperience, showAllExperience }: ExperienceSectionProps) {
  return (
    <>
      <section id="experience" className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight">{translations[lang].experienceHeader}</h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400">{translations[lang].experienceSub}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-1 p-0.5 bg-slate-200/40 dark:bg-slate-900 rounded-lg max-w-md mx-auto border border-slate-200/50 dark:border-slate-800">
          {['all', 'bmw', 'sahli', 'aljawaden', 'chief'].map((tab) => (
            <button 
              key={tab}
              onClick={() => { setActiveExperienceTab(tab); setShowAllExperience(false); }} 
              className={`px-3 py-2 text-xs font-bold rounded-md transition-all ${activeExperienceTab === tab ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm font-bold' : 'text-slate-500 hover:text-slate-900'}`}>
              {tab === 'all' ? ({ en: 'All', ar: 'الكل', de: 'Alle' }[lang]) : tab === 'chief' ? ({ en: 'Accounting', ar: 'المحاسبة', de: 'Buchhaltung' }[lang]) : ({ bmw: 'BMW', sahli: 'Sahlisoft', aljawaden: 'Aljawaden' } as Record<string, string>)[tab]}
            </button>
          ))}
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {(activeExperienceTab === 'all' && !showAllExperience ? getFilteredExperiences().slice(0, 3) : getFilteredExperiences()).map((exp) => (
            <div key={exp.id} className="group relative bg-white dark:bg-[#14141C] p-5 rounded-xl border border-slate-200 dark:border-slate-800/80 hover:border-amber-600/30 transition-all duration-300">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="shrink-0 space-y-0.5">
                  <span className="font-mono text-xs font-bold text-amber-600 block"><bdi dir="ltr">{exp.period}</bdi></span>
                  <span className="text-[11px] text-slate-400 block uppercase tracking-wider">{exp.location[lang]}</span>
                </div>

                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Briefcase size={14} className="text-amber-600 shrink-0" />
                    <h3 className="text-sm font-bold">{exp.company}</h3>
                  </div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">{exp.role[lang]}</h4>
                  <ul className="space-y-1 text-xs text-slate-600 dark:text-zinc-300 leading-relaxed list-inside list-disc pt-1.5 ps-1 pe-1 text-start">
                    {exp.highlights[lang].map((highlight, hIdx) => (
                      <li key={hIdx} className="ps-0.5">{highlight}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
          {activeExperienceTab === 'all' && getFilteredExperiences().length > 3 && (
            <button
              onClick={() => setShowAllExperience(!showAllExperience)}
              className="w-full min-h-[44px] px-4 text-xs font-bold uppercase tracking-wider rounded-xl border border-slate-300/60 dark:border-slate-700 bg-white dark:bg-[#14141C] hover:border-amber-600/40 text-slate-700 dark:text-zinc-200 transition-colors"
            >
              {showAllExperience
                ? ({ en: 'Show fewer roles', ar: 'عرض أقل', de: 'Weniger anzeigen' }[lang])
                : ({ en: `Show earlier roles (${getFilteredExperiences().length - 3})`, ar: `عرض الوظائف السابقة (${getFilteredExperiences().length - 3})`, de: `Frühere Stationen anzeigen (${getFilteredExperiences().length - 3})` }[lang])}
            </button>
          )}
        </div>
      </section>
    </>
  );
}

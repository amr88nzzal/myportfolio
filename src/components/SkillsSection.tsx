import React from 'react';
import { Check, Globe, GraduationCap } from 'lucide-react';
import { translations } from '../i18n';
import type { PortfolioData } from '../types';
import { type Lang } from '../lib/helpers';

interface SkillsSectionProps {
  lang: Lang;
  portfolio: PortfolioData;
}

export default function SkillsSection({ lang, portfolio }: SkillsSectionProps) {
  return (
    <>
      <section id="skills" className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight">{translations[lang].skillsHeader}</h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400">{translations[lang].skillsSub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {portfolio.skills.map((category) => (
            <div key={category.id} className="bg-white dark:bg-[#14141C] p-5 rounded-xl border border-slate-200 dark:border-slate-800/80 flex flex-col justify-between shadow-sm">
              <div>
                <h3 className="text-[11px] font-bold font-mono uppercase text-amber-600 tracking-wider mb-4 border-b border-slate-200/40 dark:border-slate-800 pb-1.5 flex items-center gap-1.5">
                  <Check size={12} />
                  <span>{category.title[lang]}</span>
                </h3>
                <ul className="space-y-2.5">
                  {category.skills.map((sk, idx) => (
                    <li key={idx} className="space-y-1 text-xs">
                      <div className="flex justify-between text-slate-700 dark:text-zinc-300">
                        <span className="font-semibold text-[11px]">{sk.name}</span>
                        <span className="font-mono text-[11px] text-amber-600">{sk.level}/5</span>
                      </div>
                      <div className="h-1 w-full bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden">
                        <div className="h-full bg-slate-800 dark:bg-amber-600" style={{ width: `${(sk.level / 5) * 100}%` }}></div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Academic & Languages Dual Bento */}
        <div className="max-w-5xl mx-auto bg-slate-100/40 dark:bg-[#101015] p-6 rounded-xl border border-slate-200 dark:border-slate-800/80 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-amber-600 mb-3 flex items-center gap-1.5">
              <GraduationCap size={15} />
              <span>{translations[lang].educationTitle}</span>
            </h3>
            <div className="space-y-4 text-xs">
              {portfolio.education.map((edu) => (
                <div key={edu.id} className="space-y-0.5">
                  <p className="font-bold text-slate-800 dark:text-white">{edu.degree[lang]}</p>
                  <p className="text-slate-400 text-[11px]"><bdi dir="ltr">{edu.period}</bdi> &middot; {edu.school[lang]}</p>
                  <p className="text-slate-600 dark:text-zinc-400 text-[11px] text-start leading-relaxed pt-0.5">{edu.details[lang]}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-amber-600 mb-3 flex items-center gap-1.5">
              <Globe size={14} />
              <span>{translations[lang].languagesTitle}</span>
            </h3>
            <div className="space-y-3 text-xs font-semibold">
              <div className="flex justify-between border-b border-slate-200/50 dark:border-slate-800 pb-1.5">
                <span>{{ en: 'ARABIC', ar: 'العربية', de: 'ARABISCH' }[lang]}</span>
                <span className="text-amber-600">{{ en: 'Native', ar: 'اللغة الأم', de: 'Muttersprache' }[lang]}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/50 dark:border-slate-800 pb-1.5">
                <span>{{ en: 'ENGLISH', ar: 'الإنجليزية', de: 'ENGLISCH' }[lang]}</span>
                <span className="text-amber-600">B2</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/50 dark:border-slate-800 pb-1.5">
                <span>{{ en: 'GERMAN', ar: 'الألمانية', de: 'DEUTSCH' }[lang]}</span>
                <span className="text-amber-600">{{ en: 'B1 – working towards B2/C1', ar: 'B1 – وصولاً إلى B2/C1', de: 'B1 – auf dem Weg zu B2/C1' }[lang]}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

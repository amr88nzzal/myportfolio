import React from 'react';
import { ExternalLink } from 'lucide-react';
import { translations } from '../i18n';
import type { PortfolioData } from '../types';
import { type Lang } from '../lib/helpers';

interface ProjectsSectionProps {
  lang: Lang;
  portfolio: PortfolioData;
}

export default function ProjectsSection({ lang, portfolio }: ProjectsSectionProps) {
  return (
    <>
      <section id="projects" className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight">{translations[lang].projectsHeader}</h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400">{translations[lang].projectsSub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {portfolio.projects.map((project) => (
            <div key={project.id} className="bg-white dark:bg-[#14141C] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800/80 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="relative aspect-[4/3] bg-slate-50 dark:bg-slate-950 overflow-hidden border-b border-slate-200/60 dark:border-slate-800/60">
                <img src={project.image} alt={project.title[lang]} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                <span className="absolute top-3 end-3 bg-white/95 dark:bg-[#1A1A22]/95 border border-slate-200 dark:border-slate-800 text-[11px] font-bold px-2 py-0.5 rounded tracking-wide uppercase">
                  {project.category[lang]}
                </span>
                <span className="absolute top-3 start-3 bg-amber-600 text-white text-[11px] font-bold px-2 py-0.5 rounded tracking-wide uppercase">{{ en: 'Demo', ar: 'تجريبي', de: 'Demo' }[lang]}</span>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight">{project.title[lang]}</h3>
                  <p className="text-xs text-slate-600 dark:text-zinc-300 text-start leading-relaxed">{project.description[lang]}</p>
                </div>

                <div className="space-y-2.5 pt-1">
                  <div className="flex flex-wrap gap-1.5 text-[11px] font-mono text-slate-400 uppercase">
                    {project.tech.map((tc, idx) => (
                      <span key={idx}>{tc} {idx < project.tech.length - 1 ? '·' : ''}</span>
                    ))}
                  </div>
                  <div className="border-t border-slate-100 dark:border-slate-800/80 pt-3 flex flex-col gap-2 text-xs">
                    <span className="font-semibold text-slate-600 dark:text-zinc-300">{project.metrics[lang]}</span>
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3 rounded-lg border border-amber-600/30 bg-amber-500/10 hover:bg-amber-500/20 text-xs uppercase font-bold text-amber-700 dark:text-amber-500 transition-colors">
                      <span>{translations[lang].viewProjectBtn}</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

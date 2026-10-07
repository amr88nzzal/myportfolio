import React from 'react';
import { ExternalLink, Github, Star } from 'lucide-react';
import { translations } from '../i18n';
import type { PortfolioData } from '../types';
import { type Lang } from '../lib/helpers';

interface GithubSectionProps {
  githubRepos: any;
  githubUser: any;
  lang: Lang;
  portfolio: PortfolioData;
}

export default function GithubSection({ githubRepos, githubUser, lang, portfolio }: GithubSectionProps) {
  return (
    <>
      <section id="github" className="bg-[#FAF9F5]/80 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-2xl max-w-4xl mx-auto space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-200 dark:border-slate-800/80">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-display font-bold tracking-tight flex items-center gap-2">
              <Github size={22} className="text-amber-600" />
              <span>{translations[lang].githubHeader}</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">{translations[lang].githubSub}</p>
          </div>
          {portfolio.socials.github && (
            <a href={portfolio.socials.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-bold uppercase text-amber-600 hover:underline shrink-0 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-600/20">
              <span>{translations[lang].githubViewAll}</span>
              <ExternalLink size={13} />
            </a>
          )}
        </div>

        {/* GitHub Stats Cards Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-white dark:bg-[#14141C] border border-slate-200 dark:border-slate-800 rounded-xl text-center">
            <span className="text-[11px] font-mono text-slate-400 block uppercase">{lang === 'ar' ? 'المستودعات العامة' : lang === 'de' ? 'Öffentliche Repos' : 'Public Repos'}</span>
            <span className="text-lg font-bold text-amber-600 font-mono">{githubUser?.public_repos ?? '—'}</span>
          </div>
          <div className="p-3 bg-white dark:bg-[#14141C] border border-slate-200 dark:border-slate-800 rounded-xl text-center">
            <span className="text-[11px] font-mono text-slate-400 block uppercase">{lang === 'ar' ? 'المتابعون' : lang === 'de' ? 'Follower' : 'Followers'}</span>
            <span className="text-lg font-bold text-amber-600 font-mono">{githubUser?.followers ?? '—'}</span>
          </div>
          <div className="p-3 bg-white dark:bg-[#14141C] border border-slate-200 dark:border-slate-800 rounded-xl text-center">
            <span className="text-[11px] font-mono text-slate-400 block uppercase">{lang === 'ar' ? 'النشاط التراكمي' : lang === 'de' ? 'Aktivität' : 'Active Since'}</span>
            <span className="text-lg font-bold text-amber-600 font-mono">{githubUser?.created_at ? new Date(githubUser.created_at).getFullYear() : '—'}</span>
          </div>
          <div className="p-3 bg-white dark:bg-[#14141C] border border-slate-200 dark:border-slate-800 rounded-xl text-center">
            <span className="text-[11px] font-mono text-slate-400 block uppercase">{lang === 'ar' ? 'الموقع' : lang === 'de' ? 'Standort' : 'Location'}</span>
            <span className="text-sm font-bold text-slate-700 dark:text-zinc-200 truncate block mt-1">{githubUser?.location || 'Germany'}</span>
          </div>
        </div>

        {/* Recently updated public repositories */}
        {githubRepos.filter((r: any) => !r.fork).length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {githubRepos.filter((r: any) => !r.fork).slice(0, 6).map((repo: any) => (
              <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer" className="block p-4 bg-white dark:bg-[#14141C] border border-slate-200 dark:border-slate-800 rounded-xl hover:border-amber-600/40 transition-colors space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-bold text-amber-600 truncate">{repo.name}</span>
                  <ExternalLink size={12} className="text-slate-400 shrink-0" />
                </div>
                <p className="text-xs text-slate-600 dark:text-zinc-300 line-clamp-2 min-h-[2rem]">{repo.description || ''}</p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-mono text-slate-400">
                  {repo.language && <span>{repo.language}</span>}
                  <span className="inline-flex items-center gap-1"><Star size={11} /> {repo.stargazers_count}</span>
                  <span>{new Date(repo.pushed_at).toLocaleDateString(lang === 'ar' ? 'ar' : lang === 'de' ? 'de-DE' : 'en-GB', { year: 'numeric', month: 'short' })}</span>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

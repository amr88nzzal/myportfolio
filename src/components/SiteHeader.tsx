import React from 'react';
import { Lock, Moon, Sun } from 'lucide-react';
import { translations } from '../i18n';
import { type Lang } from '../lib/helpers';

interface SiteHeaderProps {
  activeSection: any;
  darkMode: boolean;
  handleToggleDarkMode: (...args: any[]) => any;
  isAdminUnlocked: boolean;
  lang: Lang;
  setActiveSection: (value: any) => void;
  setLang: (value: any) => void;
  setShowAdminPanel: (value: any) => void;
  showAdminEntry: boolean;
  showAdminPanel: boolean;
}

export default function SiteHeader({ activeSection, darkMode, handleToggleDarkMode, isAdminUnlocked, lang, setActiveSection, setLang, setShowAdminPanel, showAdminEntry, showAdminPanel }: SiteHeaderProps) {
  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FAF9F5]/90 dark:bg-[#0D0D11]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 transition-colors duration-300 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="#" className="text-lg font-bold tracking-tight hover:text-amber-600 transition-colors uppercase font-mono">
              AMRO NAZZAL
            </a>
          </div>

          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider">
            <a href="#about" onClick={() => setActiveSection('hero')} className={`hover:text-amber-600 transition-colors ${activeSection === 'hero' ? 'text-amber-600 font-bold' : 'text-slate-600 dark:text-zinc-400'}`}>
              {translations[lang].navHome}
            </a>
            <a href="#projects" onClick={() => setActiveSection('projects')} className={`hover:text-amber-600 transition-colors ${activeSection === 'projects' ? 'text-amber-600 font-bold' : 'text-slate-600 dark:text-zinc-400'}`}>
              {translations[lang].navProjects}
            </a>
            <a href="#experience" onClick={() => setActiveSection('experience')} className={`hover:text-amber-600 transition-colors ${activeSection === 'experience' ? 'text-amber-600 font-bold' : 'text-slate-600 dark:text-zinc-400'}`}>
              {translations[lang].navExperience}
            </a>
            <a href="#skills" onClick={() => setActiveSection('skills')} className={`hover:text-amber-600 transition-colors ${activeSection === 'skills' ? 'text-amber-600 font-bold' : 'text-slate-600 dark:text-zinc-400'}`}>
              {translations[lang].navSkills}
            </a>
            <a href="#github" onClick={() => setActiveSection('github')} className={`hover:text-amber-600 transition-colors ${activeSection === 'github' ? 'text-amber-600 font-bold' : 'text-slate-600 dark:text-zinc-400'}`}>
              GitHub
            </a>
            <a href="#contact" onClick={() => setActiveSection('contact')} className={`hover:text-amber-600 transition-colors ${activeSection === 'contact' ? 'text-amber-600 font-bold' : 'text-slate-600 dark:text-zinc-400'}`}>
              {translations[lang].navContact}
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-200/50 dark:bg-slate-800/80 rounded-lg p-0.5 border border-slate-300/40 dark:border-slate-700/60" dir="ltr">
              <button onClick={() => setLang('en')} aria-label="English" className={`px-3 py-2 text-xs font-bold rounded ${lang === 'en' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'}`}>EN</button>
              <button onClick={() => setLang('ar')} aria-label="العربية" className={`px-3 py-2 text-xs font-bold rounded ${lang === 'ar' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-arabic' : 'text-slate-500'}`}>عربي</button>
              <button onClick={() => setLang('de')} aria-label="Deutsch" className={`px-3 py-2 text-xs font-bold rounded ${lang === 'de' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'}`}>DE</button>
            </div>

            <button onClick={handleToggleDarkMode} aria-label="Toggle theme" className="p-2.5 rounded-lg border border-slate-300/50 dark:border-slate-700/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-zinc-300 transition-colors">
              {darkMode ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            {(showAdminEntry || isAdminUnlocked || showAdminPanel) && (
            <button aria-label="Admin" onClick={() => setShowAdminPanel(!showAdminPanel)} className={`p-1.5 rounded-lg border transition-all ${showAdminPanel ? 'bg-amber-600 text-white border-amber-600' : 'border-slate-300/50 dark:border-slate-700/60 text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
              <Lock size={13} />
            </button>
            )}
          </div>
        </div>
        <nav aria-label="Sections" className="lg:hidden border-t border-slate-200/70 dark:border-slate-800/70 overflow-x-auto">
          <div className="flex gap-1 px-4 sm:px-6 py-1.5 w-max min-w-full">
            {[['projects', translations[lang].navProjects], ['experience', translations[lang].navExperience], ['skills', translations[lang].navSkills], ['github', 'GitHub'], ['contact', translations[lang].navContact]].map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={() => setActiveSection(id)} className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wide rounded-lg whitespace-nowrap transition-colors ${activeSection === id ? 'text-amber-600 bg-amber-500/10' : 'text-slate-600 dark:text-zinc-400'}`}>{label}</a>
            ))}
          </div>
        </nav>
      </header>
    </>
  );
}

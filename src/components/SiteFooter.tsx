import React from 'react';
import { ExternalLink } from 'lucide-react';
import type { PortfolioData } from '../types';
import { isProfileUrl } from '../lib/helpers';

interface SiteFooterProps {
  portfolio: PortfolioData;
}

export default function SiteFooter({ portfolio }: SiteFooterProps) {
  return (
    <>
      <footer className="bg-slate-50 dark:bg-[#08080C] border-t border-slate-200 dark:border-slate-900 py-8 print:hidden transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-start">
            <span className="text-xs font-bold font-mono text-amber-600 uppercase tracking-wider">{portfolio.name}</span>
            <p className="text-[11px] text-slate-400 mt-0.5">&copy; {new Date().getFullYear()} {portfolio.name} &middot; {portfolio.contact.email}</p>
          </div>
          <div className="flex gap-4 text-[11px] font-bold uppercase tracking-wider">
            {portfolio.socials.github && (
            <a href={portfolio.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-amber-600 transition-colors flex items-center gap-1">
              <span>GitHub</span> <ExternalLink size={8} />
            </a>
            )}
            {isProfileUrl(portfolio.socials.linkedin) && (
              <a href={portfolio.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-amber-600 transition-colors flex items-center gap-1">
              <span>LinkedIn</span> <ExternalLink size={8} />
            </a>
            )}
            <a href={`mailto:${portfolio.contact.email}`} className="hover:text-amber-600 transition-colors flex items-center gap-1">
              <span>Email</span> <ExternalLink size={8} />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

import React from 'react';
import type { PortfolioData } from '../types';

interface PrintableCvProps {
  cvLanguage: any;
  portfolio: PortfolioData;
}

export default function PrintableCv({ cvLanguage, portfolio }: PrintableCvProps) {
  return (
    <>
      <div className="hidden print:block p-8 bg-white text-black font-serif text-xs leading-relaxed" style={{ direction: cvLanguage === 'ar' ? 'rtl' : 'ltr' }}>
        <div className="border-b-2 border-slate-800 pb-3 mb-4 flex justify-between items-end">
          <div>
            <div className="text-2xl font-bold tracking-tight font-display">{portfolio.name}</div>
            <p className="text-xs uppercase tracking-wider text-slate-600 mt-0.5">{portfolio.title[cvLanguage]}</p>
          </div>
          <div className="text-right text-[10px] text-slate-700">
            <p>📧 {portfolio.contact.email}</p>
            <p>📞 {portfolio.contact.phone}</p>
            <p>📍 {portfolio.contact.location[cvLanguage]}</p>
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase border-b border-slate-300 pb-0.5 mb-1.5">{cvLanguage === 'ar' ? 'الملخص المهني' : cvLanguage === 'de' ? 'Berufliches Profil' : 'Professional Profile'}</h2>
          <p className="text-justify text-[10px]">{portfolio.summary[cvLanguage]}</p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-4">
            <h2 className="text-sm font-bold uppercase border-b border-slate-300 pb-0.5 mb-1.5">{cvLanguage === 'ar' ? 'الخبرة المهنية' : cvLanguage === 'de' ? 'Berufserfahrung' : 'Work Experience'}</h2>
            {portfolio.experiences.map((exp) => (
              <div key={exp.id} className="text-[10px]">
                <div className="flex justify-between font-bold">
                  <span>{exp.company} &middot; {exp.role[cvLanguage]}</span>
                  <span><bdi dir="ltr">{exp.period}</bdi></span>
                </div>
                <p className="text-slate-500 italic text-[9px] mb-1">{exp.location[cvLanguage]}</p>
                <ul className="list-disc ps-4 pe-4 space-y-1 text-slate-800 text-[9.5px]">
                  {exp.highlights[cvLanguage].map((hl, idx) => (
                    <li key={idx}>{hl}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="col-span-1 space-y-4">
            <div>
              <h2 className="text-sm font-bold uppercase border-b border-slate-300 pb-0.5 mb-1.5">{cvLanguage === 'ar' ? 'الكفاءات الأساسية' : cvLanguage === 'de' ? 'Kompetenzen' : 'Core Skills'}</h2>
              {portfolio.skills.map((cat) => (
                <div key={cat.id} className="mb-2">
                  <p className="font-bold text-[9px] text-slate-700 uppercase border-b border-slate-100 pb-0.5 mb-1">{cat.title[cvLanguage]}</p>
                  <ul className="space-y-0.5 text-[9px] text-slate-600">
                    {cat.skills.map((sk, idx) => (
                      <li key={idx} className="flex justify-between">
                        <span>{sk.name}</span>
                        <span>{sk.level}/5</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-sm font-bold uppercase border-b border-slate-300 pb-0.5 mb-1.5">{cvLanguage === 'ar' ? 'المؤهلات العلمية' : cvLanguage === 'de' ? 'Akademische Ausbildung' : 'Education'}</h2>
              {portfolio.education.map((edu) => (
                <div key={edu.id} className="mb-2 text-[9px]">
                  <p className="font-bold text-slate-800">{edu.degree[cvLanguage]}</p>
                  <p className="text-slate-500"><bdi dir="ltr">{edu.period}</bdi> &middot; {edu.school[cvLanguage]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-300 mt-6 pt-2 text-center text-[8px] text-slate-400">
          {portfolio.name} &middot; {portfolio.contact.email}
        </div>
      </div>
    </>
  );
}

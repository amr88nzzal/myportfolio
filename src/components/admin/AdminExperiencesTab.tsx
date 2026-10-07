import React from 'react';
import { Eye, Plus, Trash } from 'lucide-react';
import type { PortfolioData, WorkExperience } from '../../types';
import { type Lang } from '../../lib/helpers';

interface AdminExperiencesTabProps {
  editingExp: any;
  handleDeleteExperience: (...args: any[]) => any;
  handleSaveExperience: (...args: any[]) => any;
  lang: Lang;
  portfolio: PortfolioData;
  setEditingExp: (value: any) => void;
  setIsEditingNewExp: (value: any) => void;
}

export default function AdminExperiencesTab({ editingExp, handleDeleteExperience, handleSaveExperience, lang, portfolio, setEditingExp, setIsEditingNewExp }: AdminExperiencesTabProps) {
  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-bold font-mono">Work Experiences list</span>
          <button onClick={() => {
            const newExp: WorkExperience = {
              id: `exp-${Date.now()}`,
              period: "2026",
              company: "New Company",
              location: { en: "Leipzig, Germany", ar: "لايبزيغ، ألمانيا", de: "Leipzig, Deutschland" },
              role: { en: "Role Title", ar: "المسمى الوظيفي", de: "Berufsbezeichnung" },
              highlights: { en: ["Key highlight 1"], ar: ["إنجاز أساسي ١"], de: ["Kernkompetenz 1"] }
            };
            setEditingExp(newExp);
            setIsEditingNewExp(true);
          }} className="flex items-center gap-1 bg-amber-600 text-white px-3 py-1 rounded text-xs font-bold font-sans">
            <Plus size={14} /> Add Experience
          </button>
        </div>

        {editingExp && (
          <form onSubmit={handleSaveExperience} className="bg-white dark:bg-[#181822] p-5 rounded-xl border-2 border-amber-600/30 space-y-3 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input type="text" placeholder="Company" value={editingExp.company} onChange={(e) => setEditingExp({...editingExp, company: e.target.value})} className="text-xs p-2 border rounded dark:bg-slate-900 dark:border-slate-700" />
              <input type="text" placeholder="Period (e.g. 2024 - 2026)" value={editingExp.period} onChange={(e) => setEditingExp({...editingExp, period: e.target.value})} className="text-xs p-2 border rounded dark:bg-slate-900 dark:border-slate-700" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input type="text" placeholder="Location (EN)" value={editingExp.location.en} onChange={(e) => setEditingExp({...editingExp, location: {...editingExp.location, en: e.target.value}})} className="text-xs p-2 border rounded dark:bg-slate-900 dark:border-slate-700" />
              <input type="text" placeholder="Location (AR)" value={editingExp.location.ar} onChange={(e) => setEditingExp({...editingExp, location: {...editingExp.location, ar: e.target.value}})} className="text-xs p-2 border rounded dark:bg-slate-900 dark:border-slate-700 font-arabic" dir="rtl" />
              <input type="text" placeholder="Location (DE)" value={editingExp.location.de} onChange={(e) => setEditingExp({...editingExp, location: {...editingExp.location, de: e.target.value}})} className="text-xs p-2 border rounded dark:bg-slate-900 dark:border-slate-700" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input type="text" placeholder="Role (EN)" value={editingExp.role.en} onChange={(e) => setEditingExp({...editingExp, role: {...editingExp.role, en: e.target.value}})} className="text-xs p-2 border rounded dark:bg-slate-900 dark:border-slate-700" />
              <input type="text" placeholder="Role (AR)" value={editingExp.role.ar} onChange={(e) => setEditingExp({...editingExp, role: {...editingExp.role, ar: e.target.value}})} className="text-xs p-2 border rounded dark:bg-slate-900 dark:border-slate-700 font-arabic" dir="rtl" />
              <input type="text" placeholder="Role (DE)" value={editingExp.role.de} onChange={(e) => setEditingExp({...editingExp, role: {...editingExp.role, de: e.target.value}})} className="text-xs p-2 border rounded dark:bg-slate-900 dark:border-slate-700" />
            </div>
            <div className="space-y-2">
              <textarea placeholder="Highlights (EN) - one point per line" value={editingExp.highlights.en.join('\n')} onChange={(e) => setEditingExp({...editingExp, highlights: {...editingExp.highlights, en: e.target.value.split('\n')}})} className="w-full text-xs p-2 border rounded dark:bg-slate-900 dark:border-slate-700" rows={4} />
              <textarea placeholder="Highlights (AR) - one point per line" value={editingExp.highlights.ar.join('\n')} onChange={(e) => setEditingExp({...editingExp, highlights: {...editingExp.highlights, ar: e.target.value.split('\n')}})} className="w-full text-xs p-2 border rounded dark:bg-slate-900 dark:border-slate-700 font-arabic" dir="rtl" rows={4} />
              <textarea placeholder="Highlights (DE) - one point per line" value={editingExp.highlights.de.join('\n')} onChange={(e) => setEditingExp({...editingExp, highlights: {...editingExp.highlights, de: e.target.value.split('\n')}})} className="w-full text-xs p-2 border rounded dark:bg-slate-900 dark:border-slate-700" rows={2} />
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setEditingExp(null)} className="px-3 py-1 text-xs border rounded">Cancel</button>
              <button type="submit" className="bg-amber-600 text-white px-4 py-1 rounded text-xs font-bold">Save</button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
          {portfolio.experiences.map((ex) => (
            <div key={ex.id} className="p-3 bg-white dark:bg-[#181822] rounded-lg border flex justify-between items-center">
              <div>
                <p className="text-xs font-bold">{ex.company}</p>
                <p className="text-[10px] text-gray-500">{ex.role[lang]}</p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => { setEditingExp(ex); setIsEditingNewExp(false); }} className="p-1 hover:text-amber-600"><Eye size={12} /></button>
                <button onClick={() => handleDeleteExperience(ex.id)} className="p-1 hover:text-red-500"><Trash size={12} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

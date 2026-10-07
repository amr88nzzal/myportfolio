import React from 'react';
import { Eye, Trash } from 'lucide-react';
import type { PortfolioData } from '../../types';
import { type Lang } from '../../lib/helpers';

interface AdminSkillsTabProps {
  editingSkillCat: any;
  handleSaveSkillCategory: (...args: any[]) => any;
  lang: Lang;
  portfolio: PortfolioData;
  setEditingSkillCat: (value: any) => void;
}

export default function AdminSkillsTab({ editingSkillCat, handleSaveSkillCategory, lang, portfolio, setEditingSkillCat }: AdminSkillsTabProps) {
  return (
    <>
      <div className="space-y-4">
        <span className="text-xs font-bold font-mono block">Skill Categories & Proficiencies</span>
        {editingSkillCat ? (
          <form onSubmit={handleSaveSkillCategory} className="bg-white dark:bg-[#181822] p-5 rounded-xl border-2 border-amber-600/30 space-y-4 shadow-md">
            <div className="border-b pb-2">
              <span className="text-xs font-bold text-amber-600">Editing: {editingSkillCat.title[lang]}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400">Title (EN)</label>
                <input type="text" value={editingSkillCat.title.en} onChange={(e) => setEditingSkillCat({...editingSkillCat, title: {...editingSkillCat.title, en: e.target.value}})} className="text-xs w-full p-2 border rounded dark:bg-slate-900 dark:border-slate-700" />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400">Title (AR)</label>
                <input type="text" value={editingSkillCat.title.ar} onChange={(e) => setEditingSkillCat({...editingSkillCat, title: {...editingSkillCat.title, ar: e.target.value}})} className="text-xs w-full p-2 border rounded dark:bg-slate-900 dark:border-slate-700 font-arabic" dir="rtl" />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400">Title (DE)</label>
                <input type="text" value={editingSkillCat.title.de} onChange={(e) => setEditingSkillCat({...editingSkillCat, title: {...editingSkillCat.title, de: e.target.value}})} className="text-xs w-full p-2 border rounded dark:bg-slate-900 dark:border-slate-700" />
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t">
              <span className="text-[11px] font-bold block">Skills List</span>
              {editingSkillCat.skills.map((sk, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <input type="text" value={sk.name} onChange={(e) => {
                    const newSkills = [...editingSkillCat.skills];
                    newSkills[idx] = { ...newSkills[idx], name: e.target.value };
                    setEditingSkillCat({...editingSkillCat, skills: newSkills});
                  }} className="text-xs flex-1 p-2 border rounded dark:bg-slate-900 dark:border-slate-700" placeholder="Skill Name" />
                  <select value={sk.level} onChange={(e) => {
                    const newSkills = [...editingSkillCat.skills];
                    newSkills[idx] = { ...newSkills[idx], level: parseInt(e.target.value) };
                    setEditingSkillCat({...editingSkillCat, skills: newSkills});
                  }} className="text-xs p-2 border rounded dark:bg-slate-900 dark:border-slate-700 w-24">
                    {[1,2,3,4,5].map(v => <option key={v} value={v}>{v}/5</option>)}
                  </select>
                  <button type="button" onClick={() => {
                    setEditingSkillCat({...editingSkillCat, skills: editingSkillCat.skills.filter((_, i) => i !== idx)});
                  }} className="text-red-500 hover:text-red-700 p-1"><Trash size={14} /></button>
                </div>
              ))}
              <button type="button" onClick={() => {
                setEditingSkillCat({...editingSkillCat, skills: [...editingSkillCat.skills, { name: "New Skill", level: 4 }]});
              }} className="text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-zinc-200 px-3 py-1 rounded font-bold uppercase transition-all">
                + Add Skill Item
              </button>
            </div>

            <div className="flex justify-end gap-2 border-t pt-2">
              <button type="button" onClick={() => setEditingSkillCat(null)} className="px-3 py-1 text-xs border rounded">Cancel</button>
              <button type="submit" className="bg-amber-600 text-white px-4 py-1 rounded text-xs font-bold font-sans">Save Category</button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {portfolio.skills.map((sc) => (
              <div key={sc.id} className="p-4 bg-white dark:bg-[#181822] rounded-xl border flex justify-between items-center shadow-sm">
                <div>
                  <p className="text-xs font-bold">{sc.title[lang]}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{sc.skills.length} Items</p>
                </div>
                <button onClick={() => setEditingSkillCat(JSON.parse(JSON.stringify(sc)))} className="text-xs bg-amber-600/10 text-amber-600 font-bold px-2.5 py-1 rounded-md hover:bg-amber-600/20 transition-all flex items-center gap-1">
                  <Eye size={12} /> Edit
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

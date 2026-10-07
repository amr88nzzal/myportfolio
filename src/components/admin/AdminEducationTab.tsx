import React from 'react';
import { Eye, Plus, Trash } from 'lucide-react';
import type { EducationItem, PortfolioData } from '../../types';
import { type Lang } from '../../lib/helpers';

interface AdminEducationTabProps {
  editingEdu: any;
  handleDeleteEducation: (...args: any[]) => any;
  handleSaveEducation: (...args: any[]) => any;
  lang: Lang;
  portfolio: PortfolioData;
  setEditingEdu: (value: any) => void;
  setIsEditingNewEdu: (value: any) => void;
}

export default function AdminEducationTab({ editingEdu, handleDeleteEducation, handleSaveEducation, lang, portfolio, setEditingEdu, setIsEditingNewEdu }: AdminEducationTabProps) {
  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-bold font-mono">Academic Degrees / Certificates</span>
          <button onClick={() => {
            const newEdu: EducationItem = {
              id: `edu-${Date.now()}`,
              degree: { en: "Degree / Certificate", ar: "الدرجة العلمية", de: "Abschluss / Zertifikat" },
              school: { en: "University / School", ar: "المؤسسة التعليمية", de: "Universität / Schule" },
              period: "2026",
              details: { en: "Course details", ar: "تفاصيل الدراسة", de: "Studien-Details" }
            };
            setEditingEdu(newEdu);
            setIsEditingNewEdu(true);
          }} className="flex items-center gap-1 bg-amber-600 text-white px-3 py-1 rounded text-xs font-bold">
            <Plus size={14} /> Add Education
          </button>
        </div>

        {editingEdu && (
          <form onSubmit={handleSaveEducation} className="bg-white dark:bg-[#181822] p-5 rounded-xl border-2 border-amber-600/30 space-y-3 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input type="text" placeholder="Period (e.g., 2007 - 2011)" value={editingEdu.period} onChange={(e) => setEditingEdu({...editingEdu, period: e.target.value})} className="text-xs p-2 border rounded dark:bg-slate-900 dark:border-slate-700" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input type="text" placeholder="Degree (EN)" value={editingEdu.degree.en} onChange={(e) => setEditingEdu({...editingEdu, degree: {...editingEdu.degree, en: e.target.value}})} className="text-xs p-2 border rounded dark:bg-slate-900 dark:border-slate-700" />
              <input type="text" placeholder="Degree (AR)" value={editingEdu.degree.ar} onChange={(e) => setEditingEdu({...editingEdu, degree: {...editingEdu.degree, ar: e.target.value}})} className="text-xs p-2 border rounded dark:bg-slate-900 dark:border-slate-700 font-arabic" dir="rtl" />
              <input type="text" placeholder="Degree (DE)" value={editingEdu.degree.de} onChange={(e) => setEditingEdu({...editingEdu, degree: {...editingEdu.degree, de: e.target.value}})} className="text-xs p-2 border rounded dark:bg-slate-900 dark:border-slate-700" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input type="text" placeholder="School (EN)" value={editingEdu.school.en} onChange={(e) => setEditingEdu({...editingEdu, school: {...editingEdu.school, en: e.target.value}})} className="text-xs p-2 border rounded dark:bg-slate-900 dark:border-slate-700" />
              <input type="text" placeholder="School (AR)" value={editingEdu.school.ar} onChange={(e) => setEditingEdu({...editingEdu, school: {...editingEdu.school, ar: e.target.value}})} className="text-xs p-2 border rounded dark:bg-slate-900 dark:border-slate-700 font-arabic" dir="rtl" />
              <input type="text" placeholder="School (DE)" value={editingEdu.school.de} onChange={(e) => setEditingEdu({...editingEdu, school: {...editingEdu.school, de: e.target.value}})} className="text-xs p-2 border rounded dark:bg-slate-900 dark:border-slate-700" />
            </div>
            <div className="space-y-2">
              <textarea placeholder="Details (EN)" value={editingEdu.details.en} onChange={(e) => setEditingEdu({...editingEdu, details: {...editingEdu.details, en: e.target.value}})} className="w-full text-xs p-2 border rounded dark:bg-slate-900 dark:border-slate-700" rows={2} />
              <textarea placeholder="Details (AR)" value={editingEdu.details.ar} onChange={(e) => setEditingEdu({...editingEdu, details: {...editingEdu.details, ar: e.target.value}})} className="w-full text-xs p-2 border rounded dark:bg-slate-900 dark:border-slate-700 font-arabic" dir="rtl" rows={2} />
              <textarea placeholder="Details (DE)" value={editingEdu.details.de} onChange={(e) => setEditingEdu({...editingEdu, details: {...editingEdu.details, de: e.target.value}})} className="w-full text-xs p-2 border rounded dark:bg-slate-900 dark:border-slate-700" rows={2} />
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setEditingEdu(null)} className="px-3 py-1 text-xs border rounded">Cancel</button>
              <button type="submit" className="bg-amber-600 text-white px-4 py-1 rounded text-xs font-bold font-sans">Save Education</button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
          {portfolio.education.map((edu) => (
            <div key={edu.id} className="p-3 bg-white dark:bg-[#181822] rounded-lg border flex justify-between items-center shadow-sm">
              <div className="truncate pe-2">
                <p className="text-xs font-bold truncate">{edu.degree[lang]}</p>
                <p className="text-[10px] text-slate-400 truncate">{edu.school[lang]} &middot; {edu.period}</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <button onClick={() => { setEditingEdu(edu); setIsEditingNewEdu(false); }} className="p-1 hover:text-amber-600"><Eye size={12} /></button>
                <button onClick={() => handleDeleteEducation(edu.id)} className="p-1 hover:text-red-500"><Trash size={12} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

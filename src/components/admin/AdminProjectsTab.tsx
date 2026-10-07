import React from 'react';
import { Eye, Plus, Trash, Upload } from 'lucide-react';
import type { PortfolioData, Project } from '../../types';
import { type Lang } from '../../lib/helpers';

interface AdminProjectsTabProps {
  editingProj: any;
  handleDeleteProject: (...args: any[]) => any;
  handleSaveProject: (...args: any[]) => any;
  isUploadingImage: boolean;
  lang: Lang;
  portfolio: PortfolioData;
  setEditingProj: (value: any) => void;
  setIsEditingNewProj: (value: any) => void;
  tr3: (en: string, ar: string, de: string) => string;
  uploadImageFile: (...args: any[]) => any;
}

export default function AdminProjectsTab({ editingProj, handleDeleteProject, handleSaveProject, isUploadingImage, lang, portfolio, setEditingProj, setIsEditingNewProj, tr3, uploadImageFile }: AdminProjectsTabProps) {
  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-bold font-mono">Portfolio Projects list</span>
          <button onClick={() => {
            const newProj: Project = {
              id: `proj-${Date.now()}`,
              title: { en: "Project Title", ar: "عنوان المشروع", de: "Projekttitel" },
              category: { en: "Category", ar: "التصنيف", de: "Kategorie" },
              description: { en: "Description text", ar: "نص الوصف", de: "Beschreibung" },
              tech: ["ReactJS", "NodeJS"],
              image: "/src/assets/images/erp_dashboard_mockup_1790459372121.jpg",
              link: "https://afaq.amrodev.com",
              metrics: { en: "Key result", ar: "النتيجة الأساسية", de: "Ergebnis" }
            };
            setEditingProj(newProj);
            setIsEditingNewProj(true);
          }} className="flex items-center gap-1 bg-amber-600 text-white px-3 py-1 rounded text-xs font-bold">
            <Plus size={14} /> Add Project
          </button>
        </div>

        {editingProj && (
          <form onSubmit={handleSaveProject} className="bg-white dark:bg-[#181822] p-5 rounded-xl border-2 border-amber-600/30 space-y-3 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex flex-col gap-1.5 min-w-0">
                <div className="flex items-center gap-2">
                  <img src={editingProj.image} alt="" className="h-10 w-14 rounded object-cover border shrink-0 bg-slate-100" />
                  <label className={`inline-flex items-center gap-1 px-3 min-h-[40px] bg-amber-600 text-white rounded text-xs font-bold cursor-pointer ${isUploadingImage ? 'opacity-60 pointer-events-none' : ''}`}>
                    <Upload size={13} /> {isUploadingImage ? tr3('Uploading...', 'جاري الرفع...', 'Wird hochgeladen...') : tr3('Upload image', 'رفع صورة', 'Bild hochladen')}
                    <input type="file" accept="image/png,image/jpeg,image/webp" className="hidden" disabled={isUploadingImage} onChange={async (e) => {
                      const file = e.target.files?.[0];
                      e.target.value = '';
                      if (!file) return;
                      const url = await uploadImageFile(file);
                      if (url) setEditingProj((prev) => (prev ? { ...prev, image: url } : prev));
                    }} />
                  </label>
                </div>
                <input type="text" placeholder="Image URL" value={editingProj.image} onChange={(e) => setEditingProj({...editingProj, image: e.target.value})} className="text-xs p-2 border rounded dark:bg-slate-900 dark:border-slate-700 text-[10px] font-mono" />
              </div>
              <input type="text" placeholder="System/Website Link (e.g., https://afaq.amrodev.com)" value={editingProj.link} onChange={(e) => setEditingProj({...editingProj, link: e.target.value})} className="text-xs p-2 border rounded dark:bg-slate-900 dark:border-slate-700 text-[10px] font-mono" />
              <input type="text" placeholder="Tech Stack (comma separated)" value={editingProj.tech.join(', ')} onChange={(e) => setEditingProj({...editingProj, tech: e.target.value.split(',').map(x => x.trim())})} className="text-xs p-2 border rounded dark:bg-slate-900 dark:border-slate-700" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input type="text" placeholder="Title (EN)" value={editingProj.title.en} onChange={(e) => setEditingProj({...editingProj, title: {...editingProj.title, en: e.target.value}})} className="text-xs p-2 border rounded dark:bg-slate-900 dark:border-slate-700" />
              <input type="text" placeholder="Title (AR)" value={editingProj.title.ar} onChange={(e) => setEditingProj({...editingProj, title: {...editingProj.title, ar: e.target.value}})} className="text-xs p-2 border rounded dark:bg-slate-900 dark:border-slate-700 font-arabic" dir="rtl" />
              <input type="text" placeholder="Title (DE)" value={editingProj.title.de} onChange={(e) => setEditingProj({...editingProj, title: {...editingProj.title, de: e.target.value}})} className="text-xs p-2 border rounded dark:bg-slate-900 dark:border-slate-700" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input type="text" placeholder="Category (EN)" value={editingProj.category.en} onChange={(e) => setEditingProj({...editingProj, category: {...editingProj.category, en: e.target.value}})} className="text-xs p-2 border rounded dark:bg-slate-900 dark:border-slate-700" />
              <input type="text" placeholder="Category (AR)" value={editingProj.category.ar} onChange={(e) => setEditingProj({...editingProj, category: {...editingProj.category, ar: e.target.value}})} className="text-xs p-2 border rounded dark:bg-slate-900 dark:border-slate-700 font-arabic" dir="rtl" />
              <input type="text" placeholder="Category (DE)" value={editingProj.category.de} onChange={(e) => setEditingProj({...editingProj, category: {...editingProj.category, de: e.target.value}})} className="text-xs p-2 border rounded dark:bg-slate-900 dark:border-slate-700" />
            </div>
            <div className="space-y-2">
              <textarea placeholder="Description (EN)" value={editingProj.description.en} onChange={(e) => setEditingProj({...editingProj, description: {...editingProj.description, en: e.target.value}})} className="w-full text-xs p-2 border rounded dark:bg-slate-900 dark:border-slate-700" rows={2} />
              <textarea placeholder="Description (AR)" value={editingProj.description.ar} onChange={(e) => setEditingProj({...editingProj, description: {...editingProj.description, ar: e.target.value}})} className="w-full text-xs p-2 border rounded dark:bg-slate-900 dark:border-slate-700 font-arabic" dir="rtl" rows={2} />
              <textarea placeholder="Description (DE)" value={editingProj.description.de} onChange={(e) => setEditingProj({...editingProj, description: {...editingProj.description, de: e.target.value}})} className="w-full text-xs p-2 border rounded dark:bg-slate-900 dark:border-slate-700" rows={2} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input type="text" placeholder="Metrics (EN)" value={editingProj.metrics.en} onChange={(e) => setEditingProj({...editingProj, metrics: {...editingProj.metrics, en: e.target.value}})} className="text-xs p-2 border rounded dark:bg-slate-900 dark:border-slate-700" />
              <input type="text" placeholder="Metrics (AR)" value={editingProj.metrics.ar} onChange={(e) => setEditingProj({...editingProj, metrics: {...editingProj.metrics, ar: e.target.value}})} className="text-xs p-2 border rounded dark:bg-slate-900 dark:border-slate-700 font-arabic" dir="rtl" />
              <input type="text" placeholder="Metrics (DE)" value={editingProj.metrics.de} onChange={(e) => setEditingProj({...editingProj, metrics: {...editingProj.metrics, de: e.target.value}})} className="text-xs p-2 border rounded dark:bg-slate-900 dark:border-slate-700" />
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setEditingProj(null)} className="px-3 py-1 text-xs border rounded">Cancel</button>
              <button type="submit" className="bg-amber-600 text-white px-4 py-1 rounded text-xs font-bold">Save Project</button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {portfolio.projects.map((proj) => (
            <div key={proj.id} className="p-3 bg-white dark:bg-[#181822] rounded-lg border flex justify-between items-center shadow-sm">
              <div className="truncate pe-2">
                <p className="text-xs font-bold truncate">{proj.title[lang]}</p>
                <p className="text-[9px] font-mono text-gray-400 truncate">{proj.link}</p>
              </div>
              <div className="flex gap-0.5 shrink-0">
                <button onClick={() => { setEditingProj(proj); setIsEditingNewProj(false); }} className="p-1 hover:text-amber-600"><Eye size={12} /></button>
                <button onClick={() => handleDeleteProject(proj.id)} className="p-1 hover:text-red-500"><Trash size={12} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

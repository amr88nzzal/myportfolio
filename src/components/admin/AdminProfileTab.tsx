import React from 'react';
import { Mail, Phone, Upload } from 'lucide-react';
import { initialPortfolioData } from '../../data';
import type { PortfolioData } from '../../types';

interface AdminProfileTabProps {
  customPortrait: any;
  handlePortraitPick: (...args: any[]) => any;
  handleUpdateProfile: (...args: any[]) => any;
  isUploadingImage: boolean;
  portfolio: PortfolioData;
  setCustomPortrait: (value: any) => void;
  tr3: (en: string, ar: string, de: string) => string;
}

export default function AdminProfileTab({ customPortrait, handlePortraitPick, handleUpdateProfile, isUploadingImage, portfolio, setCustomPortrait, tr3 }: AdminProfileTabProps) {
  return (
    <>
      <form onSubmit={handleUpdateProfile} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white dark:bg-[#181822] p-6 rounded-xl border border-slate-200 dark:border-slate-800/60">
        <div className="space-y-3">
          <p className="text-xs font-bold uppercase text-amber-600 border-b pb-1">Core Info</p>
          <div>
            <label className="block text-[10px] uppercase text-slate-400 font-bold mb-1">Full Name</label>
            <input type="text" name="profile_name" defaultValue={portfolio.name} className="w-full text-xs px-3 py-2 border rounded dark:bg-slate-900 dark:border-slate-700" />
          </div>
          <div>
            <label className="block text-[10px] uppercase text-slate-400 font-bold mb-1">E-Mail</label>
            <input type="text" name="email" defaultValue={portfolio.contact.email} className="w-full text-xs px-3 py-2 border rounded dark:bg-slate-900 dark:border-slate-700" />
          </div>
          <div>
            <label className="block text-[10px] uppercase text-slate-400 font-bold mb-1">Phone</label>
            <input type="text" name="phone" defaultValue={portfolio.contact.phone} className="w-full text-xs px-3 py-2 border rounded dark:bg-slate-900 dark:border-slate-700" />
          </div>
          {/* Profile photo: upload, preview, replace, restore */}
          <div className="p-3 bg-slate-50 dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
            <label className="block text-xs uppercase text-amber-600 font-bold">
              {tr3('Profile photo', 'الصورة الشخصية', 'Profilfoto')}
            </label>
            <div className="flex items-start gap-3">
              <img
                src={customPortrait || portfolio.portraitImage}
                alt=""
                className="w-24 aspect-[4/5] rounded-lg object-cover object-top border-2 border-amber-600 shadow-sm shrink-0 bg-white"
              />
              <div className="flex-1 min-w-0 space-y-2">
                <label className={`inline-flex items-center gap-1.5 px-4 min-h-[44px] bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors shadow-sm ${isUploadingImage ? 'opacity-60 pointer-events-none' : ''}`}>
                  <Upload size={14} />
                  <span>{isUploadingImage ? tr3('Uploading...', 'جاري الرفع...', 'Wird hochgeladen...') : tr3('Choose new photo', 'اختيار صورة جديدة', 'Neues Foto wählen')}</span>
                  <input type="file" accept="image/png,image/jpeg,image/webp" className="hidden" disabled={isUploadingImage} onChange={handlePortraitPick} />
                </label>
                {customPortrait && customPortrait !== portfolio.portraitImage && (
                  <p className="text-xs text-amber-600 font-bold">
                    {tr3('New photo ready. Press "Save Info" to publish it.', 'الصورة الجديدة جاهزة. اضغط «حفظ» لنشرها.', 'Neues Foto bereit. Zum Veröffentlichen „Speichern“ drücken.')}
                  </p>
                )}
                <p className="text-[11px] text-slate-500">
                  {tr3('JPG, PNG or WEBP. Large photos are resized automatically. Best: portrait, face centered.', 'JPG أو PNG أو WEBP. تُصغَّر الصور الكبيرة تلقائياً. الأفضل: صورة عمودية والوجه في المنتصف.', 'JPG, PNG oder WEBP. Große Fotos werden automatisch verkleinert. Am besten: Hochformat, Gesicht zentriert.')}
                </p>
                <button type="button" onClick={() => setCustomPortrait(initialPortfolioData.portraitImage)} className="text-xs underline text-slate-500 hover:text-amber-600 min-h-[32px]">
                  {tr3('Restore default photo', 'استعادة الصورة الافتراضية', 'Standardfoto wiederherstellen')}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-bold uppercase text-amber-600 border-b pb-1">Social Accounts</p>
          <div>
            <label className="block text-[10px] uppercase text-slate-400 font-bold mb-1">GitHub Account Link</label>
            <input type="text" name="github" defaultValue={portfolio.socials.github} className="w-full text-xs px-3 py-2 border rounded dark:bg-slate-900 dark:border-slate-700 font-mono text-[10px]" />
          </div>
          <div>
            <label className="block text-[10px] uppercase text-slate-400 font-bold mb-1">Telegram Link</label>
            <input type="text" name="telegram" defaultValue={portfolio.socials.telegram} className="w-full text-xs px-3 py-2 border rounded dark:bg-slate-900 dark:border-slate-700 font-mono text-[10px]" />
          </div>
          <div>
            <label className="block text-[10px] uppercase text-slate-400 font-bold mb-1">WhatsApp Link</label>
            <input type="text" name="whatsapp" defaultValue={portfolio.socials.whatsapp} className="w-full text-xs px-3 py-2 border rounded dark:bg-slate-900 dark:border-slate-700 font-mono text-[10px]" />
          </div>
          <div>
            <label className="block text-[10px] uppercase text-slate-400 font-bold mb-1">Twitter/X Link</label>
            <input type="text" name="twitter" defaultValue={portfolio.socials.twitter} className="w-full text-xs px-3 py-2 border rounded dark:bg-slate-900 dark:border-slate-700 font-mono text-[10px]" />
          </div>
          <div>
            <label className="block text-[10px] uppercase text-slate-400 font-bold mb-1">LinkedIn Link</label>
            <input type="text" name="linkedin" defaultValue={portfolio.socials.linkedin} className="w-full text-xs px-3 py-2 border rounded dark:bg-slate-900 dark:border-slate-700 font-mono text-[10px]" />
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-3 border-t pt-3">
          <div>
            <label className="block text-[10px] uppercase text-slate-400 font-bold mb-1">Title (EN)</label>
            <input type="text" name="title_en" defaultValue={portfolio.title.en} className="w-full text-xs px-3 py-2 border rounded dark:bg-slate-900 dark:border-slate-700" />
          </div>
          <div>
            <label className="block text-[10px] uppercase text-slate-400 font-bold mb-1">Title (AR)</label>
            <input type="text" name="title_ar" defaultValue={portfolio.title.ar} dir="rtl" className="w-full text-xs px-3 py-2 border rounded dark:bg-slate-900 dark:border-slate-700 font-arabic" />
          </div>
          <div>
            <label className="block text-[10px] uppercase text-slate-400 font-bold mb-1">Title (DE)</label>
            <input type="text" name="title_de" defaultValue={portfolio.title.de} className="w-full text-xs px-3 py-2 border rounded dark:bg-slate-900 dark:border-slate-700" />
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 grid grid-cols-1 gap-3 border-t pt-3">
          <p className="text-xs font-bold uppercase text-amber-600">{tr3('Profile summary', 'النبذة التعريفية', 'Kurzprofil')}</p>
          <textarea name="summary_en" defaultValue={portfolio.summary.en} rows={4} placeholder="Summary (EN)" className="w-full text-sm p-2 border rounded dark:bg-slate-900 dark:border-slate-700" />
          <textarea name="summary_ar" defaultValue={portfolio.summary.ar} rows={4} dir="rtl" placeholder="النبذة (AR)" className="w-full text-sm p-2 border rounded dark:bg-slate-900 dark:border-slate-700 font-arabic" />
          <textarea name="summary_de" defaultValue={portfolio.summary.de} rows={4} placeholder="Kurzprofil (DE)" className="w-full text-sm p-2 border rounded dark:bg-slate-900 dark:border-slate-700" />
        </div>

        <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-3 border-t pt-3">
          <input type="text" name="loc_en" defaultValue={portfolio.contact.location.en} placeholder="Location (EN)" className="w-full text-xs px-3 py-2 border rounded dark:bg-slate-900 dark:border-slate-700" />
          <input type="text" name="loc_ar" defaultValue={portfolio.contact.location.ar} dir="rtl" placeholder="الموقع (AR)" className="w-full text-xs px-3 py-2 border rounded dark:bg-slate-900 dark:border-slate-700 font-arabic" />
          <input type="text" name="loc_de" defaultValue={portfolio.contact.location.de} placeholder="Standort (DE)" className="w-full text-xs px-3 py-2 border rounded dark:bg-slate-900 dark:border-slate-700" />
        </div>

        <div className="col-span-1 md:col-span-2 flex justify-end pt-2">
          <button type="submit" className="bg-amber-600 text-white px-6 min-h-[44px] rounded-lg text-xs font-bold uppercase hover:opacity-90 transition-opacity">
            Save Info
          </button>
        </div>
      </form>
    </>
  );
}

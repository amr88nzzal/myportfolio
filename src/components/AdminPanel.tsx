import React from 'react';
import AdminProfileTab from './admin/AdminProfileTab';
import AdminExperiencesTab from './admin/AdminExperiencesTab';
import AdminProjectsTab from './admin/AdminProjectsTab';
import AdminEducationTab from './admin/AdminEducationTab';
import AdminSkillsTab from './admin/AdminSkillsTab';
import AdminIntegrationsTab from './admin/AdminIntegrationsTab';
import AdminInboxTab from './admin/AdminInboxTab';
import { Lock, LogOut, Send, SendHorizontal, Settings, X } from 'lucide-react';
import { translations } from '../i18n';
import type { ContactMessage, PortfolioData } from '../types';
import { type Lang } from '../lib/helpers';

interface AdminPanelProps {
  adminCode: any;
  adminError: any;
  adminTab: any;
  customPortrait: any;
  deleteMessage: (...args: any[]) => any;
  editingEdu: any;
  editingExp: any;
  editingProj: any;
  editingSkillCat: any;
  handleDeleteEducation: (...args: any[]) => any;
  handleDeleteExperience: (...args: any[]) => any;
  handleDeleteProject: (...args: any[]) => any;
  handlePortraitPick: (...args: any[]) => any;
  handleRequestOtp: (...args: any[]) => any;
  handleResetToDefault: (...args: any[]) => any;
  handleSaveEducation: (...args: any[]) => any;
  handleSaveExperience: (...args: any[]) => any;
  handleSaveProject: (...args: any[]) => any;
  handleSaveSkillCategory: (...args: any[]) => any;
  handleUnlockAdmin: (...args: any[]) => any;
  handleUpdateIntegrations: (...args: any[]) => any;
  handleUpdateProfile: (...args: any[]) => any;
  integrationsStatus: any;
  isAdminUnlocked: boolean;
  isSendingOtp: boolean;
  isUploadingImage: boolean;
  lang: Lang;
  loadMessages: (...args: any[]) => any;
  lockAdmin: (...args: any[]) => any;
  markMessageRead: (...args: any[]) => any;
  messages: ContactMessage[];
  otpStatus: any;
  portfolio: PortfolioData;
  setAdminCode: (value: any) => void;
  setAdminTab: (value: any) => void;
  setCustomPortrait: (value: any) => void;
  setEditingEdu: (value: any) => void;
  setEditingExp: (value: any) => void;
  setEditingProj: (value: any) => void;
  setEditingSkillCat: (value: any) => void;
  setIsEditingNewEdu: (value: any) => void;
  setIsEditingNewExp: (value: any) => void;
  setIsEditingNewProj: (value: any) => void;
  setShowAdminPanel: (value: any) => void;
  showAdminPanel: boolean;
  tr3: (en: string, ar: string, de: string) => string;
  triggerTestEmail: (...args: any[]) => any;
  triggerTestTelegram: (...args: any[]) => any;
  uploadImageFile: (...args: any[]) => any;
}

export default function AdminPanel({ adminCode, adminError, adminTab, customPortrait, deleteMessage, editingEdu, editingExp, editingProj, editingSkillCat, handleDeleteEducation, handleDeleteExperience, handleDeleteProject, handlePortraitPick, handleRequestOtp, handleResetToDefault, handleSaveEducation, handleSaveExperience, handleSaveProject, handleSaveSkillCategory, handleUnlockAdmin, handleUpdateIntegrations, handleUpdateProfile, integrationsStatus, isAdminUnlocked, isSendingOtp, isUploadingImage, lang, loadMessages, lockAdmin, markMessageRead, messages, otpStatus, portfolio, setAdminCode, setAdminTab, setCustomPortrait, setEditingEdu, setEditingExp, setEditingProj, setEditingSkillCat, setIsEditingNewEdu, setIsEditingNewExp, setIsEditingNewProj, setShowAdminPanel, showAdminPanel, tr3, triggerTestEmail, triggerTestTelegram, uploadImageFile }: AdminPanelProps) {
  return (
    <>
      {showAdminPanel && (
        <div className="bg-[#FAF9F5] dark:bg-[#121217] border-b border-slate-200 dark:border-slate-800/80 py-6 px-4 transition-colors print:hidden">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-200 dark:border-slate-800/60">
              <div className="flex items-center gap-2 font-mono">
                <Settings className="text-amber-600 animate-spin" size={18} />
                <span className="font-bold text-sm uppercase">{translations[lang].adminTitle}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={handleResetToDefault} className="px-2.5 py-1 text-[10px] uppercase font-bold border border-red-500/20 text-red-500 hover:bg-red-500/10 rounded transition-colors">
                  {translations[lang].adminReset}
                </button>
                <button onClick={() => setShowAdminPanel(false)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white">
                  <X size={18} />
                </button>
              </div>
            </div>

            {!isAdminUnlocked ? (
              <form onSubmit={handleUnlockAdmin} className="max-w-sm mx-auto p-6 bg-white dark:bg-[#181822] rounded-xl border border-slate-200 dark:border-slate-800/60 text-center shadow-md space-y-3">
                <Lock className="mx-auto text-amber-600 animate-pulse" size={24} />
                <p className="text-xs text-slate-600 dark:text-zinc-400">{translations[lang].adminCodePrompt}</p>

                <input 
                  type="password" 
                  value={adminCode}
                  onChange={(e) => setAdminCode(e.target.value)}
                  placeholder={translations[lang].adminCodePlaceholder}
                  className="w-full px-3 py-2 text-center text-xs border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-900 focus:outline-none focus:border-amber-600 font-mono"
                  autoFocus
                />
                {adminError && <p className="text-xs text-red-500 font-semibold">{adminError}</p>}

                <button type="submit" className="w-full bg-[#1A1A1A] dark:bg-amber-600 text-white py-2 text-xs font-bold uppercase rounded-lg hover:opacity-90 transition-opacity">
                  {translations[lang].adminUnlock}
                </button>

                {/* OTP Request Section */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <button 
                    type="button" 
                    onClick={handleRequestOtp} 
                    disabled={isSendingOtp}
                    className="w-full text-xs py-2 px-3 bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 font-bold rounded-lg border border-amber-600/20 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <SendHorizontal size={13} />
                    <span>{isSendingOtp ? (lang === 'ar' ? 'جاري التوليد والإرسال...' : 'Sending OTP...') : (lang === 'ar' ? 'إرسال رمز دخول مؤقت (OTP) للتلغرام / البريد' : 'Send One-Time Passcode via Telegram/Email')}</span>
                  </button>

                  {otpStatus && (
                    <div className="p-2.5 bg-slate-50 dark:bg-slate-900 border border-amber-600/30 rounded-lg text-[10px] font-mono text-amber-600 leading-relaxed text-center">
                      {otpStatus}
                    </div>
                  )}
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                {/* Tabs */}
                <div className="flex flex-wrap gap-1.5 p-1 bg-slate-200/50 dark:bg-slate-900 rounded-lg max-w-2xl border border-slate-300/30">
                  <button onClick={() => setAdminTab('profile')} className={`px-3 py-1.5 text-xs font-bold rounded ${adminTab === 'profile' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'}`}>
                    {translations[lang].adminSettings}
                  </button>
                  <button onClick={() => setAdminTab('experiences')} className={`px-3 py-1.5 text-xs font-bold rounded ${adminTab === 'experiences' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'}`}>
                    {translations[lang].adminExperiences}
                  </button>
                  <button onClick={() => setAdminTab('projects')} className={`px-3 py-1.5 text-xs font-bold rounded ${adminTab === 'projects' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'}`}>
                    Projects CMS
                  </button>
                  <button onClick={() => setAdminTab('education')} className={`px-3 py-1.5 text-xs font-bold rounded ${adminTab === 'education' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'}`}>
                    Education CMS
                  </button>
                  <button onClick={() => setAdminTab('skills')} className={`px-3 py-1.5 text-xs font-bold rounded ${adminTab === 'skills' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'}`}>
                    Skills CMS
                  </button>
                  <button onClick={() => setAdminTab('integrations')} className={`px-3 py-1.5 text-xs font-bold rounded ${adminTab === 'integrations' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'}`}>
                    Telegram Alerts
                  </button>
                  <button onClick={() => setAdminTab('inbox')} className={`px-3 py-1.5 text-xs font-bold rounded relative ${adminTab === 'inbox' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'}`}>
                    Inbox ({messages.filter(m => !m.isRead).length})
                  </button>
                </div>

                {/* Tab: PROFILE INFO */}
                {adminTab === 'profile' && (
                  <AdminProfileTab
                    customPortrait={customPortrait}
                    handlePortraitPick={handlePortraitPick}
                    handleUpdateProfile={handleUpdateProfile}
                    isUploadingImage={isUploadingImage}
                    portfolio={portfolio}
                    setCustomPortrait={setCustomPortrait}
                    tr3={tr3}
                  />
                )}

                {/* Tab: EXPERIENCES CMS */}
                {adminTab === 'experiences' && (
                  <AdminExperiencesTab
                    editingExp={editingExp}
                    handleDeleteExperience={handleDeleteExperience}
                    handleSaveExperience={handleSaveExperience}
                    lang={lang}
                    portfolio={portfolio}
                    setEditingExp={setEditingExp}
                    setIsEditingNewExp={setIsEditingNewExp}
                  />
                )}

                {/* Tab: PROJECTS CMS */}
                {adminTab === 'projects' && (
                  <AdminProjectsTab
                    editingProj={editingProj}
                    handleDeleteProject={handleDeleteProject}
                    handleSaveProject={handleSaveProject}
                    isUploadingImage={isUploadingImage}
                    lang={lang}
                    portfolio={portfolio}
                    setEditingProj={setEditingProj}
                    setIsEditingNewProj={setIsEditingNewProj}
                    tr3={tr3}
                    uploadImageFile={uploadImageFile}
                  />
                )}

                {/* Tab: EDUCATION CMS */}
                {adminTab === 'education' && (
                  <AdminEducationTab
                    editingEdu={editingEdu}
                    handleDeleteEducation={handleDeleteEducation}
                    handleSaveEducation={handleSaveEducation}
                    lang={lang}
                    portfolio={portfolio}
                    setEditingEdu={setEditingEdu}
                    setIsEditingNewEdu={setIsEditingNewEdu}
                  />
                )}

                {/* Tab: SKILLS CMS */}
                {adminTab === 'skills' && (
                  <AdminSkillsTab
                    editingSkillCat={editingSkillCat}
                    handleSaveSkillCategory={handleSaveSkillCategory}
                    lang={lang}
                    portfolio={portfolio}
                    setEditingSkillCat={setEditingSkillCat}
                  />
                )}

                {/* Tab: INTEGRATIONS */}
                {adminTab === 'integrations' && (
                  <AdminIntegrationsTab
                    handleUpdateIntegrations={handleUpdateIntegrations}
                    integrationsStatus={integrationsStatus}
                    messages={messages}
                    portfolio={portfolio}
                    tr3={tr3}
                    triggerTestEmail={triggerTestEmail}
                    triggerTestTelegram={triggerTestTelegram}
                  />
                )}

                {/* Tab: INBOX MESSAGES */}
                {adminTab === 'inbox' && (
                  <AdminInboxTab
                    deleteMessage={deleteMessage}
                    lang={lang}
                    loadMessages={loadMessages}
                    markMessageRead={markMessageRead}
                    messages={messages}
                    tr3={tr3}
                  />
                )}

                <div className="flex justify-end pt-3 border-t">
                  <button onClick={() => lockAdmin()} className="flex items-center gap-1 text-xs text-red-500 font-bold uppercase">
                    <LogOut size={13} /> Close CMS
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

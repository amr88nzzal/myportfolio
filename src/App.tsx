/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { initialPortfolioData } from './data';
import { translations } from './i18n';
import { Lang, detectInitialLang } from './lib/helpers';
import SiteFooter from './components/SiteFooter';
import ContactSection from './components/ContactSection';
import GithubSection from './components/GithubSection';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import MarqueeRibbon from './components/MarqueeRibbon';
import HeroSection from './components/HeroSection';
import CvLanguageModal from './components/CvLanguageModal';
import AutoReplyPopup from './components/AutoReplyPopup';
import AdminPanel from './components/AdminPanel';
import CvViewerOverlay from './components/CvViewerOverlay';
import SiteHeader from './components/SiteHeader';
import PrintableCv from './components/PrintableCv';
import { PortfolioData, ContactMessage, WorkExperience, SkillCategory, Project, EducationItem } from './types';

// Multi-language Translation Dictionary
export default function App() {
  // Theme and Multi-language State
  const [lang, setLang] = useState<Lang>(detectInitialLang);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Dynamic Portfolio Database State
  const [portfolio, setPortfolio] = useState<PortfolioData>(initialPortfolioData);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [activeExperienceTab, setActiveExperienceTab] = useState<string>('all');
  const [showAllExperience, setShowAllExperience] = useState<boolean>(false);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  // The admin entry point is hidden from visitors: open the site with #admin (or ?admin) to reveal it
  const [showAdminEntry, setShowAdminEntry] = useState<boolean>(
    typeof window !== 'undefined' && (window.location.hash === '#admin' || window.location.search.includes('admin'))
  );
  useEffect(() => {
    const onHash = () => { if (window.location.hash === '#admin') setShowAdminEntry(true); };
    const onScroll = () => setShowBackToTop(window.scrollY > 700);
    window.addEventListener('hashchange', onHash);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('hashchange', onHash);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Admin / CMS Lock State
  const [isAdminUnlocked, setIsAdminUnlocked] = useState<boolean>(false);
  const [showAdminPanel, setShowAdminPanel] = useState<boolean>(false);
  const [adminCode, setAdminCode] = useState<string>('');
  const [adminError, setAdminError] = useState<string>('');
  const [adminTab, setAdminTab] = useState<'profile' | 'experiences' | 'projects' | 'education' | 'skills' | 'integrations' | 'inbox'>('profile');

  // CV Download Print Language modal
  const [showCvModal, setShowCvModal] = useState<boolean>(false);
  const [cvLanguage, setCvLanguage] = useState<'en' | 'ar' | 'de'>('en');
  const [onScreenCvLang, setOnScreenCvLang] = useState<'en' | 'ar' | 'de' | null>(null);

  // Contact Form State
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '', website: '' });
  const [isSendingMessage, setIsSendingMessage] = useState<boolean>(false);
  const [lastSubmittedMessage, setLastSubmittedMessage] = useState<any | null>(null);
  const [showAutoReply, setShowAutoReply] = useState<boolean>(false);

  // GitHub Repos and Events state
  const [githubRepos, setGithubRepos] = useState<any[]>([]);
  const [githubUser, setGithubUser] = useState<any | null>(null);
  const [loadingGithub, setLoadingGithub] = useState<boolean>(true);

  // Resume Analyzer (Gemini Matcher) State

  // Editing items state for CMS
  const [editingExp, setEditingExp] = useState<WorkExperience | null>(null);
  const [isEditingNewExp, setIsEditingNewExp] = useState<boolean>(false);
  const [editingProj, setEditingProj] = useState<Project | null>(null);
  const [isEditingNewProj, setIsEditingNewProj] = useState<boolean>(false);
  const [editingEdu, setEditingEdu] = useState<EducationItem | null>(null);
  const [isEditingNewEdu, setIsEditingNewEdu] = useState<boolean>(false);
  const [editingSkillCat, setEditingSkillCat] = useState<SkillCategory | null>(null);

  // Custom Image Upload State
  const [customPortrait, setCustomPortrait] = useState<string>('');
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);

  // Dynamic OTP state
  const [isSendingOtp, setIsSendingOtp] = useState<boolean>(false);
  const [otpStatus, setOtpStatus] = useState<string>('');
  // Signed admin session token (kept in memory only; cleared on lock / refresh)
  const [adminToken, setAdminToken] = useState<string>('');
  const authJsonHeaders = (): Record<string, string> => ({
    'Content-Type': 'application/json',
    ...(adminToken ? { Authorization: `Bearer ${adminToken}` } : {})
  });
  const lockAdmin = () => {
    setIsAdminUnlocked(false);
    setAdminToken('');
  };
  // Pick the text for the current language (used by the admin panel messages)
  const tr3 = (en: string, ar: string, de: string) => (lang === 'ar' ? ar : lang === 'de' ? de : en);
  const [integrationsStatus, setIntegrationsStatus] = useState<{ telegram: boolean; email: boolean } | null>(null);

  // Sync local image states when portfolio updates
  useEffect(() => {
    if (portfolio.portraitImage) setCustomPortrait(portfolio.portraitImage);
  }, [portfolio]);

  // Persistent Hydration (Server First, fallback to LocalStorage)
  useEffect(() => {
    async function loadServerData() {
      try {
        const res = await fetch('/api/portfolio');
        if (res.ok) {
          const serverData = await res.json();
          if (serverData && serverData.name && serverData.portraitImage && serverData.dataVersion === initialPortfolioData.dataVersion) {
            setPortfolio(serverData);
            localStorage.setItem('amro_portfolio', JSON.stringify(serverData));
            return;
          }
        }
      } catch (err) {
        console.log('Server portfolio sync fallback to localStorage:', err);
      }

      // Fallback to localStorage if server has no record yet
      const savedPortfolio = localStorage.getItem('amro_portfolio');
      if (savedPortfolio) {
        try { 
          const parsed = JSON.parse(savedPortfolio);
          const needsUpdate = !parsed.portraitImage || parsed.dataVersion !== initialPortfolioData.dataVersion || 
                              (!parsed.projects || parsed.projects.length < 5) ||
                              (parsed.experiences && parsed.experiences.length > 0 && typeof parsed.experiences[0].location === 'string');
          
          if (needsUpdate) {
            setPortfolio(initialPortfolioData);
            localStorage.setItem('amro_portfolio', JSON.stringify(initialPortfolioData));
          } else {
            setPortfolio(parsed);
          }
        } catch (e) { 
          console.error(e); 
          setPortfolio(initialPortfolioData);
        }
      } else {
        setPortfolio(initialPortfolioData);
        localStorage.setItem('amro_portfolio', JSON.stringify(initialPortfolioData));
      }
    }

    loadServerData();

    // Set dark mode initial
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
    }
  }, []);

  // After admin unlock: load private data (full portfolio incl. integrations + inbox) with the session token
  useEffect(() => {
    if (!adminToken) return;
    const headers = { Authorization: `Bearer ${adminToken}` };
    fetch('/api/portfolio', { headers })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (d && d.name && d.dataVersion === initialPortfolioData.dataVersion) setPortfolio(d); })
      .catch(() => {});
    fetch('/api/messages', { headers })
      .then((r) => (r.ok ? r.json() : []))
      .then((d) => { if (Array.isArray(d)) setMessages(d); })
      .catch(() => {});
  }, [adminToken]);

  // Scroll spy: highlight the menu item of the section currently on screen
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const ids = ['about', 'projects', 'experience', 'skills', 'github', 'contact'];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id === 'about' ? 'hero' : entry.target.id);
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  // Sync dark mode HTML class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Fetch real GitHub info and contribution events on mount
  useEffect(() => {
    async function fetchGithub() {
      try {
        setLoadingGithub(true);
        // The server fetches and caches GitHub data (no rate-limit problem, visitor IP stays private)
        const res = await fetch('/api/github');
        if (res.ok) {
          const d = await res.json();
          setGithubUser(d.user || null);
          setGithubRepos(Array.isArray(d.repos) ? d.repos : []);
        }
      } catch (err) {
        console.error('Error loading GitHub data:', err);
      } finally {
        setLoadingGithub(false);
      }
    }
    fetchGithub();
  }, [portfolio.socials.github]);

  // Authenticated API call; an expired admin session is handled in one place
  const adminFetch = async (url: string, init: RequestInit = {}) => {
    const res = await fetch(url, {
      ...init,
      headers: { ...authJsonHeaders(), ...((init.headers as Record<string, string>) || {}) }
    });
    if (res.status === 401) {
      lockAdmin();
      window.alert(tr3('Admin session expired. Please sign in again.', 'انتهت جلسة الإدارة. سجّل الدخول مرة أخرى.', 'Admin-Sitzung abgelaufen. Bitte erneut anmelden.'));
    }
    return res;
  };

  // Updates the page immediately, then saves on the server; returns true only when the server confirmed
  const savePortfolioToLocal = async (updatedData: PortfolioData): Promise<boolean> => {
    setPortfolio(updatedData);
    try {
      localStorage.setItem('amro_portfolio', JSON.stringify({ ...updatedData, integrations: { ...updatedData.integrations, telegramBotToken: '', telegramChatId: '' } }));
    } catch { /* storage may be unavailable */ }
    if (!adminToken) return false;
    try {
      const res = await adminFetch('/api/portfolio', { method: 'POST', body: JSON.stringify(updatedData) });
      if (res.status === 401) return false;
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return true;
    } catch (err) {
      console.error('Failed to save portfolio:', err);
      window.alert(tr3('Could not save to the server. Your change is only visible in this browser.', 'تعذر الحفظ على الخادم. التعديل ظاهر في هذا المتصفح فقط.', 'Speichern auf dem Server fehlgeschlagen. Die Änderung ist nur in diesem Browser sichtbar.'));
      return false;
    }
  };

  // Inbox: always re-read from the server; single-message actions never overwrite newer messages
  const loadMessages = async () => {
    if (!adminToken) return;
    try {
      const res = await adminFetch('/api/messages');
      if (res.ok) {
        const d = await res.json();
        if (Array.isArray(d)) setMessages(d);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const markMessageRead = async (id: string) => {
    const res = await adminFetch(`/api/messages/${encodeURIComponent(id)}/read`, { method: 'PATCH' });
    if (res.ok) loadMessages();
  };
  const deleteMessage = async (id: string) => {
    if (!window.confirm(tr3('Delete message?', 'حذف الرسالة؟', 'Nachricht löschen?'))) return;
    const res = await adminFetch(`/api/messages/${encodeURIComponent(id)}`, { method: 'DELETE' });
    if (res.ok) loadMessages();
  };

  useEffect(() => {
    if (!adminToken || !showAdminPanel) return;
    if (adminTab === 'inbox') loadMessages();
    if (adminTab === 'integrations') {
      adminFetch('/api/integrations-status')
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => { if (d) setIntegrationsStatus(d); })
        .catch(() => {});
    }
  }, [adminTab, adminToken, showAdminPanel]);

  const textDirection = lang === 'ar' ? 'rtl' : 'ltr';

  // Keep <html lang/dir>, the document title and the meta description in sync with the selected language
  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem('lang', lang); } catch { /* ignore */ }
    document.documentElement.dir = textDirection;
    document.title = `${portfolio.name} | ${portfolio.title[lang]}`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', portfolio.summary[lang].slice(0, 160));
  }, [lang, textDirection, portfolio.name, portfolio.title, portfolio.summary]);

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Silent visit ping: the server decides (rate limited, uses server-side credentials only)
  useEffect(() => {
    const timer = setTimeout(() => {
      fetch('/api/visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lang })
      }).catch(() => {});
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Submit Contact Form (the server stores the message and sends the alerts)
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;

    setIsSendingMessage(true);
    const errorText = {
      en: 'Could not send your message. Please try again later or email me directly.',
      ar: 'تعذر إرسال الرسالة. حاول لاحقاً أو راسلني مباشرة عبر البريد الإلكتروني.',
      de: 'Die Nachricht konnte nicht gesendet werden. Bitte später erneut versuchen oder direkt per E-Mail schreiben.'
    }[lang];

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        window.alert(errorText);
        return;
      }
      setLastSubmittedMessage(data.message);
      setShowAutoReply(true);
      setContactForm({ name: '', email: '', subject: '', message: '', website: '' });
      setTimeout(() => {
        setShowAutoReply(false);
      }, 12000);
    } catch (err) {
      window.alert(errorText);
    } finally {
      setIsSendingMessage(false);
    }
  };

  const handleUnlockAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminCode) return;
    setAdminError('');
    try {
      const res = await fetch('/api/verify-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: adminCode })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setAdminToken(data.token || '');
        setIsAdminUnlocked(true);
        setAdminError('');
      } else {
        setAdminError(translations[lang].adminWrongCode);
      }
    } catch (err) {
      console.error(err);
      setAdminError(lang === 'ar' ? 'حدث خطأ أثناء التحقق من كلمة المرور.' : 'Error verifying passcode with server.');
    }
  };

  const handleRequestOtp = async () => {
    setIsSendingOtp(true);
    setOtpStatus('');
    try {
      const res = await fetch('/api/request-otp', { method: 'POST' });
      const data = await res.json();
      if (res.ok && data.success) {
        setOtpStatus(data.message);
      } else {
        setOtpStatus(lang === 'ar' ? 'فشل توليد رمز الدخول المؤقت.' : 'Failed to generate OTP code.');
      }
    } catch (err) {
      console.error(err);
      setOtpStatus(lang === 'ar' ? 'حدث خطأ أثناء طلب رمز الدخول.' : 'Error requesting passcode.');
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleResetToDefault = async () => {
    if (!window.confirm(tr3('Restore the default CV content? Your messages are kept.', 'استعادة المحتوى الافتراضي للسيرة؟ رسائلك لن تُحذف.', 'Standard-Inhalt wiederherstellen? Ihre Nachrichten bleiben erhalten.'))) return;
    const res = await adminFetch('/api/reset-portfolio', { method: 'POST' });
    if (!res.ok) return;
    try { localStorage.removeItem('amro_portfolio'); } catch { /* ignore */ }
    setPortfolio(initialPortfolioData);
    setCustomPortrait(initialPortfolioData.portraitImage);
    lockAdmin();
    setShowAdminPanel(false);
    setAdminCode('');
  };

  // Shrinks big phone photos before upload (max 1400px, JPEG) so they always fit the server limit
  const resizeImageToDataUrl = (file: File, maxDim = 1400, quality = 0.86): Promise<string> =>
    new Promise((resolve, reject) => {
      const objectUrl = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
        const w = Math.max(1, Math.round(img.width * scale));
        const h = Math.max(1, Math.round(img.height * scale));
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) { URL.revokeObjectURL(objectUrl); reject(new Error('Canvas unavailable')); return; }
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
        URL.revokeObjectURL(objectUrl);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => { URL.revokeObjectURL(objectUrl); reject(new Error('Not a valid image file')); };
      img.src = objectUrl;
    });

  // Uploads one image and returns its public URL (or null after showing an error)
  const uploadImageFile = async (file: File): Promise<string | null> => {
    if (!file.type.startsWith('image/')) {
      window.alert(tr3('Please choose an image file.', 'الرجاء اختيار ملف صورة.', 'Bitte eine Bilddatei wählen.'));
      return null;
    }
    setIsUploadingImage(true);
    try {
      const base64Data = await resizeImageToDataUrl(file);
      const res = await adminFetch('/api/upload-image', { method: 'POST', body: JSON.stringify({ base64Data, fileName: file.name }) });
      const data = await res.json().catch(() => ({}));
      if (res.status === 401) return null;
      if (!res.ok || !data.imageUrl) throw new Error(data.error || `HTTP ${res.status}`);
      return data.imageUrl as string;
    } catch (err: any) {
      window.alert(`${tr3('Upload failed', 'فشل رفع الصورة', 'Upload fehlgeschlagen')}: ${err.message}`);
      return null;
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handlePortraitPick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    const url = await uploadImageFile(file);
    if (url) setCustomPortrait(url);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget as HTMLFormElement);
    const val = (k: string) => String(f.get(k) ?? '').trim();

    if (!val('profile_name')) {
      window.alert(tr3('The name cannot be empty.', 'الاسم مطلوب.', 'Der Name darf nicht leer sein.'));
      return;
    }
    if (val('email') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val('email'))) {
      window.alert(tr3('Please enter a valid e-mail address.', 'الرجاء إدخال بريد إلكتروني صحيح.', 'Bitte eine gültige E-Mail-Adresse eingeben.'));
      return;
    }
    for (const key of ['github', 'telegram', 'whatsapp', 'twitter', 'linkedin']) {
      if (val(key) && !/^https?:\/\//i.test(val(key))) {
        window.alert(tr3(`The ${key} link must start with https://`, `رابط ${key} يجب أن يبدأ بـ https://`, `Der ${key}-Link muss mit https:// beginnen`));
        return;
      }
    }

    const updated: PortfolioData = {
      ...portfolio,
      name: val('profile_name'),
      portraitImage: customPortrait || portfolio.portraitImage,
      title: {
        en: val('title_en') || portfolio.title.en,
        ar: val('title_ar') || portfolio.title.ar,
        de: val('title_de') || portfolio.title.de,
      },
      summary: {
        en: val('summary_en') || portfolio.summary.en,
        ar: val('summary_ar') || portfolio.summary.ar,
        de: val('summary_de') || portfolio.summary.de,
      },
      contact: {
        email: val('email') || portfolio.contact.email,
        phone: val('phone'),
        location: {
          en: val('loc_en') || portfolio.contact.location.en,
          ar: val('loc_ar') || portfolio.contact.location.ar,
          de: val('loc_de') || portfolio.contact.location.de,
        }
      },
      // optional links may be cleared; empty links are simply not shown on the site
      socials: {
        github: val('github'),
        telegram: val('telegram'),
        whatsapp: val('whatsapp'),
        twitter: val('twitter'),
        linkedin: val('linkedin'),
      }
    };
    const ok = await savePortfolioToLocal(updated);
    if (ok) window.alert(tr3('Saved. The changes are live.', 'تم الحفظ. التعديلات ظاهرة الآن في الموقع.', 'Gespeichert. Die Änderungen sind live.'));
  };

  const handleSaveExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp) return;
    // One point per line: trim and drop empty lines before saving
    const clean = (list: string[]) => list.map((x) => x.trim()).filter(Boolean);
    const cleaned: WorkExperience = {
      ...editingExp,
      highlights: { en: clean(editingExp.highlights.en), ar: clean(editingExp.highlights.ar), de: clean(editingExp.highlights.de) }
    };
    let updated = [...portfolio.experiences];
    if (isEditingNewExp) {
      updated = [cleaned, ...updated];
    } else {
      updated = updated.map(ex => ex.id === cleaned.id ? cleaned : ex);
    }
    savePortfolioToLocal({ ...portfolio, experiences: updated });
    setEditingExp(null);
    setIsEditingNewExp(false);
  };

  const handleDeleteExperience = (id: string) => {
    if (window.confirm(lang === 'ar' ? 'حذف هذه الخبرة؟' : 'Delete experience?')) {
      savePortfolioToLocal({
        ...portfolio,
        experiences: portfolio.experiences.filter(ex => ex.id !== id)
      });
    }
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProj) return;
    let updated = [...portfolio.projects];
    if (isEditingNewProj) {
      updated = [editingProj, ...updated];
    } else {
      updated = updated.map(p => p.id === editingProj.id ? editingProj : p);
    }
    savePortfolioToLocal({ ...portfolio, projects: updated });
    setEditingProj(null);
    setIsEditingNewProj(false);
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm(lang === 'ar' ? 'حذف هذا المشروع؟' : 'Delete project?')) {
      savePortfolioToLocal({
        ...portfolio,
        projects: portfolio.projects.filter(p => p.id !== id)
      });
    }
  };

  const handleSaveEducation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEdu) return;
    const updated = isEditingNewEdu
      ? [editingEdu, ...portfolio.education]
      : portfolio.education.map(ed => ed.id === editingEdu.id ? editingEdu : ed);
    savePortfolioToLocal({ ...portfolio, education: updated });
    setEditingEdu(null);
    setIsEditingNewEdu(false);
  };

  const handleDeleteEducation = (id: string) => {
    if (window.confirm(lang === 'ar' ? 'حذف هذا المؤهل؟' : 'Delete education?')) {
      savePortfolioToLocal({ ...portfolio, education: portfolio.education.filter(ed => ed.id !== id) });
    }
  };

  const handleSaveSkillCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkillCat) return;
    const updated = portfolio.skills.map(sc => sc.id === editingSkillCat.id ? editingSkillCat : sc);
    savePortfolioToLocal({ ...portfolio, skills: updated });
    setEditingSkillCat(null);
  };

  const handleUpdateIntegrations = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const updated: PortfolioData = {
      ...portfolio,
      integrations: {
        telegramEnabled: formData.get('telegram_enabled') === 'on',
        telegramBotToken: '',
        telegramChatId: '',
        emailEnabled: formData.get('email_enabled') === 'on',
        emailAlertAddress: String(formData.get('email_address') ?? '').trim(),
        visitAlertsEnabled: formData.get('visit_alerts') === 'on',
      }
    };
    const ok = await savePortfolioToLocal(updated);
    if (ok) window.alert(tr3('Integrations saved.', 'تم حفظ إعدادات التنبيهات.', 'Integrationen gespeichert.'));
  };

  const triggerTestTelegram = async () => {
    try {
      const res = await adminFetch('/api/notify-telegram', {
        method: 'POST',
        body: JSON.stringify({ message: '⚡️ <b>Test</b> from the Amro Nazzal portfolio: Telegram works.' })
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 401) return;
      window.alert(res.ok ? tr3('Test message sent. Check Telegram.', 'تم إرسال رسالة اختبار. تحقق من تيليغرام.', 'Testnachricht gesendet. Bitte Telegram prüfen.') : (data.error || `HTTP ${res.status}`));
    } catch (err: any) {
      window.alert(`${tr3('Test failed', 'فشل الاختبار', 'Test fehlgeschlagen')}: ${err.message}`);
    }
  };

  const triggerTestEmail = async () => {
    try {
      const res = await adminFetch('/api/notify-email', {
        method: 'POST',
        body: JSON.stringify({
          to: portfolio.integrations.emailAlertAddress || undefined,
          subject: 'Portfolio test e-mail',
          body: 'This is a test message from your portfolio admin panel.'
        })
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 401) return;
      window.alert(res.ok ? (data.description || 'OK') : (data.error || `HTTP ${res.status}`));
    } catch (err: any) {
      window.alert(`${tr3('Test failed', 'فشل الاختبار', 'Test fehlgeschlagen')}: ${err.message}`);
    }
  };

  const getFilteredExperiences = () => {
    if (activeExperienceTab === 'all') return portfolio.experiences;
    return portfolio.experiences.filter(ex => {
      if (activeExperienceTab === 'bmw') return ex.company.toLowerCase().includes('bmw');
      if (activeExperienceTab === 'sahli') return ex.company.toLowerCase().includes('sahli');
      if (activeExperienceTab === 'aljawaden') return ex.company.toLowerCase().includes('aljawaden');
      if (activeExperienceTab === 'chief') return /accountant|controller/i.test(ex.role.en);
      return true;
    });
  };

  const downloadCvFile = (chosenLang: 'en' | 'ar' | 'de') => {
    const pdfUrl = chosenLang === 'de'
      ? '/Amro_Nazzal_Lebenslauf_DE.pdf'
      : '/Amro_Nazzal_CV_EN.pdf';

    // There is no Arabic PDF: the Arabic CV is available through View / Print only
    const filename = chosenLang === 'de'
      ? 'Amro_Nazzal_Lebenslauf_DE.pdf'
      : 'Amro_Nazzal_CV_EN.pdf';

    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintCV = (chosenLang: 'en' | 'ar' | 'de') => {
    setCvLanguage(chosenLang);
    setShowCvModal(false);
    setTimeout(() => {
      window.print();
    }, 200);
  };

  return (
    <div className={`min-h-screen bg-mesh-gradient text-slate-900 dark:bg-[#0D0D11] dark:text-zinc-100 flex flex-col transition-colors duration-300`} dir={textDirection}>
      
      {/* EXCLUSIVE PRINT RESUME SHEETS: Highly Styled Print layout hidden in Browser */}
      <PrintableCv
        cvLanguage={cvLanguage}
        portfolio={portfolio}
      />

      {/* HEADER NAVIGATION BAR */}
      <SiteHeader
        activeSection={activeSection}
        darkMode={darkMode}
        handleToggleDarkMode={handleToggleDarkMode}
        isAdminUnlocked={isAdminUnlocked}
        lang={lang}
        setActiveSection={setActiveSection}
        setLang={setLang}
        setShowAdminPanel={setShowAdminPanel}
        showAdminEntry={showAdminEntry}
        showAdminPanel={showAdminPanel}
      />

      {/* ON-SCREEN DIGITAL CV DOCUMENT VIEWER OVERLAY */}
      <CvViewerOverlay
        onScreenCvLang={onScreenCvLang}
        portfolio={portfolio}
        setCvLanguage={setCvLanguage}
        setOnScreenCvLang={setOnScreenCvLang}
      />

      {/* ADMIN CMS CONTROL PANEL */}
      <AdminPanel
        adminCode={adminCode}
        adminError={adminError}
        adminTab={adminTab}
        customPortrait={customPortrait}
        deleteMessage={deleteMessage}
        editingEdu={editingEdu}
        editingExp={editingExp}
        editingProj={editingProj}
        editingSkillCat={editingSkillCat}
        handleDeleteEducation={handleDeleteEducation}
        handleDeleteExperience={handleDeleteExperience}
        handleDeleteProject={handleDeleteProject}
        handlePortraitPick={handlePortraitPick}
        handleRequestOtp={handleRequestOtp}
        handleResetToDefault={handleResetToDefault}
        handleSaveEducation={handleSaveEducation}
        handleSaveExperience={handleSaveExperience}
        handleSaveProject={handleSaveProject}
        handleSaveSkillCategory={handleSaveSkillCategory}
        handleUnlockAdmin={handleUnlockAdmin}
        handleUpdateIntegrations={handleUpdateIntegrations}
        handleUpdateProfile={handleUpdateProfile}
        integrationsStatus={integrationsStatus}
        isAdminUnlocked={isAdminUnlocked}
        isSendingOtp={isSendingOtp}
        isUploadingImage={isUploadingImage}
        lang={lang}
        loadMessages={loadMessages}
        lockAdmin={lockAdmin}
        markMessageRead={markMessageRead}
        messages={messages}
        otpStatus={otpStatus}
        portfolio={portfolio}
        setAdminCode={setAdminCode}
        setAdminTab={setAdminTab}
        setCustomPortrait={setCustomPortrait}
        setEditingEdu={setEditingEdu}
        setEditingExp={setEditingExp}
        setEditingProj={setEditingProj}
        setEditingSkillCat={setEditingSkillCat}
        setIsEditingNewEdu={setIsEditingNewEdu}
        setIsEditingNewExp={setIsEditingNewExp}
        setIsEditingNewProj={setIsEditingNewProj}
        setShowAdminPanel={setShowAdminPanel}
        showAdminPanel={showAdminPanel}
        tr3={tr3}
        triggerTestEmail={triggerTestEmail}
        triggerTestTelegram={triggerTestTelegram}
        uploadImageFile={uploadImageFile}
      />

      {/* COMPACT AUTO REPLY DISPATCH POPUP */}
      <AutoReplyPopup
        lang={lang}
        lastSubmittedMessage={lastSubmittedMessage}
        setShowAutoReply={setShowAutoReply}
        showAutoReply={showAutoReply}
        textDirection={textDirection}
      />

      {/* LANGUAGE SELECTION FOR PRINTING CV MODAL */}
      <CvLanguageModal
        downloadCvFile={downloadCvFile}
        handlePrintCV={handlePrintCV}
        lang={lang}
        setOnScreenCvLang={setOnScreenCvLang}
        setShowCvModal={setShowCvModal}
        showCvModal={showCvModal}
      />

      {/* MAIN VIEW */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-16 print:hidden">

        {/* HERO SECTION */}
        <HeroSection
          lang={lang}
          portfolio={portfolio}
          setShowCvModal={setShowCvModal}
        />

        {/* MARQUEE RIBBON */}
        <MarqueeRibbon
          lang={lang}
        />

        {/* DEMO PROJECTS */}
        <ProjectsSection
          lang={lang}
          portfolio={portfolio}
        />

        {/* EXPERIENCE TIMELINE */}
        <ExperienceSection
          activeExperienceTab={activeExperienceTab}
          getFilteredExperiences={getFilteredExperiences}
          lang={lang}
          setActiveExperienceTab={setActiveExperienceTab}
          setShowAllExperience={setShowAllExperience}
          showAllExperience={showAllExperience}
        />

        {/* CORE SKILLS */}
        <SkillsSection
          lang={lang}
          portfolio={portfolio}
        />

        {/* GITHUB: RECENTLY UPDATED PUBLIC REPOSITORIES */}
        <GithubSection
          githubRepos={githubRepos}
          githubUser={githubUser}
          lang={lang}
          portfolio={portfolio}
        />

        {/* CONTACT SECTION */}
        <ContactSection
          contactForm={contactForm}
          handleContactSubmit={handleContactSubmit}
          isSendingMessage={isSendingMessage}
          lang={lang}
          lastSubmittedMessage={lastSubmittedMessage}
          portfolio={portfolio}
          setContactForm={setContactForm}
          showAutoReply={showAutoReply}
        />

      </main>

      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="fixed bottom-6 start-6 z-40 h-11 w-11 rounded-full bg-amber-600 text-white shadow-lg flex items-center justify-center hover:bg-amber-700 transition-colors print:hidden"
        >
          <ChevronUp size={20} />
        </button>
      )}

      {/* FOOTER */}
      <SiteFooter
        portfolio={portfolio}
      />

    </div>
  );
}

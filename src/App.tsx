/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Briefcase, GraduationCap, Mail, Phone, MapPin, Sparkles, Globe, Lock, Settings, 
  Plus, Trash, Check, ExternalLink, FileText, Send, Upload, MessageSquare, 
  LogOut, X, ChevronRight, AlertCircle, Calendar, RefreshCw, User, Moon, Sun, 
  Eye, FileDown, ShieldCheck, Share2, Github, MessageCircle, SendHorizontal
} from 'lucide-react';
import { initialPortfolioData, initialMessages } from './data';
import { PortfolioData, ContactMessage, WorkExperience, SkillCategory, Project, EducationItem } from './types';

// Multi-language Translation Dictionary
const translations: Record<string, any> = {
  en: {
    navHome: "Executive",
    navExperience: "Career Timeline",
    navSkills: "Core Expertise",
    navProjects: "Systems Hub",
    navMatcher: "AI Matcher",
    navContact: "Connect",
    navAdmin: "Admin CMS",
    heroHeading: "Bridging the Gap between Financial Integrity & Full-Stack Innovation",
    heroSubheading: "A veteran Finance Systems Specialist and Chief Accountant who designs, develops, and implements robust software solutions. Based in Leipzig, Germany.",
    keyMetricsTitle: "Key Indicators",
    metric1Val: "10+ Yrs",
    metric1Lbl: "Financial Management",
    metric2Val: "ERP Lead",
    metric2Lbl: "Implementation & Advisory",
    metric3Val: "Full Stack",
    metric3Lbl: "React, Node, PostgreSQL",
    experienceHeader: "Professional Journey",
    experienceSub: "Chronological timeline of financial systems leadership and technical execution",
    skillsHeader: "Core Competency Bento",
    skillsSub: "Deep knowledge pairing financial compliance, ERP deployment, and modern engineering",
    projectsHeader: "Featured Deployments",
    projectsSub: "Enterprise-grade financial tools designed, developed, and delivered to businesses",
    matcherHeader: "AI Recruiter & Collaboration Matcher",
    matcherSub: "Analyze your professional profile in real-time. Discover synergies, role alignment, and potential collaborations with Amro's dual finance-tech stack using Gemini.",
    matcherDropText: "Drop your PDF/Word CV here, or click to select file",
    matcherPastePlaceholder: "Or write/paste your professional bio, required role, or skills here...",
    matcherAnalyzeBtn: "Analyze Synergy with Gemini",
    matcherAnalyzing: "Gemini is auditing files and mapping synergies...",
    matcherMatchResult: "AI Compatibility Audit",
    matcherCollaborationFit: "Strategic Synergy & Recommendations",
    contactHeader: "Establish Connection",
    contactSub: "Send a message directly to Amro's executive desk with instant AI & Telegram dispatch",
    formName: "Full Name",
    formEmail: "Email Address",
    formSubject: "Subject",
    formMessage: "Message body text",
    formSend: "Dispatch Connection",
    formSending: "Transmitting message...",
    formSuccess: "Message transmitted successfully!",
    instantResponseTitle: "Executive Auto-Responder",
    instantResponseText: "Hi {name}, thank you for your query regarding '{subject}'. Your message is logged in Amro's admin desk. Since Amro is currently in Leipzig, Germany, he usually reviews logs and responds within 2 hours. A tracking confirmation was queued for {email}.",
    downloadCV: "Download / Print CV",
    adminTitle: "Admin Desk & CMS Controller",
    adminCodePrompt: "Enter security code to unlock CMS database",
    adminCodePlaceholder: "Enter Code (Hint: Amro's birth year - 1988)...",
    adminUnlock: "Unlock Database",
    adminWrongCode: "Incorrect authorization code.",
    adminSettings: "General Profile Info",
    adminExperiences: "Experiences Manager",
    adminInbox: "Corporate Inbox",
    adminNoMessages: "No messages in executive inbox.",
    adminMarkRead: "Mark Read",
    adminDelete: "Delete",
    adminReset: "Restore Default CV",
    adminSave: "Commit Updates",
    langAr: "العربية",
    langEn: "English",
    langDe: "Deutsch",
    adminAddExp: "Add Work Experience",
    adminEditExp: "Edit Work Experience",
    editPrompt: "Use this panel to modify content live. All changes persist in localStorage immediately.",
    viewProjectBtn: "Inspect Implementation",
    educationTitle: "Academic Foundations",
    languagesTitle: "Linguistic Fluency",
    printResumeHeadline: "RESUME OF AMRO NAZZAL",
    printResumeSub: "Financial Systems Specialist & Full-Stack Developer | Leipzig, Germany",
    skillsProgress: "Skill Proficiency",
    uploadSuccess: "CV analyzed successfully by Gemini!",
    qrContactTitle: "Scan to Save Contact",
    qrContactSub: "Scan this QR code to message Amro instantly on WhatsApp and save his vCard details.",
    githubHeader: "GitHub Contributions (Last Year)",
    githubSub: "Live contribution heatmap, statistics, and activity stream over the past 365 days from @amr88nzzal",
    githubViewAll: "View Profile on GitHub"
  },
  ar: {
    navHome: "الملف المهني",
    navExperience: "المسيرة المهنية",
    navSkills: "الخبرات الأساسية",
    navProjects: "أعمال مختارة",
    navMatcher: "محلل التوافق الذكي",
    navContact: "التواصل",
    navAdmin: "منصة التحكم",
    heroHeading: "سد الفجوة بين الكفاءة المالية المتقدمة والحلول البرمجية المبتكرة",
    heroSubheading: "أخصائي نظم مالية ورئيس حسابات مخضرم يقوم بتصميم وتطوير وتنفيذ الحلول البرمجية متكاملة الخدمات. يقيم في لايبزيغ، ألمانيا.",
    keyMetricsTitle: "المؤشرات الرئيسية",
    metric1Val: "10+ سنوات",
    metric1Lbl: "الإدارة المالية والمحاسبة",
    metric2Val: "قائد ERP",
    metric2Lbl: "التنفيذ والاستشارات",
    metric3Val: "مطور متكامل",
    metric3Lbl: "React, Node, PostgreSQL",
    experienceHeader: "المسيرة المهنية والخبرات",
    experienceSub: "خط زمني تفاعلي للمناصب المالية وقيادة الأنظمة والتنفيذ التقني",
    skillsHeader: "مصفوفة الكفاءات والقدرات",
    skillsSub: "دمج دقيق بين الامتثال المحاسبي، وتطوير الأنظمة، وهندسة البرمجيات الحديثة",
    projectsHeader: "المشاريع والأنظمة المنفذة",
    projectsSub: "برمجيات مالية بمواصفات مؤسسية تم تصميمها وتطويرها وتسليمها للعملاء",
    matcherHeader: "محلل التوافق والتوظيف المدعوم بالذكاء الاصطناعي",
    matcherSub: "حلل سيرتك الذاتية في الوقت الفعلي. اكتشف نقاط الالتقاء والتكامل المهني وإمكانيات التعاون مع خبرات عمرو الثنائية في المال والتكنولوجيا باستخدام نموذج Gemini.",
    matcherDropText: "اسحب ملف السيرة الذاتية PDF هنا، أو انقر لاختيار ملف",
    matcherPastePlaceholder: "أو اكتب/الصق مهاراتك، متطلبات الوظيفة، أو نبذة عن شركتك هنا...",
    matcherAnalyzeBtn: "تحليل التوافق والتعاون الذكي",
    matcherAnalyzing: "يقوم نظام Gemini بدراسة المستندات وتحديد نقاط التوافق المحتملة...",
    matcherMatchResult: "تقرير التوافق والاندماج الذكي",
    matcherCollaborationFit: "فرص التعاون الإستراتيجي والتوصيات",
    contactHeader: "الاتصال المباشر",
    contactSub: "أرسل رسالة مباشرة إلى مكتب عمرو مع تفعيل الرد التلقائي وإشعارات تيليغرام الفورية",
    formName: "الاسم الكامل",
    formEmail: "البريد الإلكتروني",
    formSubject: "الموضوع",
    formMessage: "نص الرسالة",
    formSend: "إرسال الرسالة",
    formSending: "جاري إرسال الرسالة...",
    formSuccess: "تم إرسال الرسالة بنجاح!",
    instantResponseTitle: "الرد التلقائي الفوري للنظام",
    instantResponseText: "مرحباً {name}، نشكرك على تواصلك بخصوص '{subject}'. تم تسجيل رسالتك بنجاح في نظام الإدارة الخاص بعمرو. نظراً لتواجد عمرو حالياً في لايبزيغ بألمانيا، فإنه يقوم بمراجعة الوارد والرد خلال ساعتين عادةً. تم إرسال تأكيد التتبع تلقائياً إلى {email}.",
    downloadCV: "تحميل / طباعة السيرة الذاتية",
    adminTitle: "لوحة التحكم وإدارة المحتوى",
    adminCodePrompt: "أدخل رمز الأمان لفتح قاعدة بيانات المحتوى",
    adminCodePlaceholder: "أدخل الرمز (تلميح: سنة ميلاد عمرو - 1988)...",
    adminUnlock: "فك قفل البيانات",
    adminWrongCode: "رمز الأمان غير صحيح.",
    adminSettings: "المعلومات العامة",
    adminExperiences: "إدارة الخبرات",
    adminInbox: "صندوق الرسائل الواردة",
    adminNoMessages: "صندوق الرسائل فارغ حالياً.",
    adminMarkRead: "مقروء",
    adminDelete: "حذف",
    adminReset: "استعادة السيرة الافتراضية",
    adminSave: "حفظ التحديثات",
    langAr: "العربية",
    langEn: "English",
    langDe: "Deutsch",
    adminAddExp: "إضافة خبرة عمل",
    adminEditExp: "تعديل خبرة العمل",
    editPrompt: "استخدم هذه اللوحة لتحديث البيانات مباشرة. يتم حفظ التغييرات في ذاكرة المتصفح المحلية فوراً.",
    viewProjectBtn: "معاينة النظام والتشغيل",
    educationTitle: "المؤهلات العلمية",
    languagesTitle: "المهارات اللغوية",
    printResumeHeadline: "السيرة الذاتية لعمرو نزال",
    printResumeSub: "أخصائي أنظمة مالية ومطور برمجيات | لايبزيغ، ألمانيا",
    skillsProgress: "مستوى الإتقان",
    uploadSuccess: "تم تحليل السيرة الذاتية بنجاح بواسطة Gemini!",
    qrContactTitle: "رمز التواصل السريع QR",
    qrContactSub: "امسح الرمز ضوئياً للتواصل المباشر مع عمرو عبر واتساب وحفظ بياناته في هاتفك.",
    githubHeader: "مساهمات غيتهوب خلال السنة الماضية",
    githubSub: "خارطة حرارية تفاعلية لمساهمات غيتهوب، وإحصائيات وسجل الأنشطة البرمجية خلال الـ 365 يوماً الماضية للحساب amr88nzzal@",
    githubViewAll: "زيارة الحساب على غيتهوب"
  },
  de: {
    navHome: "Führungskraft",
    navExperience: "Lebenslauf Timeline",
    navSkills: "Kernkompetenzen",
    navProjects: "System-Portfolio",
    navMatcher: "AI-Synergie-Analyse",
    navContact: "Kontakt",
    navAdmin: "Admin-Desk",
    heroHeading: "Die Brücke zwischen Finanz-Integrität und Full-Stack-Softwareentwicklung",
    heroSubheading: "Ein vielseitiger Spezialist für Finanzsysteme und Leiter Rechnungswesen, der robuste Softwarelösungen entwirft, entwickelt und implementiert. Ansässig in Leipzig, Deutschland.",
    keyMetricsTitle: "Schlüsselindikatoren",
    metric1Val: "10+ Jahre",
    metric1Lbl: "Finanz- & Rechnungswesen",
    metric2Val: "ERP Lead",
    metric2Lbl: "Implementierung & Beratung",
    metric3Val: "Full Stack",
    metric3Lbl: "React, Node, PostgreSQL",
    experienceHeader: "Beruflicher Werdegang",
    experienceSub: "Chronologische Übersicht über ERP-Implementierungen und technische Systemberatung",
    skillsHeader: "Kompaktbento der Kompetenzen",
    skillsSub: "Die Symbiose aus Buchhaltungskonformität, ERP-Infrastruktur und moderner Programmierung",
    projectsHeader: "Erfolgreiche Deployments",
    projectsSub: "Finanz- und ERP-Systeme, die für regionale Marktführer realisiert wurden",
    matcherHeader: "AI-Recruiter & Synergie-Abgleich",
    matcherSub: "Analysieren Sie Ihr Bewerber- oder Unternehmensprofil live. Entdecken Sie Übereinstimmungen und Kooperationspotenziale mit Amros Finanz- und Software-Stack mithilfe von Gemini.",
    matcherDropText: "Ziehen Sie Ihr PDF hierher oder klicken Sie zur Auswahl",
    matcherPastePlaceholder: "Oder fügen Sie Ihr Unternehmensprofil, Ihre Anforderungen oder gewünschten Tech-Stack hier ein...",
    matcherAnalyzeBtn: "Kooperationspotenzial mit Gemini analysieren",
    matcherAnalyzing: "Gemini liest Dokumente und wertet Synergien aus...",
    matcherMatchResult: "AI-Kompatibilitätsaudit",
    matcherCollaborationFit: "Strategische Synergien & Empfehlungen",
    contactHeader: "Direkte Verbindung",
    contactSub: "Senden Sie eine Nachricht direkt an Amros Schreibtisch mit automatischer Telegram-Benachrichtigung",
    formName: "Vollständiger Name",
    formEmail: "E-Mail-Adresse",
    formSubject: "Betreff",
    formMessage: "Nachrichteninhalt",
    formSend: "Nachricht senden",
    formSending: "Übertrage Nachricht...",
    formSuccess: "Nachricht erfolgreich übermittelt!",
    instantResponseTitle: "Automatische Executive-Antwort",
    instantResponseText: "Hallo {name}, vielen Dank für Ihre Anfrage bezüglich '{subject}'. Ihre Nachricht wurde in Amros Admin-Desk registriert. Da Amro derzeit in Leipzig tätig ist, prüft er die Eingänge regelmäßig und antwortet in der Regel innerhalb von 2 Stunden. Eine Bestätigungsmail wurde an {email} gesendet.",
    downloadCV: "Lebenslauf drucken / als PDF",
    adminTitle: "Admin-Desk & CMS-Steuerung",
    adminCodePrompt: "Geben Sie den Sicherheitscode ein, um das CMS freizuschalten",
    adminCodePlaceholder: "Code eingeben (Tipp: Amros Geburtsjahr - 1988)...",
    adminUnlock: "Freischalten",
    adminWrongCode: "Falscher Sicherheitscode.",
    adminSettings: "Allgemeine Profildaten",
    adminExperiences: "Lebenslauf verwalten",
    adminInbox: "Corporate Posteingang",
    adminNoMessages: "Keine Nachrichten im Posteingang.",
    adminMarkRead: "Als gelesen markieren",
    adminDelete: "Löschen",
    adminReset: "Standard-CV wiederherstellen",
    adminSave: "Änderungen speichern",
    langAr: "العربية",
    langEn: "English",
    langDe: "Deutsch",
    adminAddExp: "Arbeitserfahrung hinzufügen",
    adminEditExp: "Arbeitserfahrung bearbeiten",
    editPrompt: "Verwenden Sie dieses Panel, um Inhalte live zu bearbeiten. Alle Änderungen werden direkt im localStorage gespeichert.",
    viewProjectBtn: "Implementierung einsehen",
    educationTitle: "Akademische Grundlagen",
    languagesTitle: "Sprachkenntnisse",
    printResumeHeadline: "LEBENSLAUF VON AMRO NAZZAL",
    printResumeSub: "Spezialist für Finanzsysteme & Full-Stack-Entwickler | Leipzig",
    skillsProgress: "Qualifikationsniveau",
    uploadSuccess: "Lebenslauf erfolgreich von Gemini analysiert!",
    qrContactTitle: "Schneller QR-Kontakt",
    qrContactSub: "Scannen Sie diesen QR-Code, um Amro direkt auf WhatsApp zu kontaktieren und Kontakte zu speichern.",
    githubHeader: "GitHub-Beiträge (Letztes Jahr)",
    githubSub: "Interaktive GitHub-Beitrags-Heatmap, Statistiken und Aktivitäts-Stream der letzten 365 Tage von @amr88nzzal",
    githubViewAll: "GitHub-Profil ansehen"
  }
};

export default function App() {
  // Theme and Multi-language State
  const [lang, setLang] = useState<'en' | 'ar' | 'de'>('en');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Dynamic Portfolio Database State
  const [portfolio, setPortfolio] = useState<PortfolioData>(initialPortfolioData);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [activeExperienceTab, setActiveExperienceTab] = useState<string>('all');

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
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSendingMessage, setIsSendingMessage] = useState<boolean>(false);
  const [lastSubmittedMessage, setLastSubmittedMessage] = useState<any | null>(null);
  const [showAutoReply, setShowAutoReply] = useState<boolean>(false);

  // GitHub Repos and Events state
  const [githubRepos, setGithubRepos] = useState<any[]>([]);
  const [githubEvents, setGithubEvents] = useState<any[]>([]);
  const [githubUser, setGithubUser] = useState<any | null>(null);
  const [loadingGithub, setLoadingGithub] = useState<boolean>(true);

  // Resume Analyzer (Gemini Matcher) State
  const [pastedBio, setPastedBio] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);
  const [dragOver, setDragOver] = useState<boolean>(false);
  const [analysisError, setAnalysisError] = useState<string>('');
  const [analysisFileName, setAnalysisFileName] = useState<string>('');

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
  const [customOffice, setCustomOffice] = useState<string>('');
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);

  // Dynamic OTP state
  const [isSendingOtp, setIsSendingOtp] = useState<boolean>(false);
  const [otpStatus, setOtpStatus] = useState<string>('');

  // Sync local image states when portfolio updates
  useEffect(() => {
    if (portfolio.portraitImage) setCustomPortrait(portfolio.portraitImage);
    if (portfolio.officeImage) setCustomOffice(portfolio.officeImage);
  }, [portfolio]);

  // Persistent Hydration (Server First, fallback to LocalStorage)
  useEffect(() => {
    async function loadServerData() {
      try {
        const res = await fetch('/api/portfolio');
        if (res.ok) {
          const serverData = await res.json();
          if (serverData && serverData.name && serverData.portraitImage) {
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
          const needsUpdate = !parsed.portraitImage || 
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

    async function loadMessages() {
      try {
        const res = await fetch('/api/messages');
        if (res.ok) {
          const serverMsgs = await res.json();
          if (Array.isArray(serverMsgs) && serverMsgs.length > 0) {
            setMessages(serverMsgs);
            localStorage.setItem('amro_messages', JSON.stringify(serverMsgs));
            return;
          }
        }
      } catch (err) {
        console.log('Server messages sync fallback:', err);
      }

      const savedMessages = localStorage.getItem('amro_messages');
      if (savedMessages) {
        try { setMessages(JSON.parse(savedMessages)); } catch (e) { console.error(e); }
      } else {
        setMessages(initialMessages);
        localStorage.setItem('amro_messages', JSON.stringify(initialMessages));
      }
    }

    loadServerData();
    loadMessages();

    // Set dark mode initial
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
    }
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
        const username = portfolio.socials.github ? portfolio.socials.github.split('/').filter(Boolean).pop() || 'amr88nzzal' : 'amr88nzzal';
        const [userRes, reposRes, eventsRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`),
          fetch(`https://api.github.com/users/${username}/events?per_page=10`)
        ]);
        if (userRes.ok) {
          const userObj = await userRes.json();
          setGithubUser(userObj);
        }
        if (reposRes.ok) {
          const reposArr = await reposRes.json();
          setGithubRepos(Array.isArray(reposArr) ? reposArr : []);
        }
        if (eventsRes.ok) {
          const eventsArr = await eventsRes.json();
          setGithubEvents(Array.isArray(eventsArr) ? eventsArr : []);
        }
      } catch (err) {
        console.error('Error querying GitHub API:', err);
      } finally {
        setLoadingGithub(false);
      }
    }
    fetchGithub();
  }, [portfolio.socials.github]);

  const savePortfolioToLocal = (updatedData: PortfolioData) => {
    setPortfolio(updatedData);
    localStorage.setItem('amro_portfolio', JSON.stringify(updatedData));
    // Persist to server disk for cross-browser / cross-device availability
    fetch('/api/portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData)
    }).catch(err => console.error('Failed to sync portfolio to server:', err));
  };

  const saveMessagesToLocal = (updatedMsgs: ContactMessage[]) => {
    setMessages(updatedMsgs);
    localStorage.setItem('amro_messages', JSON.stringify(updatedMsgs));
    // Persist messages to server disk
    fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedMsgs)
    }).catch(err => console.error('Failed to sync messages to server:', err));
  };

  const textDirection = lang === 'ar' ? 'rtl' : 'ltr';

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Dispatches Telegram Alert to node express wrapper
  const triggerTelegramNotification = async (messageText: string) => {
    if (!portfolio.integrations.telegramEnabled || !portfolio.integrations.telegramBotToken || !portfolio.integrations.telegramChatId) {
      console.log('Telegram alerts bypassed: Integration variables are not set or are disabled.');
      return;
    }
    try {
      await fetch('/api/notify-telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          botToken: portfolio.integrations.telegramBotToken,
          chatId: portfolio.integrations.telegramChatId,
          message: messageText
        })
      });
    } catch (e) {
      console.error('Error dispatching Telegram Alert:', e);
    }
  };

  // Dispatches email logger endpoint
  const triggerEmailNotification = async (subject: string, textBody: string) => {
    if (!portfolio.integrations.emailEnabled || !portfolio.integrations.emailAlertAddress) return;
    try {
      await fetch('/api/notify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: portfolio.integrations.emailAlertAddress,
          subject: subject,
          body: textBody
        })
      });
    } catch (e) {
      console.error(e);
    }
  };

  // Trigger site load silent visit notification (if enabled)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (portfolio.integrations.visitAlertsEnabled) {
        const msg = `👁 <b>New Portfolio Session Loaded</b>\nTime: ${new Date().toISOString()}\nLanguage: ${lang}\nTheme: ${darkMode ? 'Dark' : 'Light'}`;
        triggerTelegramNotification(msg);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [portfolio.integrations.visitAlertsEnabled]);

  // Submit Contact Form
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;

    setIsSendingMessage(true);

    const newMsg: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: contactForm.name,
      email: contactForm.email,
      subject: contactForm.subject || 'Direct Inquiry',
      message: contactForm.message,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      isRead: false
    };

    // 1. Dispatch dynamic alert messages
    const tgAlert = `✉️ <b>New Contact Form Submission</b>\n\n<b>From:</b> ${newMsg.name}\n<b>Email:</b> ${newMsg.email}\n<b>Subject:</b> ${newMsg.subject}\n<b>Message:</b>\n<i>${newMsg.message}</i>`;
    const emailAlertBody = `New Inquiry received:\n\nName: ${newMsg.name}\nEmail: ${newMsg.email}\nSubject: ${newMsg.subject}\nMessage:\n${newMsg.message}`;

    await Promise.all([
      triggerTelegramNotification(tgAlert),
      triggerEmailNotification(`Portfolio Contact: ${newMsg.subject}`, emailAlertBody)
    ]);

    // 2. Save locally
    const updated = [newMsg, ...messages];
    saveMessagesToLocal(updated);
    setIsSendingMessage(false);
    setLastSubmittedMessage(newMsg);
    setShowAutoReply(true);
    setContactForm({ name: '', email: '', subject: '', message: '' });

    setTimeout(() => {
      setShowAutoReply(false);
    }, 12000);
  };

  // File analysis loaders
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFileForAnalysis(file);
  };

  const processFileForAnalysis = (file: File) => {
    setAnalysisFileName(file.name);
    setAnalysisError('');
    const reader = new FileReader();
    reader.onload = async (event) => {
      const result = event.target?.result as string;
      if (!result) return;
      triggerGeminiAnalysis(result.split(',')[1], file.type);
    };
    reader.readAsDataURL(file);
  };

  const triggerGeminiAnalysis = async (base64Data: string, fileType: string) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setAnalysisError('');
    try {
      const res = await fetch('/api/analyze-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ base64File: base64Data, fileType, lang })
      });
      if (!res.ok) throw new Error('API server returned error during analysis.');
      const data = await res.json();
      setAnalysisResult(data);
    } catch (err: any) {
      console.error(err);
      setAnalysisError(lang === 'ar' ? 'فشل تحليل الملف. يرجى كتابة النبذة يدوياً.' : 'Analysis failed. Please paste details instead.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAnalyzePasted = async () => {
    if (!pastedBio.trim()) return;
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setAnalysisError('');
    setAnalysisFileName('Pasted Bio');
    try {
      const base64Bio = btoa(unescape(encodeURIComponent(pastedBio)));
      const res = await fetch('/api/analyze-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ base64File: base64Bio, fileType: 'text/plain', lang })
      });
      if (!res.ok) throw new Error('API failed');
      const data = await res.json();
      setAnalysisResult(data);
    } catch (err) {
      console.error(err);
      setAnalysisError(lang === 'ar' ? 'فشل تحليل النص.' : 'Text analysis failed.');
    } finally {
      setIsAnalyzing(false);
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

  const handleResetToDefault = () => {
    if (window.confirm(lang === 'ar' ? 'هل أنت متأكد من استعادة البيانات الافتراضية؟' : 'Are you sure?')) {
      savePortfolioToLocal(initialPortfolioData);
      saveMessagesToLocal(initialMessages);
      fetch('/api/reset-portfolio', { method: 'POST' }).catch(err => console.error(err));
      setIsAdminUnlocked(false);
      setShowAdminPanel(false);
      setAdminCode('');
    }
  };

  const handleImageUploadFromDevice = async (e: React.ChangeEvent<HTMLInputElement>, targetField: 'portrait' | 'office') => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingImage(true);

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Data = event.target?.result as string;
      if (!base64Data) return;

      try {
        const res = await fetch('/api/upload-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ base64Data, fileName: file.name })
        });
        const data = await res.json();
        if (data.success && data.imageUrl) {
          if (targetField === 'portrait') setCustomPortrait(data.imageUrl);
          else setCustomOffice(data.imageUrl);
        } else {
          if (targetField === 'portrait') setCustomPortrait(base64Data);
          else setCustomOffice(base64Data);
        }
      } catch (err) {
        console.error('Upload error:', err);
        if (targetField === 'portrait') setCustomPortrait(base64Data);
        else setCustomOffice(base64Data);
      } finally {
        setIsUploadingImage(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const updated: PortfolioData = {
      ...portfolio,
      name: formData.get('profile_name') as string || portfolio.name,
      portraitImage: customPortrait || (formData.get('portrait_image') as string) || portfolio.portraitImage,
      officeImage: customOffice || (formData.get('office_image') as string) || portfolio.officeImage,
      title: {
        en: formData.get('title_en') as string || portfolio.title.en,
        ar: formData.get('title_ar') as string || portfolio.title.ar,
        de: formData.get('title_de') as string || portfolio.title.de,
      },
      summary: {
        en: formData.get('summary_en') as string || portfolio.summary.en,
        ar: formData.get('summary_ar') as string || portfolio.summary.ar,
        de: formData.get('summary_de') as string || portfolio.summary.de,
      },
      contact: {
        email: formData.get('email') as string || portfolio.contact.email,
        phone: formData.get('phone') as string || portfolio.contact.phone,
        location: {
          en: formData.get('loc_en') as string || portfolio.contact.location.en,
          ar: formData.get('loc_ar') as string || portfolio.contact.location.ar,
          de: formData.get('loc_de') as string || portfolio.contact.location.de,
        }
      },
      socials: {
        github: formData.get('github') as string || portfolio.socials.github,
        telegram: formData.get('telegram') as string || portfolio.socials.telegram,
        whatsapp: formData.get('whatsapp') as string || portfolio.socials.whatsapp,
        twitter: formData.get('twitter') as string || portfolio.socials.twitter,
        linkedin: formData.get('linkedin') as string || portfolio.socials.linkedin,
      }
    };
    savePortfolioToLocal(updated);
    alert(lang === 'ar' ? 'تم حفظ التعديلات والصورة الشخصية بنجاح!' : 'Settings and profile photo saved successfully!');
  };

  const handleSaveExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp) return;
    let updated = [...portfolio.experiences];
    if (isEditingNewExp) {
      updated = [editingExp, ...updated];
    } else {
      updated = updated.map(ex => ex.id === editingExp.id ? editingExp : ex);
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

  const handleUpdateIntegrations = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const updated: PortfolioData = {
      ...portfolio,
      integrations: {
        telegramEnabled: formData.get('telegram_enabled') === 'on',
        telegramBotToken: formData.get('telegram_token') as string || '',
        telegramChatId: formData.get('telegram_chatid') as string || '',
        emailEnabled: formData.get('email_enabled') === 'on',
        emailAlertAddress: formData.get('email_address') as string || '',
        visitAlertsEnabled: formData.get('visit_alerts') === 'on',
      }
    };
    savePortfolioToLocal(updated);
    alert('Integrations saved!');
  };

  const triggerTestTelegram = async () => {
    const text = `⚡️ <b>Test Notification from Amro Nazzal Portfolio</b>\nYour Telegram integration works flawlessly!`;
    try {
      await fetch('/api/notify-telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          botToken: portfolio.integrations.telegramBotToken,
          chatId: portfolio.integrations.telegramChatId,
          message: text
        })
      });
      alert('Test alert dispatched! Check Telegram Chat.');
    } catch (e: any) {
      alert(`Test failed: ${e.message}`);
    }
  };

  const getFilteredExperiences = () => {
    if (activeExperienceTab === 'all') return portfolio.experiences;
    return portfolio.experiences.filter(ex => {
      if (activeExperienceTab === 'bmw') return ex.company.toLowerCase().includes('bmw');
      if (activeExperienceTab === 'sahli') return ex.company.toLowerCase().includes('sahli');
      if (activeExperienceTab === 'aljawaden') return ex.company.toLowerCase().includes('aljawaden');
      if (activeExperienceTab === 'chief') return ex.role.en.toLowerCase().includes('chief') || ex.role.de.toLowerCase().includes('leiter') || ex.role.ar.includes('رئيس');
      return true;
    });
  };

  const downloadCvFile = (chosenLang: 'en' | 'ar' | 'de') => {
    const pdfUrl = chosenLang === 'de'
      ? '/Amro_Nazzal_Lebenslauf_DE.pdf'
      : '/Amro_Nazzal_CV_EN.pdf';

    const filename = chosenLang === 'de'
      ? 'Amro_Nazzal_Lebenslauf_DE.pdf'
      : chosenLang === 'ar'
      ? 'Amro_Nazzal_CV_AR.pdf'
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
      <div className="hidden print:block p-8 bg-white text-black font-serif text-xs leading-relaxed" style={{ direction: cvLanguage === 'ar' ? 'rtl' : 'ltr' }}>
        <div className="border-b-2 border-slate-800 pb-3 mb-4 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold tracking-tight font-display">{portfolio.name}</h1>
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
                  <span>{exp.period}</span>
                </div>
                <p className="text-slate-500 italic text-[9px] mb-1">{exp.location[cvLanguage]}</p>
                <ul className="list-disc pl-4 pr-4 space-y-1 text-slate-800 text-[9.5px]">
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
                  <p className="text-slate-500">{edu.period} &middot; {edu.school[cvLanguage]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-300 mt-6 pt-2 text-center text-[8px] text-slate-400">
          Generated via Amro Nazzal Corporate Portfolio Platform &middot; {portfolio.contact.email}
        </div>
      </div>

      {/* HEADER NAVIGATION BAR */}
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
            <a href="#experience" onClick={() => setActiveSection('experience')} className={`hover:text-amber-600 transition-colors ${activeSection === 'experience' ? 'text-amber-600 font-bold' : 'text-slate-600 dark:text-zinc-400'}`}>
              {translations[lang].navExperience}
            </a>
            <a href="#skills" onClick={() => setActiveSection('skills')} className={`hover:text-amber-600 transition-colors ${activeSection === 'skills' ? 'text-amber-600 font-bold' : 'text-slate-600 dark:text-zinc-400'}`}>
              {translations[lang].navSkills}
            </a>
            <a href="#projects" onClick={() => setActiveSection('projects')} className={`hover:text-amber-600 transition-colors ${activeSection === 'projects' ? 'text-amber-600 font-bold' : 'text-slate-600 dark:text-zinc-400'}`}>
              {translations[lang].navProjects}
            </a>
            <a href="#github" onClick={() => setActiveSection('github')} className={`hover:text-amber-600 transition-colors ${activeSection === 'github' ? 'text-amber-600 font-bold' : 'text-slate-600 dark:text-zinc-400'}`}>
              GitHub
            </a>
            <a href="#contact" onClick={() => setActiveSection('contact')} className={`hover:text-amber-600 transition-colors ${activeSection === 'contact' ? 'text-amber-600 font-bold' : 'text-slate-600 dark:text-zinc-400'}`}>
              {translations[lang].navContact}
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-200/50 dark:bg-slate-800/80 rounded-lg p-0.5 border border-slate-300/40 dark:border-slate-700/60">
              <button onClick={() => setLang('en')} className={`px-2 py-1 text-[10px] font-bold rounded ${lang === 'en' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'}`}>EN</button>
              <button onClick={() => setLang('ar')} className={`px-2 py-1 text-[10px] font-bold rounded ${lang === 'ar' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-arabic' : 'text-slate-500'}`}>عربي</button>
              <button onClick={() => setLang('de')} className={`px-2 py-1 text-[10px] font-bold rounded ${lang === 'de' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'}`}>DE</button>
            </div>

            <button onClick={handleToggleDarkMode} className="p-1.5 rounded-lg border border-slate-300/50 dark:border-slate-700/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-zinc-300 transition-colors">
              {darkMode ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            <button onClick={() => setShowAdminPanel(!showAdminPanel)} className={`p-1.5 rounded-lg border transition-all ${showAdminPanel ? 'bg-amber-600 text-white border-amber-600' : 'border-slate-300/50 dark:border-slate-700/60 text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
              <Lock size={13} />
            </button>
          </div>
        </div>
      </header>

      {/* ON-SCREEN DIGITAL CV DOCUMENT VIEWER OVERLAY */}
      {onScreenCvLang && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0a0a0c]/95 backdrop-blur-md flex justify-center p-4 sm:p-8 print:hidden" dir={onScreenCvLang === 'ar' ? 'rtl' : 'ltr'}>
          <div className="max-w-4xl w-full bg-white text-black p-6 sm:p-12 rounded-2xl shadow-2xl relative border border-slate-100 flex flex-col justify-between h-fit animate-in fade-in zoom-in-95 duration-200">
            {/* Close & Action floating panel */}
            <div className={`absolute top-4 ${onScreenCvLang === 'ar' ? 'left-4' : 'right-4'} flex gap-2`}>
              <button 
                onClick={() => {
                  setCvLanguage(onScreenCvLang);
                  setTimeout(() => window.print(), 100);
                }}
                className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all flex items-center gap-1 shadow-md hover:scale-[1.02]"
              >
                <FileDown size={12} />
                <span>{onScreenCvLang === 'ar' ? 'طباعة / PDF' : onScreenCvLang === 'de' ? 'Drucken / PDF' : 'Print / PDF'}</span>
              </button>
              <button 
                onClick={() => setOnScreenCvLang(null)}
                className="bg-slate-800 hover:bg-slate-900 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all flex items-center gap-1 shadow-md hover:scale-[1.02]"
              >
                <X size={12} />
                <span>{onScreenCvLang === 'ar' ? 'إغلاق' : onScreenCvLang === 'de' ? 'Schließen' : 'Close'}</span>
              </button>
            </div>

            {/* Document Content */}
            <div className="font-serif text-[11px] leading-relaxed mt-10 bg-white p-2">
              <div className="border-b-2 border-slate-800 pb-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-sans">{portfolio.name}</h1>
                  <p className="text-xs uppercase tracking-wider text-amber-600 font-bold mt-1 font-mono">{portfolio.title[onScreenCvLang]}</p>
                </div>
                <div className={`text-[10.5px] text-slate-700 space-y-0.5 ${onScreenCvLang === 'ar' ? 'text-right' : 'text-left sm:text-right'}`}>
                  <p>📧 {portfolio.contact.email}</p>
                  <p>📞 {portfolio.contact.phone}</p>
                  <p>📍 {portfolio.contact.location[onScreenCvLang]}</p>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-sm font-bold uppercase border-b border-slate-300 pb-1 mb-2 tracking-wider text-slate-800 font-sans">{onScreenCvLang === 'ar' ? 'الملخص المهني' : onScreenCvLang === 'de' ? 'Berufliches Profil' : 'Professional Profile'}</h2>
                <p className="text-justify text-[11px] text-slate-700 leading-relaxed font-sans">{portfolio.summary[onScreenCvLang]}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-5">
                  <h2 className="text-sm font-bold uppercase border-b border-slate-300 pb-1 mb-3 tracking-wider text-slate-800 font-sans">{onScreenCvLang === 'ar' ? 'الخبرة المهنية' : onScreenCvLang === 'de' ? 'Berufserfahrung' : 'Work Experience'}</h2>
                  {portfolio.experiences.map((exp) => (
                    <div key={exp.id} className="text-[11px] space-y-1">
                      <div className="flex justify-between font-bold text-slate-900 font-sans text-xs">
                        <span>{exp.company} &middot; {exp.role[onScreenCvLang]}</span>
                        <span className="font-mono text-[10px] shrink-0">{exp.period}</span>
                      </div>
                      <p className="text-amber-600 italic text-[10px] mt-0.5">{exp.location[onScreenCvLang]}</p>
                      <ul className="list-disc pl-4 pr-4 space-y-1 text-slate-700 text-[10.5px] mt-1.5 text-justify font-sans">
                        {exp.highlights[onScreenCvLang].map((hl, idx) => (
                          <li key={idx}>{hl}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="md:col-span-1 space-y-6">
                  <div>
                    <h2 className="text-sm font-bold uppercase border-b border-slate-300 pb-1 mb-3 tracking-wider text-slate-800 font-sans">{onScreenCvLang === 'ar' ? 'الكفاءات الأساسية' : onScreenCvLang === 'de' ? 'Kompetenzen' : 'Core Skills'}</h2>
                    {portfolio.skills.map((cat) => (
                      <div key={cat.id} className="mb-3">
                        <p className="font-bold text-[9px] text-slate-500 uppercase border-b border-slate-100 pb-0.5 mb-1.5 font-sans">{cat.title[onScreenCvLang]}</p>
                        <ul className="space-y-1 text-[10.5px] text-slate-700 font-sans">
                          {cat.skills.map((sk, idx) => (
                            <li key={idx} className="flex justify-between items-center">
                              <span>{sk.name}</span>
                              <span className="font-mono text-[9px] text-amber-600 font-bold">{sk.level}/5</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h2 className="text-sm font-bold uppercase border-b border-slate-300 pb-1 mb-3 tracking-wider text-slate-800 font-sans">{onScreenCvLang === 'ar' ? 'المؤهلات العلمية' : onScreenCvLang === 'de' ? 'Akademische Ausbildung' : 'Education'}</h2>
                    {portfolio.education.map((edu) => (
                      <div key={edu.id} className="mb-3 text-[10.5px] space-y-0.5 font-sans">
                        <p className="font-bold text-slate-800">{edu.degree[onScreenCvLang]}</p>
                        <p className="text-slate-500 font-mono text-[9px]">{edu.period}</p>
                        <p className="text-slate-400 italic">{edu.school[onScreenCvLang]}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 mt-10 pt-4 text-center text-[9px] text-slate-400 font-mono">
                Generated dynamically via Amro Nazzal Executive Systems Platform &middot; info@amrodev.com
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADMIN CMS CONTROL PANEL */}
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
                      {/* Avatar Portrait Upload Section */}
                      <div className="p-3 bg-slate-50 dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                        <label className="block text-[10px] uppercase text-amber-600 font-bold">
                          {lang === 'ar' ? 'الصورة الشخصية (Portrait Photo)' : 'Avatar Portrait Image'}
                        </label>
                        <div className="flex items-center gap-3">
                          <img 
                            src={customPortrait || portfolio.portraitImage} 
                            alt="Portrait Preview" 
                            className="w-14 h-14 rounded-full object-cover border-2 border-amber-600 shadow-sm shrink-0" 
                          />
                          <div className="flex-1 space-y-1.5">
                            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors shadow-sm">
                              <Upload size={13} />
                              <span>{isUploadingImage ? (lang === 'ar' ? 'جاري الرفع...' : 'Uploading...') : (lang === 'ar' ? 'رفع صورة من الجهاز' : 'Upload from Device')}</span>
                              <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={(e) => handleImageUploadFromDevice(e, 'portrait')} 
                              />
                            </label>
                            <input 
                              type="text" 
                              name="portrait_image" 
                              value={customPortrait} 
                              onChange={(e) => setCustomPortrait(e.target.value)} 
                              placeholder="or enter Image URL..." 
                              className="w-full text-xs px-2.5 py-1 border rounded dark:bg-slate-900 dark:border-slate-700 font-mono text-[10px]" 
                            />
                          </div>
                        </div>
                      </div>

                      {/* Office Image Upload Section */}
                      <div className="p-3 bg-slate-50 dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                        <label className="block text-[10px] uppercase text-amber-600 font-bold">
                          {lang === 'ar' ? 'صورة خلفية المكتب (Office Background)' : 'Office Background Image'}
                        </label>
                        <div className="flex items-center gap-3">
                          <img 
                            src={customOffice || portfolio.officeImage} 
                            alt="Office Preview" 
                            className="w-14 h-14 rounded-lg object-cover border border-slate-300 dark:border-slate-700 shadow-sm shrink-0" 
                          />
                          <div className="flex-1 space-y-1.5">
                            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-800 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors shadow-sm">
                              <Upload size={13} />
                              <span>{lang === 'ar' ? 'رفع صورة خلفية' : 'Upload Background'}</span>
                              <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={(e) => handleImageUploadFromDevice(e, 'office')} 
                              />
                            </label>
                            <input 
                              type="text" 
                              name="office_image" 
                              value={customOffice} 
                              onChange={(e) => setCustomOffice(e.target.value)} 
                              placeholder="or enter Image URL..." 
                              className="w-full text-xs px-2.5 py-1 border rounded dark:bg-slate-900 dark:border-slate-700 font-mono text-[10px]" 
                            />
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

                    <div className="col-span-1 md:col-span-2 flex justify-end pt-2">
                      <button type="submit" className="bg-amber-600 text-white px-6 py-2 rounded-lg text-xs font-bold uppercase hover:opacity-90 transition-opacity">
                        Save Info
                      </button>
                    </div>
                  </form>
                )}

                {/* Tab: EXPERIENCES CMS */}
                {adminTab === 'experiences' && (
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
                          <textarea placeholder="Highlights (EN) - Separate with semicolons" value={editingExp.highlights.en.join('; ')} onChange={(e) => setEditingExp({...editingExp, highlights: {...editingExp.highlights, en: e.target.value.split(';').map(x => x.trim())}})} className="w-full text-xs p-2 border rounded dark:bg-slate-900 dark:border-slate-700" rows={2} />
                          <textarea placeholder="Highlights (AR) - Separate with semicolons" value={editingExp.highlights.ar.join('; ')} onChange={(e) => setEditingExp({...editingExp, highlights: {...editingExp.highlights, ar: e.target.value.split(';').map(x => x.trim())}})} className="w-full text-xs p-2 border rounded dark:bg-slate-900 dark:border-slate-700 font-arabic" dir="rtl" rows={2} />
                          <textarea placeholder="Highlights (DE) - Separate with semicolons" value={editingExp.highlights.de.join('; ')} onChange={(e) => setEditingExp({...editingExp, highlights: {...editingExp.highlights, de: e.target.value.split(';').map(x => x.trim())}})} className="w-full text-xs p-2 border rounded dark:bg-slate-900 dark:border-slate-700" rows={2} />
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
                )}

                {/* Tab: PROJECTS CMS */}
                {adminTab === 'projects' && (
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
                          <input type="text" placeholder="Image URL" value={editingProj.image} onChange={(e) => setEditingProj({...editingProj, image: e.target.value})} className="text-xs p-2 border rounded dark:bg-slate-900 dark:border-slate-700 text-[10px] font-mono" />
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
                          <div className="truncate pr-2">
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
                )}

                {/* Tab: EDUCATION CMS */}
                {adminTab === 'education' && (
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
                          <div className="truncate pr-2">
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
                )}

                {/* Tab: SKILLS CMS */}
                {adminTab === 'skills' && (
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
                                newSkills[idx].name = e.target.value;
                                setEditingSkillCat({...editingSkillCat, skills: newSkills});
                              }} className="text-xs flex-1 p-2 border rounded dark:bg-slate-900 dark:border-slate-700" placeholder="Skill Name" />
                              <select value={sk.level} onChange={(e) => {
                                const newSkills = [...editingSkillCat.skills];
                                newSkills[idx].level = parseInt(e.target.value);
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
                            <button onClick={() => setEditingSkillCat(sc)} className="text-xs bg-amber-600/10 text-amber-600 font-bold px-2.5 py-1 rounded-md hover:bg-amber-600/20 transition-all flex items-center gap-1">
                              <Eye size={12} /> Edit
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Tab: INTEGRATIONS */}
                {adminTab === 'integrations' && (
                  <form onSubmit={handleUpdateIntegrations} className="space-y-4 bg-white dark:bg-[#181822] p-6 rounded-xl border border-slate-200 dark:border-slate-800/60">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between border-b pb-1.5">
                          <p className="text-xs font-bold uppercase text-amber-600">Telegram Bot Integration</p>
                          <input type="checkbox" name="telegram_enabled" defaultChecked={portfolio.integrations.telegramEnabled} className="h-4 w-4 accent-amber-600" />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase text-slate-400 font-bold mb-1">Telegram Bot Token (from @BotFather)</label>
                          <input type="password" name="telegram_token" defaultValue={portfolio.integrations.telegramBotToken} className="w-full text-xs px-3 py-2 border rounded dark:bg-slate-900 dark:border-slate-700 font-mono text-[10px]" />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase text-slate-400 font-bold mb-1">Telegram Chat ID (your unique account Chat ID)</label>
                          <input type="text" name="telegram_chatid" defaultValue={portfolio.integrations.telegramChatId} className="w-full text-xs px-3 py-2 border rounded dark:bg-slate-900 dark:border-slate-700 font-mono text-[10px]" />
                        </div>
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[10px] text-slate-500">Enable Session/Visit Telegram Alerts?</span>
                          <input type="checkbox" name="visit_alerts" defaultChecked={portfolio.integrations.visitAlertsEnabled} className="h-3.5 w-3.5 accent-amber-600" />
                        </div>
                        {portfolio.integrations.telegramBotToken && portfolio.integrations.telegramChatId && (
                          <button type="button" onClick={triggerTestTelegram} className="text-[10px] bg-sky-600/10 text-sky-500 font-bold border border-sky-500/20 px-3 py-1.5 rounded hover:bg-sky-600/20 transition-colors uppercase">
                            Send Test Telegram Message
                          </button>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between border-b pb-1.5">
                          <p className="text-xs font-bold uppercase text-amber-600">Email System Alerts</p>
                          <input type="checkbox" name="email_enabled" defaultChecked={portfolio.integrations.emailEnabled} className="h-4 w-4 accent-amber-600" />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase text-slate-400 font-bold mb-1">Alert Destination Email</label>
                          <input type="email" name="email_address" defaultValue={portfolio.integrations.emailAlertAddress} className="w-full text-xs px-3 py-2 border rounded dark:bg-slate-900 dark:border-slate-700 font-mono text-[10px]" />
                        </div>
                        <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-600/10 text-[10px] leading-relaxed text-slate-500 dark:text-zinc-400">
                          <p className="font-bold mb-1 uppercase">Telegram Bot Setup Guide:</p>
                          <ol className="list-decimal list-inside space-y-1">
                            <li>Find <b>@BotFather</b> on Telegram. Send <code>/newbot</code>.</li>
                            <li>Copy the resulting HTTP API Token and paste it here.</li>
                            <li>Find <b>@userinfobot</b> on Telegram, send a message to retrieve your 10-digit <b>Chat ID</b>, and paste it here.</li>
                            <li>Start a chat with your new bot and click save. You are now connected!</li>
                          </ol>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-2 border-t">
                      <button type="submit" className="bg-amber-600 text-white px-5 py-2 rounded-lg text-xs font-bold uppercase">
                        Save Integrations
                      </button>
                    </div>
                  </form>
                )}

                {/* Tab: INBOX MESSAGES */}
                {adminTab === 'inbox' && (
                  <div className="space-y-3">
                    {messages.length === 0 ? (
                      <p className="text-center py-6 text-xs text-gray-500">{translations[lang].adminNoMessages}</p>
                    ) : (
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {messages.map((m) => (
                          <div key={m.id} className={`p-4 rounded-xl border transition-colors ${m.isRead ? 'bg-white dark:bg-[#14141d] border-slate-200 dark:border-slate-800' : 'bg-amber-500/5 border-amber-600/30'}`}>
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <span className="text-xs font-bold">{m.name}</span>
                                <span className="text-gray-400 text-[10px] block font-mono">{m.email} · {m.date}</span>
                              </div>
                              <div className="flex gap-1 shrink-0">
                                {!m.isRead && (
                                  <button onClick={() => {
                                    saveMessagesToLocal(messages.map(x => x.id === m.id ? { ...x, isRead: true } : x));
                                  }} className="px-2 py-0.5 bg-amber-600 text-white text-[9px] font-bold rounded">
                                    {translations[lang].adminMarkRead}
                                  </button>
                                )}
                                <button onClick={() => {
                                  if(window.confirm('Delete message?')) {
                                    saveMessagesToLocal(messages.filter(x => x.id !== m.id));
                                  }
                                }} className="p-1 text-red-400 hover:text-red-600"><Trash size={12} /></button>
                              </div>
                            </div>
                            <h4 className="text-xs font-bold text-slate-800 dark:text-zinc-200 mb-1">{m.subject}</h4>
                            <p className="text-xs text-slate-600 dark:text-zinc-300 bg-slate-50 dark:bg-slate-900 p-2.5 rounded border border-slate-100 dark:border-slate-800 leading-relaxed text-justify">{m.message}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-end pt-3 border-t">
                  <button onClick={() => setIsAdminUnlocked(false)} className="flex items-center gap-1 text-xs text-red-500 font-bold uppercase">
                    <LogOut size={13} /> Close CMS
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* COMPACT AUTO REPLY DISPATCH POPUP */}
      {showAutoReply && lastSubmittedMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-white dark:bg-[#14141C] border-l-4 border-amber-600 p-4 rounded-r-xl shadow-2xl animate-bounce print:hidden" style={{ direction: textDirection }}>
          <div className="flex gap-3">
            <div className="bg-amber-100 dark:bg-amber-950/40 p-1.5 rounded-lg h-8 w-8 flex items-center justify-center shrink-0">
              <MessageSquare className="text-amber-700 dark:text-amber-400" size={16} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className="text-xs font-bold font-mono text-amber-600 uppercase tracking-wider">{translations[lang].instantResponseTitle}</h4>
                <button onClick={() => setShowAutoReply(false)} className="text-gray-400 hover:text-black dark:hover:text-white"><X size={14} /></button>
              </div>
              <p className="text-xs text-slate-600 dark:text-zinc-300 mt-1 leading-relaxed text-justify">
                {translations[lang].instantResponseText
                  .replace('{name}', lastSubmittedMessage.name)
                  .replace('{subject}', lastSubmittedMessage.subject)
                  .replace('{email}', lastSubmittedMessage.email)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* LANGUAGE SELECTION FOR PRINTING CV MODAL */}
      {showCvModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 print:hidden" style={{ direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
          <div className="bg-white dark:bg-[#14141d] max-w-lg w-full rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4 text-center">
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-xs font-mono text-amber-600 font-bold uppercase tracking-wider">{lang === 'ar' ? 'مركز السيرة الذاتية' : lang === 'de' ? 'Bewerbungs-Center' : 'CV Document Center'}</span>
              <button onClick={() => setShowCvModal(false)} className="text-slate-400 hover:text-black"><X size={18}/></button>
            </div>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              {lang === 'ar' ? 'اختر اللغة المفضلة لعرض السيرة الذاتية على الشاشة أو طباعتها وحفظها كملف PDF:' : lang === 'de' ? 'Wählen Sie Ihre bevorzugte Sprache zum Ansehen oder Drucken als PDF:' : 'Select your preferred language to view on-screen or print/save as a PDF document:'}
            </p>
            <div className="grid grid-cols-1 gap-3 py-2 text-left">
              
              {/* EN Option */}
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between p-3.5 border border-slate-200 dark:border-slate-800 rounded-xl dark:bg-slate-900/60" style={{ direction: 'ltr' }}>
                <div>
                  <span className="font-bold text-xs block text-slate-800 dark:text-zinc-100">English CV / Resume</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">International business profile format</span>
                </div>
                <div className="flex flex-wrap gap-1.5 w-full sm:w-auto shrink-0 mt-2 sm:mt-0">
                  <button onClick={() => { setOnScreenCvLang('en'); setShowCvModal(false); }} className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-zinc-200 rounded-lg text-[10px] font-bold uppercase transition-all">
                    View
                  </button>
                  <button onClick={() => downloadCvFile('en')} className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-[10px] font-bold uppercase transition-all flex items-center justify-center gap-1">
                    <FileDown size={11} /> Download File
                  </button>
                  <button onClick={() => handlePrintCV('en')} className="px-2.5 py-1.5 bg-amber-600 text-white hover:bg-amber-700 rounded-lg text-[10px] font-bold uppercase transition-all flex items-center justify-center gap-1">
                    <FileDown size={11} /> Print / PDF
                  </button>
                </div>
              </div>

              {/* AR Option */}
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between p-3.5 border border-slate-200 dark:border-slate-800 rounded-xl dark:bg-slate-900/60" style={{ direction: 'rtl' }}>
                <div className="text-right">
                  <span className="font-bold text-xs block text-slate-800 dark:text-zinc-100 font-arabic">السيرة الذاتية باللغة العربية</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5 font-arabic">النسخة العربية المعتمدة للمؤسسات الإقليمية</span>
                </div>
                <div className="flex flex-wrap gap-1.5 w-full sm:w-auto shrink-0 mt-2 sm:mt-0 justify-end" style={{ direction: 'ltr' }}>
                  <button onClick={() => { setOnScreenCvLang('ar'); setShowCvModal(false); }} className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-zinc-200 rounded-lg text-[10px] font-bold uppercase transition-all">
                    عرض
                  </button>
                  <button onClick={() => downloadCvFile('ar')} className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-[10px] font-bold uppercase transition-all flex items-center justify-center gap-1 font-arabic">
                    <FileDown size={11} /> تنزيل الملف
                  </button>
                  <button onClick={() => handlePrintCV('ar')} className="px-2.5 py-1.5 bg-amber-600 text-white hover:bg-amber-700 rounded-lg text-[10px] font-bold uppercase transition-all flex items-center justify-center gap-1 font-arabic">
                    <FileDown size={11} /> طباعة وحفظ
                  </button>
                </div>
              </div>

              {/* DE Option */}
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between p-3.5 border border-slate-200 dark:border-slate-800 rounded-xl dark:bg-slate-900/60" style={{ direction: 'ltr' }}>
                <div>
                  <span className="font-bold text-xs block text-slate-800 dark:text-zinc-100">Deutscher Lebenslauf</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Optimiert nach deutschen Bewerbungsstandards</span>
                </div>
                <div className="flex flex-wrap gap-1.5 w-full sm:w-auto shrink-0 mt-2 sm:mt-0">
                  <button onClick={() => { setOnScreenCvLang('de'); setShowCvModal(false); }} className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-zinc-200 rounded-lg text-[10px] font-bold uppercase transition-all">
                    Ansehen
                  </button>
                  <button onClick={() => downloadCvFile('de')} className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-[10px] font-bold uppercase transition-all flex items-center justify-center gap-1">
                    <FileDown size={11} /> Datei Herunterladen
                  </button>
                  <button onClick={() => handlePrintCV('de')} className="px-2.5 py-1.5 bg-amber-600 text-white hover:bg-amber-700 rounded-lg text-[10px] font-bold uppercase transition-all flex items-center justify-center gap-1">
                    <FileDown size={11} /> Drucken / PDF
                  </button>
                </div>
              </div>

            </div>
            <p className="text-[10px] text-slate-400">
              {lang === 'ar' ? 'تلميح: عند الطباعة، قم بتفعيل خيار "رسومات الخلفية" في إعدادات متصفحك لحفظ الألوان والخطوط.' : 'Tip: In the print settings, make sure "Background graphics" is enabled to preserve colors and typography.'}
            </p>
          </div>
        </div>
      )}

      {/* MAIN VIEW */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-16 print:hidden">

        {/* HERO SECTION */}
        <section id="about" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-amber-600">
              <Sparkles size={13} />
              <span>LEIPZIG, GERMANY</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1] text-wrap-balance">
              {translations[lang].heroHeading}
            </h1>
            
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed max-w-2xl text-justify">
              {portfolio.summary[lang]}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a href="#contact" className="px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider bg-[#1A1A1A] dark:bg-amber-600 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-1.5">
                <Mail size={13} />
                <span>{translations[lang].navContact}</span>
              </a>
              <button onClick={() => setShowCvModal(true)} className="px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider bg-white dark:bg-[#1C1C24] text-slate-900 dark:text-white rounded-lg border border-slate-300/60 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors flex items-center gap-1.5">
                <FileDown size={13} />
                <span>{translations[lang].downloadCV}</span>
              </button>
            </div>

            {/* Proof Indicators */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">{translations[lang].keyMetricsTitle}</p>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xl sm:text-2xl font-mono font-bold text-amber-600">{translations[lang].metric1Val}</p>
                  <p className="text-[9px] text-slate-500 mt-1 uppercase tracking-wider leading-tight">{translations[lang].metric1Lbl}</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-mono font-bold text-amber-600">{translations[lang].metric2Val}</p>
                  <p className="text-[9px] text-slate-500 mt-1 uppercase tracking-wider leading-tight">{translations[lang].metric2Lbl}</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-mono font-bold text-amber-600">{translations[lang].metric3Val}</p>
                  <p className="text-[9px] text-slate-500 mt-1 uppercase tracking-wider leading-tight">{translations[lang].metric3Lbl}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Visual Right */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-square max-w-sm mx-auto bg-[#F4F3ED] dark:bg-slate-900/40 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl">
              <img 
                src={portfolio.officeImage} 
                alt="Executive wood bookshelves" 
                className="absolute inset-0 w-full h-full object-cover opacity-20 filter grayscale dark:opacity-10"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-4 rounded-xl overflow-hidden border border-white dark:border-slate-900 bg-white dark:bg-slate-900 shadow-md">
                <img 
                  src={portfolio.portraitImage} 
                  alt="Amro Nazzal studio headshot" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-[#1A1A22]/95 p-3 rounded-lg border border-slate-200/50 dark:border-slate-800 backdrop-blur-sm flex items-center justify-between shadow-sm">
                <div>
                  <p className="text-[10px] font-bold uppercase">{portfolio.name}</p>
                  <p className="text-[9px] text-slate-500 mt-0.5">Leipzig, DE</p>
                </div>
                <div className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[8px] uppercase tracking-wider text-emerald-600 font-bold font-mono">LIVE CONSULTANT</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MARQUEE RIBBON */}
        <div className="w-full overflow-hidden bg-slate-900 dark:bg-amber-600 text-white py-2.5 rounded-xl border border-slate-800 dark:border-amber-700 relative print:hidden">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-12 text-[10px] font-bold tracking-widest uppercase font-mono">
            <span>selected works · finance solutions · full-stack developer · erp systems · accounting audits · optimization · leipzig ·</span>
            <span>selected works · finance solutions · full-stack developer · erp systems · accounting audits · optimization · leipzig ·</span>
          </div>
        </div>

        {/* TIMELINE SECTION */}
        <section id="experience" className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight">{translations[lang].experienceHeader}</h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">{translations[lang].experienceSub}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-1 p-0.5 bg-slate-200/40 dark:bg-slate-900 rounded-lg max-w-md mx-auto border border-slate-200/50 dark:border-slate-800">
            {['all', 'bmw', 'sahli', 'aljawaden', 'chief'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveExperienceTab(tab)} 
                className={`px-3 py-1 text-[10px] font-bold uppercase rounded-md transition-all ${activeExperienceTab === tab ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm font-bold' : 'text-slate-500 hover:text-slate-900'}`}>
                {tab === 'all' ? (lang === 'ar' ? 'الكل' : 'All') : tab === 'chief' ? (lang === 'ar' ? 'رئيس حسابات' : 'Lead') : tab.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {getFilteredExperiences().map((exp) => (
              <div key={exp.id} className="group relative bg-white dark:bg-[#14141C] p-5 rounded-xl border border-slate-200 dark:border-slate-800/80 hover:border-amber-600/30 transition-all duration-300">
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                  <div className="shrink-0 space-y-0.5">
                    <span className="font-mono text-xs font-bold text-amber-600 block">{exp.period}</span>
                    <span className="text-[10px] text-slate-400 block uppercase tracking-wider">{exp.location[lang]}</span>
                  </div>

                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Briefcase size={14} className="text-amber-600 shrink-0" />
                      <h3 className="text-sm font-bold">{exp.company}</h3>
                    </div>
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">{exp.role[lang]}</h4>
                    <ul className="space-y-1 text-xs text-slate-600 dark:text-zinc-300 leading-relaxed list-inside list-disc pt-1.5 pl-1 pr-1 text-justify">
                      {exp.highlights[lang].map((highlight, hIdx) => (
                        <li key={hIdx} className="pl-0.5">{highlight}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CORE SKILLS BENTO SECTION */}
        <section id="skills" className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight">{translations[lang].skillsHeader}</h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">{translations[lang].skillsSub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {portfolio.skills.map((category) => (
              <div key={category.id} className="bg-white dark:bg-[#14141C] p-5 rounded-xl border border-slate-200 dark:border-slate-800/80 flex flex-col justify-between shadow-sm">
                <div>
                  <h3 className="text-[10px] font-bold font-mono uppercase text-amber-600 tracking-wider mb-4 border-b border-slate-200/40 dark:border-slate-800 pb-1.5 flex items-center gap-1.5">
                    <Check size={12} />
                    <span>{category.title[lang]}</span>
                  </h3>
                  <ul className="space-y-2.5">
                    {category.skills.map((sk, idx) => (
                      <li key={idx} className="space-y-1 text-xs">
                        <div className="flex justify-between text-slate-700 dark:text-zinc-300">
                          <span className="font-semibold text-[11px]">{sk.name}</span>
                          <span className="font-mono text-[10px] text-amber-600">{sk.level}/5</span>
                        </div>
                        <div className="h-1 w-full bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden">
                          <div className="h-full bg-slate-800 dark:bg-amber-600" style={{ width: `${(sk.level / 5) * 100}%` }}></div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Academic & Languages Dual Bento */}
          <div className="max-w-5xl mx-auto bg-slate-100/40 dark:bg-[#101015] p-6 rounded-xl border border-slate-200 dark:border-slate-800/80 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-amber-600 mb-3 flex items-center gap-1.5">
                <GraduationCap size={15} />
                <span>{translations[lang].educationTitle}</span>
              </h3>
              <div className="space-y-4 text-xs">
                {portfolio.education.map((edu) => (
                  <div key={edu.id} className="space-y-0.5">
                    <p className="font-bold text-slate-800 dark:text-white">{edu.degree[lang]}</p>
                    <p className="text-slate-400 text-[10px]">{edu.period} &middot; {edu.school[lang]}</p>
                    <p className="text-slate-600 dark:text-zinc-400 text-[11px] text-justify leading-relaxed pt-0.5">{edu.details[lang]}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-amber-600 mb-3 flex items-center gap-1.5">
                <Globe size={14} />
                <span>{translations[lang].languagesTitle}</span>
              </h3>
              <div className="space-y-3 text-xs font-semibold">
                <div className="flex justify-between border-b border-slate-200/50 dark:border-slate-800 pb-1.5">
                  <span>ARABIC (العربية)</span>
                  <span className="text-amber-600">Native / اللغة الأم</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/50 dark:border-slate-800 pb-1.5">
                  <span>ENGLISH</span>
                  <span className="text-amber-600">B2 / Professional Fluency</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/50 dark:border-slate-800 pb-1.5">
                  <span>GERMAN (DEUTSCH)</span>
                  <span className="text-amber-600">B1 / Active expansion to B2/C1</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PORTFOLIO PROJECTS SYSTEMS HUB */}
        <section id="projects" className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight">{translations[lang].projectsHeader}</h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">{translations[lang].projectsSub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {portfolio.projects.map((project) => (
              <div key={project.id} className="bg-white dark:bg-[#14141C] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800/80 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="relative aspect-[4/3] bg-slate-50 dark:bg-slate-950 overflow-hidden border-b border-slate-200/60 dark:border-slate-800/60">
                  <img src={project.image} alt={project.title[lang]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  <span className="absolute top-3 right-3 bg-white/95 dark:bg-[#1A1A22]/95 border border-slate-200 dark:border-slate-800 text-[9px] font-bold px-2 py-0.5 rounded tracking-wide uppercase">
                    {project.category[lang]}
                  </span>
                </div>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight">{project.title[lang]}</h3>
                    <p className="text-[11px] text-slate-600 dark:text-zinc-300 text-justify leading-relaxed">{project.description[lang]}</p>
                  </div>

                  <div className="space-y-2.5 pt-1">
                    <div className="flex flex-wrap gap-1.5 text-[9px] font-mono text-slate-400 uppercase">
                      {project.tech.map((tc, idx) => (
                        <span key={idx}>{tc} {idx < project.tech.length - 1 ? '·' : ''}</span>
                      ))}
                    </div>
                    <div className="border-t border-slate-100 dark:border-slate-800/80 pt-2 flex items-center justify-between text-[11px]">
                      <span className="font-bold text-amber-600">{project.metrics[lang]}</span>
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline text-[9px] uppercase font-bold text-slate-500 hover:text-amber-600 shrink-0">
                        <span>{translations[lang].viewProjectBtn}</span>
                        <ExternalLink size={10} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* GITHUB CONTRIBUTIONS & ACTIVITY HUB (LAST YEAR) */}
        <section id="github" className="bg-[#FAF9F5]/80 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-2xl max-w-4xl mx-auto space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-200 dark:border-slate-800/80">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-display font-bold tracking-tight flex items-center gap-2">
                <Github size={22} className="text-amber-600" />
                <span>{translations[lang].githubHeader}</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">{translations[lang].githubSub}</p>
            </div>
            {portfolio.socials.github && (
              <a href={portfolio.socials.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-bold uppercase text-amber-600 hover:underline shrink-0 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-600/20">
                <span>{translations[lang].githubViewAll}</span>
                <ExternalLink size={13} />
              </a>
            )}
          </div>

          {/* GitHub Stats Cards Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-white dark:bg-[#14141C] border border-slate-200 dark:border-slate-800 rounded-xl text-center">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">{lang === 'ar' ? 'المستودعات العامة' : lang === 'de' ? 'Öffentliche Repos' : 'Public Repos'}</span>
              <span className="text-lg font-bold text-amber-600 font-mono">{githubUser?.public_repos || 66}</span>
            </div>
            <div className="p-3 bg-white dark:bg-[#14141C] border border-slate-200 dark:border-slate-800 rounded-xl text-center">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">{lang === 'ar' ? 'المتابعون' : lang === 'de' ? 'Follower' : 'Followers'}</span>
              <span className="text-lg font-bold text-amber-600 font-mono">{githubUser?.followers || 81}</span>
            </div>
            <div className="p-3 bg-white dark:bg-[#14141C] border border-slate-200 dark:border-slate-800 rounded-xl text-center">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">{lang === 'ar' ? 'النشاط التراكمي' : lang === 'de' ? 'Aktivität' : 'Active Since'}</span>
              <span className="text-lg font-bold text-amber-600 font-mono">2014</span>
            </div>
            <div className="p-3 bg-white dark:bg-[#14141C] border border-slate-200 dark:border-slate-800 rounded-xl text-center">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">{lang === 'ar' ? 'الموقع' : lang === 'de' ? 'Standort' : 'Location'}</span>
              <span className="text-sm font-bold text-slate-700 dark:text-zinc-200 truncate block mt-1">{githubUser?.location || 'Germany'}</span>
            </div>
          </div>

          {/* Contribution Calendar Heatmap Graph */}
          <div className="p-4 sm:p-5 bg-white dark:bg-[#14141C] rounded-xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-inner">
            <div className="flex justify-between items-center text-xs border-b border-slate-100 dark:border-slate-800/80 pb-2">
              <span className="font-bold text-slate-700 dark:text-zinc-200 flex items-center gap-1.5">
                <Calendar size={14} className="text-amber-600" />
                {lang === 'ar' ? 'خارطة مساهمات غيتهوب (الـ 365 يوماً الماضية)' : lang === 'de' ? 'GitHub Beiträge der letzten 365 Tage' : 'Last 1 Year Contributions Heatmap'}
              </span>
              <span className="text-[10px] font-mono text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded font-bold">@amr88nzzal</span>
            </div>
            <div className="overflow-x-auto py-2 flex justify-center items-center">
              <img 
                src="https://ghchart.rshah.org/d97706/amr88nzzal" 
                alt="Amro Nazzal GitHub Contributions Chart" 
                className="min-w-[650px] w-full h-auto dark:invert dark:hue-rotate-180 dark:brightness-110 contrast-125"
              />
            </div>
            <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono pt-1">
              <span>Less</span>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-sm bg-amber-200 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-sm bg-amber-400 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-sm bg-amber-600 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-sm bg-amber-800 inline-block"></span>
              </div>
              <span>More</span>
            </div>
          </div>

          {/* Recent Live Contribution Activity Stream */}
          {githubEvents.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
                <RefreshCw size={12} className="text-amber-600" />
                <span>{lang === 'ar' ? 'أحدث المساهمات والأنشطة البرمجية المباشرة' : lang === 'de' ? 'Neueste GitHub-Aktivitäten & Commits' : 'Recent Live Activity Stream'}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {githubEvents.slice(0, 4).map((evt: any) => (
                  <div key={evt.id} className="p-3 bg-white dark:bg-[#14141C] border border-slate-200 dark:border-slate-800 rounded-xl space-y-1 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[10px] font-bold text-amber-600 truncate">{evt.repo?.name || 'GitHub Repo'}</span>
                      <span className="text-[9px] font-mono text-slate-400">{new Date(evt.created_at).toLocaleDateString()}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-zinc-300 font-sans line-clamp-1">
                      {evt.type === 'PushEvent' ? `Pushed commits to ${evt.payload?.ref?.replace('refs/heads/', '') || 'main'}` :
                       evt.type === 'CreateEvent' ? `Created ${evt.payload?.ref_type || 'repository'}` :
                       evt.type === 'WatchEvent' ? 'Starred repository' : 'Contributed to codebase'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-[#14141C] p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm space-y-6">
            <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white">{translations[lang].contactHeader}</h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">{translations[lang].contactSub}</p>
            </div>

            {/* Direct Social & Quick Connect Buttons */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200/60 dark:border-slate-800 text-xs font-bold">
              <a href={portfolio.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 text-emerald-600 rounded-lg border border-emerald-500/20 hover:bg-emerald-500/20 transition-all">
                <MessageCircle size={15} /> WhatsApp
              </a>
              <a href={portfolio.socials.telegram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-500/10 text-sky-600 rounded-lg border border-sky-500/20 hover:bg-sky-500/20 transition-all">
                <SendHorizontal size={15} /> Telegram
              </a>
              <a href={`mailto:${portfolio.contact.email}`} className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 text-amber-600 rounded-lg border border-amber-500/20 hover:bg-amber-500/20 transition-all">
                <Mail size={15} /> {portfolio.contact.email}
              </a>
              <a href={`tel:${portfolio.contact.phone}`} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-200/50 dark:bg-slate-800 text-slate-700 dark:text-zinc-200 rounded-lg border border-slate-300/40 dark:border-slate-700 hover:bg-slate-200 transition-all">
                <Phone size={15} /> {portfolio.contact.phone}
              </a>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{translations[lang].formName}</label>
                  <input type="text" required value={contactForm.name} onChange={(e) => setContactForm({...contactForm, name: e.target.value})} placeholder="Dr. Michael Weber" className="w-full text-xs p-3 border rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:outline-none focus:border-amber-600" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{translations[lang].formEmail}</label>
                  <input type="email" required value={contactForm.email} onChange={(e) => setContactForm({...contactForm, email: e.target.value})} placeholder="m.weber@fintech.de" className="w-full text-xs p-3 border rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:outline-none focus:border-amber-600" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{translations[lang].formSubject}</label>
                <input type="text" value={contactForm.subject} onChange={(e) => setContactForm({...contactForm, subject: e.target.value})} placeholder="e.g. Collaboration on POS ledgers" className="w-full text-xs p-3 border rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:outline-none focus:border-amber-600" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{translations[lang].formMessage}</label>
                <textarea rows={4} required value={contactForm.message} onChange={(e) => setContactForm({...contactForm, message: e.target.value})} placeholder="Write your proposal or query here..." className="w-full text-xs p-3 border rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:outline-none focus:border-amber-600 resize-none" />
              </div>

              <button type="submit" disabled={isSendingMessage} className="w-full bg-[#1A1A1A] hover:bg-black dark:bg-amber-600 dark:hover:bg-amber-700 text-white py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50">
                {isSendingMessage ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    <span>{translations[lang].formSending}</span>
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    <span>{translations[lang].formSend}</span>
                  </>
                )}
              </button>
            </form>

            {/* Instant Auto-Response Notification Block */}
            {showAutoReply && lastSubmittedMessage && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-2 animate-in fade-in">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs">
                  <ShieldCheck size={16} />
                  <span>{translations[lang].instantResponseTitle}</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-zinc-300 leading-relaxed text-justify">
                  {translations[lang].instantResponseText
                    .replace('{name}', lastSubmittedMessage.name)
                    .replace('{subject}', lastSubmittedMessage.subject || 'General Inquiry')
                    .replace('{email}', lastSubmittedMessage.email)}
                </p>
              </div>
            )}
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-50 dark:bg-[#08080C] border-t border-slate-200 dark:border-slate-900 py-8 print:hidden transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <span className="text-xs font-bold font-mono text-amber-600 uppercase tracking-wider">{portfolio.name}</span>
            <p className="text-[9px] text-slate-400 mt-0.5">&copy; 2026. Certified SSL Secured. info@amrodev.com</p>
          </div>
          <div className="flex gap-4 text-[10px] font-bold uppercase tracking-wider">
            <a href={portfolio.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-amber-600 transition-colors flex items-center gap-1">
              <span>GitHub</span> <ExternalLink size={8} />
            </a>
            <a href={portfolio.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-amber-600 transition-colors flex items-center gap-1">
              <span>LinkedIn</span> <ExternalLink size={8} />
            </a>
            <a href={`mailto:${portfolio.contact.email}`} className="hover:text-amber-600 transition-colors flex items-center gap-1">
              <span>Email</span> <ExternalLink size={8} />
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}

export interface WorkExperience {
  id: string;
  period: string;
  company: string;
  location: {
    en: string;
    ar: string;
    de: string;
  };
  role: {
    en: string;
    ar: string;
    de: string;
  };
  highlights: {
    en: string[];
    ar: string[];
    de: string[];
  };
}

export interface EducationItem {
  id: string;
  degree: {
    en: string;
    ar: string;
    de: string;
  };
  school: {
    en: string;
    ar: string;
    de: string;
  };
  period: string;
  details: {
    en: string;
    ar: string;
    de: string;
  };
}

export interface SkillCategory {
  id: string;
  title: {
    en: string;
    ar: string;
    de: string;
  };
  skills: {
    name: string;
    level: number; // 1-5 or percentage
  }[];
}

export interface Project {
  id: string;
  title: {
    en: string;
    ar: string;
    de: string;
  };
  category: {
    en: string;
    ar: string;
    de: string;
  };
  description: {
    en: string;
    ar: string;
    de: string;
  };
  tech: string[];
  image: string;
  link: string;
  metrics: {
    en: string;
    ar: string;
    de: string;
  };
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  isRead: boolean;
}

export interface SocialLinks {
  github: string;
  telegram: string;
  whatsapp: string;
  twitter: string;
  linkedin: string;
}

export interface IntegrationsConfig {
  telegramEnabled: boolean;
  telegramBotToken: string;
  telegramChatId: string;
  emailEnabled: boolean;
  emailAlertAddress: string;
  visitAlertsEnabled: boolean;
}

export interface PortfolioData {
  name: string;
  portraitImage: string;
  officeImage: string;
  title: {
    en: string;
    ar: string;
    de: string;
  };
  summary: {
    en: string;
    ar: string;
    de: string;
  };
  contact: {
    email: string;
    phone: string;
    location: {
      en: string;
      ar: string;
      de: string;
    };
  };
  socials: SocialLinks;
  integrations: IntegrationsConfig;
  experiences: WorkExperience[];
  education: EducationItem[];
  skills: SkillCategory[];
  projects: Project[];
}

import { PortfolioData } from './types';

export const initialPortfolioData: PortfolioData = {
  dataVersion: 3,
  name: "Amro Nazzal",
  portraitImage: "/src/assets/images/profile.jpg",
  officeImage: "/src/assets/images/profile.jpg",
  title: {
    en: "Financial Systems Specialist & Full-Stack Developer",
    ar: "أخصائي نظم مالية ومطور ويب متكامل",
    de: "Spezialist für Finanzsysteme & Full-Stack-Entwickler"
  },
  summary: {
    en: "Highly versatile professional with 10+ years of proven experience in Accounting, Financial Management, and Software Development. Expert in bridging the gap between complex financial requirements and technical delivery. Combines strong analytical abilities with modern Full-Stack JavaScript skills (React, Node.js, PostgreSQL) to design, consult, and implement enterprise-grade financial systems. Seeking an ERP Consulting, FinTech, or Business Analysis role.",
    ar: "متخصص متعدد القدرات يتمتع بخبرة تزيد عن 10 سنوات في المحاسبة والإدارة المالية وتطوير البرمجيات. خبير في سد الفجوة بين المتطلبات المالية المعقدة والحلول التقنية المبتكرة. يجمع بين المهارات التحليلية القوية والخبرة الحديثة في تطوير البرمجيات متكاملة الخدمات (React, Node.js, PostgreSQL) لتصميم وتنفيذ الحلول والأنظمة المالية للمؤسسات. أبحث عن دور في استشارات ERP أو التكنولوجيا المالية (FinTech) أو تحليل الأعمال.",
    de: "Äußerst vielseitiger Fachmann mit über 10 Jahren bewährter Erfahrung in Rechnungswesen, Finanzmanagement und Softwareentwicklung. Experte darin, die Lücke zwischen komplexen Finanzanforderungen und deren technischer Umsetzung zu schließen. Verbindet starke analytische Fähigkeiten mit modernen Full-Stack-JavaScript-Kenntnissen (React, Node.js, PostgreSQL), um finanzielle ERP-Systeme für Unternehmen zu entwerfen und zu implementieren. Gesucht: eine Position in ERP-Beratung, FinTech oder Business-Analyse."
  },
  contact: {
    email: "info@amrodev.com",
    phone: "+4915560099668",
    location: {
      en: "04205 Leipzig, Germany",
      ar: "04205 لايبزيغ، ألمانيا",
      de: "04205 Leipzig, Deutschland"
    }
  },
  socials: {
    github: "https://github.com/amr88nzzal",
    telegram: "https://t.me/amr_0_0",
    whatsapp: "https://wa.me/4915560099668",
    twitter: "https://x.com/Amr_nzzal",
    linkedin: "https://linkedin.com"
  },
  integrations: {
    telegramEnabled: false,
    telegramBotToken: "",
    telegramChatId: "",
    emailEnabled: true,
    emailAlertAddress: "info@amrodev.com",
    visitAlertsEnabled: false
  },
  experiences: [
    {
      id: "exp-bmw",
      period: "02.2024 - 08.2026",
      company: "BMW Group",
      location: {
        en: "Leipzig, Germany",
        ar: "لايبزيغ، ألمانيا",
        de: "Leipzig, Deutschland"
      },
      role: {
        en: "Production Staff (Transitional & Integration Phase)",
        ar: "موظف إنتاج (مرحلة انتقالية ودمج مهني)",
        de: "Produktionsmitarbeiter (Übergangsrolle - Integrationsphase)"
      },
      highlights: {
        en: [
          "Focused on active integration into the German labor market and achieving professional B2/C1 German language proficiency.",
          "Ensured continuous quality assurance and visual inspection adhering strictly to automotive high-precision specifications.",
          "Interacted with automated logistics and high-tech supply chain systems in an advanced manufacturing environment."
        ],
        ar: [
          "التركيز على الاندماج الفعال في سوق العمل الألماني وتطوير المهارات اللغوية للوصول إلى المستوى المهني (B2/C1).",
          "ضمان الجودة المستمرة والفحص البصري الدقيق للمواصفات والالتزام الصارم بمعايير إنتاج BMW.",
          "التعامل مع الأنظمة اللوجستية المؤتمتة وسلاسل التوريد الذكية في بيئة تصنيع متقدمة وعالية التقنية."
        ],
        de: [
          "Fokus auf die aktive Integration in den deutschen Arbeitsmarkt und das Erreichen von B2/C1-Sprachkenntnissen.",
          "Sicherstellung der kontinuierlichen Qualitätssicherung und visuellen Inspektion unter strikter Einhaltung der Produktionsspezifikationen.",
          "Kooperation mit automatisierten Logistik- und Lieferkettensystemen zur Gewährleistung effizienter Produktionsprozesse im High-Tech-Umfeld."
        ]
      }
    },
    {
      id: "exp-sahli",
      period: "01.2014 - 09.2022",
      company: "Sahlisoft Software Solutions",
      location: {
        en: "Syria / Jordan",
        ar: "سوريا / الأردن",
        de: "Syrien / Jordanien"
      },
      role: {
        en: "Business Implementation Lead & Exclusive Agent for Jordan (Freelance Owner)",
        ar: "مدير تنفيذ الأعمال والوكيل الحصري للأردن (مالك مستقل)",
        de: "Implementierungsleiter & Exklusivvertreter für Jordanien (Freiberuflich/Inhaber)"
      },
      highlights: {
        en: [
          "Spearheaded the full business lifecycle in the Jordanian market as exclusive sales, implementation, and technical support agent.",
          "Negotiated and drafted annual maintenance and support contracts, securing long-term recurring revenue streams.",
          "Conducted detailed client needs analysis to tailor financial software ERP systems and optimize SMB accounting workflows.",
          "Served as primary technical liaison, translating complex accounting principles into clear product feature requests.",
          "Performed rigorous quality assurance (QA) and system reliability testing to ensure financial statement accuracy."
        ],
        ar: [
          "قيادة دورة الأعمال الكاملة في السوق الأردني كوكيل حصري للمبيعات والتنفيذ والدعم الفني للبرمجيات المالية.",
          "صياغة وتوقيع عقود الصيانة والدعم السنوية، لتأمين مصادر إيرادات متكررة وبناء علاقات متينة طويلة الأمد مع العملاء.",
          "تحليل متطلبات العملاء لتخصيص الأنظمة المالية والـ ERP وتحسين تدفق العمليات المحاسبية للشركات الصغيرة والمتوسطة.",
          "العمل كحلقة وصل تقنية أساسية لترجمة المتطلبات المحاسبية المعقدة إلى خصائص برمجية واضحة لفريق التطوير.",
          "إجراء اختبارات دقيقة لضمان جودة البرمجيات (QA) ومطابقتها للمعايير المحاسبية المعتمدة ونزاهة البيانات المالية."
        ],
        de: [
          "Leitete den gesamten Geschäftszyklus im jordanischen Markt als Exklusivvertreter (Vertrieb, Implementierung und Support).",
          "Verhandelte und erstellte jährliche Support- und Wartungsverträge zur Sicherung wiederkehrender Einnahmequellen.",
          "Führte detaillierte Kundenbedarfsanalysen durch, um Finanzsoftwarelösungen anzupassen und Buchhaltungs-Workflows für KMUs zu optimieren.",
          "Fungierte als primäre technische Schnittstelle und übersetzte komplexe Finanzanforderungen in klare Funktionsanforderungen für das Entwicklungsteam.",
          "Durchführung strenger Qualitätssicherung (QA) und Softwaretests, um die Buchhaltungsgenauigkeit und Systemzuverlässigkeit zu gewährleisten."
        ]
      }
    },
    {
      id: "exp-aljawaden",
      period: "01.2018 - 09.2022",
      company: "Aljawaden for General Trading",
      location: {
        en: "Amman, Jordan",
        ar: "عمان، الأردن",
        de: "Amman, Jordanien"
      },
      role: {
        en: "External Financial Consultant & System Oversight (Part-time)",
        ar: "مستشار مالي خارجي ومشرف أنظمة (دوام جزئي)",
        de: "Externer Finanzberater & Systemaufsicht (Teilzeit)"
      },
      highlights: {
        en: [
          "Provided specialized consulting services, overseeing monthly accounting operations, compliance, and corporate taxes.",
          "Managed the ongoing maintenance, operation, and oversight of the customized accounting and inventory systems.",
          "Coordinated monthly financial settlements and spearheaded annual auditing procedures with external auditors."
        ],
        ar: [
          "تقديم خدمات استشارية متخصصة والإشراف على العمليات المحاسبية والامتثال الضريبي وإعداد الإقرارات الضريبية الشهرية.",
          "إدارة الصيانة المستمرة والتشغيل والرقابة على أنظمة المحاسبة والمستودعات التي تم تنفيذها مسبقاً للشركة.",
          "تنسيق الإغلاقات المالية الشهرية وقيادة عمليات التدقيق السنوية بالتنسيق مع المدققين القانونيين الخارجيين."
        ],
        de: [
          "Bereitstellung spezialisierter Beratungsdienste zur Überwachung monatlicher Buchhaltungsvorgänge und Sicherstellung der Compliance.",
          "Verantwortlich für die laufende Wartung, den Betrieb und die Aufsicht des Buchhaltungs- und Warenwirtschaftssystems.",
          "Koordinierung und termingerechte Durchführung der monatlichen Steuerabwicklung sowie der jährlichen Abschlussprüfungen."
        ]
      }
    },
    {
      id: "exp-solider",
      period: "04.2016 - 04.2019",
      company: "Solider for Touristic Investments [Jubran Restaurant]",
      location: {
        en: "Amman, Jordan",
        ar: "عمان، الأردن",
        de: "Amman, Jordanien"
      },
      role: {
        en: "Chief Accountant",
        ar: "رئيس حسابات",
        de: "Leiter Rechnungswesen"
      },
      highlights: {
        en: [
          "Managed and controlled the complete accounting cycle including monthly and annual closings, balance sheets, and tax reports.",
          "Led cost controlling for major F&B operations, analyzing budget variances and recommending strategic cost optimizations.",
          "Analyzed raw financial data to produce comprehensive reports for executive decision-making."
        ],
        ar: [
          "إدارة والتحكم في الدورة المحاسبية الكاملة بما في ذلك الإغلاقات الشهرية والسنوية، الميزانيات العمومية والتقارير الضريبية.",
          "قيادة رقابة التكاليف لعمليات الأغذية والمشروبات (F&B)، وتحليل انحرافات الميزانية وتقديم توصيات لرفع كفاءة النفقات.",
          "تحليل البيانات المالية لاستخراج مؤشرات الأداء وصياغة التقارير المالية الدورية للإدارة العليا."
        ],
        de: [
          "Verwaltung und Kontrolle des gesamten Buchhaltungskreislaufs, einschließlich Monats- und Jahresabschlüsse.",
          "Leitete die Kostenkontrolle für F&B-Betriebe und analysierte Abweichungen.",
          "Analyse von Buchhaltungsdaten zur Erstellung von Finanzberichten und -auszügen."
        ]
      }
    },
    {
      id: "exp-reback",
      period: "01.2014 - 04.2016",
      company: "Reback for General Trading [Hawana Cafe & Restaurant]",
      location: {
        en: "Amman, Jordan",
        ar: "عمان، الأردن",
        de: "Amman, Jordanien"
      },
      role: {
        en: "Chief Accountant & Cost Controller",
        ar: "رئيس حسابات ومراقب تكاليف",
        de: "Leiter Rechnungswesen & Cost Controller"
      },
      highlights: {
        en: [
          "Supervised daily accounting operations and designed double-entry bookkeeping workflows.",
          "Implemented inventory valuation techniques and managed costing operations for F&B branches."
        ],
        ar: [
          "الإشراف على العمليات المحاسبية اليومية وتصميم سير العمل لعمليات القيد المزدوج والتسويات البنكية.",
          "تطبيق تقنيات تقييم المخزون وإدارة عمليات حساب تكلفة الوجبات لجميع الفروع."
        ],
        de: [
          "Überwachung des täglichen Buchhaltungsbetriebs und Gestaltung von Buchhaltungsabläufen.",
          "Implementierung von Lagerbewertungsmethoden und Kostenrechnung für F&B-Filialen."
        ]
      }
    },
    {
      id: "exp-rotana",
      period: "09.2012 - 12.2013",
      company: "Rotana Cafe Amman",
      location: {
        en: "Amman, Jordan",
        ar: "عمان، الأردن",
        de: "Amman, Jordanien"
      },
      role: {
        en: "Cost Controller & Chief Accountant",
        ar: "رئيس حسابات ومراقب تكاليف",
        de: "Kostencontroller & Leiter Rechnungswesen"
      },
      highlights: {
        en: [
          "Controlled material waste, optimized inventory tracking, and managed supplier reconciliations.",
          "Ensured precise tracking of expenditures across multiple company cost centers."
        ],
        ar: [
          "مراقبة نسب الهدر وتلف المواد وتحسين آليات تتبع المخزون وإدارة مطابقات الموردين الحسابية.",
          "ضمان التتبع الدقيق للنفقات التشغيلية عبر مراكز التكلفة المتعددة للشركة."
        ],
        de: [
          "Kontrolle von Materialverlusten, Optimierung der Lagerbestandsverfolgung und Abstimmung von Lieferantenkonten.",
          "Sicherstellung einer präzisen Verfolgung von Ausgaben über mehrere Kostenstellen hinweg."
        ]
      }
    },
    {
      id: "exp-julia",
      period: "08.2010 - 09.2012",
      company: "Julia Dumna Group (Julia Dumna Cafe)",
      location: {
        en: "Damascus, Syria",
        ar: "دمشق، سوريا",
        de: "Damaskus, Syrien"
      },
      role: {
        en: "General Accountant",
        ar: "محاسب عام",
        de: "Allgemeiner Buchhalter"
      },
      highlights: {
        en: [
          "Managed and controlled the accounting cycle, including monthly and annual closings.",
          "Analyzed accounting data to produce financial reports and statements."
        ],
        ar: [
          "إدارة ومراقبة الدورة المحاسبية كاملة بما فيها الإقفالات الشهرية والسنوية.",
          "تحليل البيانات المحاسبية لإعداد التقارير والقوائم المالية."
        ],
        de: [
          "Führung und Kontrolle des Rechnungswesens inklusive Monats- und Jahresabschlüssen.",
          "Analyse von Buchhaltungsdaten zur Erstellung von Finanzberichten und Abschlüssen."
        ]
      }
    }
  ],
  education: [
    {
      id: "edu-dev",
      degree: {
        en: "Certificate - Advanced Software Development in Full-Stack JavaScript",
        ar: "شهادة - تطوير البرمجيات المتقدم في Full-Stack JavaScript",
        de: "Zertifikat – Fortgeschrittene Softwareentwicklung in Full-Stack JavaScript"
      },
      school: {
        en: "LTUC-ASAC & Code Fellows",
        ar: "كلية لومينوس الجامعية التقنية - مركز ASAC بالتعاون مع Code Fellows",
        de: "LTUC-ASAC & Code Fellows (Jordanien)"
      },
      period: "2021 - 2022",
      details: {
        en: "Intensive training focusing on ReactJS, NodeJS, Express, databases (PostgreSQL, MongoDB), RESTful APIs, data structures, and enterprise design patterns.",
        ar: "تدريب مكثف يركز على ReactJS و NodeJS و Express وقواعد البيانات (PostgreSQL و MongoDB) وواجهات برمجية التطبيقات وهندسة البرمجيات الحديثة.",
        de: "Intensivkurs mit Fokus auf ReactJS, NodeJS, Express, SQL/NoSQL-Datenbanken, Systemarchitekturen und DevOps-Grundlagen."
      }
    },
    {
      id: "edu-accounting",
      degree: {
        en: "Bachelor's Degree in Accounting",
        ar: "درجة البكالوريوس في المحاسبة",
        de: "Bachelor-Abschluss in Rechnungswesen"
      },
      school: {
        en: "Damascus University - Faculty of Economics",
        ar: "جامعة دمشق - كلية الاقتصاد",
        de: "Universität Damaskus – Fakultät für Wirtschaftswissenschaften"
      },
      period: "2007 - 2011",
      details: {
        en: "Comprehensive studies in Financial Auditing, Management Accounting, Corporate Finance, Tax Regulations, and IFRS/GAAP principles. Equivalent Evaluation: Good (Gut).",
        ar: "دراسة شاملة في التدقيق المالي، المحاسبة الإدارية، تمويل الشركات، قوانين الضرائب، ومعايير التقارير المالية الدولية (IFRS). التقييم العام: جيد.",
        de: "Umfassendes Studium in Finanzprüfung, Kostenrechnung, Unternehmenssteuern und IFRS-Richtlinien. Gesamtnote: 2,5 - 2,8 (Gut)."
      }
    }
  ],
  skills: [
    {
      id: "cat-fintech",
      title: {
        en: "Finance & ERP Systems",
        ar: "الأنظمة المالية وأنظمة الـ ERP",
        de: "Finanzsysteme & ERP"
      },
      skills: [
        { name: "ERP Systems (Afaq, Sahlisoft, SAP)", level: 5 },
        { name: "General Ledger (GL) & Financial Reporting", level: 5 },
        { name: "Cost Controlling & Cost Center Analysis", level: 5 },
        { name: "AP/AR & Payroll Management", level: 5 },
        { name: "IFRS & Local GAAP Principles", level: 4 },
        { name: "Financial Data Analysis (Excel, SQL)", level: 5 },
        { name: "Software QA & L1/L2 Client Support", level: 4 }
      ]
    },
    {
      id: "cat-dev",
      title: {
        en: "Software & Web Development",
        ar: "تطوير البرمجيات والويب",
        de: "Software & Webentwicklung"
      },
      skills: [
        { name: "ReactJS & Redux Toolkit", level: 5 },
        { name: "NodeJS & ExpressJS Backend", level: 4 },
        { name: "PostgreSQL & SQLite", level: 4 },
        { name: "RESTful API Integration", level: 5 },
        { name: "HTML5, CSS3 & Tailwind CSS", level: 5 },
        { name: "Git & Source Control", level: 4 }
      ]
    },
    {
      id: "cat-languages",
      title: {
        en: "Languages",
        ar: "اللغات",
        de: "Sprachen"
      },
      skills: [
        { name: "Arabic (Native / اللغة الأم)", level: 5 },
        { name: "English (B2 / Professional)", level: 4 },
        { name: "German (B1 / Actively progressing to B2/C1)", level: 3 }
      ]
    }
  ],
  projects: [
    {
      id: "proj-pos-system",
      title: {
        en: "POS Point of Sale & Cash Terminal System",
        ar: "نظام نقطة البيع الصندوقي والمحاسبي (POS)",
        de: "POS Kassensystem & Abrechnung"
      },
      category: {
        en: "Fintech & POS",
        ar: "أنظمة التكنولوجيا المالية ونقاط البيع",
        de: "Finanztechnologie & Kassensystem"
      },
      description: {
        en: "A demo POS cash terminal (web & offline) hosted at pos.amrodev.com. Showcases fast item scanning, multi-pay tender, real-time drawer reconciliation, invoice printing, and instant daily sales analytics.",
        ar: "نظام نقطة بيع تجريبي (Demo) مستضاف على الرابط pos.amrodev.com. يعرض الجرد السريع للمنتجات، المبيعات الفورية، طباعة الفواتير، التسويات اليومية الصندوقية، ومتابعة الأرباح وحركات المبيعات لحظة بلحظة.",
        de: "Demo eines POS-Kassensystems unter pos.amrodev.com. Zeigt schnelles Produktscanning, Belegerstellung, Kassenabstimmung und Echtzeit-Umsatzanalysen."
      },
      tech: ["ReactJS", "NodeJS", "ExpressJS", "Tailwind CSS", "REST APIs"],
      image: "/src/assets/images/pos_system_dashboard_1790474752325.jpg",
      link: "http://pos.amrodev.com/",
      metrics: {
        en: "Demo project: fast scanning, multi-payment checkout and drawer reconciliation",
        ar: "مشروع تجريبي: مسح سريع ودفع متعدد الطرق وتسوية الصندوق",
        de: "Demo-Projekt: schnelles Scannen, Mehrfachzahlung und Kassenabstimmung"
      }
    },
    {
      id: "proj-pos-api",
      title: {
        en: "POS Sahlisoft RESTful API Bridge Gateway",
        ar: "بوابة الربط البرمجي RESTful API لنظام سهلي سوفت",
        de: "POS Sahlisoft RESTful API Schnittstellen-Gateway"
      },
      category: {
        en: "API & Middleware",
        ar: "واجهات وتكاملات الأنظمة البرمجية",
        de: "API & Schnittstellen"
      },
      description: {
        en: "A demo RESTful API integration layer hosted at pos-api.amrodev.com. Shows how to connect independent POS terminals to the Sahlisoft ERP accounting backend, synchronizing inventory stock, general ledger journals, and customer account balances in real-time.",
        ar: "بوابة ربط برمجية تجريبية (Demo) مستضافة على الرابط pos-api.amrodev.com. توضّح كيفية ربط أجهزة نقاط البيع الفرعية بنظام سهلي سوفت المحاسبي الـ ERP، مع مزامنة فورية للكميات المستودعية، القيود اليومية وحسابات الذمم للعملاء.",
        de: "Demo eines RESTful-API-Gateways unter pos-api.amrodev.com zur Verbindung von POS-Terminalen mit dem Sahlisoft ERP-Buchhaltungssystem in Echtzeit."
      },
      tech: ["NodeJS", "ExpressJS", "RESTful API", "Sahlisoft ERP Sync", "PostgreSQL"],
      image: "/src/assets/images/pos_api_gateway_1790474776484.jpg",
      link: "https://pos-api.amrodev.com/",
      metrics: {
        en: "Demo project: syncs inventory and ledger journals between POS and ERP",
        ar: "مشروع تجريبي: مزامنة المخزون والقيود المحاسبية بين نقاط البيع ونظام ERP",
        de: "Demo-Projekt: Synchronisation von Lagerbestand und Buchungen zwischen POS und ERP"
      }
    },
    {
      id: "proj-invscan",
      title: {
        en: "InvScan Warehouse Barcode Audit & Stock System",
        ar: "نظام جرد المستودعات وتتبع المبيعات بالباركود InvScan",
        de: "InvScan Lager-Barcode-Inventur & Audit-System"
      },
      category: {
        en: "Warehouse Audit",
        ar: "أنظمة إدارة وجرد المستودعات",
        de: "Lagerverwaltung & Inventur"
      },
      description: {
        en: "A demo stock-auditing and warehouse barcode-scanning app hosted at invscan.amrodev.com (demo login: admin / admin123). Enables fast barcode scanning, automated physical stock variance detection, inventory reconciliation, and discrepancy auditing.",
        ar: "نظام تجريبي (Demo) لجرد المستودعات بالباركود مستضاف على الرابط invscan.amrodev.com (بيانات الدخول التجريبية: admin / admin123). يتيح الجرد السريع بواسطة الماسح الضوئي للباركود، كشف الفروقات بين الرصيد الفعلي والدفتري، وإصدار تقارير التسوية المخزنية.",
        de: "Demo eines Lagerinventursystems unter invscan.amrodev.com (Demo-Login: admin / admin123). Ermöglicht mobiles Barcode-Scanning, automatischen Soll-Ist-Vergleich und Soll-Differenz-Berichte."
      },
      tech: ["ReactJS", "Barcode Scanner", "NodeJS", "ExpressJS", "PostgreSQL"],
      image: "/src/assets/images/invscan_inventory_audit_1790474825936.jpg",
      link: "https://invscan.amrodev.com/",
      metrics: {
        en: "Demo project: barcode counting with automatic variance detection",
        ar: "مشروع تجريبي: جرد بالباركود مع كشف تلقائي للفروقات",
        de: "Demo-Projekt: Barcode-Inventur mit automatischer Differenzerkennung"
      }
    },
    {
      id: "proj-afaq-erp",
      title: {
        en: "Afaq Global University Admissions & Consultancy Portal",
        ar: "منصة آفاق العالمية للقبولات الجامعية والدراسة بالخارج",
        de: "Afaq Global Universitäts-Zulassungsportal"
      },
      category: {
        en: "EdTech & Portal",
        ar: "منصات التعليم والقبولات الجامعية",
        de: "Bildungsportal & SaaS"
      },
      description: {
        en: "A demo university-admissions and consultancy portal hosted at afaq.amrodev.com. Assists international students in applying for university programs, managing visa documentation, qualification equivalency, and tracking application milestones.",
        ar: "نموذج تجريبي (Demo) لمنصة قبولات جامعية واستشارات تعليمية مستضاف على الرابط afaq.amrodev.com. تساعد الطلاب الدوليين في الحصول على القبولات الجامعية، إدارة مستندات التأشيرات والمحاضر الدراسية، وتتبع مراحل القبول بمرونة فائقة.",
        de: "Demo eines Bildungsportals unter afaq.amrodev.com zur Betreuung internationaler Studenten bei Studienplatzbewerbungen, Visadokumenten und Universitätszulassungen."
      },
      tech: ["ReactJS", "NodeJS", "ExpressJS", "Tailwind CSS", "Document Management"],
      image: "/src/assets/images/afaq_global_actual_landing_1790479625710.jpg",
      link: "https://afaq.amrodev.com/",
      metrics: {
        en: "Demo project: application tracking and document workflow",
        ar: "مشروع تجريبي: تتبع طلبات القبول وسير المستندات",
        de: "Demo-Projekt: Bewerbungsverfolgung und Dokumenten-Workflow"
      }
    },
    {
      id: "proj-afaq-lite",
      title: {
        en: "Afaq Lite Educational System (Student Admissions)",
        ar: "نظام آفاق التعليمي المبسط (تأمين قبولات جامعية للطلاب)",
        de: "Afaq Lite Bildungsportal für Studienplatz-Zulassungen"
      },
      category: {
        en: "EdTech & Admissions",
        ar: "منصات التعليم والقبولات الجامعية",
        de: "Bildungsportal & Zulassungen"
      },
      description: {
        en: "A demo of the first lightweight MVP of the admissions portal, hosted at afaq-0.amrodev.com, built before the fuller version at afaq.amrodev.com.",
        ar: "نموذج تجريبي (Demo) للنسخة الأولى المبسطة (MVP) من منصة القبولات، مستضاف على الرابط afaq-0.amrodev.com، وقد بُني قبل النسخة الأشمل (afaq.amrodev.com).",
        de: "Demo der ersten schlanken MVP-Version des Zulassungsportals unter afaq-0.amrodev.com, entstanden vor der umfangreicheren Version afaq.amrodev.com."
      },
      tech: ["ReactJS", "Vite", "Tailwind CSS", "NodeJS", "JSON API"],
      image: "/src/assets/images/afaq_lite_educational_portal_1790479388600.jpg",
      link: "https://afaq-0.amrodev.com/",
      metrics: {
        en: "Demo project: lightweight MVP of the admissions workflow",
        ar: "مشروع تجريبي: نسخة أولية مبسطة (MVP) من سير عمل القبولات",
        de: "Demo-Projekt: schlanke MVP-Version des Zulassungs-Workflows"
      }
    }
  ]
};

export const initialMessages: any[] = [];

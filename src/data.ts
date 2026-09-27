import { PortfolioData } from './types';

export const initialPortfolioData: PortfolioData = {
  name: "Amro Nazzal",
  portraitImage: "/src/assets/images/profile.jpg",
  officeImage: "/src/assets/images/amro_official_office_1790475364733.jpg",
  title: {
    en: "Financial Systems Specialist & Full-Stack Developer",
    ar: "أخصائي نظم مالية ومطور ويب متكامل",
    de: "Spezialist für Finanzsysteme & Full-Stack-Entwickler"
  },
  summary: {
    en: "Highly versatile professional with 10+ years of proven experience in Accounting, Financial Management, and Software Development. Expert in bridging the gap between complex financial requirements and technical delivery. Combines strong analytical abilities with modern Full-Stack JavaScript skills (React, Node.js, PostgreSQL) to design, consult, and implement enterprise-grade financial systems.",
    ar: "متخصص متعدد القدرات يتمتع بخبرة تزيد عن 10 سنوات في المحاسبة والإدارة المالية وتطوير البرمجيات. خبير في سد الفجوة بين المتطلبات المالية المعقدة والحلول التقنية المبتكرة. يجمع بين المهارات التحليلية القوية والخبرة الحديثة في تطوير البرمجيات متكاملة الخدمات (React, Node.js, PostgreSQL) لتصميم وتنفيذ الحلول والأنظمة المالية للمؤسسات.",
    de: "Äußerst vielseitiger Fachmann mit über 10 Jahren bewährter Erfahrung in Rechnungswesen, Finanzmanagement und Softwareentwicklung. Experte darin, die Lücke zwischen komplexen Finanzanforderungen und deren technischer Umsetzung zu schließen. Verbindet starke analytische Fähigkeiten mit modernen Full-Stack-JavaScript-Kenntnissen (React, Node.js, PostgreSQL), um finanzielle ERP-Systeme für Unternehmen zu entwerfen und zu implementieren."
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
        en: "Business Implementation Lead & Exclusive Agent",
        ar: "مدير تنفيذ الأعمال والوكيل الحصري للشركة",
        de: "Implementierungsleiter & Alleinvertreter (Freiberuflich/Inhaber)"
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
          "Leitete den gesamten Geschäftszyklus im jordanischen Markt als Alleinvertreter (Vertrieb, Implementierung und Support).",
          "Verhandelte und erstellte jährliche Support- und Wartungsverträge zur Sicherung wiederkehrender Einnahmequellen.",
          "Führte detaillierte Kundenbedarfsanalysen durch, um Finanzsoftwarelösungen anzupassen und Buchhaltungs-Workflows für KMUs zu optimieren.",
          "Fungierte as primäre technische Schnittstelle und übersetzte komplexe Finanzanforderungen in klare Funktionsanforderungen für das Entwicklungsteam.",
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
        de: "Wirtschaftsfakultät (Syrien)"
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
        { name: "Financial Data Analysis (Excel, SQL)", level: 5 }
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
        en: "A complete Web & Offline POS cash terminal hosted at pos.amrodev.com. Handles fast item scanning, multi-pay tender, real-time drawer reconciliation, invoice printing, and instant daily sales analytics.",
        ar: "نظام نقطة بيع متكامل وشامل مستضاف على الرابط pos.amrodev.com. يدعم الجرد السريع للمنتجات، المبيعات الفورية، طباعة الفواتير، التسويات اليومية الصندوقية، ومتابعة الأرباح وحركات المبيعات لحظة بلحظة.",
        de: "Vollständiges POS-Kassensystem unter pos.amrodev.com. Bietet schnelles Produktscanning, Belegerstellung, Kassenabstimmung und Echtzeit-Umsatzanalysen."
      },
      tech: ["ReactJS", "NodeJS", "ExpressJS", "Tailwind CSS", "REST APIs"],
      image: "/src/assets/images/pos_system_dashboard_1790474752325.jpg",
      link: "http://pos.amrodev.com/",
      metrics: {
        en: "Processes over 5,000+ daily sales transactions seamlessly",
        ar: "يعالج أكثر من 5,000 عملية بيع يومية بكل سلاسة",
        de: "Verarbeitet nahtlos über 5.000 tägliche Transaktionen"
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
        en: "Enterprise RESTful API Integration Middleware hosted at pos-api.amrodev.com. Seamlessly connects independent POS terminals to the Sahlisoft ERP accounting backend, synchronizing inventory stock, general ledger journals, and customer account balances in real-time.",
        ar: "بوابة ربط برمجية متطورة مستضافة على الرابط pos-api.amrodev.com. تربط أجهزة نقاط البيع الفرعية بنظام سهلي سوفت المحاسبي الـ ERP، مع مزامنة فورية للكميات المستودعية، القيود اليومية وحسابات الذمم للعملاء.",
        de: "Hochleistungs-RESTful API Gateway unter pos-api.amrodev.com zur nahtlosen Verbindung von POS-Terminalen mit dem Sahlisoft ERP-Buchhaltungssystem in Echtzeit."
      },
      tech: ["NodeJS", "ExpressJS", "RESTful API", "Sahlisoft ERP Sync", "PostgreSQL"],
      image: "/src/assets/images/pos_api_gateway_1790474776484.jpg",
      link: "https://pos-api.amrodev.com/",
      metrics: {
        en: "Synchronizes 10,000+ real-time inventory & ledger journal entries daily",
        ar: "مزامنة أكثر من 10,000 قيد محاسبي وحركة مخزنية يومياً",
        de: "Macht tägliche Synchronisation von 10.000+ Datensätzen möglich"
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
        en: "Real-time stock auditing and warehouse barcode scanning platform hosted at invscan.amrodev.com (Demo: admin / admin123). Enables fast barcode scanning, automated physical stock variance detection, inventory reconciliation, and discrepancy auditing.",
        ar: "نظام جرد المستودعات الذكي المستضاف على الرابط invscan.amrodev.com (بيانات الدخول التجريبية: admin / admin123). يتيح الجرد السريع بواسطة الماسح الضوئي للباركود، كشف الفروقات بين الرصيد الفعلي والدفتري، وإصدار تقارير التسوية المخزنية.",
        de: "Echtzeit-Lagerinventursystem unter invscan.amrodev.com (Login: admin / admin123). Ermöglicht mobiles Barcode-Scanning, automatischen Soll-Ist-Vergleich und Soll-Differenz-Berichte."
      },
      tech: ["ReactJS", "Barcode Scanner", "NodeJS", "ExpressJS", "PostgreSQL"],
      image: "/src/assets/images/invscan_inventory_audit_1790474825936.jpg",
      link: "https://invscan.amrodev.com/",
      metrics: {
        en: "Reduces physical stock counting time by 75% with zero margin of error",
        ar: "تقليل زمن الجرد الفعلي للمستودعات بنسبة 75% ودقة 100%",
        de: "75% Zeitersparnis bei der physischen Inventur"
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
        en: "Global university admissions & educational consultancy portal hosted at afaq.amrodev.com. Assists international students in applying for university programs, managing visa documentation, qualification equivalency, and tracking application milestones.",
        ar: "منصة آفاق العالمية للقبولات الجامعية المستضافة على الرابط afaq.amrodev.com. تساعد الطلاب الدوليين في الحصول على القبولات الجامعية، إدارة مستندات التأشيرات والمحاضر الدراسية، وتتبع مراحل القبول بمرونة فائقة.",
        de: "Umfassendes Bildungsportal unter afaq.amrodev.com zur Betreuung internationaler Studenten bei Studienplatzbewerbungen, Visadokumenten und Universitätszulassungen."
      },
      tech: ["ReactJS", "NodeJS", "ExpressJS", "Tailwind CSS", "Document Management"],
      image: "/src/assets/images/afaq_global_actual_landing_1790479625710.jpg",
      link: "https://afaq.amrodev.com/",
      metrics: {
        en: "Processed 1,200+ university application document workflows",
        ar: "معالجة أكثر من 1,200 طلب قبول جامعي ومستند دراسي",
        de: "Über 1.200 erfolgreich verarbeitete Studienbewerbungen"
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
        en: "The initial lightweight university admissions portal hosted at afaq-0.amrodev.com. Served as the founding MVP design for matching international students with university applications prior to launching the official main platform at afaq.amrodev.com.",
        ar: "نظام آفاق التعليمي لتأمين القبولات الجامعية للطلاب والمستضاف على الرابط afaq-0.amrodev.com. يمثل التصميم الأولي والمبسط المعتمد لمعالجة الطلبات والمؤهلات قبل إطلاق المنصة الرسمية والجامعية لـ آفاق (afaq.amrodev.com).",
        de: "Das initiale schlanke Universitätszulassungsportal unter afaq-0.amrodev.com. Diente als Prototyp-Version (MVP) für Studienplatzbewerbungen vor dem Start der Hauptplattform afaq.amrodev.com."
      },
      tech: ["ReactJS", "Vite", "Tailwind CSS", "NodeJS", "JSON API"],
      image: "/src/assets/images/afaq_lite_educational_portal_1790479388600.jpg",
      link: "https://afaq-0.amrodev.com/",
      metrics: {
        en: "Served as the founding MVP portal processing 300+ initial student applications",
        ar: "النسخة التأسيسية الأولى (MVP) التي معالجة أكثر من 300 طلب قبول جامعي مبدئي",
        de: "Erfolgreicher MVP-Start für über 300 erste Studienplatzbewerbungen"
      }
    }
  ]
};

export const initialMessages: any[] = [
  {
    id: "msg-1",
    name: "Dr. Michael Weber",
    email: "m.weber@fintech-leipzig.de",
    subject: "ERP Consultant Collaboration Inquiry",
    message: "Hallo Amro, ich habe mir Ihr Profil angesehen. Die einzigartige Kombination aus tiefer Buchhaltungserfahrung (10+ Jahre) und modernen React/NodeJS-Kenntnissen ist extrem wertvoll für unsere Fintech-Sparte. Lassen Sie uns nächste Woche auf einen Kaffee in Leipzig treffen oder telefonieren.",
    date: "2026-09-26 09:30",
    isRead: false
  },
  {
    id: "msg-2",
    name: "Lina Al-Masri",
    email: "lina@sahli-jo.com",
    subject: "Greetings from Amman!",
    message: "Hi Amro, hope you are doing amazing in Germany! We miss your technical execution and finance systems leadership here. Do you have availability for freelance advisory on our new SaaS ledger component?",
    date: "2026-09-25 15:45",
    isRead: true
  }
];

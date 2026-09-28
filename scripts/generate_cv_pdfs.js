import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

// Ensure output directories exist
const publicDir = path.join(process.cwd(), 'public');
const assetsDocsDir = path.join(process.cwd(), 'src', 'assets', 'docs');

if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
if (!fs.existsSync(assetsDocsDir)) fs.mkdirSync(assetsDocsDir, { recursive: true });

const portraitPath = path.join(process.cwd(), 'src', 'assets', 'images', 'amro_id_portrait.jpg');

function generateEnglishPDF(outputPath) {
  const doc = new PDFDocument({ margin: 40, size: 'A4' });
  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  // Header section
  doc.fontSize(20).font('Helvetica-Bold').text('Curriculum Vitae', { align: 'center' });
  doc.moveDown(0.5);

  const startY = doc.y;

  // Personal Info Block
  doc.fontSize(9).font('Helvetica-Bold').text('Name\t\t\t', 40, startY, { continued: true });
  doc.font('Helvetica').text('Amro Nazzal');
  doc.font('Helvetica-Bold').text('Address\t\t', 40, doc.y + 2, { continued: true });
  doc.font('Helvetica').text('04205 Leipzig, Germany');
  doc.font('Helvetica-Bold').text('Mobile:\t\t', 40, doc.y + 2, { continued: true });
  doc.font('Helvetica').text('+4915560099668');
  doc.font('Helvetica-Bold').text('E-Mail\t\t\t', 40, doc.y + 2, { continued: true });
  doc.font('Helvetica').fillColor('blue').text('Amr.nzzal@gmail.com').fillColor('black');
  doc.font('Helvetica-Bold').text('Date of birth\t', 40, doc.y + 2, { continued: true });
  doc.font('Helvetica').text('1988');
  doc.font('Helvetica-Bold').text('Nationality\t', 40, doc.y + 2, { continued: true });
  doc.font('Helvetica').text('Syrian');

  // Portrait Photo on right if available
  if (fs.existsSync(portraitPath)) {
    try {
      doc.image(portraitPath, 430, startY, { width: 110, height: 130 });
    } catch (e) {
      console.log('Error embedding photo:', e);
    }
  }

  doc.y = Math.max(doc.y + 15, startY + 140);

  // Section Header Function
  const addSectionHeader = (title) => {
    doc.moveDown(0.5);
    doc.fontSize(10).font('Helvetica-Bold').fillColor('#1E3A8A').text(title);
    doc.strokeColor('#1E3A8A').lineWidth(1).moveTo(40, doc.y + 2).lineTo(550, doc.y + 2).stroke();
    doc.fillColor('black');
    doc.moveDown(0.5);
  };

  // Professional Profile
  addSectionHeader('PROFESSIONAL PROFILE');
  doc.fontSize(9).font('Helvetica-Bold').text('FINANCIAL SYSTEMS SPECIALIST & IMPLEMENTATION LEAD');
  doc.moveDown(0.3);
  doc.font('Helvetica').fontSize(8.5).text(
    'Highly versatile professional with 10+ years of proven experience in Accounting, Financial Management, and Software Development. Expert in bridging the gap between complex financial requirements and technical delivery. Demonstrated success as an Exclusive Agent, where he managed the full business cycle (sales, negotiation, implementation, and technical support) for a financial software solution in a regional market. Combines strong analytical abilities with Full-Stack JavaScript skills (React, Node.js, PostgreSQL). Seeking an ERP Consulting, FinTech, or Business Analysis role.',
    { align: 'justify' }
  );

  // Technical Skills
  addSectionHeader('TECHNICAL & LEADERSHIP SKILLS');
  const skills = [
    ['Consulting & Implementation', 'Full business lifecycle management, Contract Negotiation, Client Needs Analysis, Process Optimization, Software Quality Assurance (QA).'],
    ['System & Technical Integration Support', 'Advanced System Troubleshooting (incl. network conflicts/hardware dependencies), Client-Facing L1/L2 Technical Support, Software Quality Assurance (QA).'],
    ['Financial Systems', 'Expertise in ERP systems, General Ledger (GL), AP/AR, Payroll, Cost Controlling, IFRS/local GAAP principles.'],
    ['Databases & Back-end', 'PostgreSQL, MongoDB, NodeJs, Express, RESTful API, Advanced Data Analysis (SQL).'],
    ['Front-end', 'ReactJs, HTML5, CSS3, JavaScript, Redux.'],
    ['Tools & Software', 'Advanced proficiency in MS Excel (Data Modeling & Reporting), MS Office, Git.']
  ];

  skills.forEach(([label, desc]) => {
    doc.fontSize(8).font('Helvetica-Bold').text(label + ': ', { continued: true });
    doc.font('Helvetica').text(desc);
    doc.moveDown(0.2);
  });

  // Work Experience
  addSectionHeader('WORK EXPERIENCE');
  const experiences = [
    {
      period: '02.2024 - 08.2026',
      company: 'BMW Group (Leipzig, Germany)',
      role: 'Production Staff (Transitional Role - Integration Phase)',
      bullets: [
        'Focusing on active integration into the German labor market and achieving B2/C1 language proficiency.',
        'Ensuring continuous quality assurance and visual inspection, adhering strictly to production specifications and protocols.',
        'Operating within a high-tech manufacturing environment, interacting with automated supply chain systems to maintain efficient workflow.'
      ]
    },
    {
      period: '01.2014 - 09.2022',
      company: 'Sahlisoft Software Solutions (Damascus - Syria)',
      role: 'Business Implementation Lead & Exclusive Agent for Jordan (Freelance Owner)',
      bullets: [
        'Spearheaded the full business life cycle in the Jordanian market as the exclusive agent (sales, implementation, and support).',
        'Negotiated and drafted annual support and maintenance contracts, successfully securing recurring revenue streams and long-term client relationships.',
        'Conducted detailed client needs analysis to tailor financial software solutions and optimized accounting workflows for SMEs.',
        'Served as the primary technical liaison, translating complex financial requirements into clear feature requests for the development team.',
        'Performed rigorous Quality Assurance (QA) and software testing to ensure accounting accuracy and system reliability.'
      ]
    },
    {
      period: '01.2018 - 09.2022',
      company: 'Aljawaden for General Trading (Tier Trading) (Amman - Jordan)',
      role: 'External Financial Consultant & System Oversight (Part-time)',
      bullets: [
        'Provided specialized consultancy services, overseeing monthly accounting operations and ensuring compliance.',
        'Managed the ongoing maintenance, operation, and oversight of the Accounting and Inventory System (which was previously implemented by the candidate).',
        'Coordinated and completed monthly taxes and annual audits.'
      ]
    },
    {
      period: '04.2016 - 04.2019',
      company: 'Solider for Touristic Investments [Jubran Restaurant] (Amman - Jordan)',
      role: 'Chief Accountant',
      bullets: [
        'Managed and controlled the entire accounting cycle, including monthly and annual closings.',
        'Managed Cost Controlling for F&B operations, analyzing variances.',
        'Analyzed accounting data to produce financial reports and statements.'
      ]
    },
    {
      period: '01.2014 - 04.2016',
      company: 'Reback for General Trading [Hawana Cafe & Restaurant] (Amman - Jordan)',
      role: 'Chief Accountant',
      bullets: [
        'Managed and controlled the entire accounting cycle, including monthly and annual closings.',
        'Managed Cost Controlling for F&B operations, analyzing variances.'
      ]
    },
    {
      period: '09.2012 - 12.2013',
      company: 'Rotana Cafe Amman (Amman - Jordan)',
      role: 'Cost Controller & Chief Accountant',
      bullets: [
        'Managed and controlled the entire accounting cycle, including monthly and annual closings.',
        'Managed Cost Controlling for F&B operations, analyzing variances.'
      ]
    },
    {
      period: '08.2010 - 09.2012',
      company: 'Julia Dumna Group // Julia Dumna Cafe (Damascus - Syria)',
      role: 'General Accountant',
      bullets: [
        'Managed and controlled the accounting cycle, including monthly closings.',
        'Managed Cost Controlling for F&B operations, analyzing variances.'
      ]
    }
  ];

  experiences.forEach((exp) => {
    if (doc.y > 700) doc.addPage();
    doc.fontSize(8.5).font('Helvetica-Bold').fillColor('#1E3A8A').text(`${exp.period}\t${exp.company}`);
    doc.font('Helvetica-Bold').fillColor('black').text(exp.role);
    exp.bullets.forEach(b => {
      doc.fontSize(8).font('Helvetica').text(`♦ ${b}`, { indent: 10 });
    });
    doc.moveDown(0.4);
  });

  // Education
  if (doc.y > 700) doc.addPage();
  addSectionHeader('EDUCATION');
  doc.fontSize(8.5).font('Helvetica-Bold').text('2021 - 2022\tCertificate - Advanced Software Development in Full-Stack JavaScript');
  doc.font('Helvetica').fontSize(8).text('LTUC-ASAC & Code Fellows (Jordan)', { indent: 60 });
  doc.moveDown(0.3);
  doc.font('Helvetica-Bold').fontSize(8.5).text('2007 - 2011\tBachelor\'s Degree in Accounting');
  doc.font('Helvetica').fontSize(8).text('Damascus University – Faculty of Economics (Syria) - GPA Equivalent: 2.5 - 2.8 (Gut)', { indent: 60 });

  // Languages & References
  doc.moveDown(0.5);
  addSectionHeader('LANGUAGES & REFERENCES');
  doc.fontSize(8.5).font('Helvetica-Bold').text('ARABIC:\t\t', { continued: true }).font('Helvetica').text('Native language');
  doc.font('Helvetica-Bold').text('ENGLISH:\t\t', { continued: true }).font('Helvetica').text('B2');
  doc.font('Helvetica-Bold').text('GERMAN:\t\t', { continued: true }).font('Helvetica').text('B1 - Actively progressing towards B2/C1');
  doc.moveDown(0.3);
  doc.font('Helvetica-Bold').text('REFERENCES:\t', { continued: true }).font('Helvetica').text('Available upon request');

  doc.end();
  console.log('Created English CV PDF:', outputPath);
}

function generateGermanPDF(outputPath) {
  const doc = new PDFDocument({ margin: 40, size: 'A4' });
  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  // Header section
  doc.fontSize(20).font('Helvetica-Bold').text('LEBENSLAUF', { align: 'center' });
  doc.moveDown(0.5);

  const startY = doc.y;

  // Personal Info Block
  doc.fontSize(9).font('Helvetica-Bold').text('Name\t\t\t', 40, startY, { continued: true });
  doc.font('Helvetica').text('Amro Nazzal');
  doc.font('Helvetica-Bold').text('Anschrift\t\t', 40, doc.y + 2, { continued: true });
  doc.font('Helvetica').text('04205 Leipzig, Deutschland');
  doc.font('Helvetica-Bold').text('Mobil:\t\t', 40, doc.y + 2, { continued: true });
  doc.font('Helvetica').text('+4915560099668');
  doc.font('Helvetica-Bold').text('E-Mail\t\t\t', 40, doc.y + 2, { continued: true });
  doc.font('Helvetica').fillColor('blue').text('Amr.nzzal@gmail.com').fillColor('black');
  doc.font('Helvetica-Bold').text('Geburtsdatum\t', 40, doc.y + 2, { continued: true });
  doc.font('Helvetica').text('1988');
  doc.font('Helvetica-Bold').text('Staatsangehörigkeit\t', 40, doc.y + 2, { continued: true });
  doc.font('Helvetica').text('Syrisch');

  // Portrait Photo on right
  if (fs.existsSync(portraitPath)) {
    try {
      doc.image(portraitPath, 430, startY, { width: 110, height: 130 });
    } catch (e) {
      console.log('Error embedding photo:', e);
    }
  }

  doc.y = Math.max(doc.y + 15, startY + 140);

  // Section Header Function
  const addSectionHeader = (title) => {
    doc.moveDown(0.5);
    doc.fontSize(10).font('Helvetica-Bold').fillColor('#1E3A8A').text(title);
    doc.strokeColor('#1E3A8A').lineWidth(1).moveTo(40, doc.y + 2).lineTo(550, doc.y + 2).stroke();
    doc.fillColor('black');
    doc.moveDown(0.5);
  };

  // Berufliches Profil
  addSectionHeader('BERUFLICHES PROFIL');
  doc.fontSize(9).font('Helvetica-Bold').text('SPEZIALIST FÜR FINANZSYSTEME & IMPLEMENTIERUNGSLEITER');
  doc.moveDown(0.3);
  doc.font('Helvetica').fontSize(8.5).text(
    'Äußerst vielseitiger Fachmann mit über 10 Jahren Erfahrung in Rechnungswesen, Finanzmanagement und Software-Implementierung. Experte in der Überbrückung der Kluft zwischen komplexen Finanzanforderungen und deren technischer Umsetzung. Nachgewiesener Erfolg als Alleinvertreter, wo er den gesamten Geschäftszyklus (Vertrieb, Vertragsverhandlung, Implementierung und technischer Support) für eine Finanzsoftwarelösung in einem regionalen Markt leitete. Verbindet starke analytische Fähigkeiten mit aktuellen Full-Stack JavaScript-Kenntnissen (React, Node.js, PostgreSQL). Ich strebe eine Position im Bereich ERP-Beratung, FinTech oder Business Analyse an.',
    { align: 'justify' }
  );

  // Technische und Führungskompetenzen
  addSectionHeader('TECHNISCHE UND FÜHRUNGSKOMPETENZEN');
  const skills = [
    ['Beratung & Implementierung', 'Verwaltung des gesamten Geschäftszyklus, Vertragsverhandlung, Kundenbedarfsanalyse, Prozessoptimierung, Software-Qualitätssicherung (QA).'],
    ['System & Technische Integrationsunterstützung', 'Advanced System Troubleshooting (incl. network conflicts/hardware dependencies), Client-Facing L1/L2 Technical Support, Software Quality Assurance (QA).'],
    ['Finanzsysteme', 'Expertise in ERP-Systemen, Hauptbuch (GL), Kreditoren/Debitoren (AP/AR), Gehaltsabrechnung, Kostenkontrolle, IFRS/lokale GAAP-Prinzipien.'],
    ['Datenbanken & Back-end', 'PostgreSQL, MongoDB, NodeJs, Express, RESTful API, Fortgeschrittene Datenanalyse (SQL).'],
    ['Front-end', 'ReactJs, HTML5, CSS3, JavaScript, Redux.'],
    ['Tools & Software', 'Erweiterte Kenntnisse in MS Excel (Datenmodellierung & Reporting), MS Office, Git.']
  ];

  skills.forEach(([label, desc]) => {
    doc.fontSize(8).font('Helvetica-Bold').text(label + ': ', { continued: true });
    doc.font('Helvetica').text(desc);
    doc.moveDown(0.2);
  });

  // Berufserfahrung
  addSectionHeader('BERUFSERFAHRUNG');
  const experiences = [
    {
      period: '02.2024 - 08.2026',
      company: 'BMW Group (Leipzig, Deutschland)',
      role: 'Produktionsmitarbeiter (Übergangsrolle - Integrationsphase)',
      bullets: [
        'Fokus auf die aktive Integration in den deutschen Arbeitsmarkt und das Erreichen von B2/C1-Sprachkenntnissen.',
        'Sicherstellung der kontinuierlichen Qualitätssicherung und visuellen Inspektion unter strikter Einhaltung der Produktionsspezifikationen.',
        'Kooperation mit automatisierten Logistik- und Lieferkettensystemen zur Gewährleistung effizienter Produktionsprozesse im High-Tech-Umfeld.'
      ]
    },
    {
      period: '01.2014 - 09.2022',
      company: 'Sahlisoft Software Solutions (Syrien/Jordanien)',
      role: 'Implementierungsleiter & Alleinvertreter (Freiberuflich/Inhaber)',
      bullets: [
        'Leitete den gesamten Geschäftszyklus im jordanischen Markt als Alleinvertreter (Vertrieb, Implementierung und Support).',
        'Verhandelte und erstellte jährliche Support- und Wartungsverträge und sicherte so wiederkehrende Einnahmequellen.',
        'Führte detaillierte Kundenbedarfsanalysen durch, um Finanzsoftwarelösungen anzupassen und Buchhaltungs-Workflows für KMUs zu optimieren.',
        'Fungierte als primäre technische Schnittstelle und übersetzte komplexe Finanzanforderungen in klare Funktionsanforderungen für das Entwicklungsteam.',
        'Durchführung strenger Qualitätssicherung (QA) und Softwaretests, um die Buchhaltungsgenauigkeit und Systemzuverlässigkeit zu gewährleisten.'
      ]
    },
    {
      period: '01.2018 - 09.2022',
      company: 'Aljawaden for General Trading (Amman - Jordanien)',
      role: 'Externer Finanzberater & Systemaufsicht (Teilzeit)',
      bullets: [
        'Bereitstellung spezialisierter Beratungsdienste zur Überwachung monatlicher Buchhaltungsvorgänge und Sicherstellung der Compliance.',
        'Verantwortlich für die laufende Wartung, den Betrieb und die Aufsicht des Buchhaltungs- und Warenwirtschaftssystems (welches ich zuvor implementiert hatte).',
        'Koordinierung und termingerechte Durchführung der monatlichen Steuerabwicklung sowie der jährlichen Abschlussprüfungen.'
      ]
    },
    {
      period: '04.2016 - 04.2019',
      company: 'Solider for Touristic Investments [Jubran Restaurant] (Amman - Jordanien)',
      role: 'Leiter Rechnungswesen',
      bullets: [
        'Verwaltung und Kontrolle des gesamten Buchhaltungskreislaufs, einschließlich Monats- und Jahresabschlüsse.',
        'Leitete die Kostenkontrolle für F&B-Betriebe und analysierte Abweichungen.',
        'Analyse von Buchhaltungsdaten zur Erstellung von Finanzberichten und -auszügen.'
      ]
    },
    {
      period: '01.2014 - 04.2016',
      company: 'Reback for General Trading [Hawana Cafe & Restaurant] (Amman - Jordanien)',
      role: 'Leiter Rechnungswesen',
      bullets: [
        'Verwaltung und Kontrolle des gesamten Buchhaltungskreislaufs, einschließlich Monats- und Jahresabschlüsse.',
        'Leitete die Kostenkontrolle für F&B-Betriebe und analysierte Abweichungen.'
      ]
    },
    {
      period: '09.2012 - 12.2013',
      company: 'Rotana Cafe Amman (Amman - Jordanien)',
      role: 'Kostencontroller & Leiter Rechnungswesen',
      bullets: [
        'Verwaltung und Kontrolle des gesamten Buchhaltungskreislaufs, einschließlich Monats- und Jahresabschlüsse.',
        'Leitete die Kostenkontrolle für F&B-Betriebe und analysierte Abweichungen.'
      ]
    },
    {
      period: '08.2010 - 09.2012',
      company: 'Julia Dumna Group // Julia Dumna Cafe (Damascus - Syrien)',
      role: 'Allgemeiner Buchhalter',
      bullets: [
        'Verwaltung und Kontrolle des Buchhaltungskreislaufs, einschließlich Monatsabschlüsse.',
        'Leitete die Kostenkontrolle für F&B-Betriebe und analysierte Abweichungen.'
      ]
    }
  ];

  experiences.forEach((exp) => {
    if (doc.y > 700) doc.addPage();
    doc.fontSize(8.5).font('Helvetica-Bold').fillColor('#1E3A8A').text(`${exp.period}\t${exp.company}`);
    doc.font('Helvetica-Bold').fillColor('black').text(exp.role);
    exp.bullets.forEach(b => {
      doc.fontSize(8).font('Helvetica').text(`♦ ${b}`, { indent: 10 });
    });
    doc.moveDown(0.4);
  });

  // Ausbildung
  if (doc.y > 700) doc.addPage();
  addSectionHeader('AUSBILDUNG & SPRACHKENNTNISSE');
  doc.fontSize(8.5).font('Helvetica-Bold').text('2021 - 2022\tZertifikat – Fortgeschrittene Softwareentwicklung in Full-Stack JavaScript');
  doc.font('Helvetica').fontSize(8).text('LTUC-ASAC & Code Fellows (Jordanien)', { indent: 60 });
  doc.moveDown(0.3);
  doc.font('Helvetica-Bold').fontSize(8.5).text('2007 - 2011\tBachelor-Abschluss in Rechnungswesen');
  doc.font('Helvetica').fontSize(8).text('Wirtschaftsfakultät (Syrien) - Gesamtnote: 2,5 - 2,8 (Gut)', { indent: 60 });

  // Sprachkenntnisse & Referenzen
  doc.moveDown(0.5);
  addSectionHeader('SPRACHKENNTNISSE');
  doc.fontSize(8.5).font('Helvetica-Bold').text('Arabisch:\t\t', { continued: true }).font('Helvetica').text('Muttersprache');
  doc.font('Helvetica-Bold').text('Englisch:\t\t', { continued: true }).font('Helvetica').text('B2');
  doc.font('Helvetica-Bold').text('Deutsch:\t\t', { continued: true }).font('Helvetica').text('B1 - arbeitet aktiv an B2/C1');
  doc.moveDown(0.3);
  doc.font('Helvetica-Bold').text('Referenzen:\t', { continued: true }).font('Helvetica').text('Referenzen sind auf Anfrage erhältlich');

  doc.end();
  console.log('Created German CV PDF:', outputPath);
}

// Generate files only if they do not exist to prevent overwriting custom uploaded CVs
const enPublicPath = path.join(publicDir, 'Amro_Nazzal_CV_EN.pdf');
const dePublicPath = path.join(publicDir, 'Amro_Nazzal_Lebenslauf_DE.pdf');

if (!fs.existsSync(enPublicPath)) {
  generateEnglishPDF(enPublicPath);
}
if (!fs.existsSync(dePublicPath)) {
  generateGermanPDF(dePublicPath);
}
if (!fs.existsSync(path.join(assetsDocsDir, 'Amro_Nazzal_CV_EN.pdf')) && fs.existsSync(enPublicPath)) {
  fs.copyFileSync(enPublicPath, path.join(assetsDocsDir, 'Amro_Nazzal_CV_EN.pdf'));
}
if (!fs.existsSync(path.join(assetsDocsDir, 'Amro_Nazzal_Lebenslauf_DE.pdf')) && fs.existsSync(dePublicPath)) {
  fs.copyFileSync(dePublicPath, path.join(assetsDocsDir, 'Amro_Nazzal_Lebenslauf_DE.pdf'));
}

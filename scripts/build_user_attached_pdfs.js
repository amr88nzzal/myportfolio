import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

const publicDir = path.join(process.cwd(), 'public');
const assetsDocsDir = path.join(process.cwd(), 'src', 'assets', 'docs');

if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
if (!fs.existsSync(assetsDocsDir)) fs.mkdirSync(assetsDocsDir, { recursive: true });

const portraitPath = path.join(process.cwd(), 'src', 'assets', 'images', 'amro_id_portrait.jpg');

function buildEnglishCV(outputPath) {
  const doc = new PDFDocument({ size: 'A4', margin: 40, autoFirstPage: true });
  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  // --- PAGE 1 ---
  doc.fontSize(20).font('Helvetica-Bold').text('Curriculum Vitae', { align: 'center', underline: true });
  doc.moveDown(0.8);

  const headerY = doc.y;

  doc.fontSize(9).font('Helvetica-Bold');
  doc.text('Name', 40, headerY);
  doc.font('Helvetica').text('Amro Nazzal', 130, headerY);

  doc.font('Helvetica-Bold').text('Address', 40, headerY + 14);
  doc.font('Helvetica').text('04205 Leipzig, Germany', 130, headerY + 14);

  doc.font('Helvetica-Bold').text('Mobile:', 40, headerY + 28);
  doc.font('Helvetica').text('+4915560099668', 130, headerY + 28);

  doc.font('Helvetica-Bold').text('E-Mail', 40, headerY + 42);
  doc.font('Helvetica').fillColor('#1A56DB').text('Amr.nzzal@gmail.com', 130, headerY + 42).fillColor('black');

  doc.font('Helvetica-Bold').text('Date of birth', 40, headerY + 56);
  doc.font('Helvetica').text('1988', 130, headerY + 56);

  doc.font('Helvetica-Bold').text('Nationality', 40, headerY + 70);
  doc.font('Helvetica').text('Syrian', 130, headerY + 70);

  if (fs.existsSync(portraitPath)) {
    try {
      doc.image(portraitPath, 420, headerY, { width: 110, height: 125 });
    } catch (e) {}
  }

  doc.y = headerY + 130;

  // PROFESSIONAL PROFILE
  doc.fontSize(10).font('Helvetica-Bold').fillColor('#1E3A8A').text('PROFESSIONAL PROFILE');
  doc.strokeColor('#1E3A8A').lineWidth(1).moveTo(40, doc.y + 2).lineTo(550, doc.y + 2).stroke();
  doc.fillColor('black');
  doc.moveDown(0.6);

  doc.fontSize(9.5).font('Helvetica-Bold').fillColor('#1E3A8A').text('FINANCIAL SYSTEMS SPECIALIST & IMPLEMENTATION LEAD');
  doc.moveDown(0.4);
  doc.fontSize(8.5).font('Helvetica').fillColor('black').text(
    'Highly versatile professional with 10+ years of proven experience in Accounting, Financial Management, and Software Development. Expert in bridging the gap between complex financial requirements and technical delivery. Demonstrated success as an Exclusive Agent, where he managed the full business cycle (sales, negotiation, implementation, and technical support) for a financial software solution in a regional market. Combines strong analytical abilities with Full-Stack JavaScript skills (React, Node.js, PostgreSQL). Seeking an ERP Consulting, FinTech, or Business Analysis role.',
    { align: 'justify' }
  );

  doc.moveDown(0.8);

  // TECHNICAL & LEADERSHIP SKILLS
  doc.fontSize(10).font('Helvetica-Bold').fillColor('#1E3A8A').text('TECHNICAL & LEADERSHIP SKILLS');
  doc.strokeColor('#1E3A8A').lineWidth(1).moveTo(40, doc.y + 2).lineTo(550, doc.y + 2).stroke();
  doc.fillColor('black');
  doc.moveDown(0.6);

  const skills = [
    ['Consulting &\nImplementation', 'Full business lifecycle management, Contract Negotiation, Client Needs Analysis, Process Optimization, Software Quality Assurance (QA).'],
    ['System &Technical\nIntegration Support', 'Advanced System Troubleshooting (incl. network conflicts/hardware dependencies), Client-Facing L1/L2 Technical Support, Software Quality Assurance (QA).'],
    ['Financial Systems', 'Expertise in ERP systems, General Ledger (GL), AP/AR, Payroll, Cost Controlling, IFRS/local GAAP principles.'],
    ['Databases & Back-end', 'PostgreSQL, MongoDB, NodeJs, Express, RESTful API, Advanced Data Analysis (SQL).'],
    ['Front-end', 'ReactJs, HTML5, CSS3, JavaScript, Redux.'],
    ['Tools & Software', 'Advanced proficiency in MS Excel (Data Modeling & Reporting), MS Office, Git.']
  ];

  skills.forEach(([title, desc]) => {
    const curY = doc.y;
    doc.fontSize(8).font('Helvetica-Bold').text(title, 40, curY, { width: 140 });
    doc.fontSize(8).font('Helvetica').text(desc, 180, curY, { width: 370 });
    doc.y = Math.max(doc.y, curY + 22);
    doc.moveDown(0.3);
  });

  doc.moveDown(0.5);

  // WORK EXPERIENCE (Page 1 part)
  doc.fontSize(10).font('Helvetica-Bold').fillColor('#1E3A8A').text('WORK EXPERIENCE');
  doc.strokeColor('#1E3A8A').lineWidth(1).moveTo(40, doc.y + 2).lineTo(550, doc.y + 2).stroke();
  doc.fillColor('black');
  doc.moveDown(0.6);

  let expY = doc.y;
  doc.fontSize(8.5).font('Helvetica-Bold').fillColor('#1E3A8A').text('02.2024 -\n08.2026', 40, expY, { width: 80 });
  doc.fontSize(9.5).font('Helvetica-Bold').fillColor('black').text('BMW Group (Leipzig, Germany)', 130, expY);
  doc.fontSize(8.5).font('Helvetica-Bold').fillColor('#1E3A8A').text('Production Staff (Transitional Role - Integration Phase)', 130, expY + 12);

  const bmwBullets = [
    'Focusing on active integration into the German labor market and achieving B2/C1 language proficiency.',
    'Ensuring continuous quality assurance and visual inspection, adhering strictly to production specifications and protocols.',
    'Operating within a high-tech manufacturing environment, interacting with automated supply chain systems to maintain efficient workflow.'
  ];

  let bY = expY + 28;
  bmwBullets.forEach(bullet => {
    doc.fontSize(8).font('Helvetica').fillColor('black').text(`♦ ${bullet}`, 130, bY, { width: 420 });
    bY = doc.y + 3;
  });

  // --- PAGE 2 ---
  doc.addPage();

  const exp2List = [
    {
      period: '01.2014 -\n09.2022',
      company: 'Sahlisoft Software Solutions (Damascus - Syria)',
      role: 'Business Implementation Lead & Exclusive Agent for Jordan (Freelance Owner).',
      bullets: [
        'Spearheaded the full business life cycle in the Jordanian market as the exclusive agent (sales, implementation, and support).',
        'Negotiated and drafted annual support and maintenance contracts, successfully securing recurring revenue streams and long-term client relationships.',
        'Conducted detailed client needs analysis to tailor financial software solutions and optimized accounting workflows for SMEs.',
        'Served as the primary technical liaison, translating complex financial requirements into clear feature requests for the development team.',
        'Performed rigorous Quality Assurance (QA) and software testing to ensure accounting accuracy and system reliability.'
      ]
    },
    {
      period: '01.2018 -\n09.2022',
      company: 'Aljawaden for General Trading (Tier Trading) (Amman - Jordan)',
      role: 'External Financial Consultant & System Oversight (Part-time)',
      bullets: [
        'Provided specialized consultancy services, overseeing monthly accounting operations and ensuring compliance.',
        'Managed the ongoing maintenance, operation, and oversight of the Accounting and Inventory System (which was previously implemented by the candidate).',
        'Coordinated and completed monthly taxes and annual audits'
      ]
    },
    {
      period: '04.2016 -\n04.2019',
      company: 'Solider for Touristic Investments [Jubran Restaurant] (Amman - Jordan)',
      role: 'Chief Accountant .',
      bullets: [
        'Managed and controlled the entire accounting cycle, including monthly and annual closings.',
        'Managed Cost Controlling for F&B operations, analyzing variances.',
        'Analyzed accounting data to produce financial reports and statements'
      ]
    },
    {
      period: '01.2014 -\n04.2016',
      company: 'Reback for General Trading [Hawana Cafe & Restaurant] (Amman - Jordan)',
      role: 'Chief Accountant .',
      bullets: [
        'Managed and controlled the entire accounting cycle, including monthly and annual closings.',
        'Managed Cost Controlling for F&B operations, analyzing variances.'
      ]
    },
    {
      period: '09.2012 -\n12.2013',
      company: 'Rotana Cafe Amman (Amman - Jordan)',
      role: 'Cost Controller & Chief Accountant .',
      bullets: [
        'Managed and controlled the entire accounting cycle, including monthly and annual closings.',
        'Managed Cost Controlling for F&B operations, analyzing variances.'
      ]
    },
    {
      period: '08.2010 -\n09.2012',
      company: 'Julia Dumna Group // Julia Dumna Cafe (Damascus - Syria)',
      role: 'General Accountant',
      bullets: [
        'Managed and controlled the accounting cycle, including monthly closings.',
        'Managed Cost Controlling for F&B operations, analyzing variances.'
      ]
    }
  ];

  exp2List.forEach(exp => {
    let topY = doc.y;
    doc.fontSize(8.5).font('Helvetica-Bold').fillColor('#1E3A8A').text(exp.period, 40, topY, { width: 80 });
    doc.fontSize(9).font('Helvetica-Bold').fillColor('black').text(exp.company, 130, topY);
    doc.fontSize(8.5).font('Helvetica-Bold').fillColor('#1E3A8A').text(exp.role, 130, topY + 11);

    let curBY = topY + 23;
    exp.bullets.forEach(b => {
      doc.fontSize(8).font('Helvetica').fillColor('black').text(`♦ ${b}`, 130, curBY, { width: 420 });
      curBY = doc.y + 2;
    });
    doc.y = curBY + 6;
  });

  // EDUCATION
  doc.fontSize(10).font('Helvetica-Bold').fillColor('#1E3A8A').text('EDUCATION :');
  doc.strokeColor('#1E3A8A').lineWidth(1).moveTo(40, doc.y + 2).lineTo(550, doc.y + 2).stroke();
  doc.fillColor('black');
  doc.moveDown(0.5);

  let eduY = doc.y;
  doc.fontSize(8.5).font('Helvetica-Bold').fillColor('#1E3A8A').text('2021 - 2022', 40, eduY);
  doc.fontSize(8.5).font('Helvetica-Bold').fillColor('#1E3A8A').text('Certificate - Advanced Software Development in Full-Stack JavaScript', 130, eduY);
  doc.fontSize(8).font('Helvetica').fillColor('black').text('LTUC-ASAC & Code Fellows (Jordan)', 130, eduY + 11);

  eduY += 26;
  doc.fontSize(8.5).font('Helvetica-Bold').fillColor('#1E3A8A').text('2007 - 2011', 40, eduY);
  doc.fontSize(8.5).font('Helvetica-Bold').fillColor('#1E3A8A').text('Bachelor’s Degree in Accounting', 130, eduY);
  doc.fontSize(8).font('Helvetica').fillColor('black').text('Damascus University – Faculty of Economics (Syria) - GPA Equivalent: 2.5 - 2.8 (Gut)', 130, eduY + 11);

  doc.y = eduY + 28;

  // LANGUAGES
  doc.fontSize(10).font('Helvetica-Bold').fillColor('#1E3A8A').text('LANGUAGES:');
  doc.strokeColor('#1E3A8A').lineWidth(1).moveTo(40, doc.y + 2).lineTo(550, doc.y + 2).stroke();
  doc.fillColor('black');
  doc.moveDown(0.5);

  let langY = doc.y;
  doc.fontSize(8.5).font('Helvetica-Bold').text('ARABIC', 40, langY);
  doc.font('Helvetica').text('Native language', 130, langY);

  doc.font('Helvetica-Bold').text('ENGLISH', 40, langY + 12);
  doc.font('Helvetica').text('B2', 130, langY + 12);

  doc.font('Helvetica-Bold').text('GERMAN', 40, langY + 24);
  doc.font('Helvetica').text('B1 - Actively progressing towards B2/C1', 130, langY + 24);

  // REFERENCES
  let refY = langY + 42;
  doc.fontSize(9).font('Helvetica-Bold').fillColor('#1E3A8A').text('REFERENCES:', 40, refY);
  doc.font('Helvetica').fillColor('black').text('Available upon request', 130, refY);

  doc.end();
}

function buildGermanCV(outputPath) {
  const doc = new PDFDocument({ size: 'A4', margin: 40, autoFirstPage: true });
  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  // --- PAGE 1 ---
  doc.fontSize(20).font('Helvetica-Bold').text('LEBENSLAUF', { align: 'center', underline: true });
  doc.moveDown(0.8);

  const headerY = doc.y;

  doc.fontSize(9).font('Helvetica-Bold');
  doc.text('Name', 40, headerY);
  doc.font('Helvetica').text('Amro Nazzal', 130, headerY);

  doc.font('Helvetica-Bold').text('Anschrift', 40, headerY + 14);
  doc.font('Helvetica').text('04205 Leipzig, Deutschland', 130, headerY + 14);

  doc.font('Helvetica-Bold').text('Mobil:', 40, headerY + 28);
  doc.font('Helvetica').text('+4915560099668', 130, headerY + 28);

  doc.font('Helvetica-Bold').text('E-Mail', 40, headerY + 42);
  doc.font('Helvetica').fillColor('#1A56DB').text('Amr.nzzal@gmail.com', 130, headerY + 42).fillColor('black');

  doc.font('Helvetica-Bold').text('Geburtsdatum', 40, headerY + 56);
  doc.font('Helvetica').text('1988', 130, headerY + 56);

  doc.font('Helvetica-Bold').text('Staatsangehörigkeit', 40, headerY + 70);
  doc.font('Helvetica').text('Syrisch', 130, headerY + 70);

  if (fs.existsSync(portraitPath)) {
    try {
      doc.image(portraitPath, 420, headerY, { width: 110, height: 125 });
    } catch (e) {}
  }

  doc.y = headerY + 130;

  // BERUFLICHES PROFIL
  doc.fontSize(10).font('Helvetica-Bold').fillColor('#1E3A8A').text('BERUFLICHES PROFIL');
  doc.strokeColor('#1E3A8A').lineWidth(1).moveTo(40, doc.y + 2).lineTo(550, doc.y + 2).stroke();
  doc.fillColor('black');
  doc.moveDown(0.6);

  doc.fontSize(9.5).font('Helvetica-Bold').fillColor('#1E3A8A').text('SPEZIALIST FÜR FINANZSYSTEME & IMPLEMENTIERUNGSLEITER');
  doc.moveDown(0.4);
  doc.fontSize(8.5).font('Helvetica').fillColor('black').text(
    'Äußerst vielseitiger Fachmann mit über 10 Jahren Erfahrung in Rechnungswesen, Finanzmanagement und Software-Implementierung. Experte in der Überbrückung der Kluft zwischen komplexen Finanzanforderungen und deren technischer Umsetzung. Nachgewiesener Erfolg als Alleinvertreter, wo er den gesamten Geschäftszyklus (Vertrieb, Vertragsverhandlung, Implementierung und technischer Support) für eine Finanzsoftwarelösung in einem regionalen Markt leitete. Verbindet starke analytische Fähigkeiten mit aktuellen Full-Stack JavaScript-Kenntnissen (React, Node.js, PostgreSQL). Ich strebe eine Position im Bereich ERP-Beratung, FinTech oder Business Analyse an.',
    { align: 'justify' }
  );

  doc.moveDown(0.8);

  // TECHNISCHE UND FÜHRUNGSKOMPETENZEN
  doc.fontSize(10).font('Helvetica-Bold').fillColor('#1E3A8A').text('TECHNISCHE UND FÜHRUNGSKOMPETENZEN');
  doc.strokeColor('#1E3A8A').lineWidth(1).moveTo(40, doc.y + 2).lineTo(550, doc.y + 2).stroke();
  doc.fillColor('black');
  doc.moveDown(0.6);

  const skills = [
    ['Beratung &\nImplementierung', 'Verwaltung des gesamten Geschäftszyklus, Vertragsverhandlung, Kundenbedarfsanalyse, Prozessoptimierung, Software-Qualitätssicherung (QA).'],
    ['SYSTEM & TECHNISCHE\nINTEGRATIONSUNTERSTÜTZUNG', 'Advanced System Troubleshooting (incl. network conflicts/hardware dependencies), Client-Facing L1/L2 Technical Support, Software Quality Assurance (QA).'],
    ['Finanzsysteme', 'Expertise in ERP-Systemen, Hauptbuch (GL), Kreditoren/Debitoren (AP/AR), Gehaltsabrechnung, Kostenkontrolle, IFRS/lokale GAAP-Prinzipien.'],
    ['Datenbanken & Back-end', 'PostgreSQL, MongoDB, NodeJs, Express, RESTful API, Fortgeschrittene Datenanalyse (SQL).'],
    ['Front-end', 'ReactJs, HTML5, CSS3, JavaScript, Redux.'],
    ['Tools & Software', 'Erweiterte Kenntnisse in MS Excel (Datenmodellierung & Reporting), MS Office, Git.']
  ];

  skills.forEach(([title, desc]) => {
    const curY = doc.y;
    doc.fontSize(8).font('Helvetica-Bold').text(title, 40, curY, { width: 140 });
    doc.fontSize(8).font('Helvetica').text(desc, 180, curY, { width: 370 });
    doc.y = Math.max(doc.y, curY + 22);
    doc.moveDown(0.3);
  });

  doc.moveDown(0.5);

  // BERUFSERFAHRUNG (Page 1 part)
  doc.fontSize(10).font('Helvetica-Bold').fillColor('#1E3A8A').text('BERUFSERFAHRUNG');
  doc.strokeColor('#1E3A8A').lineWidth(1).moveTo(40, doc.y + 2).lineTo(550, doc.y + 2).stroke();
  doc.fillColor('black');
  doc.moveDown(0.6);

  let expY = doc.y;
  doc.fontSize(8.5).font('Helvetica-Bold').fillColor('#1E3A8A').text('02.2024 -\n08.2026', 40, expY, { width: 80 });
  doc.fontSize(9.5).font('Helvetica-Bold').fillColor('black').text('BMW Group (Leipzig, Deutschland)', 130, expY);
  doc.fontSize(8.5).font('Helvetica-Bold').fillColor('#1E3A8A').text('Produktionsmitarbeiter (Übergangsrolle - Integrationsphase)', 130, expY + 12);

  const bmwBullets = [
    'Fokus auf die aktive Integration in den deutschen Arbeitsmarkt und das Erreichen von B2/C1-Sprachkenntnissen.',
    'Sicherstellung der kontinuierlichen Qualitätssicherung und visuellen Inspektion unter strikter Einhaltung der Produktionsspezifikationen.',
    'Kooperation mit automatisierten Logistik- und Lieferkettensystemen zur Gewährleistung effizienter Produktionsprozesse im High-Tech-Umfeld.'
  ];

  let bY = expY + 28;
  bmwBullets.forEach(bullet => {
    doc.fontSize(8).font('Helvetica').fillColor('black').text(`♦ ${bullet}`, 130, bY, { width: 420 });
    bY = doc.y + 3;
  });

  // --- PAGE 2 ---
  doc.addPage();

  const exp2List = [
    {
      period: '01.2014 -\n09.2022',
      company: 'Sahlisoft Software Solutions (Syrien/Jordanien)',
      role: 'Implementierungsleiter & Alleinvertreter (Freiberuflich/Inhaber)',
      bullets: [
        'Leitete den gesamten Geschäftszyklus im jordanischen Markt als Alleinvertreter (Vertrieb, Implementierung und Support)..',
        'Verhandelte und erstellte jährliche Support- und Wartungsverträge und sicherte so wiederkehrende Einnahmequellen.',
        'Führte detaillierte Kundenbedarfsanalysen durch, um Finanzsoftwarelösungen anzupassen und Buchhaltungs-Workflows für KMUs zu optimieren.',
        'Fungierte als primäre technische Schnittstelle und übersetzte komplexe Finanzanforderungen in klare Funktionsanforderungen für das Entwicklungsteam.',
        'Durchführung strenger Qualitätssicherung (QA) und Softwaretests, um die Buchhaltungsgenauigkeit und Systemzuverlässigkeit zu gewährleisten..'
      ]
    },
    {
      period: '01.2018 -\n09.2022',
      company: 'Aljawaden for General Trading (Amman - Jordanien)',
      role: 'Externer Finanzberater & Systemaufsicht (Teilzeit)',
      bullets: [
        'Bereitstellung spezialisierter Beratungsdienste zur Überwachung monatlicher Buchhaltungsvorgänge und Sicherstellung der Compliance.',
        'Verantwortlich für die laufende Wartung, den Betrieb und die Aufsicht des Buchhaltungs- und Warenwirtschaftssystems (welches ich zuvor implementiert hatte).',
        'Koordinierung und termingerechte Durchführung der monatlichen Steuerabwicklung sowie der jährlichen Abschlussprüfungen.'
      ]
    },
    {
      period: '04.2016 -\n04.2019',
      company: 'Solider for Touristic Investments [Jubran Restaurant] (Amman - Jordanien)',
      role: 'Leiter Rechnungswesen',
      bullets: [
        'Verwaltung und Kontrolle des gesamten Buchhaltungskreislaufs, einschließlich Monats- und Jahresabschlüsse.',
        'Leitete die Kostenkontrolle für F&B-Betriebe und analysierte Abweichungen.',
        'Analyse von Buchhaltungsdaten zur Erstellung von Finanzberichten und -auszügen.'
      ]
    },
    {
      period: '01.2014 -\n04.2016',
      company: 'Reback for General Trading [Hawana Cafe & Restaurant] (Amman - Jordanien)',
      role: 'Leiter Rechnungswesen',
      bullets: [
        'Verwaltung und Kontrolle des gesamten Buchhaltungskreislaufs, einschließlich Monats- und Jahresabschlüsse.',
        'Leitete die Kostenkontrolle für F&B-Betriebe und analysierte Abweichungen.'
      ]
    },
    {
      period: '09.2012 -\n12.2013',
      company: 'Rotana Cafe Amman (Amman - Jordanien)',
      role: 'Kostencontroller & Leiter Rechnungswesen.',
      bullets: [
        'Verwaltung und Kontrolle des gesamten Buchhaltungskreislaufs, einschließlich Monats- und Jahresabschlüsse.',
        'Leitete die Kostenkontrolle für F&B-Betriebe und analysierte Abweichungen.'
      ]
    },
    {
      period: '08.2010 -\n09.2012',
      company: 'Julia Dumna Group // Julia Dumna Cafe (Damascus - Syrien)',
      role: 'Allgemeiner Buchhalter',
      bullets: [
        'Verwaltung und Kontrolle des Buchhaltungskreislaufs, einschließlich Monatsabschlüsse.',
        'Leitete die Kostenkontrolle für F&B-Betriebe und analysierte Abweichungen.'
      ]
    }
  ];

  exp2List.forEach(exp => {
    let topY = doc.y;
    doc.fontSize(8.5).font('Helvetica-Bold').fillColor('#1E3A8A').text(exp.period, 40, topY, { width: 80 });
    doc.fontSize(9).font('Helvetica-Bold').fillColor('black').text(exp.company, 130, topY);
    doc.fontSize(8.5).font('Helvetica-Bold').fillColor('#1E3A8A').text(exp.role, 130, topY + 11);

    let curBY = topY + 23;
    exp.bullets.forEach(b => {
      doc.fontSize(8).font('Helvetica').fillColor('black').text(`♦ ${b}`, 130, curBY, { width: 420 });
      curBY = doc.y + 2;
    });
    doc.y = curBY + 6;
  });

  // AUSBILDUNG & SPRACHKENNTNISSE
  doc.fontSize(10).font('Helvetica-Bold').fillColor('#1E3A8A').text('AUSBILDUNG & SPRACHKENNTNISSE');
  doc.strokeColor('#1E3A8A').lineWidth(1).moveTo(40, doc.y + 2).lineTo(550, doc.y + 2).stroke();
  doc.fillColor('black');
  doc.moveDown(0.5);

  let eduY = doc.y;
  doc.fontSize(8.5).font('Helvetica-Bold').fillColor('#1E3A8A').text('2021 - 2022', 40, eduY);
  doc.fontSize(8.5).font('Helvetica-Bold').fillColor('#1E3A8A').text('Zertifikat – Fortgeschrittene Softwareentwicklung in Full-Stack JavaScript', 130, eduY);
  doc.fontSize(8).font('Helvetica').fillColor('black').text('LTUC-ASAC & Code Fellows (Jordanien)', 130, eduY + 11);

  eduY += 26;
  doc.fontSize(8.5).font('Helvetica-Bold').fillColor('#1E3A8A').text('2007 - 2011', 40, eduY);
  doc.fontSize(8.5).font('Helvetica-Bold').fillColor('#1E3A8A').text('Bachelor-Abschluss in Rechnungswesen', 130, eduY);
  doc.fontSize(8).font('Helvetica').fillColor('black').text('Wirtschaftsfakultät (Syrien) - Gesamtnote: 2,5 - 2,8 (Gut)', 130, eduY + 11);

  doc.y = eduY + 28;

  // SPRACHKENNTNISSE
  doc.fontSize(10).font('Helvetica-Bold').fillColor('#1E3A8A').text('SPRACHKENNTNISSE:');
  doc.strokeColor('#1E3A8A').lineWidth(1).moveTo(40, doc.y + 2).lineTo(550, doc.y + 2).stroke();
  doc.fillColor('black');
  doc.moveDown(0.5);

  let langY = doc.y;
  doc.fontSize(8.5).font('Helvetica-Bold').text('Arabisch', 40, langY);
  doc.font('Helvetica').text('Muttersprache', 130, langY);

  doc.font('Helvetica-Bold').text('Englisch', 40, langY + 12);
  doc.font('Helvetica').text('B2', 130, langY + 12);

  doc.font('Helvetica-Bold').text('Deutsch', 40, langY + 24);
  doc.font('Helvetica').text('B1 - arbeitet aktiv an B2/C1', 130, langY + 24);

  // Referenzen
  let refY = langY + 42;
  doc.fontSize(9).font('Helvetica-Bold').fillColor('#1E3A8A').text('Referenzen:', 40, refY);
  doc.font('Helvetica').fillColor('black').text('Referenzen sind auf Anfrage erhältlich', 130, refY);

  doc.end();
}

buildEnglishCV(path.join(publicDir, 'Amro_Nazzal_CV_EN.pdf'));
buildEnglishCV(path.join(assetsDocsDir, 'Amro_Nazzal_CV_EN.pdf'));

buildGermanCV(path.join(publicDir, 'Amro_Nazzal_Lebenslauf_DE.pdf'));
buildGermanCV(path.join(assetsDocsDir, 'Amro_Nazzal_Lebenslauf_DE.pdf'));

console.log('Successfully built custom attached CV PDFs!');

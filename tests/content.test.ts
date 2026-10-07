// Content integrity tests: catch missing translations, broken links and missing images. Run: npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { initialPortfolioData as data } from '../src/data';
import { translations } from '../src/i18n';

const LANGS = ['en', 'ar', 'de'] as const;
const root = process.cwd();
const exists = (p: string) => fs.existsSync(p);

test('i18n: every key exists in en, ar and de and has text', () => {
  const keys = Object.keys(translations.en).sort();
  assert.ok(keys.length > 40);
  for (const lang of LANGS) {
    assert.deepEqual(Object.keys(translations[lang]).sort(), keys, `keys differ in ${lang}`);
    for (const key of keys) {
      assert.equal(typeof translations[lang][key], 'string', `${lang}.${key}`);
      assert.ok(translations[lang][key].trim().length > 0, `${lang}.${key} is empty`);
    }
  }
});

test('i18n: placeholders in the reply text survive translation', () => {
  for (const lang of LANGS) {
    for (const ph of ['{name}', '{subject}']) {
      assert.ok(translations[lang].instantResponseText.includes(ph), `${lang} lost ${ph}`);
    }
  }
});

function assertTrilingual(value: any, label: string) {
  for (const lang of LANGS) {
    const v = value?.[lang];
    assert.ok(typeof v === 'string' && v.trim().length > 0, `${label}.${lang} is missing or empty`);
  }
}
function assertTrilingualList(value: any, label: string) {
  for (const lang of LANGS) {
    assert.ok(Array.isArray(value?.[lang]) && value[lang].length > 0, `${label}.${lang} must be a non-empty list`);
    value[lang].forEach((x: string, i: number) => assert.ok(x.trim().length > 0, `${label}.${lang}[${i}] is empty`));
  }
  const n = value.en.length;
  assert.equal(value.ar.length, n, `${label}: ar has a different number of points than en`);
  assert.equal(value.de.length, n, `${label}: de has a different number of points than en`);
}

test('profile: basics are complete in all languages', () => {
  assert.equal(typeof data.dataVersion, 'number');
  assert.ok(data.name.trim());
  assertTrilingual(data.title, 'title');
  assertTrilingual(data.summary, 'summary');
  assertTrilingual(data.contact.location, 'contact.location');
  assert.match(data.contact.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
});

test('social links are empty or full http(s) URLs', () => {
  for (const [key, url] of Object.entries(data.socials)) {
    assert.ok(url === '' || /^https?:\/\//.test(url as string), `${key}: ${url}`);
  }
});

test('ids are unique across all content', () => {
  const ids = [...data.experiences, ...data.education, ...data.skills, ...data.projects].map((x) => x.id);
  assert.equal(new Set(ids).size, ids.length, 'duplicate id found');
});

test('experiences: complete, dated, in all languages', () => {
  assert.ok(data.experiences.length >= 5);
  for (const ex of data.experiences) {
    assert.match(ex.period, /^\d{2}\.\d{4} - \d{2}\.\d{4}$/, `${ex.id} period`);
    assert.ok(ex.company.trim(), `${ex.id} company`);
    assertTrilingual(ex.role, `${ex.id}.role`);
    assertTrilingual(ex.location, `${ex.id}.location`);
    assertTrilingualList(ex.highlights, `${ex.id}.highlights`);
  }
});

test('experience tabs still match at least one entry each', () => {
  const companies = data.experiences.map((e) => e.company.toLowerCase());
  for (const key of ['bmw', 'sahli', 'aljawaden']) {
    assert.ok(companies.some((c) => c.includes(key)), `no experience matches the "${key}" tab`);
  }
  assert.ok(data.experiences.some((e) => /accountant|controller/i.test(e.role.en)), 'no accounting role for the Accounting tab');
});

test('education and skills are complete', () => {
  for (const ed of data.education) {
    assertTrilingual(ed.degree, `${ed.id}.degree`);
    assertTrilingual(ed.school, `${ed.id}.school`);
    assertTrilingual(ed.details, `${ed.id}.details`);
  }
  for (const cat of data.skills) {
    assertTrilingual(cat.title, `${cat.id}.title`);
    assert.ok(cat.skills.length > 0, `${cat.id} has no skills`);
    for (const sk of cat.skills) {
      assert.ok(sk.name.trim(), `${cat.id} skill without a name`);
      assert.ok(Number.isInteger(sk.level) && sk.level >= 1 && sk.level <= 5, `${cat.id}/${sk.name} level ${sk.level}`);
    }
  }
});

test('projects: complete, demo-labelled and their links and images are valid', () => {
  assert.ok(data.projects.length > 0);
  for (const p of data.projects) {
    for (const f of ['title', 'category', 'description', 'metrics'] as const) assertTrilingual((p as any)[f], `${p.id}.${f}`);
    assert.match(p.link, /^https:\/\//, `${p.id} link`);
    assert.ok(p.tech.length > 0, `${p.id} tech`);
    // Projects are demos, not client work: the text must not claim production usage numbers
    for (const lang of LANGS) assert.doesNotMatch(p.metrics[lang], /\d[\d,.]{2,}\s*(\+|users|clients|transactions)/i, `${p.id}.metrics.${lang} reads like a production claim`);
    const file = p.image.startsWith('/src/assets/images/') ? path.join(root, p.image) : path.join(root, 'public', p.image);
    assert.ok(exists(file), `${p.id}: image file is missing (${p.image})`);
  }
});

test('portrait and CV files exist', () => {
  const portrait = data.portraitImage.startsWith('/src/') ? path.join(root, data.portraitImage) : path.join(root, 'public', data.portraitImage);
  assert.ok(exists(portrait), `portrait missing: ${data.portraitImage}`);
  for (const f of ['Amro_Nazzal_CV_EN.pdf', 'Amro_Nazzal_Lebenslauf_DE.pdf', 'og-image.png', 'favicon.svg', 'robots.txt', 'sitemap.xml']) {
    assert.ok(exists(path.join(root, 'public', f)), `public/${f} is missing`);
  }
});

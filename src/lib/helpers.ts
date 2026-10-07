// Small shared helpers (language detection, link checks, ticker text)
export type Lang = 'en' | 'ar' | 'de';
export const SUPPORTED_LANGS: Lang[] = ['en', 'ar', 'de'];

// First visit: ?lang=ar|de|en, then the last choice, then the browser language, otherwise English
export function detectInitialLang(): Lang {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get('lang');
    if (fromUrl && (SUPPORTED_LANGS as string[]).includes(fromUrl)) return fromUrl as Lang;
    const saved = localStorage.getItem('lang');
    if (saved && (SUPPORTED_LANGS as string[]).includes(saved)) return saved as Lang;
    const browser = (navigator.language || '').slice(0, 2).toLowerCase();
    if (browser === 'ar' || browser === 'de') return browser as Lang;
  } catch { /* storage or navigator unavailable */ }
  return 'en';
}

// A social link counts only if it points to a real profile (not just the site's home page)
export const isProfileUrl = (url: string) => {
  try {
    return new URL(url).pathname.replace(/\/+$/, '').length > 0;
  } catch {
    return false;
  }
};

export const tickerText: Record<'en' | 'ar' | 'de', string> = {
  en: 'selected works · finance solutions · full-stack developer · erp systems · accounting audits · optimization · leipzig ·',
  ar: 'أعمال مختارة · حلول مالية · مطور Full-Stack · أنظمة ERP · تدقيق محاسبي · تحسين العمليات · لايبزيغ ·',
  de: 'ausgewählte projekte · finanzlösungen · full-stack-entwickler · erp-systeme · buchhaltungsprüfung · optimierung · leipzig ·'
};

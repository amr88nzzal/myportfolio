# 🧭 Amro Nazzal — موقع السيرة المهنية (Portfolio)

موقع شخصي احترافي لعمرو نزّال (أخصائي أنظمة مالية ومطوّر Full-Stack)، منشور على **https://amrodev.com**.
الموقع **ثلاثي اللغة** (العربية RTL، الإنجليزية، الألمانية)، يدعم **الوضع الداكن**، ويتضمن **لوحة إدارة (CMS)** لتعديل المحتوى دون تعديل الكود.

---

## ✨ المزايا

| الميزة | الوصف |
| :--- | :--- |
| 3 لغات | عربي (RTL) / English / Deutsch، مع تبديل فوري وضبط `lang` و`dir` والعنوان والوصف تلقائياً |
| محتوى ديناميكي | الخبرات والمشاريع والمهارات والمؤهلات تُقرأ من `data.ts` أو من نسخة محفوظة على الخادم |
| لوحة إدارة | تعديل الملف الشخصي والصورة والخبرات والمشاريع والمهارات والتنبيهات وقراءة الرسائل |
| نموذج تواصل | يحفظ الرسالة على الخادم ويرسل تنبيهاً عبر Telegram و/أو البريد |
| السيرة الذاتية | عرض على الشاشة، وطباعة/حفظ PDF بالثلاث لغات، وتنزيل PDF (EN / DE) |
| GitHub | عرض أحدث المستودعات العامة للحساب، يجلبها **الخادم** ويخزّنها 15 دقيقة (لا يتصل متصفح الزائر بـ GitHub) |
| مشاريع تجريبية | معروضة كـ **Demo** (مشاريع شخصية وليست أعمال عملاء) |
| أمان | جلسات إدارة موقّعة، تحديد معدل الطلبات، فحص الصور، إخفاء الأسرار عن المتصفح |

## 🧱 التقنيات

React 19 · TypeScript · Vite 8 · Tailwind CSS 4 · Express 4 · Node 20 · Docker · Nodemailer (SMTP) · Telegram Bot API.

## 🚀 التشغيل المحلي

```bash
# 1) المتطلبات: Node.js 20+
npm install --legacy-peer-deps

# 2) أنشئ ملف .env من النموذج واملأ القيم التي تحتاجها
cp .env.example .env

# 3) التشغيل (خادم Express + Vite معاً) على http://localhost:3300
npm run dev
```

للدخول إلى لوحة الإدارة محلياً: افتح `http://localhost:3300/#admin` ثم اضغط أيقونة القفل وأدخل قيمة `ADMIN_PASSWORD` من `.env`.

| الأمر | الوظيفة |
| :--- | :--- |
| `npm run dev` | تشغيل التطوير (`tsx server.ts` مع Vite كـ middleware) |
| `npm run build` | بناء الواجهة إلى `dist/` (`vite build`) |
| `npm run preview` | تشغيل الخادم بوضع الإنتاج محلياً (بعد `build`) |
| `npm run lint` | فحص الأنواع `tsc --noEmit` |
| `npm test` | 28 اختباراً آلياً (منطق الخادم، اللغة، سلامة المحتوى) |
| `npm run clean` | حذف `dist` |

## 🐳 النشر (مختصر)

```bash
cp .env.example .env     # املأ القيم
./deploy.sh              # أو: docker compose up -d --build
```

التفاصيل الكاملة (Cloudflare، Oracle، الوحدات Volumes، النسخ الاحتياطي، حل المشاكل) في [`docs/06-deployment-operations.md`](docs/06-deployment-operations.md) و[`DEPLOYMENT.md`](DEPLOYMENT.md).

## 🗂️ هيكل المشروع

```
.
├── index.html            ← صفحة HTML الوحيدة (SEO + JSON-LD + نقطة تركيب React)
├── server.ts             ← خادم Express: الـ API + الملفات الثابتة + Vite (تطوير)
├── backend/utils.ts      ← دوال الخادم النقية (جلسات، حدود معدل، فحص الصور...) القابلة للاختبار
├── tests/                ← الاختبارات الآلية (npm test)
├── src/
│   ├── main.tsx          ← نقطة دخول React
│   ├── App.tsx           ← الحالة والمنطق وتركيب المكوّنات (≈ 870 سطر)
│   ├── components/       ← أقسام الصفحة (Hero, Projects, ...) ولوحة الإدارة (admin/)
│   ├── lib/helpers.ts    ← اللغة، فحص الروابط، نص الشريط المتحرك
│   ├── data.ts           ← المحتوى الافتراضي (السيرة، المشاريع، ...)
│   ├── types.ts          ← أنواع TypeScript لنموذج البيانات
│   ├── i18n.ts           ← نصوص الواجهة بالثلاث لغات (translations)
│   ├── index.css         ← Tailwind + الخطوط + الوضع الداكن + الأنيميشن
│   └── assets/images/    ← صور المشاريع والصور المرفوعة (وحدة Docker دائمة)
├── public/               ← ملفات تُخدَّم من الجذر (PDF السيرة، favicon، og-image، robots.txt، sitemap.xml، images/)
├── data/                 ← (وقت التشغيل) portfolio-store.json و messages-store.json
├── Dockerfile · docker-compose.yml · deploy.sh · .dockerignore
├── .env.example          ← نموذج المتغيرات البيئية
└── docs/                 ← التوثيق الكامل بالعربية
```

## 📚 فهرس التوثيق

| الملف | المحتوى |
| :--- | :--- |
| [`docs/01-architecture.md`](docs/01-architecture.md) | البنية العامة، المخططات، تدفق البيانات |
| [`docs/02-frontend.md`](docs/02-frontend.md) | شرح الواجهة: الحالة، التأثيرات، الأقسام، الترجمة، RTL، الطباعة |
| [`docs/03-backend-api.md`](docs/03-backend-api.md) | الخادم وكل مسارات الـ API والمتغيرات البيئية |
| [`docs/04-data-model.md`](docs/04-data-model.md) | نموذج البيانات، `dataVersion`، ملفات التخزين |
| [`docs/05-admin-panel.md`](docs/05-admin-panel.md) | لوحة الإدارة: الدخول، كل تبويب، رفع الصور، منطق الحفظ |
| [`docs/06-deployment-operations.md`](docs/06-deployment-operations.md) | Docker، Cloudflare، النسخ الاحتياطي، التحديث، حل المشاكل |
| [`docs/07-security.md`](docs/07-security.md) | نموذج الأمان والضوابط والقيود المعروفة |
| [`docs/09-testing.md`](docs/09-testing.md) | الاختبارات الآلية: ماذا تغطي وكيف تُشغَّل وتُضاف |
| [`docs/08-maintenance-and-known-issues.md`](docs/08-maintenance-and-known-issues.md) | وصفات التطوير الشائعة، المشاكل المعروفة، قائمة اختبار |

> 📝 **ملاحظة عن هذا التوثيق:** كُتب من قراءة الكود مباشرة. أي سلوك لم يُختبر على بيئة تشغيل حقيقية يُذكر صراحةً بعبارة «يُفترض» أو «تحقّق».

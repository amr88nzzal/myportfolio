# 4️⃣ نموذج البيانات (Data Model)

كل ما يظهر في الموقع (النصوص، الخبرات، المشاريع، الروابط) يأتي من **كائن واحد** من النوع `PortfolioData` معرَّف في `src/types.ts`، وقيمته الافتراضية في `src/data.ts`.

## 1. مبدأ النص المتعدد اللغات

أي نص يراه الزائر يُخزَّن هكذا:

```ts
{ en: "English text", ar: "النص العربي", de: "Deutscher Text" }
```

ويُقرأ في الواجهة بـ `portfolio.title[lang]`. المقاطع المتعددة (النقاط) تكون `{ en: string[], ar: string[], de: string[] }`.

---

## 2. الواجهات (Interfaces)

### `PortfolioData` — الجذر

| الحقل | النوع | الوصف |
| :--- | :--- | :--- |
| `dataVersion` | `number?` | رقم إصدار المحتوى الافتراضي (انظر القسم 4) |
| `name` | `string` | الاسم الظاهر في الـ header والبطاقات |
| `portraitImage` | `string` | رابط الصورة الشخصية (مثل `/images/amro-portrait.jpg`) |
| `title` | `{en,ar,de}` | المسمى المهني (يظهر في عنوان الصفحة) |
| `summary` | `{en,ar,de}` | الملخص المهني في الواجهة (والجزء الأول منه في `<meta description>`) |
| `contact` | `{email, phone, location:{en,ar,de}}` | بيانات الاتصال. الهاتف الفارغ = لا يظهر زر الاتصال |
| `socials` | `SocialLinks` | `github` `telegram` `whatsapp` `twitter` `linkedin` (روابط `https://` كاملة). الفارغ = لا يُعرض |
| `integrations` | `IntegrationsConfig` | مفاتيح التنبيهات (انظر أدناه) |
| `experiences` | `WorkExperience[]` | الخبرات العملية |
| `education` | `EducationItem[]` | المؤهلات |
| `skills` | `SkillCategory[]` | فئات المهارات |
| `projects` | `Project[]` | المشاريع التجريبية |

### `WorkExperience`
| الحقل | النوع | ملاحظة |
| :--- | :--- | :--- |
| `id` | string | فريد، مثل `exp-bmw` |
| `period` | string | نص حر، مثل `02.2024 - 08.2026` |
| `company` | string | **يُستخدم في فلترة التبويبات** (`bmw` / `sahli` / `aljawaden`) |
| `location` | `{en,ar,de}` | |
| `role` | `{en,ar,de}` | ويُستخدم الدور الإنجليزي لتبويب «المحاسبة» (يحوي accountant أو controller) |
| `highlights` | `{en:string[], ar:string[], de:string[]}` | نقاط الإنجازات |

### `EducationItem`
`id`, `degree{en,ar,de}`, `school{en,ar,de}`, `period`, `details{en,ar,de}`.

### `SkillCategory`
`id`, `title{en,ar,de}`, `skills: {name:string, level:number}[]` — المستوى من 1 إلى 5.

### `Project`
| الحقل | ملاحظة |
| :--- | :--- |
| `id` | مثل `proj-pos-system` |
| `title`, `category`, `description`, `metrics` | `{en,ar,de}` |
| `tech` | `string[]` (تظهر كوسوم) |
| `image` | مسار صورة المشروع، عادة `/src/assets/images/...` |
| `link` | رابط العرض التجريبي (نطاق فرعي لـ amrodev.com) |

> الحقل `metrics` صار يصف **إمكانية المشروع التجريبي** لا نتائج إنتاج (لأن المشاريع ليست لعملاء).

### `IntegrationsConfig`
| الحقل | الاستخدام الفعلي |
| :--- | :--- |
| `telegramEnabled` | تنبيه تيليغرام لرسائل التواصل |
| `emailEnabled` | تنبيه بريد لرسائل التواصل (افتراضي `true`) |
| `emailAlertAddress` | وجهة البريد (إن فارغ تُستخدم قيمة `.env`) |
| `visitAlertsEnabled` | تنبيه الزيارات |
| `telegramBotToken`, `telegramChatId` | **قديمان**: تبقى فارغة دائماً؛ الأسرار في `.env` |

### `ContactMessage`
`id` (`msg-<وقت>-<عشوائي>`), `name`, `email`, `subject`, `message`, `date` (`YYYY-MM-DD HH:mm` UTC), `isRead`.

---

## 3. المحتوى الافتراضي (`src/data.ts`)

| الجزء | العناصر (المعرّفات) |
| :--- | :--- |
| الخبرات | `exp-bmw`, `exp-sahli`, `exp-aljawaden`, `exp-solider`, `exp-reback`, `exp-rotana`, `exp-julia` |
| المؤهلات | `edu-dev` (شهادة التطوير)، `edu-accounting` (بكالوريوس المحاسبة) |
| فئات المهارات | `cat-fintech`, `cat-dev`, `cat-languages` |
| المشاريع | `proj-pos-system`, `proj-pos-api`, `proj-invscan`, `proj-afaq-erp`, `proj-afaq-lite` |

---

## 4. `dataVersion` — منع ظهور محتوى قديم

**المشكلة:** المحتوى المحفوظ على الخادم (`data/portfolio-store.json`) يتغلب على `data.ts`. فإن عدّلت `data.ts` وأعدت النشر لن ترى التعديل لأن الموقع يعرض المخزّن.

**الحل:** `data.ts` يحمل `dataVersion` (حالياً **6**).

| الحالة | السلوك |
| :--- | :--- |
| رقم المخزّن = رقم `data.ts` | يُعرض المخزّن (تعديلات لوحة الإدارة تعمل) |
| رقم المخزّن مختلف أو غير موجود | يُتجاهل المخزّن ويُعرض `data.ts`. أول حفظ من لوحة الإدارة يستبدل الملف المخزّن |

**القاعدة:** ارفع `dataVersion` بمقدار 1 عند كل تعديل على `data.ts` تريد أن يظهر. وتنبّه: تعديلات لوحة الإدارة السابقة ستُتجاهل (أعد إدخال ما تريد الاحتفاظ به أو انقل التعديل إلى `data.ts`).

---

## 5. أين تُخزَّن البيانات؟

| المكان | المحتوى | ملاحظات |
| :--- | :--- | :--- |
| `src/data.ts` | الافتراضي | داخل الكود (Git) |
| `data/portfolio-store.json` | محتوى لوحة الإدارة | وحدة Docker `portfolio_data`؛ أسرار التكاملات فارغة دائماً |
| `data/messages-store.json` | رسائل التواصل | آخر 500 |
| `localStorage['amro_portfolio']` | نسخة في متصفح الزائر (احتياط عند فشل الخادم) | تُتجاهل إن كان `dataVersion` مختلفاً أو بنيتها قديمة |
| `localStorage['theme']` | `dark` أو `light` | |
| `src/assets/images/` | الصور المرفوعة وصور المشاريع | وحدة Docker `portfolio_uploads` |

## 6. تعديل المحتوى: ثلاث طرق

| الطريقة | متى تناسب |
| :--- | :--- |
| لوحة الإدارة (`/#admin`) | تعديلات يومية سريعة بلا نشر |
| تعديل `data.ts` + رفع `dataVersion` + إعادة البناء | تغييرات كبيرة أو تريدها محفوظة في Git |
| تحرير `data/portfolio-store.json` على الخادم | طارئ فقط (يجب أن يبقى `dataVersion` مطابقاً) |

## 7. النسخ الاحتياطي

انسخ **وحدتين**: `portfolio_data` (المحتوى والرسائل) و`portfolio_uploads` (الصور). الأوامر في `06-deployment-operations.md`.

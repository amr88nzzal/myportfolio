# 🚀 دليل النشر والتشغيل على سيرفر أوراكل السحابي ودومين كلاودفلير
## Amro Nazzal Executive Portfolio — Cloud Deployment (Port 3300)

هذا المستند يتضمن الخطوات الكاملة لنشر الموقع على **Oracle Cloud VM** باستخدام **Docker** على **Port 3300** وربطه بالدومين الرئيسي **`amrodev.com`** عبر **Cloudflare**.

---

### 1️⃣ هيكلية الدومينات (Domain & Subdomains Architecture)

لأن لديك تطبيقات أخرى تعمل على دومينات فرعية (مثل `app1.amrodev.com`):

| الدومين / السجل | النوع (Type) | الهدف (Target) | الوصف |
| :--- | :--- | :--- | :--- |
| **`amrodev.com`** (Main) | **A Record** | `YOUR_ORACLE_PUBLIC_IP` | موقع البورتفوليو الرئيسي (Port 3300) |
| **`www.amrodev.com`** | **CNAME** | `amrodev.com` | إعادة التوجيه للرئيسي |
| **`*.amrodev.com`** | **A Record** / CNAME | `YOUR_ORACLE_PUBLIC_IP` | التنسيق مع التطبيقات الأخرى حسب البورتات |

---

### 2️⃣ خطوات الإعداد على كلاودفلير (Cloudflare DNS)

1. سجل الدخول إلى حسابك في **Cloudflare**.
2. اختر الدومين الرئيسي **`amrodev.com`**.
3. توجه إلى **DNS -> Records** وأضف السجلات التالية:
   * **A Record:**
     * Name: `@` (أو `amrodev.com`)
     * IPv4 address: `عنوان IP الخاص بسيرفر أوراكل`
     * Proxy status: **Proxied (الأيقونة البرتقالية 🟠)** لضمان الحماية وشهادة SSL المباشرة.
   * **CNAME Record:**
     * Name: `www`
     * Target: `amrodev.com`
     * Proxy status: **Proxied 🟠**

---

### 3️⃣ إعداد سيرفر أوراكل (Oracle Cloud Security & Firewall)

#### أ) فتح البورت في لوحة أوراكل (Oracle Cloud Console):
1. افتح **Oracle Cloud Console** -> **Networking** -> **Virtual Cloud Networks (VCN)**.
2. اضغط على الـ VCN ثم **Security Lists** -> **Default Security List**.
3. اضغط **Add Ingress Rules**:
   * **Source CIDR:** `0.0.0.0/0`
   * **IP Protocol:** `TCP`
   * **Destination Port Range:** `3300` (وأيضاً 80 و 444 للـ Reverse Proxy إذا استخدمته).

#### ب) فتح البورت داخل نظام التشغيل (Ubuntu/Oracle Linux Terminal):
```bash
# فتح البورت 3300 في جدار الحماية الداخلي
sudo iptables -I INPUT -p tcp --dport 3300 -j ACCEPT
sudo netfilter-persistent save

# أو في حال استخدام UFW:
sudo ufw allow 3300/tcp
```

---

### 4️⃣ إشعار وتوجيه الحركة المباشرة عبر Nginx (اختياري - موصى به)

إذا كنت ترغب بأن يفتح الدومين الرئيسي `amrodev.com` بدون الحاجة لكتابة رقم البورت `:3300` في الرابط، يمكنك إعداد Nginx بسيط على السيرفر لتوجيه الحركة:

أنشئ ملف إعداد Nginx `/etc/nginx/sites-available/amrodev`:
```nginx
server {
    listen 80;
    server_name amrodev.com www.amrodev.com;

    location / {
        proxy_pass http://127.0.0.1:3300;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

---

### 5️⃣ تشغيل الحاوية باستخدام Docker على السيرفر (Commands)

داخل مجلد المشروع على السيرفر:

```bash
# 1. التأكد من وجود ملف .env بالمتغيرات الصحيحة
cp .env.example .env

# 2. تشغيل السكريبت الآلي لبناء وتشغيل الحاوية
chmod +x deploy.sh
./deploy.sh

# أو تشغيل أمر دوكر المباشر:
docker compose up -d --build
```

---

### 6️⃣ التحقق والتشغيل
* فحص حالة الحاوية: `docker compose ps`
* فحص السجلات والـ Logs: `docker compose logs -f`
* الدخول المباشر: **`https://amrodev.com`**

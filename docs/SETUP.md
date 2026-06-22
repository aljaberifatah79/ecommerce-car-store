# 🚀 دليل الإعداد

هذا الدليل يشرح كيفية إعداد وتشغيل مشروع متجر السيارات الإلكتروني.

---

## المتطلبات الأساسية

قبل البدء، تأكد من تثبيت:

- **Node.js** (v18 أو أحدث) - [تحميل](https://nodejs.org/)
- **MongoDB** (v5 أو أحدث) - [تحميل](https://www.mongodb.com/try/download/community)
- **Git** - [تحميل](https://git-scm.com/)
- **npm** أو **yarn** (يأتي مع Node.js)

---

## خطوات التثبيت

### 1️⃣ استنساخ المستودع

```bash
git clone https://github.com/aljaberifatah79/ecommerce-car-store.git
cd ecommerce-car-store
```

### 2️⃣ إعداد Backend

#### تثبيت المكتبات:
```bash
cd backend
npm install
```

#### إنشاء ملف `.env`:
```bash
cp .env.example .env
```

#### تعديل الإعدادات في `.env`:
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce-car-store
JWT_SECRET=your_jwt_secret_key_here
HYPERPAY_API_KEY=your_key_here
```

#### تشغيل السيرفر:
```bash
npm run dev
```

الخادم سيعمل على: `http://localhost:5000`

---

### 3️⃣ إعداد Frontend

#### تثبيت المكتبات:
```bash
cd frontend
npm install
```

#### إنشاء ملف `.env.local`:
```bash
cp .env.local.example .env.local
```

#### تشغيل التطبيق:
```bash
npm run dev
```

الموقع سيعمل على: `http://localhost:3000`

---

## التحقق من التثبيت

### اختبار Backend:
```bash
curl http://localhost:5000/api/health
```

يجب أن تحصل على:
```json
{
  "status": "OK",
  "message": "Server is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### اختبار Frontend:
افتح `http://localhost:3000` في المتصفح

---

## هيكل المشروع

```
ecommerce-car-store/
├── backend/          # Node.js + Express + MongoDB
├── frontend/         # Next.js + React + Tailwind
├── mobile/           # React Native (قريباً)
└── docs/             # التوثيق
```

---

## المشاكل الشائعة

### ❌ MongoDB غير متصل
**الحل:** تأكد من تشغيل MongoDB:
```bash
# macOS
brew services start mongodb-community

# Windows
net start MongoDB
```

### ❌ Port 5000 مستخدم
**الحل:** غير Port في `.env`:
```
PORT=5001
```

### ❌ node_modules مفقود
**الحل:** أعد تثبيت المكتبات:
```bash
npm install
```

---

## الخطوات التالية

1. اقرأ [توثيق API](./API.md)
2. اقرأ [دليل النشر](./DEPLOYMENT.md)
3. ابدأ بتطوير الميزات

---

## الدعم

إذا واجهت مشكلة:
1. تحقق من الرسائل في console
2. اقرأ التوثيق
3. افتح issue على GitHub

**صُنع بـ ❤️ للسوق السعودي**

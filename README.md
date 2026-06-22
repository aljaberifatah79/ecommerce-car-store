# 🚗 متجر السيارات الإلكتروني | E-Commerce Car Store

متجر إلكتروني شامل لبيع قطع غيار السيارات والإكسسوارات في المملكة العربية السعودية.

## 📋 الميزات الرئيسية

### للمستخدمين:
- ✅ عرض وتصفح المنتجات بسهولة
- ✅ سلة التسوق والدفع الآمن
- ✅ نظام حسابات المستخدمين
- ✅ تتبع الطلبيات
- ✅ تقييمات وتعليقات المنتجات
- ✅ البحث والتصفية المتقدمة

### للمسؤولين:
- ✅ لوحة تحكم إدارة المنتجات
- ✅ إدارة الطلبيات والشحنات
- ✅ إدارة المستخدمين
- ✅ تقارير وإحصائيات المبيعات

---

## 🛠️ التقنيات المستخدمة

### Frontend (الويب):
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - UI Design
- **Redux** - State management
- **Axios** - HTTP client

### Mobile:
- **React Native** - Cross-platform mobile apps
- **Expo** - Quick development

### Backend:
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing

### Payment:
- **HyperPay API** - Saudi payment gateway

---

## 📁 هيكل المشروع

```
ecommerce-car-store/
│
├── backend/                 # خادم Node.js
│   ├── src/
│   │   ├── config/         # إعدادات قاعدة البيانات
│   │   ├── controllers/    # معالجات الطلبات
│   │   ├── models/         # نماذج قاعدة البيانات
│   │   ├── routes/         # المسارات
│   │   ├── middleware/     # البرمجيات الوسيطة
│   │   ├── services/       # الخدمات
│   │   └── app.js          # تطبيق Express
│   ├── .env.example        # متغيرات البيئة
│   ├── package.json        # المكتبات
│   └── server.js           # نقطة الدخول
│
├── frontend/               # موقع Next.js
│   ├── src/
│   │   ├── app/           # صفحات الموقع
│   │   ├── components/    # المكونات
│   │   ├── pages/         # الصفحات
│   │   ├── styles/        # الأنماط
│   │   ├── services/      # خدمات API
│   │   └── redux/         # إدارة الحالة
│   ├── public/            # الملفات الثابتة
│   ├── .env.local         # متغيرات البيئة
│   └── package.json       # المكتبات
│
├── mobile/                # تطبيق React Native
│   ├── src/
│   │   ├── screens/      # الشاشات
│   │   ├── components/   # المكونات
│   │   ├── services/     # خدمات API
│   │   └── navigation/   # الملاحة
│   └── package.json      # المكتبات
│
├── docs/                 # التوثيق
│   ├── API.md           # توثيق API
│   ├── SETUP.md         # خطوات الإعداد
│   └── DEPLOYMENT.md    # النشر والتطوير
│
└── .gitignore
```

---

## 🚀 البدء السريع

### المتطلبات:
- Node.js v18+
- MongoDB
- Git

### الخطوات:

#### 1. استنساخ المستودع:
```bash
git clone https://github.com/aljaberifatah79/ecommerce-car-store.git
cd ecommerce-car-store
```

#### 2. إعداد Backend:
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

#### 3. إعداد Frontend:
```bash
cd frontend
npm install
npm run dev
```

---

## 📚 التوثيق

- [إعداد المشروع](./docs/SETUP.md)
- [توثيق API](./docs/API.md)
- [خطط النشر](./docs/DEPLOYMENT.md)

---

## 👨‍💻 المساهمة

هذا مشروع تعليمي. يمكنك إضافة ميزات جديدة أو إصلاح الأخطاء.

---

## 📄 الترخيص

MIT License

---

**صُنع بـ ❤️ للسوق السعودي**

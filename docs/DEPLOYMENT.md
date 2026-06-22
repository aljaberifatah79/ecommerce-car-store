# 🌐 دليل النشر والتطوير

هذا الدليل يشرح كيفية نشر التطبيق في بيئة الإنتاج.

---

## خيارات النشر

### 1️⃣ نشر Backend

#### على Heroku:
```bash
# 1. إنشاء تطبيق جديد
heroku create your-app-name

# 2. إضافة متغيرات البيئة
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_secret_key
heroku config:set MONGODB_URI=your_mongodb_url

# 3. النشر
git push heroku main
```

#### على Railway:
1. اذهب إلى https://railway.app
2. ربط حسابك بـ GitHub
3. اختر المستودع
4. أضف متغيرات البيئة
5. النشر التلقائي يبدأ

#### على AWS:
1. استخدم Elastic Beanstalk
2. أو استخدم EC2 + PM2

---

### 2️⃣ نشر Frontend

#### على Vercel:
```bash
# 1. تثبيت Vercel CLI
npm install -g vercel

# 2. النشر
vercel

# 3. ربط المجال (اختياري)
vercel --prod
```

#### على Netlify:
1. اذهب إلى https://netlify.com
2. ربط حسابك بـ GitHub
3. اختر المستودع
4. النشر التلقائي يبدأ

#### على AWS S3 + CloudFront:
```bash
# 1. بناء التطبيق
npm run build

# 2. تحميل الملفات إلى S3
aws s3 sync out/ s3://your-bucket/

# 3. تحديث CloudFront
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

---

## متغيرات البيئة للإنتاج

### Backend (.env):
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/ecommerce-car-store
JWT_SECRET=very_secure_random_key_min_32_chars
FRONTEND_URL=https://yourdomain.com
HYPERPAY_API_KEY=production_key_here
HYPERPAY_API_URL=https://api.hyperpay.net
```

### Frontend (.env.production):
```
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_APP_NAME=متجر السيارات
NEXTAUTH_SECRET=your_secret_here
NEXTAUTH_URL=https://yourdomain.com
```

---

## استخدام Docker

### Dockerfile للـ Backend:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
```

### Docker Compose:
```yaml
version: '3'
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=mongodb://mongo:27017/ecommerce
    depends_on:
      - mongo
  
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
  
  mongo:
    image: mongo:5
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

### التشغيل:
```bash
docker-compose up -d
```

---

## CI/CD Pipeline مع GitHub Actions

### ملف `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    
    - name: Install and build frontend
      run: |
        cd frontend
        npm install
        npm run build
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
        vercel-args: '--prod'
```

---

## الأمان في الإنتاج

### ✅ أمور يجب القيام بها:

1. **استخدم HTTPS** - لا تستخدم HTTP
2. **حماية متغيرات البيئة** - لا تضع المفاتيح في الكود
3. **تحديث المكتبات** - `npm audit fix`
4. **استخدم Rate Limiting** - منع الهجمات
5. **تفعيل CORS** بشكل صحيح
6. **استخدم شهادات SSL** - Let's Encrypt
7. **عمل Backups** - لقاعدة البيانات
8. **المراقبة والسجلات** - استخدم Sentry أو New Relic

---

## المراقبة والأداء

### استخدام PM2:
```bash
# التثبيت
npm install -g pm2

# التشغيل
pm2 start server.js --name "ecommerce-api"

# المراقبة
pm2 monit

# السجلات
pm2 logs
```

### مراقبة الأخطاء مع Sentry:
```javascript
const Sentry = require("@sentry/node");

Sentry.init({
  dsn: "your_sentry_dsn",
  environment: "production"
});
```

---

## قائمة التحقق قبل النشر

- [ ] تم اختبار جميع الميزات
- [ ] لا توجد أخطاء في console
- [ ] تم التحقق من الأمان
- [ ] تم تحديث متغيرات البيئة
- [ ] تم عمل backup لقاعدة البيانات
- [ ] تم اختبار الدفع
- [ ] تم اختبار الشحن
- [ ] تم توثيق التغييرات

---

**آخر تحديث: 2024**

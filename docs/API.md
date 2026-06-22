# 📚 توثيق API

هذا الملف يوضح جميع endpoints API المتاحة.

## Base URL
```
http://localhost:5000/api
```

---

## Authentication Endpoints

### تسجيل مستخدم جديد
```http
POST /auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "اسم المستخدم",
  "phone": "0501234567"
}
```

**Response (201):**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "fullName": "اسم المستخدم"
  }
}
```

---

### تسجيل الدخول
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com"
  }
}
```

---

## Products Endpoints

### الحصول على جميع المنتجات
```http
GET /products
```

**Query Parameters:**
- `page` (optional): رقم الصفحة (default: 1)
- `limit` (optional): عدد المنتجات (default: 20)
- `category` (optional): تصفية حسب الفئة
- `search` (optional): البحث عن منتج

**Response (200):**
```json
{
  "success": true,
  "products": [
    {
      "id": "product_id",
      "name": "اسم المنتج",
      "price": 150.00,
      "category": "محركات",
      "description": "وصف المنتج",
      "image": "url_image",
      "rating": 4.5
    }
  ],
  "total": 100
}
```

---

### الحصول على منتج واحد
```http
GET /products/:id
```

**Response (200):**
```json
{
  "success": true,
  "product": {
    "id": "product_id",
    "name": "اسم المنتج",
    "price": 150.00,
    "description": "وصف المنتج",
    "images": ["url1", "url2"],
    "stock": 50,
    "rating": 4.5,
    "reviews": [...]
  }
}
```

---

## Shopping Cart Endpoints

### الحصول على السلة
```http
GET /cart
```

**Headers:**
```
Authorization: Bearer jwt_token
```

**Response (200):**
```json
{
  "success": true,
  "cart": {
    "id": "cart_id",
    "items": [
      {
        "productId": "product_id",
        "quantity": 2,
        "price": 150.00
      }
    ],
    "total": 300.00
  }
}
```

---

### إضافة منتج للسلة
```http
POST /cart/add
```

**Request Body:**
```json
{
  "productId": "product_id",
  "quantity": 2
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "تمت إضافة المنتج للسلة"
}
```

---

## Orders Endpoints

### إنشاء طلبية
```http
POST /orders
```

**Request Body:**
```json
{
  "items": [
    {
      "productId": "product_id",
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "city": "الرياض",
    "street": "اسم الشارع",
    "zipCode": "12345"
  },
  "paymentMethod": "card"
}
```

**Response (201):**
```json
{
  "success": true,
  "order": {
    "id": "order_id",
    "orderNumber": "ORD-2024-001",
    "total": 300.00,
    "status": "pending",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### الحصول على طلبياتي
```http
GET /orders
```

**Response (200):**
```json
{
  "success": true,
  "orders": [...]
}
```

---

## Payments Endpoints

### معالجة الدفع
```http
POST /payments/process
```

**Request Body:**
```json
{
  "orderId": "order_id",
  "amount": 300.00,
  "paymentMethod": "hyperpay"
}
```

**Response (200):**
```json
{
  "success": true,
  "paymentUrl": "https://checkout.hyperpay.net/...",
  "status": "pending"
}
```

---

## Error Responses

جميع الأخطاء تأتي بهذا الشكل:

```json
{
  "success": false,
  "message": "وصف الخطأ",
  "error": "error_code"
}
```

### HTTP Status Codes:
- `200` - نجح
- `201` - تم الإنشاء
- `400` - طلب خاطئ
- `401` - غير مصرح
- `403` - ممنوع
- `404` - غير موجود
- `500` - خطأ السيرفر

---

**آخر تحديث: 2024**

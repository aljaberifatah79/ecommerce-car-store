const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'الرجاء إدخال الاسم الكامل'],
    trim: true,
    minlength: [3, 'يجب أن يكون الاسم 3 أحرف على الأقل']
  },
  email: {
    type: String,
    required: [true, 'الرجاء إدخال البريد الإلكتروني'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'الرجاء إدخال بريد إلكتروني صحيح']
  },
  password: {
    type: String,
    required: [true, 'الرجاء إدخال كلمة المرور'],
    minlength: [6, 'يجب أن تكون كلمة المرور 6 أحرف على الأقل'],
    select: false // لا تعيده افتراضياً
  },
  phone: {
    type: String,
    required: [true, 'الرجاء إدخال رقم الهاتف'],
    match: [/^(\+966|0)[0-9]{9}$/, 'الرجاء إدخال رقم هاتف سعودي صحيح']
  },
  address: {
    street: String,
    city: String,
    zipCode: String,
    country: { type: String, default: 'Saudi Arabia' }
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  verificationTokenExpire: Date,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  profileImage: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware: تشفير كلمة المرور قبل الحفظ
userSchema.pre('save', async function(next) {
  // إذا لم تتغير كلمة المرور، تخطي
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method: مقارنة كلمات المرور
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

// Method: إنشاء JWT Token
userSchema.methods.getSignedJwtToken = function() {
  const jwt = require('jsonwebtoken');
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

module.exports = mongoose.model('User', userSchema);

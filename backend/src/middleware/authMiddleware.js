const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware: التحقق من JWT Token
exports.protect = async (req, res, next) => {
  try {
    let token;

    // الحصول على token من headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'غير مصرح للوصول إلى هذا المورد'
      });
    }

    // التحقق من token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // إضافة بيانات المستخدم إلى الطلب
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(404).json({
        success: false,
        message: 'المستخدم غير موجود'
      });
    }

    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({
      success: false,
      message: 'Token غير صحيح أو منتهي الصلاحية',
      error: error.message
    });
  }
};

// Middleware: التحقق من أن المستخدم admin
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'يجب تسجيل الدخول أولاً'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'ليس لديك صلاحيات كافية'
      });
    }

    next();
  };
};

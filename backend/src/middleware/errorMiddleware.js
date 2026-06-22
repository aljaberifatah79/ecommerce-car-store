// Middleware: معالجة الأخطاء والتحقق من الإدخال
exports.validateInput = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'بيانات غير صحيحة',
        details: error.details[0].message
      });
    }

    req.body = value;
    next();
  };
};

// Middleware: معالجة الأخطاء العام
exports.errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // أخطاء MongoDB
  if (err.name === 'MongoError') {
    return res.status(500).json({
      success: false,
      message: 'خطأ في قاعدة البيانات'
    });
  }

  // أخطاء التحقق
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'بيانات غير صحيحة',
      details: Object.values(err.errors).map(e => e.message)
    });
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'خطأ في السيرفر',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

// Middleware: التحقق من وجود المورد
exports.notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

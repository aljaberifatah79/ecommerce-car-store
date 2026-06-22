const Joi = require('joi');

exports.registerSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'البريد الإلكتروني غير صحيح',
      'any.required': 'البريد الإلكتروني مطلوب'
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'كلمة المرور يجب أن تكون 6 أحرف على الأقل',
      'any.required': 'كلمة المرور مطلوبة'
    }),
  fullName: Joi.string()
    .min(3)
    .required()
    .messages({
      'string.min': 'الاسم يجب أن يكون 3 أحرف على الأقل',
      'any.required': 'الاسم مطلوب'
    }),
  phone: Joi.string()
    .pattern(/^(\+966|0)[0-9]{9}$/)
    .required()
    .messages({
      'string.pattern.base': 'رقم الهاتف غير صحيح (يجب أن يكون رقم سعودي)',
      'any.required': 'رقم الهاتف مطلوب'
    })
});

exports.loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'البريد الإلكتروني غير صحيح',
      'any.required': 'البريد الإلكتروني مطلوب'
    }),
  password: Joi.string()
    .required()
    .messages({
      'any.required': 'كلمة المرور مطلوبة'
    })
});

exports.changePasswordSchema = Joi.object({
  currentPassword: Joi.string()
    .required()
    .messages({
      'any.required': 'كلمة المرور الحالية مطلوبة'
    }),
  newPassword: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل',
      'any.required': 'كلمة المرور الجديدة مطلوبة'
    }),
  confirmPassword: Joi.string()
    .required()
    .messages({
      'any.required': 'تأكيد كلمة المرور مطلوب'
    })
});

exports.updateProfileSchema = Joi.object({
  fullName: Joi.string()
    .min(3)
    .optional(),
  phone: Joi.string()
    .pattern(/^(\+966|0)[0-9]{9}$/)
    .optional()
    .messages({
      'string.pattern.base': 'رقم الهاتف غير صحيح'
    }),
  address: Joi.object({
    street: Joi.string().optional(),
    city: Joi.string().optional(),
    zipCode: Joi.string().optional()
  }).optional()
});

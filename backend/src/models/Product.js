const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'الرجاء إدخال اسم المنتج'],
    trim: true,
    maxlength: [100, 'اسم المنتج يجب أن يكون أقل من 100 حرف']
  },
  description: {
    type: String,
    required: [true, 'الرجاء إدخال وصف المنتج'],
    minlength: [20, 'الوصف يجب أن يكون 20 حرف على الأقل']
  },
  price: {
    type: Number,
    required: [true, 'الرجاء إدخال السعر'],
    min: [0, 'السعر يجب أن يكون موجب']
  },
  discountPrice: {
    type: Number,
    min: [0, 'سعر الخصم يجب أن يكون موجب'],
    default: 0
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
    min: [0, 'المخزون يجب أن يكون موجب']
  },
  images: {
    type: [String],
    required: true
  },
  specifications: {
    type: Map,
    of: String,
    default: new Map()
  },
  rating: {
    type: Number,
    min: [0, 'التقييم يجب أن يكون بين 0 و 5'],
    max: [5, 'التقييم يجب أن يكون بين 0 و 5'],
    default: 0
  },
  numberOfReviews: {
    type: Number,
    default: 0
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
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

// Index للبحث السريع
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1, isActive: 1 });

module.exports = mongoose.model('Product', productSchema);

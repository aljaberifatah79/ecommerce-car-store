const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    },
    subtotal: {
      type: Number,
      required: true
    }
  }],
  shippingAddress: {
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    zipCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      default: 'Saudi Arabia'
    },
    phone: {
      type: String,
      required: true
    }
  },
  subtotal: {
    type: Number,
    required: true
  },
  shippingCost: {
    type: Number,
    default: 0
  },
  tax: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'transfer', 'cod'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  trackingNumber: {
    type: String,
    default: null
  },
  paymentId: {
    type: String,
    default: null
  },
  notes: {
    type: String,
    default: ''
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

// Middleware لإنشاء رقم الطلب
orderSchema.pre('save', async function(next) {
  if (this.isNew) {
    const count = await this.constructor.countDocuments();
    this.orderNumber = `ORD-${Date.now()}-${count + 1}`;
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);

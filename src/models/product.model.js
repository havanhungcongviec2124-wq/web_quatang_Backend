const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hex: { type: String, required: true }
}, { _id: false });

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
    },
    categoryName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    originalPrice: {
      type: Number,
      default: 0,
    },
    discountPercent: {
      type: Number,
      default: 0,
    },
    badge: {
      type: String,
      default: '',
    },
    isNew: {
      type: Boolean,
      default: false,
    },
    isBestSeller: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 5.0,
      min: 1,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    soldCount: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 20,
      min: 0,
    },
    colors: [colorSchema],
    sizes: [{ type: String }],
    brand: {
      type: String,
      default: 'LUXE STUDIO',
    },
    images: [{ type: String }],
    shortDesc: {
      type: String,
      default: '',
    },
    fullDesc: {
      type: String,
      default: '',
    },
    material: {
      type: String,
      default: '',
    },
    care: {
      type: String,
      default: '',
    },
    giftType: {
      type: String,
      enum: ['single', 'combo'],
      default: 'single',
      index: true,
    },
    occasions: [{
      type: String,
      index: true,
    }],
    comboItems: [{
      name: { type: String, required: true },
      quantity: { type: Number, default: 1 },
      desc: { type: String, default: '' },
    }],
    giftBox: {
      type: String,
      default: 'Hộp quà cao cấp kèm nơ lụa & thiệp viết tay',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    suppressReservedKeysWarning: true,
  }
);

// Text index for search
productSchema.index({ name: 'text', categoryName: 'text', brand: 'text' });

module.exports = mongoose.model('Product', productSchema);

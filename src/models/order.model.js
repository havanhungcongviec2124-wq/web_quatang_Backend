const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  color: { type: String, default: '' },
  size: { type: String, default: '' },
  quantity: { type: Number, required: true, min: 1 },
  image: { type: String, default: '' },
  categoryName: { type: String, default: '' },
}, { _id: false });

const orderSchema = new mongoose.Schema(
  {
    orderCode: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    customerInfo: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      province: { type: String, required: true },
      district: { type: String, required: true },
      ward: { type: String, default: '' },
      address: { type: String, required: true },
      note: { type: String, default: '' },
    },
    items: [orderItemSchema],
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    shippingFee: {
      type: Number,
      default: 0,
    },
    discountAmount: {
      type: Number,
      default: 0,
    },
    voucherCode: {
      type: String,
      default: '',
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentMethod: {
      type: String,
      default: 'Chuyển khoản VietQR',
    },
    status: {
      type: String,
      enum: ['Đang xử lý', 'Đang giao hàng', 'Đã giao thành công', 'Đã hủy'],
      default: 'Đang xử lý',
    },
    statusCode: {
      type: String,
      enum: ['processing', 'shipping', 'delivered', 'cancelled'],
      default: 'processing',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', orderSchema);

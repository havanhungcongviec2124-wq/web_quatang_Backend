const Order = require('../models/order.model');
const Product = require('../models/product.model');

// Tạo đơn hàng mới
const createOrder = async (req, res) => {
  try {
    const {
      customerInfo,
      items,
      subtotal,
      shippingFee,
      discountAmount,
      voucherCode,
      total,
      paymentMethod,
    } = req.body;

    if (!customerInfo || !customerInfo.fullName || !customerInfo.phone || !customerInfo.address) {
      return res.status(400).json({
        success: false,
        message: 'Thông tin giao hàng không đầy đủ',
      });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Đơn hàng chưa có sản phẩm nào',
      });
    }

    // Tạo mã đơn hàng duy nhất
    const orderCode = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;

    const order = await Order.create({
      orderCode,
      userId: req.user ? req.user._id : null,
      customerInfo,
      items,
      subtotal: Number(subtotal),
      shippingFee: Number(shippingFee || 0),
      discountAmount: Number(discountAmount || 0),
      voucherCode: voucherCode || '',
      total: Number(total),
      paymentMethod: paymentMethod || 'Chuyển khoản VietQR',
      status: 'Đang xử lý',
      statusCode: 'processing',
    });

    // Giảm tồn kho và tăng số lượng bán của các sản phẩm
    for (const item of items) {
      if (item.productId) {
        await Product.findByIdAndUpdate(item.productId, {
          $inc: { stock: -Number(item.quantity || 1), soldCount: Number(item.quantity || 1) },
        }).catch(() => {});
      }
    }

    return res.status(201).json({
      success: true,
      message: 'Đặt hàng thành công',
      order,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi tạo đơn hàng',
      error: err.message,
    });
  }
};

// Lấy danh sách đơn hàng
const getOrders = async (req, res) => {
  try {
    const { phone, status } = req.query;
    const filter = {};

    // Nếu là user thường, chỉ lấy đơn của user đó hoặc theo số điện thoại
    if (req.user && req.user.role !== 'admin') {
      filter.$or = [{ userId: req.user._id }, { 'customerInfo.email': req.user.email }];
    } else if (phone) {
      filter['customerInfo.phone'] = phone;
    }

    if (status) {
      filter.statusCode = status;
    }

    const orders = await Order.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      total: orders.length,
      orders,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách đơn hàng',
      error: err.message,
    });
  }
};

// Chi tiết 1 đơn hàng
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    let order = null;

    if (id.startsWith('ORD-')) {
      order = await Order.findOne({ orderCode: id });
    } else {
      order = await Order.findById(id);
    }

    if (!order) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng' });
    }

    return res.status(200).json({ success: true, order });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy thông tin đơn hàng',
      error: err.message,
    });
  }
};

// Cập nhật trạng thái đơn hàng (Admin)
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, statusCode } = req.body;

    const statusMap = {
      processing: 'Đang xử lý',
      shipping: 'Đang giao hàng',
      delivered: 'Đã giao thành công',
      cancelled: 'Đã hủy',
    };

    const finalStatus = status || statusMap[statusCode] || 'Đang xử lý';
    const finalCode = statusCode || (status === 'Đã giao thành công' ? 'delivered' : status === 'Đang giao hàng' ? 'shipping' : 'processing');

    const order = await Order.findByIdAndUpdate(
      id,
      { status: finalStatus, statusCode: finalCode },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng' });
    }

    return res.status(200).json({
      success: true,
      message: 'Cập nhật trạng thái đơn hàng thành công',
      order,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật trạng thái đơn hàng',
      error: err.message,
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
};

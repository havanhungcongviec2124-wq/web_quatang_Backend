const Voucher = require('../models/voucher.model');

// Lấy danh sách voucher đang hoạt động
const getVouchers = async (req, res) => {
  try {
    const vouchers = await Voucher.find({ isActive: true });
    return res.status(200).json({ success: true, vouchers });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Lỗi khi lấy voucher', error: err.message });
  }
};

// Kiểm tra và áp dụng voucher
const validateVoucher = async (req, res) => {
  try {
    const { code, subtotal } = req.body;
    if (!code) {
      return res.status(400).json({ success: false, message: 'Vui lòng cung cấp mã voucher' });
    }

    const voucher = await Voucher.findOne({ code: code.toUpperCase().trim(), isActive: true });
    if (!voucher) {
      return res.status(404).json({ success: false, message: 'Mã giảm giá không tồn tại hoặc đã hết hạn' });
    }

    const currentSubtotal = Number(subtotal || 0);
    if (currentSubtotal < voucher.minOrder) {
      return res.status(400).json({
        success: false,
        message: `Đơn hàng tối thiểu cần đạt ${voucher.minOrder.toLocaleString('vi-VN')}đ để sử dụng mã này`,
      });
    }

    let discountAmount = 0;
    if (voucher.isShipping) {
      discountAmount = 35000;
    } else {
      const raw = Math.round((currentSubtotal * voucher.discount) / 100);
      discountAmount = voucher.maxDiscount ? Math.min(raw, voucher.maxDiscount) : raw;
    }

    return res.status(200).json({
      success: true,
      message: `Áp dụng mã ${voucher.code} thành công!`,
      voucher: {
        code: voucher.code,
        discount: voucher.discount,
        isShipping: voucher.isShipping,
        discountAmount,
        desc: voucher.desc,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Lỗi khi kiểm tra voucher', error: err.message });
  }
};

module.exports = {
  getVouchers,
  validateVoucher,
};

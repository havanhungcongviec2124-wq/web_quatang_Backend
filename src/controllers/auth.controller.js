const jwt = require('jsonwebtoken');
const config = require('../configs/config');
const User = require('../models/user.model');

// Generate JWT helper
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role, email: user.email },
    config.secretKey,
    { expiresIn: '7d' }
  );
};

// Đăng ký
const register = async (req, res) => {
  try {
    const { fullName, email, password, phone } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng cung cấp đầy đủ họ tên, email và mật khẩu',
      });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email này đã được sử dụng bởi một tài khoản khác',
      });
    }

    const user = await User.create({
      fullName,
      email: email.toLowerCase(),
      password,
      phone: phone || '',
      role: 'customer',
    });

    const token = generateToken(user);

    return res.status(201).json({
      success: true,
      message: 'Đăng ký tài khoản thành công',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        membership: user.membership,
      },
      redirectTo: user.role === 'admin' ? '/admin' : '/home',
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi server khi đăng ký',
      error: err.message,
    });
  }
};

// Đăng nhập
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập email và mật khẩu',
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Email hoặc mật khẩu không chính xác',
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Email hoặc mật khẩu không chính xác',
      });
    }

    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      message: 'Đăng nhập thành công',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        membership: user.membership,
        address: user.address,
        addresses: user.addresses || [],
      },
      redirectTo: user.role === 'admin' ? '/admin' : '/home',
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi server khi đăng nhập',
      error: err.message,
    });
  }
};

// Thông tin tài khoản hiện tại
const getProfile = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy thông tin tài khoản',
      error: err.message,
    });
  }
};

// Cập nhật tài khoản
const updateProfile = async (req, res) => {
  try {
    const { fullName, phone, address } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng' });
    }

    if (fullName) user.fullName = fullName;
    if (phone) user.phone = phone;
    if (address) user.address = { ...user.address, ...address };

    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Cập nhật thông tin thành công',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        membership: user.membership,
        address: user.address,
        addresses: user.addresses || [],
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật tài khoản',
      error: err.message,
    });
  }
};

// Demo Login 1-click
const demoLogin = async (req, res) => {
  try {
    const { role = 'customer' } = req.body;
    const targetEmail = role === 'admin' ? 'admin@luxestore.vn' : 'demo.customer@luxestore.vn';

    let user = await User.findOne({ email: targetEmail });
    if (!user) {
      // Auto-create if not exists
      user = await User.create({
        fullName: role === 'admin' ? 'Admin Quản Trị LUXE' : 'Nguyễn Thu Trang',
        email: targetEmail,
        password: 'Password123!',
        phone: '0912 345 678',
        role: role === 'admin' ? 'admin' : 'customer',
        membership: 'HỘI VIÊN LUXE GOLD',
        address: {
          province: 'Thành phố Hồ Chí Minh',
          district: 'Quận 1',
          ward: 'Phường Bến Nghé',
          detail: '123 Đường Lê Lợi',
        },
      });
    }

    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      message: `Đăng nhập Demo thành công (${role})`,
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        membership: user.membership,
        address: user.address,
      },
      redirectTo: user.role === 'admin' ? '/admin' : '/home',
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi đăng nhập demo',
      error: err.message,
    });
  }
};

// Thêm địa chỉ mới
const addAddress = async (req, res) => {
  try {
    const { fullName, phone, province, district, ward, detail, isDefault, label } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng' });
    }

    const newAddress = {
      fullName: fullName || user.fullName,
      phone: phone || user.phone,
      province: province || '',
      district: district || '',
      ward: ward || '',
      detail: detail || '',
      isDefault: Boolean(isDefault) || (!user.addresses || user.addresses.length === 0),
      label: label || 'Nhà riêng',
    };

    if (!user.addresses) user.addresses = [];

    if (newAddress.isDefault) {
      user.addresses.forEach((a) => {
        a.isDefault = false;
      });
      user.address = {
        province: newAddress.province,
        district: newAddress.district,
        ward: newAddress.ward,
        detail: newAddress.detail,
      };
    }

    user.addresses.push(newAddress);
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Thêm địa chỉ mới thành công',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        membership: user.membership,
        address: user.address,
        addresses: user.addresses,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi thêm địa chỉ mới',
      error: err.message,
    });
  }
};

// Xóa địa chỉ
const deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng' });
    }

    if (user.addresses) {
      user.addresses = user.addresses.filter((a) => String(a._id) !== addressId);
    }
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Xóa địa chỉ thành công',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        membership: user.membership,
        address: user.address,
        addresses: user.addresses || [],
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa địa chỉ',
      error: err.message,
    });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  demoLogin,
  addAddress,
  deleteAddress,
};

const jwt = require('jsonwebtoken');
const config = require('../configs/config');
const User = require('../models/user.model');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Chưa đăng nhập hoặc token không hợp lệ',
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, config.secretKey);

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Tài khoản không tồn tại hoặc đã bị khóa',
      });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Token đã hết hạn hoặc không hợp lệ',
      error: err.message,
    });
  }
};

const authorizeAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Bạn không có quyền quản trị viên để thực hiện thao tác này',
    });
  }
  next();
};

module.exports = {
  authenticate,
  authorizeAdmin,
};

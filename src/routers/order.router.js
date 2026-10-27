const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const { authenticate, authorizeAdmin } = require('../middlewares/auth.middleware');

// Optional auth: guest or logged in user can create orders
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authenticate(req, res, next);
  }
  next();
};

router.post('/', optionalAuth, orderController.createOrder);
router.get('/', optionalAuth, orderController.getOrders);
router.get('/:id', optionalAuth, orderController.getOrderById);
router.patch('/:id/status', authenticate, authorizeAdmin, orderController.updateOrderStatus);

module.exports = router;

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { authenticate } = require('../middlewares/auth.middleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', authenticate, authController.getProfile);
router.put('/profile', authenticate, authController.updateProfile);
router.post('/address', authenticate, authController.addAddress);
router.delete('/address/:addressId', authenticate, authController.deleteAddress);
router.post('/demo-login', authController.demoLogin);

module.exports = router;

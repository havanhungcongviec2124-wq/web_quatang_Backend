const express = require('express');
const router = express.Router();
const voucherController = require('../controllers/voucher.controller');

router.get('/', voucherController.getVouchers);
router.post('/validate', voucherController.validateVoucher);

module.exports = router;

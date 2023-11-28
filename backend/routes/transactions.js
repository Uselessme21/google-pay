const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.post('/transfer', transactionController.transfer);
router.get('/transactions/:phoneNum', transactionController.getTransactions);

module.exports = router;

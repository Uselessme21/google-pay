const mongoose = require('mongoose');

const Transaction = mongoose.model('Transaction', {
  from: Number,
  to: Number,
  amount: Number,
});

module.exports = Transaction;

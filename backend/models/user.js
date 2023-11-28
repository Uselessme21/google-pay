const mongoose = require('mongoose');

const User = mongoose.model('User', {
  phoneNum: Number,
  availableAmount: Number,
});

module.exports = User;

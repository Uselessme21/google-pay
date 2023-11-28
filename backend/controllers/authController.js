const jwt = require('jsonwebtoken');
const User = require('../models/user');

const generateToken = (user) => {
  const payload = {
    phoneNum: user.phoneNum,
  };

  // You should use a more secure secret in a real-world scenario
  const secretKey = 'yourSecretKey';

  const options = {
    expiresIn: '24h', // Token expires in 24 hours
  };

  return jwt.sign(payload, secretKey, options);
};

const login = async (req, res) => {
  const { phoneNum, availableAmount} = req.body;

  try {
    let user = await User.findOne({ phoneNum });

    if (!user) {
       user = new User({
        phoneNum,
        availableAmount: availableAmount || 0,
      });

      await user.save();
    }

    // Generate JWT token
    const token = generateToken(user);

    res.json({ message: 'Login successful', user, token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  login,
};

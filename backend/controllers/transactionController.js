const User = require('../models/user');
const Transaction = require('../models/transaction');

const transfer = async (req, res) => {
  const { from, to, amount } = req.body;

  try {
    const sender = await User.findOne({ phoneNum: from });
    const reciever =await User.findOne({ phoneNum: to });

    if (!sender) {
      return res.status(404).json({ error: 'Login to send amount' });
    }else if(sender.availableAmount < amount){
      return res.status(400).json({ error: 'Insufficient balance' });
    }
    if(!reciever ){
        return res.status(404).json({ error: 'reciever not available' });
    }

    const recipient = await User.findOneAndUpdate(
      { phoneNum: to },
      { $inc: { availableAmount: amount } },
      { new: true }
    );

    // Deduct amount from sender
    sender.availableAmount -= amount;
    await sender.save();

    // Create a transaction record
    const transaction = new Transaction({ from, to, amount });
    await transaction.save();

    // Handle cashback
    let cashback = 0;
    if (amount < 1000) {
      cashback = 0.05 * amount;
    } else if (amount > 1000 && amount % 500 !== 0) {
      cashback = 0.02 * amount;
    }

    res.json({ message: 'Transaction successful', cashback, recipient });
  } catch (error) {
    console.error('Error during transfer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getTransactions = async (req, res) => {
  const { phoneNum } = req.params;

  try {
    const transactions = await Transaction.find({ $or: [{ from: phoneNum }, { to: phoneNum }] });
    res.json({ transactions });
  } catch (error) {
    console.error('Error getting transactions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  transfer,
  getTransactions,
};

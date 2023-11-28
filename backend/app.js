const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors= require('cors')
const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const transactionsRoutes = require('./routes/transactions');

const app = express();
app.use(cors())
const PORT = process.env.PORT||3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB


// Routes
app.use('/api', authRoutes);
app.use('/api', transactionsRoutes);

app.listen(PORT, async() => {
    await connectDB
  console.log(`Server is running on http://localhost:${PORT}`);
});

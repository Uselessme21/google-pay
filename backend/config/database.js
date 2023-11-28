const mongoose = require('mongoose');

const connectDB =  mongoose.connect(process.env.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>console.log('connected tp db')).catch((err)=>console.log({message:"error in connection",err}));

module.exports = connectDB;

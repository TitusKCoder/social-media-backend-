require('dotenv').config();
const mongoose = require('mongoose');
const { connect, connection } = require('mongoose');
const URI = process.env.MONGODB_URI;

mongoose.connect(URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;

require('dotenv').config();
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI;

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// mongoose.connect(URI,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

db.once('open', () => {
    app.listen(PORT, () => {
    console.log(`API server for this project running on port ${PORT}!`);
    });
});
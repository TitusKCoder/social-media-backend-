const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const mongoose = require('mongoose');

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost:27017/SMBackend',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

db.once('open', () => {
    app.listen(PORT, () => {
    console.log(`API server for this project running on port ${PORT}!`);
    });
});
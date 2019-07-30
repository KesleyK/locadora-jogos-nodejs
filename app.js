const path = require('path');
const express = require('express');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const rentalRoutes = require('./routes/rental');
const adminRoutes = require('./routes/admin');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', rentalRoutes);
app.use('/admin', adminRoutes);

mongoose
  .connect('mongodb+srv://<name_userDB>:<password>@cluster0-vyejz.mongodb.net/<name_database>')
  .then(result => {
    console.log('MongoDB connected');
    app.listen(3001);
  })
  .catch(err => console.log(err));

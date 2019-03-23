'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router  = express.Router();

//Conecat ao banco
mongoose.connect('mongodb+srv://nilton:161008pln@cluster0-jxnk7.mongodb.net/ndstr');

// Carrega os models
const Product = require('./model/product');

// Carrega as rotas
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', indexRoute);
app.use('/products', productRoute);

module.exports = app;
const express = require('express');
const routers = express.Router();
require('./connection');
const Product = require('./product');

module.exports = routers;

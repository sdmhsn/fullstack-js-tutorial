const express = require('express');
const routers = express.Router();
require('./connection');
const Product = require('./product');

// get all products (Read):
routers.get('/products', async (req, res) => {
  const products = await Product.find();

  if (products.length > 0) {
    res.send({
      status: 'success',
      message: 'List of products found',
      data: products,
    });
  } else {
    res.send({
      status: 'warning',
      message: 'Products not found! :)',
    });
  }
});

module.exports = routers;

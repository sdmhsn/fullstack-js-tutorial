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

// get single product (Read by id):
routers.get('/product/:id', async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);

  if (product) {
    res.send({
      status: 'success',
      message: 'Single product found',
      data: product,
    });
  } else {
    res.send({
      status: 'warning',
      message: 'Product not found! :)',
    });
  }
});

module.exports = routers;

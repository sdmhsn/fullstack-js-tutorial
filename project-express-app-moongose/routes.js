const express = require('express');
const routers = express.Router();
require('./connection');
const Product = require('./product');
const multer = require('multer');

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

// post new product (Create):
routers.post('/product', multer().none(), async (req, res) => {
  // multer(): to handling request body from form-data
  try {
    const { name, price, stock, status } = req.body;
    const product = await Product.create({
      name,
      price,
      stock,
      status,
    });

    if (product) {
      res.send({
        status: 'success',
        message: 'Added new product',
        data: product,
      });
    } else {
      res.send({
        status: 'warning',
        message: 'Product not added',
      });
    }
  } catch (error) {
    res.send({
      status: 'error',
      message: error.message,
    });
  }
});

// put product (Update):
routers.put('/product/:id', multer().none(), async (req, res) => {
  try {
    const { name, price, stock, status } = req.body;
    const id = req.params.id;
    const product = await Product.replaceOne(
      { _id: id },
      { name, price, stock, status },
      { runValidators: true }
    );

    // console.log(product);

    if (product.matchedCount === 1) {
      res.send({
        status: 'success',
        message: 'Updated product',
        data: { _id: id, ...req.body },
      });
    } else {
      res.send({
        status: 'warning',
        message: 'Product updated failed :D :D!',
      });
    }
  } catch (error) {
    res.send({
      status: 'error',
      message: error.message,
    });
  }
});

// patch product (Update):
routers.patch('/product/:id', async (req, res) => {
  try {
    const { name, price, stock, status } = req.body;
    const id = req.params.id;

    const product = await Product.updateOne(
      { _id: id },
      { name, price, stock, status },
      {
        runValidators: true,
      }
    );

    // console.log(product);

    if (product.matchedCount === 1) {
      res.send({
        status: 'success',
        message: 'Updated product',
        data: { _id: id, ...req.body },
      });
    } else {
      res.send({
        status: 'warning',
        message: 'Product updated failed :D :D!',
      });
    }
  } catch (error) {
    res.send({
      status: 'error',
      message: error.message,
    });
  }
});

// delete product (Delete):
routers.delete('/product/:id', async (req, res) => {
  const id = req.params.id;
  const product = await Product.deleteOne({
    _id: id,
  });

  // console.log(product);

  if (product.deletedCount === 1) {
    res.send({
      status: 'success',
      message: 'Deleted product',
    });
  } else {
    res.send({
      status: 'warning',
      message: 'Product deleted failed! :)',
    });
  }
});

module.exports = routers;

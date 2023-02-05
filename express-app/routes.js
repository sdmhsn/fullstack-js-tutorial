const express = require('express');
const routers = express.Router();
const client = require('./connection');
const ObjectId = require('mongodb').ObjectId;
const multer = require('multer');

// get all products (Read):
routers.get('/products', async (req, res) => {
  try {
    const db = client.db('latihan');
    const products = await db.collection('products').find().toArray();

    if (products.length > 0) {
      res.send({
        status: 'success',
        message: 'List of products',
        data: products,
      });
    } else {
      res.send('Product not found');
    }
  } catch (error) {
    res.status(404);
    res.send({
      status: 'error',
      message: 'Database connection failed!', // or error.message
    });
  }
});

// get single product (Read by id):
routers.get('/product/:id', async (req, res) => {
  try {
    const db = client.db('latihan');
    const id = req.params.id;
    const objectId = ObjectId.isValid(id) ? ObjectId(id) : id; // id in : (else) === null
    const product = await db.collection('products').findOne({
      _id: objectId,
    });

    // console.log(product);

    if (product) {
      res.send({
        status: 'success',
        message: 'Single product',
        data: product,
      });
    } else {
      res.send('Product not found');
    }
  } catch (error) {
    res.status(404);
    res.send({
      status: 'error',
      message: 'Database connection failed!', // or error.message
    });
  }
});

module.exports = routers;

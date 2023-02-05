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

module.exports = routers;

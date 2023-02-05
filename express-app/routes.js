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

// post new product (Create):
routers.post('/product', multer().none(), async (req, res) => {
  // multer(): to handling request body from form-data
  try {
    const db = client.db('latihan');
    const { name, price, stock, status } = req.body;
    const product = await db.collection('products').insertOne({
      name,
      price,
      stock,
      status,
    });

    if (product.acknowledged) {
      res.send({
        status: 'success',
        message: 'Added new product',
        data: { _id: product.insertedId, ...req.body },
      });
    } else {
      res.send({
        status: 'warning',
        message: 'Product added failed!',
      });
    }
  } catch (error) {
    res.status(404);
    res.send({
      status: 'error',
      message: 'Database connection failed!', // or error.message
    });
  }
});

// put product (Update):
routers.put('/product/:id', async (req, res) => {
  try {
    const db = client.db('latihan');
    const id = req.params.id;
    const { name, price, stock, status } = req.body;
    // console.log(req.body);
    const objectId = ObjectId.isValid(id) ? ObjectId(id) : id; // id in : (else) === null
    const product = await db.collection('products').updateOne(
      { _id: objectId },
      {
        $set: {
          name,
          price,
          stock,
          status,
        },
      }
    );

    if (product.acknowledged) {
      res.send({
        status: 'success',
        message: 'Updated product',
        data: { _id: objectId, ...req.body },
      });
    } else {
      res.send({
        status: 'warning',
        message: 'Product updated failed!',
      });
    }
  } catch (error) {
    res.status(404);
    res.send({
      status: 'error',
      message: 'Database connection failed!',
    });
  }
});

// patch product (Update):
routers.patch('/product/:id', async (req, res) => {
  try {
    const db = client.db('latihan');
    const id = req.params.id;
    // console.log(req.body);
    const objectId = ObjectId.isValid(id) ? ObjectId(id) : id; // id in : (else) === null
    const product = await db.collection('products').updateOne(
      { _id: objectId },
      {
        $set: req.body,
      }
    );

    if (product.acknowledged) {
      res.send({
        status: 'success',
        message: 'Updated product',
        data: { _id: objectId, ...req.body },
      });
    } else {
      res.send({
        status: 'warning',
        message: 'Product updated failed!',
      });
    }
  } catch (error) {
    res.status(404);
    res.send({
      status: 'error',
      message: 'Database connection failed!',
    });
  }
});

module.exports = routers;

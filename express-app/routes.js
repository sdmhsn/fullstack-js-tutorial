const express = require('express');
const routers = express.Router();
const client = require('./connection');

routers.get('/products', async (req, res) => {
  if (client) {
    const db = client.db('latihan');
    // kode untuk menampilkan list products
    res.send('menampilkan list products');
  } else {
    res.send('koneksi database gagal');
  }
});

module.exports = routers;

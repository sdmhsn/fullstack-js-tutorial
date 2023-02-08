const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

// version 6:
main();

async function main() {
  try {
    await mongoose.connect(
      'mongodb://user_latihan:123456@localhost:27017/latihan?authSource=admin'
    );

    // define a scheme
    const productSchema = new mongoose.Schema({
      name: String,
      price: Number,
      stock: Number,
      status: { type: Boolean, default: true }, // default: true: set default value as true for status
    });

    // create a model
    const Product = mongoose.model('Product', productSchema); // 'Product': collection in mongodb. Automatically plural and lowercased in mongodb. e.g. Product to products

    // create a document using query
    const newProduct = await Product.create({}); // without any field (blank). the document still created with _id and default status fields.
    console.log(newProduct);
  } catch (error) {
    console.log(error.message); // e.g. error: wrong authentication
  }
}

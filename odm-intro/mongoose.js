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

    // queries
    const productResult = await Product.find()
      .where({ stock: { $lte: 2 } })
      .select('name stock')
      .limit(3)
      .sort({ stock: -1 })
      .exec();

    console.log(productResult);
  } catch (error) {
    console.log(error); // e.g. error: wrong authentication
  }
}

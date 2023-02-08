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

    // Read all data:
    // const products = await Product.find();
    // console.log(products);

    // Read data by id:
    // const product = await Product.findOne({ _id: '63df45936b10a351a0982f2f' });
    // console.log(product);

    // Create data:
    // const product = await Product.create({
    //   name: 'VGA Nvidia',
    //   price: 1500000,
    //   stock: 3,
    //   status: true,
    // });
    // console.log(product);

    // Update data:
    // const product = await Product.updateOne(
    //   { _id: '63df45936b10a351a0982f2f' },
    //   { name: 'Computer Desk', price: 2000000 }
    // );
    // console.log(product);

    // Delete data:
    const product = await Product.deleteOne({
      _id: '63e33d4b58a5fe9fdaa28580',
    });
    console.log(product);
  } catch (error) {
    console.log(error); // e.g. error: wrong authentication
  }
}

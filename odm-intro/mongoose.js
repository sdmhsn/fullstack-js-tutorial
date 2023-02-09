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
    const productSchema = new mongoose.Schema(
      // Built-in Validators source: https://mongoosejs.com/docs/validation.html#built-in-validators
      {
        name: { type: String, required: true, minLength: 3, maxLength: 5 },
        price: {
          type: Number,
          required: true,
          min: [3, 'angka kurang dari 3'],
          max: 5,
        },
        stock: Number,
        status: { type: Boolean, default: true }, // default: true: set default value as true for status
      }
    );

    // create a model
    const Product = mongoose.model('Product', productSchema); // 'Product': collection in mongodb. Automatically plural and lowercased in mongodb. e.g. Product to products

    try {
      // create a document using query
      const newProduct = await Product.create({
        name: 'PC',
        price: 0.1,
      });
      console.log(newProduct);
    } catch (error) {
      // console.log(error.errors['name'].message);

      const error_name = error.errors['name'] && error.errors['name'].message;
      if (error_name) console.log(error_name);

      const error_price =
        error.errors['price'] && error.errors['price'].message;
      if (error_price) console.log(error_price);
    }
  } catch (error) {
    console.log(error.message); // e.g. error: wrong authentication
  }
}

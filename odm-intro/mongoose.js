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
    const query = Product.find(); // find all documents
    // queries: where() method
    query.where({ stock: { $lte: 2 } }); // get specific documents by stock field. lte: lower than equal

    // queries: select() method
    query.select('name stock'); // specifies which document fields (name and stock fields)

    // queries: limit() method
    query.limit(3); // Specifies the first maximum number of documents

    // queries: sort() method
    query.sort({ stock: -1 }); // sort by stock field by descending (-1: greater to lower)

    const productResult = await query.exec();
    console.log(productResult);
  } catch (error) {
    console.log(error); // e.g. error: wrong authentication
  }
}

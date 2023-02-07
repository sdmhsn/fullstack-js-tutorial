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
    const quoteSchema = new mongoose.Schema({
      word: String,
    });

    // create a model
    const Quote = mongoose.model('Quote', quoteSchema); // 'Quote': collection in mongodb. Automatically plural and lowercased in mongodb. e.g. Quote to quotes

    // create a new document
    const quote = new Quote({
      word: 'Man behind the gun',
    });

    // save a created document
    quote.save((error, quote) => {
      if (error) return console.error(error); // e.g. error: { _id: false } in define a schema. source: option: _id in https://mongoosejs.com/docs/guide.html#_id
      console.log(quote);
    });
  } catch (error) {
    console.log(error); // e.g. error: wrong authentication
  }
}

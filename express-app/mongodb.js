const MongoClient = require('mongodb').MongoClient;

// const connectionString = 'mongodb://localhost:27017?authSource=admin'; // without authentication

const connectionString =
  'mongodb://user_latihan:123456@localhost:27017?authSource=admin'; // mongodb://<user>:<password>@localhost:27017?authSource=admin

(async () => {
  try {
    const client = await MongoClient.connect(connectionString, {
      useUnifiedTopology: true,
    });
    // console.log('Server database connect!');
    const db = client.db('latihan'); // connect to any database command

    const quotes = await db.collection('quotes').findOne(); // query code get quotes collection
    console.log(quotes);
  } catch (error) {
    console.log('Connection failed!');
  }
})(); // (); = calling anonymous function

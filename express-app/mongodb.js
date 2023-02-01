const MongoClient = require('mongodb').MongoClient;

// const connectionString = 'mongodb://localhost:27017?authSource=admin'; // without authentication

const connectionString =
  'mongodb://user_latihan:123456@localhost:27017?authSource=admin'; // mongodb://<user>:<password>@localhost:27017?authSource=admin

(async () => {
  try {
    let res = await MongoClient.connect(connectionString, {
      useUnifiedTopology: true,
    });
    console.log('Server database connect!');
  } catch (error) {
    console.log('Connection failed!');
  }
})(); // (); = calling anonymous function

const MongoClient = require('mongodb').MongoClient;

const connectionString =
  'mongodb://user_latihan:123456@localhost:27017?authsource=admin';

const client = new MongoClient(connectionString, {
  useUnifiedTopology: true,
});

(async () => {
  try {
    await client.connect();
    // console.log('Connection Success!');
  } catch (error) {
    console.log('Connection failed!');
  }
})();

module.exports = client;

const mongoose = require('mongoose');

const { dbHost, dbUser, dbPort, dbPass, dbName } = require('../app/config');

mongoose.set('strictQuery', false);

// version 6:
const db = async () => {
  try {
    await mongoose.connect(
      //   'mongodb://user_latihan:123456@localhost:27017/latihan?authSource=admin'
      `mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?authSource=admin`
    );

    console.log('Database server connected!!');
  } catch (error) {
    console.log(error.message); // e.g. error: wrong authentication
  }
};

module.exports = db;

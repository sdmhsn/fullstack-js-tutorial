const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

// version 6:
main();

async function main() {
  try {
    await mongoose.connect(
      'mongodb://user_latihan:123456@localhost:27017/latihan?authSource=admin'
    );

    console.log('Database server connected!');
  } catch (error) {
    console.log(error.message); // e.g. error: wrong authentication
  }
}

const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

// version 6:
main()
  .then((res) => console.log('Server database connect!'))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    'mongodb://user_latihan:123456@localhost:27017/latihan?authSource=admin'
  );
}

// version 5:
// mongoose.connect(
//   'mongodb://user_latihan:123456@localhost:27017/latihan?authSource=admin'
// );
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
//   console.log('Server database connect!');
// });

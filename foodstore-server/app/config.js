const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

// console.log(__dirname);
// console.log(path.resolve(__dirname, '..')); // up to lavel one directory (root directory)

module.exports = {
  rootPath: path.resolve(__dirname, '..'),
  serviceName: process.env.SERVICE_NAME,

  secretKey: process.env.SECRET_KEY,

  //----- database configuration ----//
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPort: process.env.DB_PORT,
  dbPass: process.env.DB_PASS,
  dbName: process.env.DB_NAME,
};

const http = require('http');
const moment = require('moment'); // importing npm module

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.write(moment().calendar()); // using the npm module
  res.end();
});

const hostname = 'localhost'; // or 127.0.0.1
const port = 3000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname} on port: ${port}`);
});

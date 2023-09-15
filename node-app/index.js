const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  const url = req.url; // req from http.creteServer() parameter, and .url is the req property
  if (url === '/employee') {
    res.write('data employee');
  } else {
    res.write('data apa yang kamu perlukan?');
  }
  res.end();
});

const hostname = 'localhost'; // or 127.0.0.1
const port = 3000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname} on port: ${port}`);
});

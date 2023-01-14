const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/json'); // set header to text/json
  res.write(
    JSON.stringify({
      status: 'success',
      message: 'response success',
    })
  ); // write the JSON response using JSON.stringify()
  res.end();
});

const hostname = 'localhost'; // or 127.0.0.1
const port = 3000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname} on port: ${port}`);
});

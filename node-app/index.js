const http = require('http');
const hello = require('./helloWorld'); // importing module

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.write(hello.hello()); // using the module. hello.world() for calling the world function
  res.end();
});

const hostname = 'localhost'; // or 127.0.0.1
const port = 3000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname} on port: ${port}`);
});

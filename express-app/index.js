const express = require('express');

const app = express();
const port = 3000;

// GET
app.get('/', (req, res) => {
  res.send('request by GET method'); // .send() expressjs method. only can use once
  // res.write('Hello '); // .write() nodejs method. can use multiple times
  // res.write('World!');
  res.end();
});

// POST
app.post('/contoh', (req, res) => {
  res.send('request by POST method');
});

// PUT
app.put('/contoh', (req, res) => {
  res.send('request by PUT method');
});

// DELETE
app.delete('/contoh', (req, res) => {
  res.send('request by DELETE method');
});

// ALL (this method depending to what request that we use)
app.all('/universal', (req, res) => {
  res.send(`request by ${req.method} method`);
});

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);

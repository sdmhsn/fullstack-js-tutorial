const express = require('express');
const routers = express.Router();
const path = require('path');

routers.get('/', (req, res) => {
  res.send('Hello World!');
});

routers.get('/post/:id?', (req, res) => {
  if (req.params.id) res.send('artikel-' + req.params.id);
});

routers.post('/login', (req, res) => {
  // console.log(req.body);
  const { username, password } = req.body;
  res.send(`Anda login dengan username ${username} dan password ${password}`);
});

routers.get('/download', (req, res) => {
  const filename = 'logo.png';
  // Alternative 1:
  // res.sendFile(__dirname + '/' + filename);
  // Alternative 2:
  // res.sendFile(path.resolve(__dirname, filename));
  // Alternative 3:
  res.sendFile(path.join(__dirname, filename));
});

module.exports = routers;

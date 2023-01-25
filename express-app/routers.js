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

routers.get('/preview-image', (req, res) => {
  const filename = 'logo.png';
  res.sendFile(path.join(__dirname, filename), {
    headers: {
      'Content-Type': 'image/png',
    },
  });
});

module.exports = routers;

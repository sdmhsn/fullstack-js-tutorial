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
  // res.sendFile(path.join(__dirname, filename), {
  //   headers: {
  //     'Content-Disposition': 'attachment; filename="logo-utama1.png"',
  //   },
  // }); // to change the file name (logo.png) when we access /download in browser, after the automatically download the file is running

  // Alternative 2:
  // or using short command by res.download() method, to change the file name:
  res.download(path.join(__dirname, filename), 'logo-utama123.png');
});

module.exports = routers;

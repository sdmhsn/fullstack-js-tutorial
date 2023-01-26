const express = require('express');
const routers = express.Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');

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

const imageFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(null, false);
  }
  cb(null, true);
};

const upload = multer({ dest: 'public/upload', fileFilter: imageFilter }); // file upload destination

routers.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  // console.log(file);

  if (file) {
    const target = path.join(__dirname, 'public/upload', file.originalname); // __dirnmae = root directory, 'public/upload' = spesific directory, file.originalname = file original name
    // console.log(target); // /Users/a7/Documents/Dev/Buku Fullstack JS/React Express/express-app/public/upload/4.jpg
    fs.renameSync(file.path, target); // fs.renameSync(oldPath, newPath). rename oldPath to newPath
    res.send('File berhasil diupload');
  } else {
    res.send('File gagal diupload');
  }
});

module.exports = routers;

const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

// handling log middleware
const log = (req, res, next) => {
  console.log(`${Date.now()} ${req.hostname} ${req.originalUrl}`);
  next();
};
app.use(log);

// using body middleware (the body middleware should before app.use(routers) / routing declaration statements)
app.use(express.urlencoded({ extended: true })); // parse x-www-form-url-encode
app.use(express.json()); // parse JSON

// accessing file in public directory
// app.use(express.static(path.join(__dirname, 'public'))); http://localhost:3000/profile.pdf
app.use('/public', express.static(path.join(__dirname, 'public'))); // routing as prefix (http://localhost:3000/public/profile.pdf)

// routing declaration
const routers = require('./routers');
app.use(routers);

// handling 404 middleware
const notFound = (req, res, next) => {
  res.status(404);
  res.json({
    status: 'error',
    message: 'resource not found',
  });
};
app.use(notFound);

// handling error
const errorHandling = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500);
  res.json({
    status: 'error',
    message: 'server error',
  });
};
app.use(errorHandling);

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);

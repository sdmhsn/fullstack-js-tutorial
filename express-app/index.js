const express = require('express');
const app = express();
const port = 3000;
const routers = require('./routes');

// handling request body (should before app.use(routers) / routing declaration statements)
app.use(express.urlencoded({ extended: true })); // parse x-www-form-url-encode
app.use(express.json()); // parse JSON

// routing declaration statements
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

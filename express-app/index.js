const express = require('express');
const app = express();
const port = 3000;

// handling log middleware
const log = (req, res, next) => {
  console.log(`${Date.now()} ${req.hostname} ${req.originalUrl}`);
  next();
};
app.use(log);

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

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);

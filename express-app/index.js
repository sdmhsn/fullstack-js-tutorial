const express = require('express');
const app = express();
const port = 3000;

const log = (req, res, next) => {
  console.log(`${Date.now()} ${req.hostname} ${req.originalUrl}`);
  next();
};

app.use(log);

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);

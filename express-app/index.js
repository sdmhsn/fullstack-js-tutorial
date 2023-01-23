const express = require('express');
const app = express();
const port = 3000;

app.get('/post/:id', (req, res) => {
  // console.log(req.params);
  // console.log(req.params.id);
  res.send('artikel ke-' + req.params.id); // the id property get from the :id parameter
});

/* ================= using query string ================= */
// Sample 1:
// app.get('/foods', (req, res) => {
//   console.log(req.query);
//   console.log(req.query.page);
//   console.log(req.query.sort);
//   res.end();
// });

// Sample 2:
app.get('/foods', (req, res) => {
  const page = req.query.page ? req.query.page : 1;
  res.write('Foods page: ' + page + '\n');
  if (req.query.sort) res.write('Sort by: ' + req.query.sort);
  res.end();
});

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);

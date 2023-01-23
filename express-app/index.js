const express = require('express');
const app = express();
const port = 3000;

/* ======== regex in routing ======== */
// Sample 1:
// app.get('/page-*', (req, res) => {
//   // * in /page-* represented to all characters
//   res.write('route: ' + req.path);
//   res.end();
// });

// Sample 2:
app.get('/post/:id?', (req, res) => {
  // :id? = dynamic routing + regex. by using ? regex sign, the request to http://localhost:3000/post/ (without dynamic routing id) route, will be able to access. without ? regex sign, the request will be error
  res.send('artikel-' + req.params.id);
});

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);

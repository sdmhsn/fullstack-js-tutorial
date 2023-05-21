const router = require('express').Router();
const multer = require('multer');
const os = require('os');

const productController = require('./controller');

// console.log(os.tmpdir());

router.post(
  '/products',
  multer({ dest: os.tmpdir() }).single('image'),
  productController.store
);
router.get('/products', productController.store);
router.put(
  '/products/:id',
  multer({ dest: os.tmpdir() }).single('image'),
  productController.store
);
router.delete('/products/:id', productController.store);

module.exports = router;

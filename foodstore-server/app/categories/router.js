const router = require('express').Router();
const multer = require('multer');

const categoryController = require('./controller');

router.post('/categories', multer().none(), categoryController.store);
router.get('/categories', categoryController.store);
router.put('/categories/:id', multer().none(), categoryController.store);
router.delete('/categories/:id', categoryController.store);

module.exports = router;

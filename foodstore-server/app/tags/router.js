const router = require('express').Router();
const multer = require('multer');

const tagController = require('./controller');

router.post('/tags', multer().none(), tagController.store);
router.get('/tags', tagController.store);
router.put('/tags/:id', multer().none(), tagController.store);
router.delete('/tags/:id', tagController.store);

module.exports = router;

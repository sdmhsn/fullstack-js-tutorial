const router = require('express').Router();

const regionController = require('./controller');

router.get('/regions/provinces', regionController.getProvince);
router.get('/regions/regencies', regionController.getRegency);
router.get('/regions/districts', regionController.getDistrict);
router.get('/regions/villages', regionController.getVillage);

module.exports = router;

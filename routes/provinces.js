const { Router } = require('express');
const express = require('express');
const router = express.Router();
const {createProvince, getProvincesByCountry, getProvince } = require('../controllers/provinces'); 

router.post('/create-province', createProvince);
router.post('/get-province-by-country', getProvincesByCountry);
router.post('/get-province', getProvince);

module.exports = router;

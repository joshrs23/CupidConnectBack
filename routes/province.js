const { Router } = require('express');
const express = require('express');
const router = express.Router();
const {createProvince, getProvincesByCountry, getProvince } = require('../controllers/province'); 

router.post('/create-province', createProvince);
router.get('/get-province-by-country', getProvincesByCountry);
router.get('/get-province', getProvince);

module.exports = router;

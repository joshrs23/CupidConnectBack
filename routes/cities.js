const { Router } = require('express');
const express = require('express');
const router = express.Router();
const {createCity, getCitiesByProvince_id, getCity } = require('../controllers/cities'); 

router.post('/create-city', createCity);
router.post('/get-cities-by-province', getCitiesByProvince_id);
router.post('/get-city', getCity);

module.exports = router;

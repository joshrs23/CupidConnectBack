const { Router } = require('express');
const express = require('express');
const router = express.Router();
const {createCountry, getCountries, getCountry } = require('../controllers/country'); 

router.post('/create-country', createCountry);
router.get('/get-countries', getCountries);
router.get('/get-country', getCountry);

module.exports = router;

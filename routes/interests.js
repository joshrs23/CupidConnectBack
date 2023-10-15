const { Router } = require('express');
const express = require('express');
const router = express.Router();
const {getInterests, getInterest } = require('../controllers/interests'); 

router.get('/get-interests', getInterests);
router.post('/get-interest', getInterest);

module.exports = router;

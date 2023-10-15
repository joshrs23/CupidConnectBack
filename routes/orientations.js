const { Router } = require('express');
const express = require('express');
const router = express.Router();
const {getOrientations, getOrientation } = require('../controllers/orientations'); 

router.get('/get-orientations', getOrientations);
router.post('/get-orientation', getOrientation);

module.exports = router;

const { Router } = require('express');
const express = require('express');
const router = express.Router();
const{addDislike} = require('../controllers/dislikes')


router.post('/add-dislike',addDislike);

module.exports = router;
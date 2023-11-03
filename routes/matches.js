const { Router } = require('express');
const express = require('express');
const router = express.Router();
const{getMatchesByUser, DeleteMatch} = require('../controllers/matches')


router.post('/get-matches',getMatchesByUser);
router.post('/delete-match', DeleteMatch);

module.exports = router;
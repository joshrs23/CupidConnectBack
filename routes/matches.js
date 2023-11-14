const { Router } = require('express');
const express = require('express');
const router = express.Router();
const{getMatchesByUser, DeleteMatch,getMatchByUser} = require('../controllers/matches')


router.post('/get-matches',getMatchesByUser);
router.post('/get-match',getMatchByUser);
router.post('/delete-match', DeleteMatch);

module.exports = router;
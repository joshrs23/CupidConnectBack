const { Router } = require('express');
const express = require('express');
const router = express.Router();
const {getIdentities, getIdentity } = require('../controllers/identities'); 

router.get('/get-identities', getIdentities);
router.post('/get-identity', getIdentity);

module.exports = router;

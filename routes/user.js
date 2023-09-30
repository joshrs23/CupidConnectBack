const { Router } = require('express');
const express = require('express');
const router = express.Router();
const{createUser, userSignIn,deleteUser} = require('../controllers/user')


router.post('/create-user',createUser);
router.post('/delete-user', deleteUser);
router.post('/sign-in', userSignIn);

module.exports = router;
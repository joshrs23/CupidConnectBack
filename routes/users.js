const { Router } = require('express');
const express = require('express');
const router = express.Router();
const{createUser, userSignIn,deleteUser,changePassword} = require('../controllers/users')


router.post('/create-user',createUser);
router.post('/delete-user', deleteUser);
router.post('/change-password', changePassword);
router.post('/sign-in', userSignIn);

module.exports = router;
const { Router } = require('express');
const express = require('express');
const router = express.Router();
const{createUser, userSignIn,deleteUser,changePassword,changeIdentity,changeOrientations,changeInterests,getIdentityByUser,getOrientationsByUser,getInterestsByUser} = require('../controllers/users')


router.post('/create-user',createUser);
router.post('/delete-user', deleteUser);
router.post('/change-password', changePassword);
router.post('/sign-in', userSignIn);
router.post('/change-identity-user', changeIdentity);
router.post('/change-orientation-user', changeOrientations);
router.post('/change-interest-user', changeInterests);
router.post('/get-identity-user', getIdentityByUser);
router.post('/get-orientation-user', getOrientationsByUser);
router.post('/get-interest-user', getInterestsByUser);

module.exports = router;
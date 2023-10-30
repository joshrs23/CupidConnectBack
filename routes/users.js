const { Router } = require('express');
const express = require('express');
const router = express.Router();
const{createUser, userSignIn,deleteUser,changePassword,changeIdentity,changeOrientations,changeInterests, changeDescription,getIdentityByUser,getOrientationsByUser,getInterestsByUser,getDescriptionsByUser,getUser} = require('../controllers/users')


router.post('/create-user',createUser);
router.post('/delete-user', deleteUser);
router.post('/change-password', changePassword);
router.post('/sign-in', userSignIn);
router.post('/change-identity-user', changeIdentity);
router.post('/change-orientation-user', changeOrientations);
router.post('/change-interest-user', changeInterests);
router.post('/change-description-user', changeDescription);
router.post('/get-identity-user', getIdentityByUser);
router.post('/get-orientation-user', getOrientationsByUser);
router.post('/get-interest-user', getInterestsByUser);
router.post('/get-description-user', getDescriptionsByUser);
router.post('/get-user', getUser);

module.exports = router;
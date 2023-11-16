const { Router } = require('express');
const express = require('express');
const router = express.Router();
const{createUser, userSignIn,deleteUser,changePassword,changeIdentity,changeOrientations,changeInterests, changeDescription,getIdentityByUser,getOrientationsByUser,getInterestsByUser,getDescriptionsByUser,getUser,deletePicture,uploadFile,updatePicture, getUsersForLikes,getUserVisitor,getAllUser_admin,deleteUser_admin} = require('../controllers/users')


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
router.post('/delete-picture-user', deletePicture);
router.post('/upload-picture-user',express.json(), uploadFile, updatePicture);
router.post('/get-user-likes', getUsersForLikes);
router.post('/get-user-visitor', getUserVisitor);
router.post('/get-all-users', getAllUser_admin);
router.post('/delete-user-admin', deleteUser_admin);
module.exports = router;
const { Router } = require('express');
const express = require('express');
const router = express.Router();
const{addLike, DeleteLike,getLikesByUser,validateLike,getLikesToUser} = require('../controllers/likes')


router.post('/add-like',addLike);
router.post('/delete-like', DeleteLike);
router.post('/get-likes-user', getLikesByUser);
router.post('/validate-like', validateLike);
router.post('/get-likes-to-user', getLikesToUser);

module.exports = router;
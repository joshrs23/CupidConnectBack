const { Router } = require('express');
const express = require('express');
const router = express.Router();
const{getMessagesByMatch, addMessage} = require('../controllers/messages')


router.post('/add-message',addMessage);
router.post('/get-message', getMessagesByMatch);

module.exports = router;
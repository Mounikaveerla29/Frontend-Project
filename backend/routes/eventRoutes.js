const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const eventController = require('../controllers/eventController');

router.post('/', auth, eventController.createEvent);
router.get('/', eventController.getEvents);

module.exports = router;
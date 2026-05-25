const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const bookingController = require('../controllers/bookingController');

router.post('/', auth, bookingController.bookTicket);
router.put('/:id/status', auth, bookingController.updateBookingStatus);

module.exports = router;
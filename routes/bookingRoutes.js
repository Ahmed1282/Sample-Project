const express = require('express');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.post('/bookings', bookingController.createBooking);
router.get('/bookings/:id', bookingController.getBooking);
router.get('/bookings', bookingController.getAllBookings);
router.delete('/bookings/:id', bookingController.deleteBooking);

module.exports = router;

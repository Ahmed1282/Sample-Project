const express = require('express');
const bookingController = require('../controllers/bookingController');
const { param, query, body, validationResult } = require('express-validator');

const router = express.Router();

router.post('/bookings',[
    body("quantity").isInt({min : 1})
        .withMessage("Quantity can not be 0")
        .isInt({max : 100})
        .withMessage("Keep a low Quantity please")
],
(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }, 
bookingController.createBooking);

router.get('/bookings/:id',[
    param("id").isInt({min : 1})
        .withMessage("Please provide Id")

    
] ,
(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }, 
 bookingController.getBooking);
router.get('/bookings', bookingController.getAllBookings);
router.delete('/bookings/:id', bookingController.deleteBooking);

module.exports = router;

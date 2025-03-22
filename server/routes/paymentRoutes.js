const express = require('express');
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Stripe webhook endpoint (no auth required)
router.post('/webhook', express.raw({ type: 'application/json' }), paymentController.handleStripeWebhook);

// All other routes are protected
router.use(authMiddleware.authenticate);

// Get saved payment methods
router.get('/methods', paymentController.getPaymentMethods);

// Add a new payment method
router.post('/methods', paymentController.addPaymentMethod);

// Remove a payment method
router.delete('/methods/:paymentMethodId', paymentController.removePaymentMethod);

// Create payment intent with Stripe
router.post('/intent/:rideId', paymentController.createPaymentIntent);

// Process payment for a ride (for cash payments)
router.post('/:rideId', paymentController.processPayment);

// Get payment history
router.get('/history', paymentController.getPaymentHistory);

// Get payment details
router.get('/:paymentId', paymentController.getPaymentDetails);

module.exports = router;

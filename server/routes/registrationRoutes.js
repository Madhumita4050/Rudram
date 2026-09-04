const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const registrationController = require('../controllers/registrationController');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer config for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Routes
router.post('/', upload.single('photo'), registrationController.createRegistration);
router.post('/razorpay-webhook', registrationController.razorpayWebhook);
router.put('/:id/payment', registrationController.updatePaymentStatus);
router.post('/:id/create-razorpay-order', registrationController.createRazorpayOrder);

module.exports = router;

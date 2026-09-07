const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const registrationController = require('../controllers/registrationController');
const paymentSettingController = require('../controllers/paymentSettingController');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer config for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '_'));
  }
});
const upload = multer({ storage: storage });

// Routes
router.get('/payment-settings', paymentSettingController.getPaymentSettings);
router.post(
  '/',
  upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'paymentProof', maxCount: 1 }
  ]),
  registrationController.createRegistration
);
router.put('/:id/payment', registrationController.updatePaymentStatus);

module.exports = router;

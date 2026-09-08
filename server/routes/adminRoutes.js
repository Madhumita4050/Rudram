const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const adminController = require('../controllers/adminController');
const paymentSettingController = require('../controllers/paymentSettingController');

// Multer config for QR code upload
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, 'qr-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// All admin routes require Authentication + Admin privileges
router.use(authMiddleware, adminMiddleware);

// Dashboard Stats
router.get('/stats', adminController.getDashboardStats);

// Admin Profile & Security Settings
router.get('/profile', adminController.getAdminProfile);
router.put('/profile', adminController.updateAdminProfile);

// Registrations
router.get('/registrations', adminController.getAllRegistrations);
router.get('/registrations/:id', adminController.getRegistrationById);
router.put('/registrations/:id', adminController.updateRegistrationStatus);
router.delete('/registrations/:id', adminController.deleteRegistration);

// Payment Settings
router.get('/payment-settings', paymentSettingController.getPaymentSettings);
router.put('/payment-settings', upload.single('qrCodeImage'), paymentSettingController.updatePaymentSettings);

// Users Management
router.get('/users', adminController.getAllUsers);
router.put('/users/:id/role', adminController.updateUserRole);
router.put('/users/:id/status', adminController.updateUserStatus);
router.put('/users/:id/wallet', adminController.updateUserWallet);

// Requests / Transactions
router.get('/requests', adminController.getAllRequests);
router.put('/requests/:id/status', adminController.updateRequestStatus);

// Services
router.post('/services', adminController.createService);
router.put('/services/:id', adminController.updateService);
router.delete('/services/:id', adminController.deleteService);

// Support & Inquiries
router.get('/inquiries', adminController.getContactMessages);
router.put('/inquiries/:id', adminController.updateMessageStatus);

module.exports = router;

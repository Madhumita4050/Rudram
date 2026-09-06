const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const adminController = require('../controllers/adminController');

// All admin routes require Authentication + Admin privileges
router.use(authMiddleware, adminMiddleware);

// Dashboard Stats
router.get('/stats', adminController.getDashboardStats);

// Registrations
router.get('/registrations', adminController.getAllRegistrations);
router.get('/registrations/:id', adminController.getRegistrationById);
router.put('/registrations/:id', adminController.updateRegistrationStatus);
router.delete('/registrations/:id', adminController.deleteRegistration);

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

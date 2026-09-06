const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const adminController = require('../controllers/adminController');

// User Dashboard Summary (Protected)
router.get('/dashboard-summary', authMiddleware, adminController.getUserDashboard);

// Submit Contact / Grievance Message (Public or Authenticated)
router.post('/contact', adminController.createContactMessage);

module.exports = router;

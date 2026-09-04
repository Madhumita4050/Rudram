const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const authMiddleware = require('../middlewares/authMiddleware');

// Public routes
router.get('/', serviceController.getServices);
router.get('/details/:id', serviceController.getServiceById); // changed to /details/:id to avoid conflict with /requests/my below if order changes

// Setup route (for development)
router.post('/seed', serviceController.seedServices);

// Protected routes
router.post('/request', authMiddleware, serviceController.requestService);
router.get('/requests/my', authMiddleware, serviceController.getMyHistory);

module.exports = router;

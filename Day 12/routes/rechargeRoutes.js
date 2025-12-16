const express = require('express');
const { createPlan, getPlans, deletePlan, createRecharge, getUserRecharges, getAllRecharges } = require('../controllers/rechargeController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/plans', createPlan);
router.get('/plans', getPlans);
router.delete('/plans/:id', deletePlan);

// Recharge routes
router.post('/recharge', protect, createRecharge);
router.get('/recharges', protect, getUserRecharges);
router.get('/all-recharges', protect, getAllRecharges); // For admin

module.exports = router;

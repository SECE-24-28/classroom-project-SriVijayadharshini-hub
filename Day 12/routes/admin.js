const express = require('express');
const User = require('../models/User');
const Recharge = require('../models/Recharge');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Get admin dashboard data
router.get('/dashboard', protect, async (req, res) => {
  try {
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const totalUsers = await User.countDocuments();
    const totalRecharges = await Recharge.countDocuments();
    const rechargePlans = await Recharge.distinct('operator').length;

    // Get recent recharges with user info
    const recentRecharges = await Recharge.find()
      .populate('userId', 'username')
      .sort({ createdAt: -1 })
      .limit(10);

    // Get all users
    const users = await User.find().select('username role createdAt');

    res.json({
      totalUsers,
      totalRecharges,
      rechargePlans,
      recentRecharges,
      users
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

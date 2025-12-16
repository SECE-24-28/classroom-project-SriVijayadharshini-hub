const RechargePlan = require('../models/RechargePlan');

exports.createPlan = async (req, res) => {
  const plan = await RechargePlan.create(req.body);
  res.status(201).json(plan);
};

exports.getPlans = async (req, res) => {
  const plans = await RechargePlan.find();
  res.json(plans);
};

exports.deletePlan = async (req, res) => {
  await RechargePlan.findByIdAndDelete(req.params.id);
  res.json({ message: 'Plan deleted successfully' });
};

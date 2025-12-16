const mongoose = require('mongoose');

const rechargePlanSchema = new mongoose.Schema({
  planName: { type: String, required: true },
  price: { type: Number, required: true },
  validity: { type: String, required: true },
  description: { type: String }
});

module.exports = mongoose.model('RechargePlan', rechargePlanSchema);

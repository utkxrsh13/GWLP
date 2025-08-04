const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
  username: { type: String, required: true },
  prediction_result: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Prediction', predictionSchema);
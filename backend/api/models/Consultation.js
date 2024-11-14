const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
  consultation_id: {
    type: Number,
    required: true,
    unique: true,
    description: 'Auto-increment int for consultation ID'
  },
  payment_id: {
    type: Number,
    required: true,
    description: 'Reference to payment ID'
  },
  patient_id: {
    type: String,
    required: true,
    description: 'Reference to patient ID'
  },
  doctor_id: {
    type: String,
    required: true,
    description: 'Reference to doctor ID'
  },
  date: {
    type: Date,
    required: true,
    description: 'Date of consultation'
  },
  description: {
    type: String,
    required: true,
    description: 'Description of consultation'
  },
  deleted: {
    type: Boolean,
    default: false,
    description: 'Soft delete flag'
  }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('consultation', consultationSchema);

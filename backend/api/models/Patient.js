const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  patient_id: {
    type: String,
    required: true,
    unique: true,
    description: 'Auto-increment int for patient ID'
  },
  name: {
    type: String,
    required: true
  },
  born_date: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['P', 'L'],
    required: true
  },
  address: {
    type: String,
    required: true
  },
  contact_number: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: /.+@.+\..+/,
    description: 'Valid email address'
  },
  medical_history: {
    type: String,
    required: true
  },
  height: {
    type: mongoose.Schema.Types.Decimal128, // For decimal values
    required: true
  },
  weight: {
    type: mongoose.Schema.Types.Decimal128, // For decimal values
    required: true
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

module.exports = mongoose.model('Patient', patientSchema);

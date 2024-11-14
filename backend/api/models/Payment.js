const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  payment_id: {
    type: Number,
    required: true,
    unique: true,
    description: 'Auto-increment int for payment ID'
  },
  patient_id: {
    type: String,
    required: true,
    description: 'Patient ID associated with the payment'
  },
  hospital_id: {
    type: String,
    required: true,
    description: 'Hospital ID where the payment was made'
  },
  date: {
    type: Date,
    required: true,
    description: 'Date of the payment'
  },
  description: {
    type: String,
    required: true,
    description: 'Description of the payment'
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

module.exports = mongoose.model('Payment', paymentSchema);

const mongoose = require('mongoose');

const specializationSchema = new mongoose.Schema({
  specialization_id: {
    type: String,
    required: true,
    unique: true,
    description: 'Auto-increment int for this ID'
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
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

module.exports = mongoose.model('Specialization', specializationSchema);

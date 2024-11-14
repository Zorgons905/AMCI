const mongoose = require('mongoose');

const medicalResultSchema = new mongoose.Schema({
  result_id: {
    type: Number,
    required: true,
    description: 'Result ID must be declared and must be a string'
  },
  patient_id: {
    type: String,
    required: true,
    description: 'Patient ID must be declared and must be a string'
  },
  doctor_id: {
    type: String,
    required: true,
    description: 'Doctor ID must be declared and must be a string'
  },
  hospital_id: {
    type: String,
    required: true,
    description: 'Hospital ID must be declared and must be a string'
  },
  date_of_test: {
    type: Date,
    required: true,
    description: 'Date of the test must be declared and must be a date'
  },
  test_type: {
    type: String,
    required: true,
    description: 'Test type must be declared and must be a string'
  },
  test_results: {
    type: String,
    required: true,
    description: 'Test results must be declared and must be a string'
  },
  notes: {
    type: String,
    description: 'Notes added by the doctor (optional)'
  },
  deleted: {
    type: Boolean,
    default: false,
    description: 'Soft delete flag (optional)'
  }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('MedicalResult', medicalResultSchema, 'medical_results');

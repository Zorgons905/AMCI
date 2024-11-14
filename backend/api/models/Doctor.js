const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: true,
    unique: true,
    description: 'User ID linked to the doctor'
  },
  doctor_id: {
    type: String,
    required: true,
    unique: true,
    description: 'Employees number for the doctor'
  },
  name: {
    type: String,
    required: true,
    description: 'Doctor name must be declared and must be a string'
  },
  specialist: {
    type: String,
    required: true,
    description: 'Doctor specialty must be declared and must be a string'
  },
  contact_number: {
    type: String,
    required: true,
    description: 'Telephone number must be declared and must be a string',
    validate: {
      validator: function(v) {
        return /^\+?[1-9]\d{1,14}$/.test(v);
      },
      message: props => `${props.value} is not a valid telephone number!`
    }
  },
  email: {
    type: String,
    required: true,
    match: [/^.+@.+$/, 'Email format is invalid'],
    description: 'Email must be declared and follow a valid format'
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

module.exports = mongoose.model('Doctor', doctorSchema);

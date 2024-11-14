const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  hospital_id: {
    type: String,
    required: true,
    unique: true,
    description: 'Unique id for hospital'
  },
  name: {
    type: String,
    required: true,
    description: 'Name of the hospital'
  },
  address: {
    type: String,
    required: true,
    description: 'Address of the hospital'
  },
  email: {
    type: String,
    required: true,
    match: /.+@.+\..+/,
    description: 'Email address of the hospital'
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

module.exports = mongoose.model('Hospital', hospitalSchema);

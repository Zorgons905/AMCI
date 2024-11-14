const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  notification_id: {
    type: Number,
    required: true,
    unique: true,
    description: 'Unique identifier for the notification'
  },
  user_id: {
    type: String,
    required: true,
    description: 'ID of the user who will receive the notification'
  },
  message: {
    type: String,
    required: true,
    description: 'The content/message of the notification'
  },
  notification_type: {
    type: String,
    required: true,
    enum: ['info', 'warning', 'error', 'success'],
    description: 'Type of the notification'
  },
  status: {
    type: String,
    required: true,
    enum: ['unread', 'read'],
    description: 'Current status of the notification'
  },
  deleted: {
    type: Boolean,
    default: false,
    description: 'Soft delete flag'
  }
},{
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('Notification', notificationSchema);

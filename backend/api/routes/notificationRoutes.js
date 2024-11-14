const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.post('/', notificationController.createNotification);
router.get('/', notificationController.getAllNotifications);
router.get('/:id', notificationController.getNotificationById);
// router.put('/:id', notificationController.updateNotificationPut);
router.patch('/:id', notificationController.updateNotificationPatch);
router.delete('/:id', notificationController.deleteNotification);
// router.patch('/:id/sofdel', notificationController.softDeleteNotification);

module.exports = router;

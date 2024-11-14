const Notification = require('../models/Notification');

async function getNextNotificationId() {
  const maxNotification = await Notification.findOne().sort({ notification_id: -1 }).exec();
  const nextNotificationId = maxNotification ? maxNotification.notification_id + 1 : 1;
  return nextNotificationId;
}

exports.createNotification = async (req, res) => {
  try {
    const { user_id, message, notification_type, status} = req.body;
    const notification_id = await getNextNotificationId();
  
    const newNotification = new Notification({
      notification_id,
      user_id,
      message,
      notification_type,
      status
    });

    await newNotification.save();
    res.status(201).json({ message: 'Notifikasi berhasil dibuat', notification: newNotification });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ deleted: false });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) return res.status(404).json({ message: 'Notifikasi tidak ditemukan' });
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// exports.updateNotificationPut = async (req, res) => {
//   try {
//     const { payment_id, patient_id, doctor_id, date, description } = req.body;
//     const notification = await Notification.findByIdAndUpdate(
//       req.params.id,
//       { payment_id, patient_id, doctor_id, date, description },
//       { new: true, runValidators: true, overwrite: true }
//     );
//     if (!notification) return res.status(404).json({ message: 'Notifikasi tidak ditemukan' });
//     res.status(200).json(notification);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

exports.updateNotificationPatch = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!notification) return res.status(404).json({ message: 'Notifikasi tidak ditemukan' });
    res.status(200).json(notification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// exports.softDeleteNotification = async (req, res) => {
//   try {
//     const notification = await Notification.findByIdAndUpdate(
//       req.params.id,
//       { deleted: true },
//       { new: true }
//     );
//     if (!notification) return res.status(404).json({ message: 'Notifikasi tidak ditemukan' });
//     res.status(200).json({ message: 'Notifikasi terhapus [soft deletion]', notification });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification) return res.status(404).json({ message: 'Notifikasi tidak ditemukan' });
    res.status(200).json({ message: 'Notifikasi terhapus permanen' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

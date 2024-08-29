const Notification = require('../models/Notification_model');

const notificationController = {
  getAllByUser: async (req, res) => {
    try {
      const notifications = await Notification.find({ user: req.user._id });
      res.json(notifications);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  
  markAsRead: async (req, res) => {
    try {
      const updatedNotification = await Notification.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
      res.json(updatedNotification);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};

module.exports = notificationController;
 

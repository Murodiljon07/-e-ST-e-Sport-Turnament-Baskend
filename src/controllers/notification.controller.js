import Notification from "../models/Notification.js";

// GET USER NOTIFICATIONS
export const getNotifications = async (req, res) => {
  const notifications = await Notification.find({ user: req.user.id }).sort({
    createdAt: -1,
  });
  res.json(notifications);
};

// MARK AS READ
export const markAsRead = async (req, res) => {
  await Notification.findByIdAndUpdate(req.params.id, { read: true });
  res.json({ msg: "Notification marked as read" });
};

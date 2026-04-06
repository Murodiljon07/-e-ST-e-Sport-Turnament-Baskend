import Notification from "../../models/notification.model.js";

/** Get notifications for user */
export const getNotificationsService = async (userId) => {
  return await Notification.find({ user: userId }).sort({ createdAt: -1 });
};

export const getNotificationByIdService = async (id) => {
  return await Notification.findById(id);
};

export const createNotificationService = async (data) => {
  return await Notification.create(data);
};

export const updateNotificationService = async (id, data) => {
  return await Notification.findByIdAndUpdate(id, data, { new: true });
};

export const deleteNotificationService = async (id) => {
  return await Notification.findByIdAndDelete(id);
};

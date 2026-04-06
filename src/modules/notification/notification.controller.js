import {
  getNotificationsService,
  getNotificationByIdService,
  createNotificationService,
  updateNotificationService,
  deleteNotificationService,
} from "./notification.service.js";
import { notificationValidation } from "./notification.validation.js";

/** Get all notifications for logged-in user */
export const getNotifications = async (req, res) => {
  const notifications = await getNotificationsService(req.user._id);
  res.json(notifications);
};

/** Get notification by ID */
export const getNotificationById = async (req, res) => {
  const notification = await getNotificationByIdService(req.params.id);
  if (!notification)
    return res.status(404).json({ message: "Notification not found" });
  res.json(notification);
};

/** Create notification */
export const createNotification = async (req, res) => {
  const { error } = notificationValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const notification = await createNotificationService(req.body);
  res.status(201).json(notification);
};

/** Update notification */
export const updateNotification = async (req, res) => {
  const { error } = notificationValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const updated = await updateNotificationService(req.params.id, req.body);
  if (!updated)
    return res.status(404).json({ message: "Notification not found" });
  res.json(updated);
};

/** Delete notification */
export const deleteNotification = async (req, res) => {
  const deleted = await deleteNotificationService(req.params.id);
  if (!deleted)
    return res.status(404).json({ message: "Notification not found" });
  res.json({ message: "Notification deleted" });
};

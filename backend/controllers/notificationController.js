import {
  createNotification,
  getUserNotifications,
  markNotificationAsRead,
  deleteNotification
} from "../service/notificationService.js";


/* ---------------- GET MY NOTIFICATIONS ---------------- */

export const fetchMyNotifications = async (req, res, next) => {
  try {

    const notifications = await getUserNotifications(req.user.id);

    res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications
    });

  } catch (error) {
    next(error);
  }
};


/* ---------------- MARK AS READ ---------------- */

export const markAsRead = async (req, res, next) => {
  try {

    await markNotificationAsRead(req.params.id);

    res.status(200).json({
      success: true,
      message: "Notification marked as read"
    });

  } catch (error) {
    next(error);
  }
};


/* ---------------- DELETE NOTIFICATION ---------------- */

export const removeNotification = async (req, res, next) => {
  try {

    await deleteNotification(req.params.id);

    res.status(200).json({
      success: true,
      message: "Notification deleted"
    });

  } catch (error) {
    next(error);
  }
};
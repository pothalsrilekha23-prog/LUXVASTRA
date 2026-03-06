import express from "express";
import {
  fetchMyNotifications,
  markAsRead,
  removeNotification
} from "../controllers/notificationController.js";

const router = express.Router();

router.get("/", fetchMyNotifications);
router.patch("/:id/read", markAsRead);
router.delete("/:id", removeNotification);

export default router;
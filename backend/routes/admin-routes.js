import express from "express";
import middleware from "../middlewares/middleware.js";
import { adminOrMod, adminOnly } from "../middlewares/admin.js";
import {
  addEvent,
  getAdminPage,
  getUsersPage,
  getAdminsandModPage,
  removeAdminsAndMods,
  getAllEvents,
  getSpecifyUserOrder,
  getParticipants,
  updateEventStatus,
  getAttendance,
  submitAttendance,
} from "../controllers/admin-controller.js";
const router = express.Router();

router.use(middleware).route("/add-event").post(addEvent);
router.get("/home", middleware, adminOrMod, getAdminPage);
router.get("/users", middleware, adminOnly, getUsersPage);
router.get("/admins", middleware, adminOnly, getAdminsandModPage);
router.post("/admins/action", middleware, adminOnly, removeAdminsAndMods);
router.get("/events", middleware, adminOrMod, getAllEvents);
router.post("/user/bookings", middleware, adminOnly, getSpecifyUserOrder);
router.post("/event/participants", middleware, adminOrMod, getParticipants);
router.post("/event/status", middleware, adminOrMod, updateEventStatus);
router.get("/event/attendance/:eventId", middleware, adminOrMod, getAttendance);
router.post(
  "/event/attendance/submit",
  middleware,
  adminOrMod,
  submitAttendance
);

export default router;

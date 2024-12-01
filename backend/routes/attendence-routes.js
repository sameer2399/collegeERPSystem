import express from "express";
import { getAttendance } from "../controllers/attendence-controller.js";

const router = express.Router();

router.route("/").post(getAttendance);

export default router;

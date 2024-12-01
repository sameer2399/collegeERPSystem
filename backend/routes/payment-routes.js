import express from "express";
import middleware from "../middlewares/middleware.js";
import { checkBookingConditions } from "../middlewares/event.js";
import {
  makePayment,
  verifyPayment,
} from "../controllers/payment-controller.js";
const router = express.Router();


router.route("/verify").post(verifyPayment);

router.get("/init", middleware, checkBookingConditions, makePayment);

export default router;

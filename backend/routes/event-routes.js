import express from "express";
import middleware from "../middlewares/middleware.js";
import {
  fetchEvents,
  fetchEvent,
  initializeCheckout,
  fetchCheckout,
  makeFreeOrder,
  fetchUserEachOrder,
  fetchUserAllOrders,
} from "../controllers/event-controller.js";

import {
  checkBookingConditions,
  checkOutConditions,
  eitherPlainOrLoggedIn,
} from "../middlewares/event.js";
const router = express.Router();

router.route("/all-events").get(fetchEvents);
router.use(eitherPlainOrLoggedIn).route("/event/:id").get(fetchEvent);
router.post(
  "/init/checkout",
  middleware,
  checkOutConditions,
  initializeCheckout
);

router.get("/checkout/:checkoutId", middleware, fetchCheckout);
router.get("/my-bookings", middleware, fetchUserAllOrders);

router.use(middleware).route("/order/:orderId").get(fetchUserEachOrder);

router.post("/book", middleware, checkBookingConditions, makeFreeOrder);

export default router;

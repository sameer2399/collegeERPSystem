import express from "express";
import { login, profile } from "../controllers/auth-controller.js";
import middleware from "../middlewares/middleware.js";
const router = express.Router();

router.route("/login").post(login);
router.use(middleware).route("/profile").get(profile);
export default router;

import express from "express";
import {
  authLogin,
  authRegister,
  refreshToken,
} from "../controllers/auth.controller.js";
import {
  verifyRefreshToken,
  verifyRegistrationToken,
} from "../middlewares/authMiddleware.js";
import validateAgentScheme from "../middlewares/inputValidator.js";

const router = express.Router();
router.post(
  "/register",
  verifyRegistrationToken,
  validateAgentScheme,
  authRegister
);
router.post("/login", authLogin);
router.post("/refresh-token", verifyRefreshToken, refreshToken);

export default router;

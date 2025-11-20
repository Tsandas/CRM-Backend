import express from "express";
import { authLogin, refreshToken } from "../controllers/auth.controller.js";
import { verifyRefreshToken } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/regiter", () => {});
router.post("/login", authLogin);
router.post("/refresh-token", verifyRefreshToken, refreshToken);

export default router;

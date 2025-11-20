import express from "express";
import { authLogin, refreshToken } from "../controllers/auth.controller.js";
import { verifyRefreshToken } from "../middlewares/authMiddleware.js";
import validateAgent from "../middlewares/inputValidator.js";

const router = express.Router();
router.post("/register", validateAgent, (req, res) => {
  res.json(req.body);
});
router.post("/login", authLogin);
router.post("/refresh-token", verifyRefreshToken, refreshToken);

export default router;

import express from "express";
import { authRegister } from "../controllers/sysadmin.controller.js";
import validateAgentScheme from "../middlewares/input-error/inputValidator.js";
import { verifyRegistrationToken } from "../middlewares/sysadminMiddleware.js";

const router = express.Router();
router.post(
  "/register",
  // verifyRegistrationToken,
  validateAgentScheme,
  authRegister
);
router.delete("/delete", (req, res) => {
  console.log(req.body);
});

export default router;

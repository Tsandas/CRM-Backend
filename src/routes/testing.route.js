import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { authorizeRole } from "../middlewares/roleMiddleware.js";
const router = express.Router();

// Everyone can access
router.get("/sayHello", (req, res) => {
  res.json({ message: "Hello World" });
});

router.get("/getUsers", (req, res) => {
  const users = [];
  for (let i = 1; i <= 100; i++) {
    users.push({
      id: i,
      name: `User ${i}`,
      role: "member",
    });
  }
  res.json({ users });
});

// Admin only
router.get("/admin", verifyToken, authorizeRole("admin"), (req, res) => {
  res.json({ message: "Admin" });
});

// Admin Manager
router.get(
  "/manager",
  verifyToken,
  authorizeRole("admin", "manager"),
  (req, res) => {
    res.json({ message: "Manager" });
  }
);

// Admin Manager User
router.get(
  "/user",
  verifyToken,
  authorizeRole("admin", "manager", "user"),
  (req, res) => {
    res.json({ message: "User" });
  }
);

export default router;

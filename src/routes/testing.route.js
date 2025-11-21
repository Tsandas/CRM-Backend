import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { authorizeRole } from "../middlewares/roleMiddleware.js";
import { responseHandler } from "../utils/responseHandler.js";
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
  return responseHandler(res, 200, "Users Fetched", users);
});

router.get("/getUsersAuth", (req, res) => {
  if (req.headers.authorization === "123") {
    const users = [];
    for (let i = 1; i <= 100; i++) {
      users.push({
        id: i,
        name: `User ${i}`,
        role: "member",
      });
    }
    return responseHandler(res, 200, "Users Fetched", users);
  } else {
    return responseHandler(
      res,
      401,
      "Include in your Headers.authorization the token"
    );
  }
});

router.post("/pushDataAuth", (req, res) => {
  const authHeader = req.headers.authorization;
  let token;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    if (!token) {
      return responseHandler(
        res,
        401,
        "Include the correct token in Headers.authorization"
      );
    }
  }

  if (token != "123") {
    return responseHandler(res, 401, "Not correct");
  } else {
    return responseHandler(res, 200, "Ok", req.body);
  }
});

router.post("/pushData", (req, res) => {
  return responseHandler(res, 200, "Post request received", req.body);
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

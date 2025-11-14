import { loginService } from "../models/authModel.js";
import { responseHandler } from "../utils/responseHandler.js";
import { redis } from "../config/redis.js";
import jwt from "jsonwebtoken";

export const authLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const logInStatus = await loginService(username, password);
    if (!logInStatus) {
      return responseHandler(res, 404, "Invalid username or password", null);
    }
    return responseHandler(res, 200, "Log in succesfull", logInStatus);
  } catch (err) {
    next(err);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const storedToken = await redis.get(`refresh_token:${req.data.username}`);
    console.log(req.refresh_token, storedToken);
    if (storedToken !== storedToken) {
      return responseHandler(res, 401, "Invalid refresh token provided")
    }
    const accessToken = jwt.sign(
      {
        agent_id: req.data.agent_id,
        role: req.data.role,
        username: req.data.username,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );
    return responseHandler(res, 200, "Access token refreshed succesfully", {accessToken: accessToken})
  } catch (error) {
    next(error);
  }
};

import {
  loginService,
  agentExistsService,
  createAgentService,
} from "../models/authModel.js";
import { responseHandler } from "../utils/responseHandler.js";
import { redis } from "../config/redis.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const authLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const logInStatus = await loginService(username, password);
    if (!logInStatus) {
      return responseHandler(res, 404, "Invalid username or password", null);
    }
    return responseHandler(res, 200, "Log in succesfull", logInStatus);
  } catch (error) {
    next(error);
  }
};

export const authRegister = async (req, res) => {
  try {
    const { agentId, username } = req.body;
    const agentExists = await agentExistsService(agentId, username);
    if (agentExists) {
      return responseHandler(
        res,
        409,
        "Agent with this agentId or username already exists"
      );
    }
    // create user
    // createAgentService(req.body);
    return responseHandler(
      res,
      200,
      "Agent is valid (Agent won't be created for now)",
      req.body
    );
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const storedToken = await redis.get(`refresh_token:${req.data.username}`);
    if (storedToken !== req.refreshToken) {
      return responseHandler(res, 401, "Invalid refresh token provided");
    }
    const accessToken = jwt.sign(
      {
        agent_id: req.data.agentId,
        role: req.data.role,
        username: req.data.username,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
      }
    );
    return responseHandler(res, 200, "Access token refreshed succesfully", {
      accessToken: accessToken,
    });
  } catch (error) {
    next(error);
  }
};

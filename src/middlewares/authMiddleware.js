import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { responseHandler } from "../utils/responseHandler.js";
dotenv.config();

export const verifyToken = (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    if (!token) {
      return responseHandler(
        res,
        401,
        "No access token provided, authorization denied"
      );
    }

    try {
      const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.data = decode;
      console.log("The decoded user is: ", req.data);
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return responseHandler(res, 401, "Access token expired");
      }
      next(error);
    }
  } else {
    return responseHandler(
      res,
      401,
      "No access token provided, authorization denied"
    );
  }
};

export const verifyRefreshToken = (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    if (!token) {
      return responseHandler(
        res,
        401,
        "No refresh token provided, authorization denied"
      );
    }
    try {
      const decode = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
      req.data = decode;
      req.refreshToken = token;
      console.log("The decoded user is: ", req.data);
      next();
    } catch (error) {
      console.log(error.message);
      if (error.name === "TokenExpiredError") {
        return responseHandler(res, 401, "Refresh token expired");
      }
      next(error);
    }
  } else {
    return responseHandler(
      res,
      401,
      "No refresh token provided, authorization denied"
    );
  }
};

export const verifyRegistrationToken = (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    if (!token) {
      return responseHandler(
        res,
        401,
        "No registration token provided, authorization denied"
      );
    }
    if (token === process.env.REGISTRATION_TOKEN) {
      next();
    } else {
      return responseHandler(res, 401, "Invalid Registration Token");
    }
  } else {
    return responseHandler(
      res,
      401,
      "No registration token provided, authorization denied"
    );
  }
};

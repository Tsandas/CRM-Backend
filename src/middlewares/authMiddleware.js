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
      return responseHandler(res, 400, "Access token not valid");
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
      req.refresh_token = token;
      console.log("The decoded user is: ", req.data);
      next();
    } catch (error) {
      return responseHandler(res, 400, "Refresh token not valid");
    }
  } else {
    return responseHandler(
      res,
      401,
      "No refresh token provided, authorization denied"
    );
  }
};

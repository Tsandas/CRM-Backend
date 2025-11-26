import dotenv from "dotenv";
import { responseHandler } from "../utils/responseHandler.js";
dotenv.config();

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

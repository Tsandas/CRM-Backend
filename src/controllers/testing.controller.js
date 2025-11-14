import { loginService } from "../models/authModel.js";
import { responseHandler } from "../utils/responseHandler.js";

export const authLogin = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const logInStatus = await loginService(username, password);
    if (!logInStatus) {
      return responseHandler(
        res,
        404,
        "Invalid username or password",
        null
      );
    }
    return responseHandler(res, 200, "Log in succesfull", logInStatus);
  } catch (err) {
    next(err);
  }
};

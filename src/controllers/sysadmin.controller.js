import { responseHandler } from "../utils/responseHandler.js";
import { agentExistsService, createAgentService } from "../models/sysadminModel.js";
import dotenv from "dotenv";

dotenv.config();

export const authRegister = async (req, res) => {
  console.log(req.body);
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

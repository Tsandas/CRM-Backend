import Joi from "joi";

const agentScheme = Joi.object({
  agentId: Joi.string().min(1).required(),
  firstName: Joi.string().min(3).required(),
  lastName: Joi.string().min(3).required(),
  // email:   Joi.string().email().required(),
  // phone: Joi.number.min(6).required(),
  username: Joi.string().min(3).required(),
  password: Joi.string().min(3).required(),
  role: Joi.string().min(3).required(),
  active: Joi.boolean().required(),
  lastLogin: Joi.date().required(),
  createdAt: Joi.date().required(),
  updatedAt: Joi.date().required(),
});

const validateAgentScheme = (req, res, next) => {
  const { error } = agentScheme.validate(req.body);
  if (error) {
    error.customMessage =
      "Agents should follow the correct agentScheme. Check the correct Agent Scheme.";
    return next(error);
  }
  next();
};

export default validateAgentScheme;

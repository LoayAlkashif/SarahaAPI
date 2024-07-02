import Joi from "joi";

export const sendValidation = Joi.object({
  content: Joi.string().min(3).max(300).required(),
  receiverId: Joi.string().length(24).required(),
});

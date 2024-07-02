import Joi from "joi";

const signupValidation = Joi.object({
  username: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^[A-Z][a-z0-9A-Z]{8,40}$/)
    .required(),
  repassword: Joi.valid(Joi.ref("password")).required(),
});

const singinValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^[A-Z][a-z0-9A-Z]{8,40}$/)
    .required(),
});

const otpValidation = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string().required(),
});

export { signupValidation, singinValidation, otpValidation };

import { Router } from "express";
import { createUser, otpVerify, signin } from "./user.controller.js";
import { checkEmail } from "../../middleware/checkEmail.js";
import { validate } from "../../middleware/validate.js";
import {
  otpValidation,
  signupValidation,
  singinValidation,
} from "./user.validation.js";

const userRouter = Router();

userRouter.post("/signup", validate(signupValidation), checkEmail, createUser);
userRouter.post("/signin", validate(singinValidation), signin);
userRouter.post("/verify", validate(otpValidation), otpVerify);

export default userRouter;

import { User } from "../../../database/models/user.model.js";
import { catchError } from "../../middleware/catchError.js";
import bcrypt from "bcrypt";
import { AppError } from "../../utils/appError.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../email/sendEmail.js";

const createUser = catchError(async (req, res, next) => {
  //generate random 6 numbers
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  // otp expire after 3 mins
  const otpExpires = new Date(Date.now() + 3 * 60000);

  const user = new User({ ...req.body, otp, otpExpires });
  await user.save();
  user.password = undefined;

  sendEmail(req.body.email, otp);

  res.status(201).json({ message: "Success", user });
});

const otpVerify = catchError(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return next(new AppError("User not found", 401));

  if (user.otpVerified == true)
    return next(new AppError("You are verified", 409));

  if (user.otp !== req.body.otp) return next(new AppError("worng otp"), 401);

  // if otp expire send new otp to mail
  if (user.otpExpires < new Date()) {
    //generate random 6 numbers
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    // otp expire after 3 mins
    const newOtpExpires = new Date(Date.now() + 3 * 60000);

    user.otp = newOtp;
    user.otpExpires = newOtpExpires;
    await user.save();

    sendEmail(email, newOtp);
    return next(new AppError("otp expired please insert the new one"), 401);
  }

  user.otpVerified = true;
  user.otp = null;
  user.otpExpires = null;
  await user.save();
  res.status(200).json({ message: "Email verified" });
});

const signin = catchError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  // user not verified
  if (user.otpVerified == false)
    return next(new AppError("please verify your account", 401));

  if (!user || !bcrypt.compareSync(req.body.password, user.password))
    return next(new AppError("incorrect Email or Password", 401));

  jwt.sign(
    { userId: user._id, username: user.username, role: user.role },
    "loay",
    (err, token) => {
      if (err) return next(new AppError("Token creation failed", 500));
      res.status(200).json({ message: "success..", token, user: user._id });
    }
  );
});

export { createUser, signin, otpVerify };

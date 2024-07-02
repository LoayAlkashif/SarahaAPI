import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    username: String,
    email: String,
    password: String,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    otp: String,
    otpExpires: Date,
    otpVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      updatedAt: false,
    },
    versionKey: false,
  }
);

export const User = model("User", schema);

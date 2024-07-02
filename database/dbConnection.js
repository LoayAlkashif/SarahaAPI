import mongoose from "mongoose";
export const dbConnection = mongoose
  .connect("mongodb://localhost:27017/saraha")
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

process.on("uncaughtException", (err) => {
  console.log("Error in code", err);
});

import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import userRouter from "./src/modules/user/user.route.js";
import messageRouter from "./src/modules/message/message.route.js";
import { globalError } from "./src/middleware/globalError.js";
import { AppError } from "./src/utils/appError.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/auth", userRouter);
app.use("/messages", messageRouter);

app.use("*", (req, res, next) => {
  next(new AppError(`Page not found ${req.originalUrl}`, 404));
});
app.use(globalError);

process.on("unhandledRejection", (err) => {
  console.log("Error", err);
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

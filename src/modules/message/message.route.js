import { Router } from "express";
import {
  deleteMessage,
  getMessages,
  sendMessage,
} from "./message.controller.js";
import { verifyToken } from "../../middleware/verifyToken.js";
import { validate } from "../../middleware/validate.js";
import { sendValidation } from "./message.validation.js";

const messageRouter = Router();
messageRouter.use(verifyToken);
messageRouter.post("/", validate(sendValidation), sendMessage);
messageRouter.get("/", getMessages);
messageRouter.delete("/:id", deleteMessage);
export default messageRouter;

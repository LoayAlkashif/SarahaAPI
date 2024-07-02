import { Router } from "express";
import {
  deleteMessage,
  getMessages,
  sendMessage,
} from "./message.controller.js";
import { verifyToken } from "../../middleware/verifyToken.js";

const messageRouter = Router();
messageRouter.use(verifyToken);
messageRouter.post("/", sendMessage);
messageRouter.get("/", getMessages);
messageRouter.delete("/:id", deleteMessage);
export default messageRouter;

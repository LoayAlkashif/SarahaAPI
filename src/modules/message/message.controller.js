import { Message } from "../../../database/models/message.model.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";

const sendMessage = catchError(async (req, res, next) => {
  const { content, receiverId } = req.body;

  const addMessage = new Message({ content, receiverId });
  await addMessage.save();
  res.status(201).json({ message: "Message sent", addMessage });
});

const getMessages = catchError(async (req, res, next) => {
  const messages = await Message.find({
    receiverId: req.user.userId,
    isDeleted: false,
  }).select("_id content createdAt");
  res.status(200).json({ message: "Messages", messages });
});

const deleteMessage = catchError(async (req, res, next) => {
  const specMessage = await Message.findById(req.params.id);

  if (!specMessage) return next(new AppError("Message not found", 404));

  if (specMessage.isDeleted == true)
    return next(new AppError("Message not found", 404));

  specMessage.isDeleted = true;
  await specMessage.save();
  res.status(200).json({ message: "Message deleted successfully" });
});

export { sendMessage, getMessages, deleteMessage };

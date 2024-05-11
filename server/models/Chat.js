import mongoose from "mongoose";
const ChatSchema = new mongoose.Schema(
    {
      text: {
        type: String,
        required: true,
      },
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
      roomId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Room'
       }
    },
)
  
  const Chat = mongoose.model("Chat", ChatSchema);

export default Chat;
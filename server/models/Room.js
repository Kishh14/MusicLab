import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  roomName: {
    type: String,
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  members: {
    type: [String],
    default: [],
  },
  isLocked: {
    type: Boolean,
    default: false,
  },
});

const Room = mongoose.model('Room', roomSchema);

export default Room;

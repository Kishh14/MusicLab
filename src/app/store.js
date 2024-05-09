import { configureStore } from "@reduxjs/toolkit";
import roomsReducer from "../features/room/roomSlice";

export const store = configureStore({
  reducer: {
    room: roomsReducer,
  },
});

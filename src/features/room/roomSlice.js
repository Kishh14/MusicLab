import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

/**
 * @type {{ rooms: import('../../types/user').RoomType[], isChatOpen: boolean, currentRoom: import('../../types/user').RoomType | null}}
 */

const initialState = {
  rooms: [],
  isChatOpen: false,
  currentRoom: null,
};

export const roomsSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    /**
     * @param {import("../../types/redux").PayloadRoomsAction} action
     */
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },

    /**
     * @param {import("../../types/redux").PayloadRoomAction} action
     */
    addRoom: (state, action) => {
      state.rooms.push(action.payload);
    },

    /**
     * @param {import("@reduxjs/toolkit").PayloadAction<string>} action
     */
    removeRoom: (state, action) => {
      state.rooms = state.rooms.filter((room) => room._id !== action.payload);
    },

    /**
     * @param {import("../../types/redux").PayloadRoomAction} action
     */
    updateRoom: (state, action) => {
      state.rooms = state.rooms.map((room) =>
        room._id === action.payload._id ? action.payload : room
      );
    },

    toggleChat: (state) => {
      state.isChatOpen = !state.isChatOpen;
    },

    /**
     * @param {import("@reduxjs/toolkit").PayloadAction<import("../../types/user").RoomType>} action
     */
    setCurrentRoom: (state, action) => {
      const prevRoom = state.currentRoom;

      if (prevRoom && action.payload && prevRoom._id !== action.payload._id) {
        try {
          axios.post(`/room/${prevRoom._id}/leave`);
        } catch (error) {
          toast.error(error.response.data.message);
          console.error("Error leaving room:", error);
        }
      }

      state.currentRoom = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addRoom,
  removeRoom,
  setCurrentRoom,
  setRooms,
  toggleChat,
  updateRoom,
} = roomsSlice.actions;

export default roomsSlice.reducer;

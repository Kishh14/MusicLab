import { createSlice } from "@reduxjs/toolkit";

/**
 * @type {{ rooms: import('../../types/user').RoomType[] }}
 */

const initialState = {
  rooms: [],
  isChatOpen: false,
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
  },
});

// Action creators are generated for each case reducer function
export const { addRoom, removeRoom, setRooms, toggleChat, updateRoom } =
  roomsSlice.actions;

export default roomsSlice.reducer;

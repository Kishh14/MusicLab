import { PayloadAction } from "@reduxjs/toolkit";
import { store } from "../app/store";
import { RoomType } from "./user";

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type PayloadRoomsAction = PayloadAction<RoomType[]>;
export type PayloadRoomAction = PayloadAction<RoomType>;

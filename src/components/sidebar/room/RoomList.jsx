import React, { useEffect } from "react";
import Room from "./Room";
import axios from "axios";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  addRoom,
  removeRoom,
  setRooms,
  updateRoom,
  setCurrentRoom,
} from "../../../features/room/roomSlice";

import { useSocket } from "../../../context/SocketContext";
import { useAuth } from "../../../context/AuthContext";
import Filters from "../Filters";
import Chat from "../Chat";

const RoomList = () => {
  const rooms = useAppSelector((state) => state.room.rooms);
  const isChatOpen = useAppSelector((state) => state.room.isChatOpen);

  const currentRoom = useAppSelector((state) => state.room.currentRoom);
  const dispatch = useAppDispatch();

  const { user } = useAuth();
  const { socket, isSocketConnected } = useSocket();

  React.useEffect(() => {
    axios
      .get("/room/all")
      .then((res) => {
        dispatch(setRooms(res.data));
        // get current room
        const currentRoom = res.data.find((room) =>
          room.members.find((member) => member._id === user.id)
        );

        if (currentRoom) {
          dispatch(setCurrentRoom(currentRoom));
        }
      })
      .catch(console.error);
  }, []);

  React.useEffect(() => {
    if (!socket) return;

    socket.on("room:new", (room) => {
      dispatch(addRoom(room));
    });

    socket.on("room:updated", (room) => {
      dispatch(updateRoom(room));
    });

    socket.on("room:delete", (roomId) => {
      dispatch(removeRoom(roomId));
    });

    return () => {
      socket.off("room:new");
      socket.off("room:updated");
      socket.off("room:delete");
    };
  }, [socket]);

  useEffect(() => {
    if (!currentRoom || !socket || !isSocketConnected) return;

    console.log(currentRoom);

    // Join the current room when socket is ready
    console.log(socket);

    const roomId = currentRoom._id;
    socket.emit("room:join", roomId);

    return () => {
      socket.emit("room:leave", roomId);
    };
  }, [socket, isSocketConnected, currentRoom]);

  return (
    <div
      id="container-main"
      className="h-screen px-5 py-8 border-l border-r sm:w-80 w-60 bg-gray-900 border-gray-700 relative scroll-smooth"
      style={{ overflow: "scroll" }}
    >
      <Filters />

      {isChatOpen && rooms.length > 0 ? (
        // FIXME: Assigned the first room id to the chat component temporarily
        <Chat roomId={rooms[0]._id} />
      ) : (
        rooms.map((room) => (
          <Room
            key={room._id}
            {...room}
            isAdmin={
              user.id == room.owner &&
              currentRoom &&
              currentRoom._id == room._id
            }
          />
        ))
      )}
    </div>
  );
};

export default RoomList;

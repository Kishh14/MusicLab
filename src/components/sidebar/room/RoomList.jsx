import React, { useEffect, useState } from "react";
import axios from "axios";

import Filters from "../Filters";
import Chat from "../Chat";

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
import NewRoomUI from "./NewRoomUI";

const RoomList = () => {
  const [filters, setFilters] = useState({
    isLocked: true,
    isUnlocked: true,
    search: "",
  });

  const rooms = useAppSelector((state) => state.room.rooms);
  const isChatOpen = useAppSelector((state) => state.room.isChatOpen);

  const currentRoom = useAppSelector((state) => state.room.currentRoom);
  const dispatch = useAppDispatch();

  const { user } = useAuth();
  const { socket, isSocketConnected } = useSocket();

  const filtersApplied = Object.values(filters).filter(Boolean).length;

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

    // Join the current room when socket is ready
    const roomId = currentRoom._id;
    socket.emit("room:join", roomId);

    return () => {
      socket.emit("room:leave", roomId);
    };
  }, [socket, isSocketConnected, currentRoom]);

  return (
    <div className="w-full border-x bg-gray-900 border-gray-700 flex flex-col h-screen overflow-hidden">
      <Filters
        filters={filters}
        setFilters={setFilters}
        filtersApplied={filtersApplied}
      />

      <div className="px-2 py-4 overflow-y-auto h-full">
        {isChatOpen && currentRoom ? (
          <Chat currentRoom={currentRoom} />
        ) : (
          <div className="space-y-3">
            {rooms.map((room) => {
              const showRoom =
                ((filters.isLocked && room.isLocked) ||
                  (filters.isUnlocked && !room.isLocked)) &&
                room.name.toLowerCase().includes(filters.search.toLowerCase());

              return (
                <NewRoomUI
                  key={room._id}
                  {...room}
                  isAdmin={user.id == room.owner}
                  className={!showRoom && "hidden"}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomList;

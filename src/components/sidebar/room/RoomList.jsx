import { useEffect, useState } from "react";
import Room from "./Room";
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

const RoomList = () => {
  const [filter, setFilter] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const rooms = useAppSelector((state) => state.room.rooms);
  const isChatOpen = useAppSelector((state) => state.room.isChatOpen);

  const currentRoom = useAppSelector((state) => state.room.currentRoom);
  const dispatch = useAppDispatch();

  const { user } = useAuth();
  const { socket, isSocketConnected } = useSocket();

  useEffect(() => {
    axios
      .get("/room/all")
      .then((res) => {
        dispatch(setRooms(res.data));
        const currentRoom = res.data.find((room) =>
          room.members.find((member) => member._id === user.id)
        );

        if (currentRoom) {
          dispatch(setCurrentRoom(currentRoom));
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
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

    const roomId = currentRoom._id;
    socket.emit("room:join", roomId);

    return () => {
      socket.emit("room:leave", roomId);
    };
  }, [socket, isSocketConnected, currentRoom]);

  const handleFilterSelect = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredRooms = rooms.filter((room) => {
    if (!searchQuery) {
      return filter ? (filter === "locked" ? room.isLocked : !room.isLocked) : true;
    } else {
      return room.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
  });

  return (
    <div
      id="container-main"
      className="h-screen px-5 py-8 border-l border-r w-full bg-gray-900 border-gray-700 relative scroll-smooth"
      style={{ overflow: "scroll" }}
    >
      <Filters onSelectFilter={handleFilterSelect} onSearch={handleSearch} />

      {isChatOpen && currentRoom ? (
        <Chat currentRoom={currentRoom} />
      ) : (
        filteredRooms.map((room) => (
          <Room key={room._id} {...room} isAdmin={user.id == room.owner} />
        ))
      )}
    </div>
  );
};

export default RoomList;

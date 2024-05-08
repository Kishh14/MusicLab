import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";

const RoomOthers = () => {
  const { user } = useAuth();

  /**
   * @type {[import("../../types/user").RoomType[], React.Dispatch<React.SetStateAction<import("../../types/user").RoomType[]>>]}
   */
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios
      .get("/room/all")
      .then((res) => setRooms(res.data))
      .catch(console.error);
  }, []);

  const handleJoinRoom = async (roomId) => {
    // try {
    //   await axios.post(`/room/${roomId}/join`, { username: user.username });
    //   // After joining, refresh the rooms list
    //   const response = await axios.get("/room/all");
    //   const filteredRooms = response.data.filter(
    //     (room) => room.ownerName !== user.username
    //   );
    //   setRooms(filteredRooms);
    // } catch (error) {
    //   console.error("Error joining room:", error);
    // }
  };

  function handleLeaveRoom(roomId) {
    //
  }

  return (
    <>
      <style hidden>
        {`/* Hide scrollbar */
          #memberContainer::-webkit-scrollbar {
              display: none;
          }`}
      </style>
      {rooms.map((room) => (
        <div
          key={room._id}
          className="mt-4 -mx-3 space-y-6 rounded-lg h-[172px] border-2 border-gray-600 relative"
        >
          <div className="flex mx-2 my-1 flex-row justify-between items-center gap-1 border rounded-md border-gray-600">
            <div className="py-1 px-2">
              <h4 className="font-semibold text-sm">{room.name}</h4>
            </div>
            <div className="p-2 mx-1">
              {/* Conditionally render join button */}
              {room.members.filter((m) => m.email == user.email).length == 0 ? (
                <button
                  className="bg-blue-800 px-4 py-1 rounded-md cursor-pointer"
                  onClick={() => handleJoinRoom(room._id)}
                >
                  Join
                </button>
              ) : (
                <button
                  className="bg-red-800 px-4 py-1 rounded-md cursor-pointer"
                  onClick={() => handleLeaveRoom(room._id)}
                >
                  Leave
                </button>
              )}
            </div>
          </div>

          <div
            id="memberContainer"
            className="flex space-x-6 py-2 px-3 cursor-pointer overflow-x-auto overflow-y-hidden"
            style={{
              scrollSnapType: "x mandatory",
              whiteSpace: "nowrap",
            }}
          >
            {room.members.map((member, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex flex-col items-center"
              >
                <img
                  src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg"
                  alt="Avatar"
                  className="w-12 h-12 rounded-full"
                />
                <p className="mt-1 text-sm font-semibold">{member.username}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default RoomOthers;

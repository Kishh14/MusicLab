import React, { useEffect, useState } from "react";
import Avatar from "../ui/Avatar";

import { useAuth } from "../../context/AuthContext";
import { IoLockClosedOutline } from "react-icons/io5";
import { useSocket } from "../../context/SocketContext";

const Room = () => {
  const { user } = useAuth();
  const { socket } = useSocket();

  const [room, setRoom] = useState({
    name: user.username + "'s Room",
    borderColor: "border-gray-600",
    isLocked: true,
  });

  const [members, setMembers] = useState([
    {
      // Add the user object to the members array
      ...user,
      isMicOn: false,
      profile_img:
        "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg",
    },
  ]);

  useEffect(() => {
    if (!socket) return;

    function handleNewUsers(user) {
      setMembers((prev) => [...prev, user]);
    }

    socket.on("user:new", handleNewUsers);

    document.onkeydown = (e) => {
      if (e.altKey && e.key === "j") {
        const code = prompt("Enter the room code:");
        socket.emit("room:join", code);
      }
    };

    return () => {
      socket.off("user:new", handleNewUsers);
    };
  }, [socket]);

  return (
    <div
      className={`mt-4 -mx-3 space-y-6 cursor cursor-pointer rounded-lg h-[172px] border-2 ${room.borderColor} relative`}
    >
      <div className="flex mx-2 my-1 flex-row justify-between items-center gap-1 border rounded-md border-gray-600">
        <div className="py-1 px-2">
          {/* room name */}
          <h4 className="font-semibold text-sm">{room.name}</h4>
        </div>
        <div className="p-2 mx-1 relative">
          {/* settings */}
          <div className="relative">
            <div className="flex flex-row items-center gap-2">
              {room.isLocked && <IoLockClosedOutline size={20} />}
              {/* <a className="cursor-pointer" onClick={toggleDropdown}>
                <IoSettingsOutline size={22} />
              </a> */}
            </div>
          </div>
        </div>
      </div>

      {/* Room members with avatar and their name in cards with horizontal scroll */}
      <div
        id="memberContainer"
        className="flex space-x-6 py-2 px-3 cursor-pointer scroll-smooth overflow-y-hidden overflow-x-auto"
        style={{
          scrollSnapType: "x mandatory",
          whiteSpace: "nowrap",
        }}
      >
        {/* member cards */}
        {members.map((member, index) => (
          <Avatar
            key={index}
            profile_img={member.profile_img}
            username={member.username}
          />
        ))}
      </div>
    </div>
  );
};

export default Room;

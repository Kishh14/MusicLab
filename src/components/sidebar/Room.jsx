import { useEffect, useState } from "react";
import Avatar from "../ui/Avatar";

import { useAuth } from "../../context/AuthContext";
import {
  IoLockClosedOutline,
  IoLockOpenOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { useSocket } from "../../context/SocketContext";

const Room = () => {
  const { user } = useAuth();
  const { socket } = useSocket();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isChangingRoomName, setIsChangingRoomName] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");

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
      user.profile_img =
        "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg";
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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleRoomNameButtonClick = () => {
    setIsChangingRoomName(true);
  };

  const handleSaveNewRoomName = () => {
    setRoom((prev) => ({ ...prev, name: newRoomName }));
    setIsChangingRoomName(false);
  };

  const handleToggleRoomLock = () => {
    setRoom((prev) => ({
      ...prev,
      isLocked: !prev.isLocked,
      borderColor: prev.isLocked ? "border-red-500" : "border-gray-600",
    }));
  };

  return (
    <div
      className={`mt-4 -mx-3 space-y-6 cursor cursor-pointer rounded-lg h-[172px] border-2 ${room.borderColor} relative`}
    >
      {/* hide scrollbar */}
      <style hidden>
        {`/* Hide scrollbar */
          #memberContainer::-webkit-scrollbar {
              display: none;
          }`}
      </style>
      <div className="flex mx-2 my-1 flex-row justify-between items-center gap-1 border rounded-md border-gray-600">
        <div className="py-1 px-2">
          {/* room name */}
          <h4 className="font-semibold text-sm">{room.name}</h4>
        </div>
        <div className="p-2 mx-1 relative">
          {/* settings */}
          <div className="relative">
            <div className="flex flex-row items-center gap-2">
              {room.isLocked && (
                <IoLockClosedOutline size={20} onClick={handleToggleRoomLock} />
              )}
              <a className="cursor-pointer" onClick={toggleDropdown}>
                <IoSettingsOutline size={22} />
              </a>
            </div>
            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div className="absolute top-full z-40 right-0 mt-2 w-48 bg-gray-900 border border-gray-500 rounded-md  ">
                <ul className="py-1 " aria-labelledby="user-menu-button">
                  <li>
                    <a
                      className="flex gap-4 px-5 py-2 text-sm hover:text-gray-900 hover:bg-gray-300 "
                      onClick={handleToggleRoomLock} //  onClick handler to toggle room lock
                    >
                      {room.isLocked ? "Room Locked" : "Room Unlocked"}
                      {room.isLocked ? (
                        <IoLockClosedOutline size={18} />
                      ) : (
                        <IoLockOpenOutline size={18} />
                      )}
                    </a>
                  </li>

                  {isChangingRoomName ? (
                    <li className="text-gray-200 text-sm px-3 py-2">
                      <label className="text-gray-200">New Room Name</label>
                      <div className="flex flex-row gap-2 ">
                        <input
                          type="text"
                          placeholder="Enter new room name"
                          value={newRoomName}
                          onChange={(e) => setNewRoomName(e.target.value)}
                          className="w-[98px] rounded-md px-4"
                        />
                        <button
                          className="bg-gray-300 px-3 h-8 text-gray-700 border rounded-md"
                          onClick={handleSaveNewRoomName}
                        >
                          Save
                        </button>
                      </div>
                    </li>
                  ) : (
                    <li>
                      <a
                        className="block px-4 py-2 text-sm hover:text-gray-900 hover:bg-gray-300"
                        onClick={handleRoomNameButtonClick}
                      >
                        Change Room name
                      </a>
                    </li>
                  )}
                  <li className="text-gray-200 text-sm px-3 py-2">
                    <label className="text-gray-200">Room limit</label>
                    <div className="flex flex-row gap-2 ">
                      <input
                        type="text"
                        placeholder="limit"
                        defaultValue={5}
                        className="w-[98px] rounded-md px-4"
                      />
                      <button className="bg-gray-300 px-3 h-8 text-gray-700 border rounded-md">
                        Save
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            )}
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
            isMicOn={member.isMicOn}
          />
        ))}
      </div>
    </div>
  );
};

export default Room;

import React from "react";
import Avatar from "../../ui/Avatar";

import {
  IoLockClosedOutline,
  IoLockOpenOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "../../../context/AuthContext";
import { useAppDispatch } from "../../../app/hooks";
import { setCurrentRoom } from "../../../features/room/roomSlice";

/**
 * @type {React.FC<import("../../../types/user").RoomType & { isAdmin: boolean }>}
 */

const Room = (room) => {
  const { user } = useAuth();

  const dispatch = useAppDispatch();

  // FIXME: This is a temporary fix to prevent the app from crashing
  const isChangingRoomName = false;
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  async function handleJoinRoom(roomId) {
    try {
      const response = await axios.post(`/room/${roomId}/join`);
      dispatch(setCurrentRoom(response.data));
    } catch (error) {
      console.error("Error joining room:", error);
    }
  }

  async function handleLeaveRoom(roomId) {
    try {
      await axios.post(`/room/${roomId}/leave`);
      dispatch(setCurrentRoom(null));
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error leaving room:", error);
    }
  }

  const handleToggleRoomLock = () => {
    // TODO: Send fetch request to toggle room lock
  };

  return (
    <div
      className={`mt-4 space-y-6 cursor cursor-pointer rounded-lg h-[172px] border-2 ${
        room.isLocked ? "border-red-500" : "border-gray-700"
      } relative`}
    >
      <style
        hidden
      >{`#memberContainer::-webkit-scrollbar {display: none;}`}</style>
      <div className="flex mx-2 my-1 flex-row justify-between items-center gap-1 border rounded-md border-gray-600">
        <div className="py-1 px-2">
          <h4 className="font-semibold text-sm">{room.name}</h4>
        </div>
        <div className="p-2 mx-1 relative">
          <div className="relative">
            <div className="flex item-center gap-2">
              {/* allow user to lock  */}
              {room.isLocked && (
                <button onClick={room.isLocked ? handleToggleRoomLock : null}>
                  <IoLockClosedOutline size={20} />
                </button>
              )}
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

              {room.isAdmin && (
                <>
                  <button
                    className="cursor-pointer"
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                  >
                    <IoSettingsOutline size={22} />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute top-full z-40 right-0 mt-2 w-48 bg-gray-900 border border-gray-500 rounded-md">
                      <ul className="py-1">
                        <li>
                          <a
                            className="flex gap-4 px-5 py-2 text-sm hover:text-gray-900 hover:bg-gray-300 "
                            onClick={handleToggleRoomLock}
                          >
                            {room.isLocked ? "Room locked" : "Room Unlocked"}
                            {room.isLocked ? (
                              <IoLockClosedOutline size={18} />
                            ) : (
                              <IoLockOpenOutline size={18} />
                            )}
                          </a>
                        </li>
                        {isChangingRoomName ? (
                          <li className="text-gray-200 text-sm px-3 py-2">
                            <label className="text-gray-200">
                              New Room Name
                            </label>
                            <div className="flex flex-row gap-2">
                              <input
                                type="text"
                                placeholder="Enter new room name"
                                // value={newRoomName}
                                // onChange={(e) => setNewRoomName(e.target.value)}
                                className="w-[98px] rounded-md px-4"
                              />
                              <button
                                className="bg-gray-300 px-3 h-8 text-gray-700 border rounded-md"
                                // onClick={handleSaveNewRoomName}
                              >
                                Save
                              </button>
                            </div>
                          </li>
                        ) : (
                          <li>
                            <a
                              className="block px-4 py-2 text-sm hover:text-gray-900 hover:bg-gray-300"
                              // onClick={handleRoomNameButtonClick}
                            >
                              Change Room name
                            </a>
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        id="memberContainer"
        className="flex space-x-6 py-2 px-3 cursor-pointer scroll-smooth overflow-y-hidden overflow-x-auto"
        style={{ scrollSnapType: "x mandatory", whiteSpace: "nowrap" }}
      >
        {room.members.map((member, index) => (
          <Avatar
            key={index}
            // FIXME: Added hardcoded profile image
            userId={member._id}
            username={member.username}
            isMicOn={member.isMicOn}
          />
        ))}
      </div>
    </div>
  );
};

export default Room;

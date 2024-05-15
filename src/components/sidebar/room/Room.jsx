import React, { useMemo } from "react";
import Avatar from "../../ui/Avatar";
import axios from "axios";

import {
  IoLockClosedOutline,
  IoLockOpenOutline,
  IoSettingsOutline,
} from "react-icons/io5";

import { toast } from "sonner";
import { useAuth } from "../../../context/AuthContext";
import { useAppDispatch } from "../../../app/hooks";
import { setCurrentRoom } from "../../../features/room/roomSlice";
import { InviteLinkModel } from "../../InviteLinkModel";
import { LuPen } from "react-icons/lu";

/**
 * @type {React.FC<import("../../../types/user").RoomType & { isAdmin: boolean, className: string }>}
 */

const Room = ({ className, ...room }) => {
  const { user } = useAuth();

  const dispatch = useAppDispatch();

  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [newRoomName, setNewRoomName] = React.useState("");
  const [isChangingRoomName, setIsChangingRoomName] = React.useState(false);

  const isPersonInRoom = useMemo(() => {
    return Boolean(room.members.find((member) => member._id === user.id));
  }, [room, user]);

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
    if (!room.isAdmin) return;
    axios
      .put(`/room/${room._id}`, { isLocked: !room.isLocked })
      .then((res) => dispatch(setCurrentRoom(res.data)))
      .catch((error) => console.error("Error toggling room lock:", error));
  };

  const handleRoomNameButtonClick = () => {
    setIsChangingRoomName(true);
    setNewRoomName(room.name);
  };

  const handleSaveNewRoomName = () => {
    axios
      .put(`/room/${room._id}`, { name: newRoomName })
      .then((res) => {
        dispatch(setCurrentRoom(res.data));
        setIsChangingRoomName(false);
      })
      .catch((error) => {
        console.error("Error changing room name:", error);
      });
  };

  return (
    <div
      className={`mt-4 space-y-6 cursor cursor-pointer rounded-lg h-[172px] border-2 ${className} ${
        room.isLocked ? "border-red-500" : "border-gray-700"
      } relative`}
    >
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
              {!isPersonInRoom && (!room.isLocked || room.isAdmin) && (
                <button
                  className="bg-blue-800 px-4 py-1 rounded-md cursor-pointer"
                  onClick={() => handleJoinRoom(room._id)}
                >
                  Join
                </button>
              )}

              {isPersonInRoom && (
                <button
                  className="bg-red-800 px-4 py-1 rounded-md cursor-pointer"
                  onClick={() => handleLeaveRoom(room._id)}
                >
                  Leave
                </button>
              )}

              {room.isAdmin && isPersonInRoom && (
                <>
                  <button
                    className="cursor-pointer"
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                  >
                    <IoSettingsOutline size={22} />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute top-full z-40 right-0 mt-2 w-52 bg-gray-900 border border-gray-500 rounded-md">
                      <ul className="py-1">
                        <li>
                          <button
                            className="flex gap-2 px-5 py-2 w-full text-sm hover:text-gray-900 hover:bg-gray-300"
                            onClick={handleToggleRoomLock}
                          >
                            {room.isLocked ? (
                              <IoLockClosedOutline className="my-auto" />
                            ) : (
                              <IoLockOpenOutline className="my-auto" />
                            )}
                            {room.isLocked ? "Room locked" : "Room Unlocked"}
                          </button>
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
                                value={newRoomName}
                                onChange={(e) => setNewRoomName(e.target.value)}
                                className="w-full rounded-md px-4"
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
                            <button
                              className="flex gap-2 px-5 py-2 w-full text-sm hover:text-gray-900 hover:bg-gray-300"
                              onClick={handleRoomNameButtonClick}
                            >
                              <LuPen className="my-auto" />
                              Change Room name
                            </button>
                          </li>
                        )}
                        <li>
                          {/* Invite Link Button */}
                          <InviteLinkModel />
                        </li>
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
        className="flex py-2 px-3 cursor-pointer scroll-smooth overflow-y-hidden overflow-x-auto"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {room.members.map((member, index) => (
          <Avatar
            key={index}
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

import React, { useMemo, useState } from "react";
import Avatar from "../../ui/Avatar";
import { IoLockClosedOutline, IoLockOpenOutline, IoSettingsOutline } from "react-icons/io5";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "../../../context/AuthContext";
import { useAppDispatch } from "../../../app/hooks";
import { setCurrentRoom } from "../../../features/room/roomSlice";

const Room = ({ _id, name, members, isLocked, isAdmin }) => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");
  const [isChangingRoomName, setIsChangingRoomName] = useState(false);

  const isPersonInRoom = useMemo(() => {
    return Boolean(members.find((member) => member._id === user.id));
  }, [members, user]);

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
    if (!isAdmin) return;
    axios
      .put(`/room/${_id}`, { isLocked: !isLocked })
      .then((res) => {
        dispatch(setCurrentRoom(res.data));
      })
      .catch((error) => {
        console.error("Error toggling room lock:", error);
      });
  };

  const handleRoomNameButtonClick = () => {
    setIsChangingRoomName(true);
    setNewRoomName(name);
  };

  const handleSaveNewRoomName = () => {
    axios
      .put(`/room/${_id}`, { name: newRoomName })
      .then((res) => {
        dispatch(setCurrentRoom(res.data));
        setIsChangingRoomName(false);
      })
      .catch((error) => {
        console.error("Error changing room name:", error);
      });
  };

  return (
    <div className={`mt-4 space-y-6 cursor cursor-pointer rounded-lg h-[172px] border-2 ${isLocked ? "border-red-500" : "border-gray-700"
      } relative`}>
      <div className="flex mx-2 my-1 flex-row justify-between items-center gap-1 border rounded-md border-gray-600">
        <div className="py-1 px-2">
          <h4 className="font-semibold text-sm">{name}</h4>
        </div>
        <div className="p-2 mx-1 relative">
          <div className="relative">
            <div className="flex item-center gap-2">
              {isLocked && (
                <button onClick={isLocked ? handleToggleRoomLock : null}>
                  <IoLockClosedOutline size={20} />
                </button>
              )}
              {!isPersonInRoom && (!isLocked || isAdmin) && (
                <button
                  className="bg-blue-800 px-4 py-1 rounded-md cursor-pointer"
                  onClick={() => handleJoinRoom(_id)}
                >
                  Join
                </button>
              )}
              {isPersonInRoom && (
                <button
                  className="bg-red-800 px-4 py-1 rounded-md cursor-pointer"
                  onClick={() => handleLeaveRoom(_id)}
                >
                  Leave
                </button>
              )}
              {isAdmin && isPersonInRoom && (
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
                          <button
                            className="flex gap-4 px-5 py-2 w-full text-sm hover:text-gray-900 hover:bg-gray-300 "
                            onClick={handleToggleRoomLock}
                          >
                            {isLocked ? "Room locked" : "Room Unlocked"}
                            {isLocked ? (
                              <IoLockClosedOutline size={18} />
                            ) : (
                              <IoLockOpenOutline size={18} />
                            )}
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
        {members.map((member, index) => (
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

import axios from "axios";
import React, { useEffect, useMemo } from "react";

import { useAuth } from "../../../context/AuthContext";
import { useAppDispatch } from "../../../app/hooks";
import { setCurrentRoom } from "../../../features/room/roomSlice";
import { InitialTour } from "../../Tours";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { LuLock, LuLogOut, LuPen, LuUnlock } from "react-icons/lu";

import { IoSettingsOutline } from "react-icons/io5";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { InviteLinkModel } from "../../InviteLinkModel";
import { useSocket } from "../../../context/SocketContext";

import Avatar from "../../ui/Avatar";

/**
 * @type {React.FC<import("../../../types/user").RoomType & { isAdmin: boolean, className: string }>}
 */

const NewRoomUI = ({ className, ...room }) => {
  const { user } = useAuth();
  const { socket } = useSocket();

  const dispatch = useAppDispatch();

  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [newRoomName, setNewRoomName] = React.useState("");
  const [isChangingRoomName, setIsChangingRoomName] = React.useState(false);
  const [isInviteLinkOpen, setIsInviteLinkOpen] = React.useState(false);

  const [mics, setMics] = React.useState({});

  const isPersonInRoom = useMemo(() => {
    return Boolean(room.members.find((member) => member._id === user.id));
  }, [room, user]);

  useEffect(() => {
    if (!socket || !isPersonInRoom) return;

    function handleMic(userId, isMicOn) {
      setMics((prev) => ({ ...prev, [userId]: isMicOn }));
    }

    socket.on("user:mic", handleMic);

    return () => {
      socket.off("user:mic", handleMic);
    };
  }, [socket, isPersonInRoom]);

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
      className={`border-2 rounded-lg border-gray-700 relative ${className} ${
        room.isLocked ? "border-red-500" : "border-gray-700"
      } ${isPersonInRoom ? "bg-gray-800" : "bg-gray-900"}`}
    >
      {/* Card Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-800">
        <div>
          <h4 className="font-semibold text-sm">{room.name}</h4>
        </div>

        <div className="flex gap-1">
          {/* Lock Icon  */}
          {room.isLocked && (
            <Button
              size="sm"
              variant="outline"
              className="px-2 bg-transparent"
              onClick={handleToggleRoomLock}
            >
              <LuLock size={14} />
            </Button>
          )}

          {/* Join button */}
          {!isPersonInRoom && (!room.isLocked || room.isAdmin) && (
            <Button
              size="sm"
              className="bg-blue-800 hover:bg-blue-700 text-white"
              onClick={() => handleJoinRoom(room._id)}
            >
              Join
            </Button>
          )}

          {/* Leave button */}
          {isPersonInRoom && !room.isAdmin && (
            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleLeaveRoom(room._id)}
            >
              Leave
            </Button>
          )}

          {/* Settings button */}
          {room.isAdmin && isPersonInRoom && (
            <DropdownMenu
              open={isDropdownOpen}
              onOpenChange={(isOpen) => {
                setIsDropdownOpen(
                  isOpen || isChangingRoomName || isInviteLinkOpen
                );
              }}
            >
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className="px-2 bg-transparent"
                >
                  <IoSettingsOutline size={18} id="invite-button" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuLabel className="flex items-center">
                  <span>Room Settings</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={handleToggleRoomLock}>
                  {room.isLocked ? (
                    <LuLock className="mr-2 h-4 w-4" />
                  ) : (
                    <LuUnlock className="mr-2 h-4 w-4" />
                  )}
                  <span>{room.isLocked ? "Room locked" : "Room Unlocked"}</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => setIsInviteLinkOpen(!isInviteLinkOpen)}
                >
                  <InviteLinkModel
                    isOpen={isInviteLinkOpen}
                    setIsInviteLinkOpen={setIsInviteLinkOpen}
                  />
                </DropdownMenuItem>

                <Dialog
                  open={isChangingRoomName}
                  onOpenChange={(open) => {
                    if (!open) setNewRoomName(room.name);
                    setIsChangingRoomName(open);
                  }}
                >
                  <DialogTrigger asChild>
                    <DropdownMenuItem
                      onClick={() => {
                        setIsChangingRoomName(true);
                        setNewRoomName(room.name);
                      }}
                    >
                      <LuPen className="mr-2 h-4 w-4" />
                      <span>Edit Room Name</span>
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Room Name</DialogTitle>
                    </DialogHeader>
                    <div>
                      <div className="flex flex-col gap-3">
                        <Input
                          id="name"
                          value={newRoomName}
                          onChange={(e) => setNewRoomName(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" onClick={handleSaveNewRoomName}>
                        Save changes
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="!text-red-600 hover:!bg-red-600/25"
                  onClick={() => handleLeaveRoom(room._id)}
                >
                  <LuLogOut className="mr-2 h-4 w-4" />
                  <span>Leave Room</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      <div className="px-3 py-4 space-x-1 flex overflow-x-auto">
        {room.members.map((member, index) => (
          <Avatar
            key={index}
            userId={member._id}
            username={member.username}
            isMicOn={mics[member._id] ?? false}
          />
        ))}
      </div>
    </div>
  );
};

export default NewRoomUI;

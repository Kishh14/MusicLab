import axios from "axios";

import avatar from "../../assets/avatar.jpg";
import RoomList from "./room/RoomList";

import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import { TbMicrophone, TbMicrophoneOff } from "react-icons/tb";
import { BsChatLeftText } from "react-icons/bs";
import { IoExitOutline } from "react-icons/io5";
import { TfiHelpAlt } from "react-icons/tfi";

import { useSocket } from "../../context/SocketContext";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setCurrentRoom, toggleChat } from "../../features/room/roomSlice";
import { useAuth } from "../../context/AuthContext";
import { InitialTour } from "../Tours";
import { generateMinidenticonImg } from "../ui/MinidenticonImg";

export default function SideBar() {
  const { socket } = useSocket();
  const { user } = useAuth();

  const [isMicOn, setIsMice] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Check if user has already created a room
  const isRoomCreated = useAppSelector(
    (state) =>
      state.room.rooms.filter((room) => room.owner === user?.id).length > 0
  );
  const dispatch = useAppDispatch();

  const mediaRecorderRef = useRef(null);
  const isMicOnRef = useRef(false);

  const startVoiceChat = () => {
    let handleData, handleStop;
    isMicOnRef.current = true;

    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then((stream) => {
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.start();

        let audioChunks = [];

        handleData = function (event) {
          audioChunks.push(event.data);
        };

        handleStop = function () {
          const audioBlob = new Blob(audioChunks);
          audioChunks = [];
          const reader = new FileReader();
          reader.onloadend = () => {
            const arrayBuffer = reader.result;
            socket.emit("audioStream", arrayBuffer);
          };
          reader.readAsArrayBuffer(audioBlob);

          console.log("voice chat inprogress...");

          mediaRecorderRef.current.start();
          if (isMicOnRef.current) {
            setTimeout(function () {
              mediaRecorderRef.current.stop();
            }, 1000);
          }
        };

        mediaRecorderRef.current.addEventListener("dataavailable", handleData);
        mediaRecorderRef.current.addEventListener("stop", handleStop);

        setTimeout(function () {
          mediaRecorderRef.current.stop();
        }, 1000);
      });
  };

  const stopVoiceChat = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      isMicOnRef.current = false;
    }
  };

  const toggleMic = () => {
    if (isMicOnRef.current) {
      setIsMice(false);
      stopVoiceChat();
      socket.emit("room:mic", false);
    } else {
      setIsMice(true);
      startVoiceChat();
      socket.emit("room:mic", true);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleChatHandler = () => {
    dispatch(toggleChat());
  };

  const toggleAdd = async () => {
    const roomName = prompt("Enter Room Name");
    if (!isRoomCreated && roomName) {
      axios
        .post("/room/create", { roomName })
        .then((res) => {
          dispatch(setCurrentRoom(res.data));
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to create room");
        });
    }
  };

  return (
    <>
      <aside className="flex sidebar">
        <div className="flex flex-col items-center w-16 h-screen py-8 bg-white dark:bg-gray-900 dark:border-gray-300 relative shrink-0">
          <nav className="flex flex-col items-center flex-1 space-y-6 ">
            {/* avatar */}
            <div className="relative mt-3" title="Profile">
              <Link to="/">
                <img
                  className="object-cover w-10 h-10 rounded-full ring ring-gray-300 dark:ring-gray-600 bg-white"
                  src={generateMinidenticonImg(user?.id)}
                  alt="User"
                />
                {/* onlinedot */}
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 absolute right-0 ring-1 ring-white -bottom-0.5" />
              </Link>
            </div>

            {/* Conditionally render create room button */}
            {!isRoomCreated && (
              <div
                className="flex items-center px-3 py-3 cursor-pointer text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                onClick={() => {
                  toggleAdd();
                }}
                title="Create Room"
                id="add-room-button"
              >
                <IoAddSharp size={26} id='add-room-button' />
              </div>
            )}

            {/* microphone icons */}
            <button
              className={
                "flex items-center px-3 py-3  text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 " +
                (isMicOn && "bg-gray-800")
              }
              onClick={() => {
                toggleMic();
              }}
              title={isMicOn ? "Turn Microphone Off" : "Turn Microphone On"}
            >
              {isMicOn ? (
                <TbMicrophone className="text-red-600" size={26} />
              ) : (
                <TbMicrophoneOff size={26} id="mic-button" />
              )}
            </button>

            {/* Chat icon */}
            <div
              className="flex items-center px-3 py-3 cursor-pointer text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
              onClick={toggleChatHandler}
              title="Chat"
            >
              <BsChatLeftText size={26} id='chat-button' />
            </div>
          </nav>

          {/* Exit icon */}
          <div className="flex flex-col gap-4 items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {/* Help Button */}
            <button
              type="button"
              className="text-sm"
              onClick={() => {
                InitialTour().drive();
              }}
              title="logout"
            >
              <TfiHelpAlt size={22} />
            </button>

            <button
              type="button"
              className="text-sm"
              onClick={toggleDropdown}
              title="logout"
            >
              <IoExitOutline size={28} />
            </button>
            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div className="absolute left-14 z-50 bg-gray-900 shadow-md border  rounded-md">
                <div className="py-3">
                  <Link
                    to={"/"}
                    className="text-sm px-4 cursor-pointer text-white font-bold "
                  >
                    Home
                  </Link>
                  <hr className="my-1" />
                  <Link
                    to={"/logout"}
                    className="text-sm px-4 cursor-pointer text-white font-bold "
                  >
                    Logout
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
        <RoomList />
      </aside>
    </>
  );
}

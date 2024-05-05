import RoomsList from "./RoomsList";
import avatar from "../../assets/avatar.jpg";
import { IoAddSharp } from "react-icons/io5";
import { useRef, useState } from "react";
import { TbMicrophone, TbMicrophoneOff } from "react-icons/tb";
import { BsChatLeftText } from "react-icons/bs";
import { IoExitOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSocket } from "../../context/SocketContext";

export default function SideBar() {
  const [isMicOn, setIsMice] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isRoomCreated, setIsRoomCreated] = useState(false);


  /**
   * @type {React.MutableRefObject<MediaRecorder>}
   */
  const mediaRecorderRef = useRef(null);

  /**
   * @type {React.MutableRefObject<boolean>}
   */
  const isMicOnRef = useRef(false);

  const { socket } = useSocket();

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
          const fileReader = new FileReader();
          fileReader.readAsDataURL(audioBlob);
          fileReader.onloadend = function () {
            const base64String = fileReader.result;
            socket.emit("audioStream", base64String);
          };

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
    } else {
      setIsMice(true);
      startVoiceChat();
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const toggleAdd = () => { // add room prompt
    prompt("Enter Room Name")
    setIsRoomCreated(!isRoomCreated)
  }
  return (
    <>
      <aside className="flex ">
        <div className="flex flex-col items-center w-16 h-screen py-8 bg-white dark:bg-gray-900 dark:border-gray-300 relative">
          <nav className="flex flex-col items-center flex-1 space-y-6 ">
            {/* avatar */}
            <div className="relative mt-3" title="Profile">
              <a href="/">
                <img
                  className="object-cover w-10 h-10 rounded-full ring ring-gray-300 dark:ring-gray-600"
                  src={avatar}
                  alt="User"
                />
                {/* onlinedot */}
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 absolute right-0 ring-1 ring-white -bottom-0.5" />
              </a>
            </div>

            {/* create room  button*/}
            <div
              className="flex items-center px-3 py-3 cursor-pointer text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
              onClick={toggleAdd}
              title="Create Room"
            >
              <IoAddSharp size={26} />
            </div>

            {/* microphone icons */}
            <button
              className={
                "flex items-center px-3 py-3  text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 " +
                (isMicOn && "bg-gray-800")
              }
              onClick={toggleMic}
              title={isMicOn ? "Turn Microphone Off" : "Turn Microphone On"}
            >
              {isMicOn ? (
                <TbMicrophone className="text-red-600" size={26} />
              ) : (
                <TbMicrophoneOff size={26} />
              )}
            </button>

            {/* Chat icon */}
            <div
              className="flex items-center px-3 py-3 cursor-pointer text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
              onClick={toggleChat}
              title="Chat"
            >
              <BsChatLeftText size={26} />
            </div>

          </nav>
          <nav></nav>

          {/* Exit icon */}
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button type="button" className="text-sm" onClick={toggleDropdown} title="logout">
              <IoExitOutline size={28} />
            </button>
            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div className="absolute left-14 z-50 bg-gray-900 shadow-md border  rounded-md">
                <div className="px-4 py-3">
                  <Link
                    to={"/logout"}
                    className="text-sm cursor-pointer text-white font-bold "
                  >
                    Logout
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* rooms */}
        <RoomsList isChatOpen={isChatOpen} isRoomCreated={isRoomCreated} />
      </aside>
    </>
  );
}

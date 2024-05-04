import RoomsList from "./RoomsList";
import avatar from '../../assets/avatar.jpg'
import { GrMicrophone } from "react-icons/gr";
import { useState } from "react";
import { TbMicrophoneOff } from "react-icons/tb";
import { BsChatLeftText } from "react-icons/bs";
import { IoExitOutline } from "react-icons/io5";

export default function SideBar() {
    const [ismice, setIsMice] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);

    const toggleMice = () => {
        setIsMice(!ismice);
    }

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen)
    }
    return (
        <>
            <aside className="flex ">
                <div className="flex flex-col items-center w-16 h-screen py-8 bg-white dark:bg-gray-900 dark:border-gray-300 relative">
                    <nav className="flex flex-col items-center flex-1 space-y-6 ">

                        {/* avatar */}
                        <div className="relative mt-3">
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

                        {/* microphone icons */}
                        <a
                            className="flex items-center px-3 py-3  text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                            href="#"
                            onClick={toggleMice}
                        >
                            {ismice ? <GrMicrophone size={26} /> : <TbMicrophoneOff size={26} />}
                        </a>

                        {/* Chat icon */}
                        <div
                            className="flex items-center px-3 py-3 cursor-pointer text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                            onClick={toggleChat}
                        >
                            <BsChatLeftText size={26} />
                        </div>
                    </nav>

                    {/* Exit icon */}
                    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <button
                            type="button"
                            className="text-sm"
                            onClick={toggleDropdown}
                        >
                            <IoExitOutline size={28} />
                        </button>
                        {/* Dropdown menu */}
                        {isDropdownOpen && (
                            <div
                                className="absolute left-14 z-50 bg-gray-900 shadow-md border  rounded-md"
                            >
                                <div className="px-4 py-3">
                                    <a className="text-sm cursor-pointer text-white font-bold ">
                                        Logout
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>

                </div>

                {/* rooms */}
                <RoomsList isChatOpen={isChatOpen} />
            </aside>
        </>
    )
}

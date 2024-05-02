import RoomsList from "./RoomsList";
import avatar from '../../assets/avatar.jpg'
import { GrMicrophone } from "react-icons/gr";
import { useState } from "react";
import { TbMicrophoneOff } from "react-icons/tb";
import { BsChatLeftText } from "react-icons/bs";
export default function SideBar() {
    const [ismice, setIsMice] = useState(false)

    const toggleMice = () => {
        setIsMice(!ismice)
    }
    return (
        <>
            <aside className="flex">
                <div className="flex flex-col items-center w-16 h-screen py-8 bg-white dark:bg-gray-900 dark:border-gray-300">
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
                            href="#" onClick={toggleMice}
                        >
                            {ismice ? <GrMicrophone size={26} /> : <TbMicrophoneOff size={26} />}


                        </a>

                        {/* Chat icon */}
                        <a
                            className="flex items-center px-3 py-3  text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                            href="#"
                        >
                            {/* <svg xmlns="http://www.w3.org/2000/svg"
                                width="28" height="28" viewBox="0 0 24 24"
                                fill="none" stroke="#dfdfdf"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> */}
                            <BsChatLeftText size={26} />

                        </a>

                    </nav>
                </div>

                {/* rooms */}
                <RoomsList />
            </aside>
        </>
    )
}

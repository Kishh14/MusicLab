import { useState } from 'react';
import { IoSettingsOutline } from 'react-icons/io5';
import memberData from '../../data.json';
import { IoLockOpenOutline, IoLockClosedOutline } from "react-icons/io5";

export default function RoomMembers() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [roomLimit, setRoomLimit] = useState('');
    const [roomName, setRoomName] = useState("Rahul");
    const [isChangingRoomName, setIsChangingRoomName] = useState(false);
    const [newRoomName, setNewRoomName] = useState('');
    const [isRoomLocked, setIsRoomLocked] = useState(false); // State to manage room lock status

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleRoomLimitChange = (event) => {
        setRoomLimit(event.target.value);
    };

    const handleSaveRoomLimit = () => {
        // Here you can add logic to save the room limit, for example, sending it to a server
        console.log('Room limit saved:', roomLimit);
        setIsDropdownOpen(false); // Close the dropdown after saving
    };


    const handleRoomNameButtonClick = () => {
        setIsChangingRoomName(true);
    };

    const handleSaveNewRoomName = () => {
        setRoomName(newRoomName);
        setIsChangingRoomName(false);
    };

    const handleToggleRoomLock = () => {
        setIsRoomLocked(!isRoomLocked); // Toggle room lock status
    };

    return (
        <>
            {/* hide scrollbar */}
            <style>
                {`
                    /* Hide scrollbar */
                    #memberContainer::-webkit-scrollbar {
                        display: none;
                    }

                    /* Apply smooth scroll */
                    #memberContainer {
                        scroll-behavior: smooth;
                    }
                `}
            </style>

            {/* Room */}
            <div className="mt-4 -mx-3 space-y-6 cursor cursor-pointer rounded-lg h-[172px] border-2 border-gray-600 relative">
                <div className="flex mx-2 my-1 flex-row justify-between items-center gap-1 border rounded-md border-gray-600">
                    <div className="py-1 px-2">
                        {/* room name */}
                        <h4 className="font-semibold text-sm">
                            {roomName}'s Room
                        </h4>
                    </div>
                    <div className="p-2 mx-1 relative">
                        {/* settings */}
                        <div className="relative">
                            <div className="flex flex-row">
                                <a className="cursor-pointer" onClick={toggleDropdown}>
                                    <IoSettingsOutline size={22} />
                                </a>
                                {isRoomLocked && <IoLockClosedOutline size={14} />}

                            </div>
                            {/* Dropdown menu */}
                            {isDropdownOpen && (
                                <div className="absolute top-full z-40 right-0 mt-2 w-48 bg-gray-900 border border-gray-500 rounded-md  ">
                                    <ul className="py-1 " aria-labelledby="user-menu-button">
                                        <li >
                                            <a
                                                className="flex gap-4 px-5 py-2 text-sm hover:text-gray-900 hover:bg-gray-300 "
                                                onClick={handleToggleRoomLock} //  onClick handler to toggle room lock
                                            >
                                                {isRoomLocked ? "Room locked" : "Room unlocked"}
                                                {isRoomLocked ? <IoLockClosedOutline size={18} /> : <IoLockOpenOutline size={18} />}
                                            </a>
                                        </li>

                                        {isChangingRoomName ? (
                                            <li className='text-gray-200 text-sm px-3 py-2'>
                                                <label className='text-gray-200'>New Room Name</label>
                                                <div className='flex flex-row gap-2 '>
                                                    <input
                                                        type='text'
                                                        placeholder="Enter new room name"
                                                        value={newRoomName}
                                                        onChange={(e) => setNewRoomName(e.target.value)}
                                                        className='w-[98px] rounded-md px-4'
                                                    />
                                                    <button
                                                        className='bg-gray-300 px-3 h-8 text-gray-700 border rounded-md'
                                                        onClick={handleSaveNewRoomName}
                                                    >
                                                        Save
                                                    </button>
                                                </div>
                                            </li>
                                        ) : <li>
                                            <a
                                                className="block px-4 py-2 text-sm hover:text-gray-900 hover:bg-gray-300"
                                                onClick={handleRoomNameButtonClick}
                                            >
                                                Change Room name
                                            </a>
                                        </li>}
                                        <li className='text-gray-200 text-sm px-3 py-2'>
                                            <label className='text-gray-200'>Room limit</label>
                                            <div className='flex flex-row gap-2 '>
                                                <input
                                                    type='text'
                                                    placeholder="limit"
                                                    value={roomLimit}
                                                    onChange={handleRoomLimitChange}
                                                    className='w-[98px] rounded-md px-4'
                                                />
                                                <button
                                                    className='bg-gray-300 px-3 h-8 text-gray-700 border rounded-md'
                                                    onClick={handleSaveRoomLimit}
                                                >
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
                <div id="memberContainer" className="flex space-x-6 py-2 px-3 cursor-pointer" style={{ scrollSnapType: 'x mandatory', overflowX: 'scroll', overflowY: 'hidden', whiteSpace: 'nowrap' }}>
                    {/* member cards */}
                    {memberData.map((member, index) => (
                        <div key={index} className="flex-shrink-0 flex flex-col items-center ">
                            <img src={member.imgUrl} alt="Avatar" className="w-12 h-12 rounded-full" />
                            <p className="mt-1 text-sm font-semibold">{member.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

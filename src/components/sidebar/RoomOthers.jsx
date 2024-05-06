import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const RoomOthers = () => {
    const { user } = useAuth();
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get('/auth/rooms');
                setRooms(response.data);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };
        fetchRooms();
    }, []);
    const handleJoinRoom = async (roomId) => {
        try {
            await axios.post(`/auth/rooms/${roomId}/join`, { username: user.username });
            window.location.reload(); // Reload the page to reflect the updated room data
        } catch (error) {
            console.error('Error joining room:', error);
        }
    };


    return (
        <>
            {rooms.map((room) => (
                <div key={room._id} className="mt-4 -mx-3 space-y-6 rounded-lg h-[172px] border-2 border-gray-600 relative">
                    <style hidden>
                        {`/* Hide scrollbar */
              #memberContainer::-webkit-scrollbar {
                  display: none;
              }`}
                    </style>
                    <div className="flex mx-2 my-1 flex-row justify-between items-center gap-1 border rounded-md border-gray-600">
                        <div className="py-1 px-2">
                            <h4 className="font-semibold text-sm">{room.roomName}</h4>
                            {/* <p>Owner: {room.ownerName}</p> */}
                        </div>
                        <div className="p-2 mx-1">
                            <button
                                className="bg-blue-800 px-4 py-1 rounded-md cursor-pointer"
                                onClick={() => handleJoinRoom(room._id)}
                            >
                                Join
                            </button>
                        </div>
                    </div>

                    <div
                        id="memberContainer"
                        className="flex space-x-6 py-2 px-3 cursor-pointer"
                        style={{
                            scrollSnapType: 'x mandatory',
                            overflowX: 'scroll',
                            overflowY: 'hidden',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {room.members.map((member, index) => (
                            <div key={index} className="flex-shrink-0 flex flex-col items-center">
                                <img
                                    src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg"
                                    alt="Avatar"
                                    className="w-12 h-12 rounded-full"
                                />
                                <p className="mt-1 text-sm font-semibold">{member}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </>
    );
};

export default RoomOthers;

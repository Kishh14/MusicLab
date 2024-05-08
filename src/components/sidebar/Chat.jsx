import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const Chat = ({ roomId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const chatContainerRef = useRef(null);

    useEffect(() => {
        // Fetch messages for the current room
        axios.get("/chat/messages/" + { roomId })
            .then(res => {
                setMessages(res.data);
                scrollToBottom();
            })
            .catch(console.error);
    }, [roomId]);

    useEffect(() => {
        // Scroll to the bottom of the chat container whenever messages change
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    const handleMessageSend = () => {
        // Send new message to the server
        axios.post("/chat/messages/" + { roomId, content: newMessage })
            .then(res => {
                setNewMessage('');
                // Add the new message to the state
                setMessages(prevMessages => [...prevMessages, res.data]);
                scrollToBottom();
            })
            .catch(console.error);
    };

    return (
        <div className="mt-4 -mx-3 space-y-6 cursor-pointer h-[450px] rounded-lg border-gray-500 border">
            <div className="overflow-hidden">
                <div className="overflow-y-auto h-full px-4 py-4" ref={chatContainerRef}>
                    {/* Display messages */}
                    {messages.map(message => (
                        <div key={message._id} className="flex items-center">
                            {/* Display sender info */}
                            <div className="flex flex-col items-center space-y-1 mr-4">
                                <img
                                    className="rounded-full w-10 h-10"
                                    src={message.sender.avatar}
                                    alt={message.sender.username}
                                />
                                <p className="block text-xs">{message.sender.username}</p>
                            </div>
                            {/* Display message content */}
                            <div className="flex-1 bg-indigo-400 text-white p-2 rounded-lg relative">
                                <div>{message.content}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Chat input and button */}
            <div className="p-4">
                <div className="flex items-center">
                    <input
                        className="flex-1 rounded-full border border-gray-200 py-2 px-4 mr-2"
                        type="text"
                        value={setNewMessage}
                        placeholder="Type here"
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button className="px-4 py-2 bg-indigo-600 rounded-full shadow text-white"
                        onClick={handleMessageSend}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            viewBox="0 0 16 16"
                            fill="none"
                        >
                            <g id="Send 01">
                                <path
                                    id="icon"
                                    d="M9.04071 6.959L6.54227 9.45744M6.89902 10.0724L7.03391 10.3054C8.31034 12.5102 8.94855 13.6125 9.80584 13.5252C10.6631 13.4379 11.0659 12.2295 11.8715 9.81261L13.0272 6.34566C13.7631 4.13794 14.1311 3.03408 13.5484 2.45139C12.9657 1.8687 11.8618 2.23666 9.65409 2.97257L6.18714 4.12822C3.77029 4.93383 2.56187 5.33664 2.47454 6.19392C2.38721 7.0512 3.48957 7.68941 5.69431 8.96584L5.92731 9.10074C6.23326 9.27786 6.38623 9.36643 6.50978 9.48998C6.63333 9.61352 6.72189 9.7665 6.89902 10.0724Z"
                                    stroke="white"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                />
                            </g>
                        </svg>
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Chat;

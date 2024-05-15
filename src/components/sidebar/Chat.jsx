import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useSocket } from "../../context/SocketContext";
import { generateMinidenticonImg } from "../ui/MinidenticonImg";

const Chat = ({ currentRoom }) => {
  const { user } = useAuth();
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);
  const { socket } = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("message", (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    }
    return () => {
      if (socket) {
        socket.off("message");
      }
    };
  }, [socket]);

  const handleMessageSend = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/chat/send", {
        roomId: currentRoom._id,
        text: messageText,
        senderId: user.id,
      });

      if (messageText.trim() !== "") {
        const newMessage = {
          text: messageText,
          sender: {
            username: user.username,
          },
        };

        socket.emit("message", newMessage);
      }
      setMessageText("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (!currentRoom) {
          return;
        }
        const response = await axios.get(`/chat/room/${currentRoom._id}`);
        const newMessages = response.data.filter((message) => {
          return !messages.find((m) => m._id === message._id);
        });
        setMessages((prevMessages) => [...prevMessages, ...newMessages]);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [currentRoom]);

  return (
    <div className="space-y-1 cursor-pointer h-full  rounded-lg flex flex-col">
      <div className="overflow-hidden h-full flex flex-col">
        <div className="overflow-y-auto h-full py-4" ref={chatContainerRef}>
          {messages.map((message) => (
            <div
              key={message._id}
              className={`flex items-center flex-row ${
                message.sender.username === user.username
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              {message.sender.username === user.username ? (
                <>
                  <div
                    className={`bg-gray-700 rounded-lg border p-2 mb-2  overflow-hidden text-left`}
                  >
                    {message.text}
                  </div>
                  <div className="flex flex-col items-center  p-2">
                    <img
                      className="w-6 h-6 rounded-full mr-2 bg-white"
                      src={
                        user.profile_img
                          ? user.profile_img
                          : "https://picsum.photos/50/50"
                      }
                      alt="User Avatar"
                    />
                    <div className="font-medium">{message.sender.username}</div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col">
                    <div>
                      <div className="flex flex-row items-center  p-2 ">
                        <img
                          className="w-6 h-6 rounded-full mr-2 bg-white"
                          src={generateMinidenticonImg(message.sender._id)}
                          alt="User Avatar"
                        />
                        <div className="font-medium">
                          {message.sender.username}
                        </div>
                      </div>
                      <div className="bg-gray-700 rounded-lg border p-2 mb-2  ml-2  text-left">
                        {message.text}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="shrink-0 relative p-2">
        <div>
          <form onSubmit={handleMessageSend}>
            <div className="flex ">
              <input
                className="w-full rounded-full border border-gray-200  py-2 px-4 mr-2"
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type here"
              />
              <button
                className="px-4 py-2 bg-indigo-600 rounded-full shadow text-white"
                type="submit"
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;

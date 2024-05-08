import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Chat from "./Chat";
import Filters from "./Filters";
import RoomOthers from "./RoomOthers";
import RoomOwner from "./RoomOwner";
import axios from "axios";

import { useAuth } from "../../context/AuthContext";

const RoomsList = ({ isChatOpen, isRoomCreated, setIsRoomCreated }) => {
  const { user } = useAuth();

  /**
   * @type {[import("../../types/user").RoomType[], React.Dispatch<React.SetStateAction<import("../../types/user").RoomType[]>>]}
   */
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios
      .get("/room/all")
      .then((res) => setRooms(res.data))
      .catch(console.error);
  }, [isRoomCreated]);

  const ownerRooms = rooms.filter((room) => room.owner === user.id);
  const otherRooms = rooms.filter((room) => room.owner !== user.id);
  console.log(ownerRooms)
  console.log(otherRooms)
  useEffect(() => {
    setIsRoomCreated(ownerRooms.length > 0);
  }, [setIsRoomCreated, ownerRooms]);

  return (
    <>
      <style hidden>
        {`/* Hide scrollbar */
          #container-main::-webkit-scrollbar {
              display: none;
          }`}
      </style>
      <div
        id="container-main"
        className="h-screen px-5 py-8 border-l border-r sm:w-80 w-60 bg-gray-900 border-gray-700 relative scroll-smooth"
        style={{ overflow: "scroll" }}
      >
        <Filters />

        {ownerRooms.length > 0 && <RoomOwner {...ownerRooms[0]} />}

        {isChatOpen ? (
          <>

            {ownerRooms.length > 0(
              <Chat roomId={ownerRooms[0]?._id} />
            )}
          </>
          //owner room iam getting undefined tried consolelog its array is empty even tried othersroom
          // <Chat {...ownerRooms[0]._id} />
          // <Chat roomId={ownerRooms[0]._id} />
        ) : (
          <>
            {otherRooms.map((room, index) => (
              <RoomOthers key={index} room={room} />
            ))}
          </>
        )}
      </div>
    </>
  );
};

RoomsList.propTypes = {
  isChatOpen: PropTypes.bool.isRequired,
  isRoomCreated: PropTypes.bool.isRequired,
  setIsRoomCreated: PropTypes.func.isRequired,
};

export default RoomsList;

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Chat from './Chat';
import Filters from './Filters';
import RoomOthers from './RoomOthers';
import Room from './RoomOwner';
import axios from 'axios';

const RoomsList = ({ isChatOpen, isRoomCreated, user }) => {
  const [createdRooms, setCreatedRooms] = useState([]);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await axios.get('/auth/rooms');
        if (response.data) {
          setCreatedRooms(response.data);
        }
      } catch (error) {
        console.error('Error fetching room data:', error);
      }
    };

    fetchRoomData();
  }, [isRoomCreated]);

  const ownerRooms = createdRooms.filter(room => room.ownerName === user.username);
  const otherRooms = createdRooms.filter(room => room.ownerName !== user.username);

  return (
    <>
      <style hidden>
        {`/* Hide scrollbar */
          #container-main::-webkit-scrollbar {
              display: none;
          }`}
      </style>
      <div id="container-main" className="h-screen px-5 py-8 border-l border-r sm:w-80 w-60 bg-gray-900 border-gray-700 relative scroll-smooth" style={{ overflow: 'scroll' }}>
        <Filters />

        {ownerRooms.length > 0 && (
          <Room room={ownerRooms[0]} />
        )}



        {isChatOpen ? <Chat /> : <>
          {otherRooms.map((room, index) => (
            <RoomOthers key={index} room={room} />
          ))}
        </>}
      </div>
    </>
  );
};

RoomsList.propTypes = {
  isChatOpen: PropTypes.bool.isRequired,
  isRoomCreated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

export default RoomsList;

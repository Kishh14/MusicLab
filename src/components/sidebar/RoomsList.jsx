import PropTypes from "prop-types";
import Chat from "./Chat";
import Filters from "./Filters";
import RoomOthers from "./RoomOthers";
import Room from "./Room";

const RoomsList = ({ isChatOpen }) => {
  return (
    <>
      <style>
        {`
            /* Hide scrollbar */
            #container-main::-webkit-scrollbar {
                display: none;
            }
        `}
      </style>

      <div
        id="container-main"
        className=" h-screen px-5 py-8 border-l border-r sm:w-80 w-60 bg-gray-900 border-gray-700 relative scroll-smooth"
        style={{ overflow: "scroll" }}
      >
        {/* filter and search  */}
        <Filters />

        {/* Rooms */}
        <Room />
        {isChatOpen ? (
          <Chat />
        ) : (
          <>
            <RoomOthers />
            <RoomOthers />
            <RoomOthers />
            <RoomOthers />
          </>
        )}
      </div>
    </>
  );
};

RoomsList.propTypes = {
  isChatOpen: PropTypes.bool.isRequired,
};

export default RoomsList;

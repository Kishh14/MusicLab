import PropTypes from 'prop-types';
import Chat from "./Chat";
import Filters from "./Filters";
import RoomOthers from "./RoomOthers";
import Room from "./RoomOwner";

const RoomsList = ({ isChatOpen }) => {
    return (
        <>
            <style>
                {`
                    /* Hide scrollbar */
                    #container-main::-webkit-scrollbar {
                        display: none;
                    }

                    /* Apply smooth scroll */
                    #container-main {
                        scroll-behavior: smooth;
                    }
                `}
            </style>

            <div id="container-main" className=" h-screen px-5 py-8 border-l border-r sm:w-80 w-60 bg-gray-900 border-gray-700 relative" style={{ overflow: "scroll" }}>
                {/* filter and search  */}
                <Filters />

                {/* Rooms */}
                <Room />
                {isChatOpen ? <Chat /> : <>

                    <RoomOthers />
                    <RoomOthers />
                    <RoomOthers />
                    <RoomOthers />
                </>}


            </div>
        </>
    );
}

RoomsList.propTypes = {
    isChatOpen: PropTypes.bool.isRequired
};

export default RoomsList;

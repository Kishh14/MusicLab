import Filters from "./Filters";
import RoomOthers from "./RoomOthers";
import Room from "./RoomOwner";

export default function RoomsList() {


    return (
        <>
            <div className="h-screen px-5 py-8 bg-white border-l border-r sm:w-64 w-60 dark:bg-gray-900 dark:border-gray-700 relative" style={{ overflow: "scroll" }}>
                {/* filter and search  */}
                <Filters />

                {/* Rooms */}
                <Room />
                <RoomOthers/>
                <RoomOthers/>
                <RoomOthers/>
                <RoomOthers/>
            </div>
        </>
    );
}

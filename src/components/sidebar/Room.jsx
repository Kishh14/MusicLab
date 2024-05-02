import { IoSettingsOutline } from "react-icons/io5";
import memberData from '../../data.json';
// import AllRooms from "./AllRooms";
// import Filters from "./Filters";

export default function RoomMembers() {
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
            <div className="mt-4 -mx-3 space-y-6 rounded-lg h-[172px] border-2 border-gray-600 relative">
                <div className="flex mx-2 my-1 flex-row justify-between gap-1 border rounded-md border-gray-600">
                    <div className="py-1 px-2">
                        {/* room name */}
                        <h1 className="font-semibold ">Rahul</h1>
                    </div>
                    <div className="p-2 mx-1">
                        {/* settings */}
                        <a href="">
                            <IoSettingsOutline size={20} />
                        </a>
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

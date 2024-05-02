import memberData from '../data.json'
export default function AllRooms() {
    return (
        <>
            <div className="overflow-auto h-72 border cursor-pointer border-gray-600 mt-4 -mx-3 space-y-6 dark:highlight-white/5 shadow-lg ring-1 ring-black/5 rounded-xl flex flex-col divide-y dark:divide-slate-200/5" style={{ overflowY: 'scroll', overflowX: 'hidden', scrollbarWidth: 'none' }}>
                {memberData.map((member, index) => (
                    <div className="flex items-center gap-4 p-2" key={index}>
                        <img
                            className="w-9 h-9 rounded-full"
                            src={member.imgUrl}
                            alt={member.name}
                        />
                        <div className="flex flex-col">
                            <strong className="text-slate-900 text-sm font-medium dark:text-slate-200">
                                {member.name}
                            </strong>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

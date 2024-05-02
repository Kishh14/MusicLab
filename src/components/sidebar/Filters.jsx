import { IoFilter } from "react-icons/io5";
export default function Filters() {
    return (
        <>
            <div className="border-b border-gray-600 -mx-3 mb-2">
                <div className="flex flex-row gap-2 mb-3 ">
                    <div className="mt-1 px-2">
                        <IoFilter size={22} />
                    </div>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
                        {/* Search box */}
                        <input
                            type="text"
                            className="w-full py-1 px-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                            placeholder="Search"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
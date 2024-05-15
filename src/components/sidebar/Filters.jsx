import { LuFilter, LuSearch } from "react-icons/lu";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Filters({ filters, setFilters, filtersApplied }) {
  return (
    <div className="p-3 border-b border-gray-600">
      <fieldset className="w-full dark:text-gray-100 flex gap-2">
        <label htmlFor="Search" className="hidden">
          Search
        </label>
        <div className="relative w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button
              type="button"
              title="search"
              className="p-1 focus:outline-none focus:ring"
            >
              <LuSearch />
            </button>
          </span>
          <input
            type="search"
            name="Search"
            placeholder="Search Rooms..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full py-2 pl-10 text-sm rounded-md focus:outline-none dark:bg-gray-800 dark:text-gray-100 focus:dark:bg-gray-900 focus:dark:border-white focus:border-white border-gray-700 bg-gray-900 border  dark:focus:border-white dark:focus:bg-gray-900 dark:focus:text-gray-100 pe-3"
          />
        </div>

        {/* Filter button */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" className="shrink-0">
              <LuFilter />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-gray-900" align="end">
            <DropdownMenuLabel>Search Filters</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={filters.isLocked}
              onCheckedChange={(checked) =>
                setFilters({ ...filters, isLocked: checked })
              }
            >
              Locked Rooms
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.isUnlocked}
              onCheckedChange={(checked) =>
                setFilters({ ...filters, isUnlocked: checked })
              }
            >
              Unlocked Rooms
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </fieldset>

      {/* Count filters applied */}
      {filtersApplied > 0 && (
        <div className="flex items-center text-sm dark:text-gray-400 mt-2">
          {filtersApplied} filters applied
        </div>
      )}
    </div>
  );
}

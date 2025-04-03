import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ServerLogout } from "@/services/auth/serverLogout";
import { ChevronsUpDown, LogOut } from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface UserNavProps {
  isSidebarExpanded: boolean;
}

const UserNav: React.FC<UserNavProps> = ({ isSidebarExpanded }) => {
  // Reusable user info block: displays more details only if expanded.
  const userInfo = (
    <>
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage src="https://placehold.co/50x50" alt="User" />
        <AvatarFallback className="rounded-lg">WM</AvatarFallback>
      </Avatar>
      {isSidebarExpanded && (
        <div className="flex flex-col">
          <span className="truncate font-semibold">Username</span>
          <span className="truncate text-xs text-gray-500">Email address</span>
        </div>
      )}
    </>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-2 p-2 cursor-pointer">
          {userInfo}
          {isSidebarExpanded && <ChevronsUpDown className="h-4 w-4" />}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-56 rounded-lg p-1"
        side="right"
        align="start"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-2 py-1">{userInfo}</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={ServerLogout}
          className="cursor-pointer flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;

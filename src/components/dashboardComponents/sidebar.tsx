import { cookies } from "next/headers";
import React from "react";
import UserNav from "./userNav";

export default async function SideBar() {
  // Retrieve the sidebar display state from cookies.
  const cookieStore = await cookies();
  const sideBarDisplayState = cookieStore.get("sideBarDisplayState")?.value;
  const isSidebarExpanded = sideBarDisplayState === "show";

  return (
    <div
      className={`min-h-screen bg-[#FAFAFA] flex flex-col p-3 transition-all duration-300 ${
        isSidebarExpanded ? "w-52" : "w-16"
      }`}
    >
      {isSidebarExpanded ? (
        <img
          src="https://placehold.co/300x200"
          alt="Logo"
          className="rounded-xl mb-2 mx-auto"
        />
      ) : (
        <img
          src="https://placehold.co/50x50"
          alt="Logo"
          className="rounded-xl mb-2 mx-auto"
        />
      )}
      <div className="grow"></div>
      <UserNav isSidebarExpanded={isSidebarExpanded} />
    </div>
  );
}

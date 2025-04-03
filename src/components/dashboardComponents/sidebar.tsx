import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  ChevronDown,
  ChevronRight,
  ContainerIcon,
  LayoutDashboard,
  Package,
  Plus,
} from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import UserNav from "./userNav";

// Define interfaces
interface SideBarMenuItem {
  url: string;
  title: string;
  icon: React.ElementType;
  subMenu?: SideBarMenuItem[];
}

interface SideBarMenuModel {
  items: SideBarMenuItem[];
}

// Sidebar Menu Data
const sidebarSiteMap: SideBarMenuModel = {
  items: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Content",
      url: "/content",
      icon: ContainerIcon,
      subMenu: [
        {
          title: "Packages",
          url: "/content/packages",
          icon: Package,
          subMenu: [
            {
              title: "Add New Package",
              url: "/content/packages/add",
              icon: Plus,
            },
          ],
        },
      ],
    },
  ],
};

// Sidebar Component
export default async function SideBar() {
  const cookieStore = await cookies();
  const sideBarDisplayState = cookieStore.get("sideBarDisplayState")?.value;
  const isSidebarExpanded = sideBarDisplayState === "show";

  return (
    <div
      className={`min-h-screen bg-[#FAFAFA] flex flex-col p-3 transition-all duration-300 ${
        isSidebarExpanded ? "w-52" : "w-16"
      }`}
    >
      {/* Logo */}
      {isSidebarExpanded ? (
        <img
          src="https://placehold.co/300x200"
          alt="Logo"
          className="rounded-xl mb-4 mx-auto"
        />
      ) : (
        <img
          src="https://placehold.co/40x40"
          alt="Logo"
          className="rounded-xl mb-4 mx-auto"
        />
      )}

      {/* Sidebar Menu */}
      <nav className="space-y-2">
        {sidebarSiteMap.items.map((item) => (
          <SidebarMenuItem
            key={item.url}
            item={item}
            isExpanded={isSidebarExpanded}
          />
        ))}
      </nav>

      {/* Bottom User Navigation */}
      <div className="grow"></div>
      <UserNav isSidebarExpanded={isSidebarExpanded} />
    </div>
  );
}

// Recursive Sidebar Menu Item Component
async function SidebarMenuItem({
  item,
  isExpanded,
}: {
  item: SideBarMenuItem;
  isExpanded: boolean;
}) {
  const pathname = ""; // 🚨 Inject the pathname from the request in actual implementation
  const isActive = pathname.startsWith(item.url);

  if (item.subMenu && item.subMenu.length > 0) {
    return (
      <Collapsible>
        <CollapsibleTrigger asChild>
          <button
            className={`flex items-center justify-between w-full p-2 rounded-lg transition ${
              isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200"
            }`}
          >
            <div className="flex items-center">
              <item.icon className="h-5 w-5" />
              {isExpanded && <span className="ml-2">{item.title}</span>}
            </div>
            {isExpanded && <ChevronRight className="h-4 w-4" />}
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pl-5 space-y-1">
          {item.subMenu.map((subItem) => (
            <SidebarMenuItem
              key={subItem.url}
              item={subItem}
              isExpanded={isExpanded}
            />
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  } else {
    return (
      <Link
        href={item.url}
        className={`flex items-center w-full p-2 rounded-lg transition ${
          isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200"
        }`}
      >
        <item.icon className="h-5 w-5" />
        {isExpanded && <span className="ml-2">{item.title}</span>}
      </Link>
    );
  }
}

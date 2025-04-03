"use client";

import { toggleSideBar } from "@/services/dashboard/toggleSideBar";
import { PanelLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

const TopBar = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    // Capitalize first letter for a nicer display
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);
    return { href, label };
  });

  return (
    <div className="w-full h-12 border-b flex items-center px-4">
      <Button variant={"ghost"} onClick={toggleSideBar}>
        <PanelLeft />
      </Button>
      <nav className="ml-4 flex items-center space-x-2 text-sm">
        {breadcrumbs.length === 0 ? (
          <span>Home</span>
        ) : (
          breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.href}>
              <Link
                href={crumb.href}
                className="text-gray-600 hover:text-gray-900"
              >
                {crumb.label}
              </Link>
              {index < breadcrumbs.length - 1 && (
                <span className="text-gray-400">{" > "}</span>
              )}
            </React.Fragment>
          ))
        )}
      </nav>
    </div>
  );
};

export default TopBar;

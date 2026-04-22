'use client';

import { logoutUserAction } from "@/features/auth/server/auth.actions";
import {
  Bookmark,
  Briefcase,
  Building,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Plus,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const base = "/employer-dashboard";

const navigationItems = [
  {
    name: "Overview",
    icon: LayoutDashboard,
    href: base,
  },

    {
    name: "Post a Job",
    icon: Plus,
    href: base + "/jobs",
    
  },
  {
    name: "My Jobs",
    icon: Briefcase,
  },

  {
    name: "Saved Candidate",
    icon: Bookmark,
  },
  {
    name: "Settings",
    icon: Settings,
    href: base + "/settings",
  },
];

const EmployerSidebar = () => {
  const pathname = usePathname(); // detect current route

  return (

    //here width is 64
    <div className="h-screen w-64 bg-white border-r shadow-sm flex flex-col">

      {/* Logo / Title */}
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold text-blue-600">
          Employer Dashboard
        </h1>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href || "#"}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                ${
                  isActive
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                }`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Bottom Section (Profile / Logout optional) */}
      <div className="p-4 border-t">
        <div className="flex items-center gap-3">
         <div className="p-4 border-t">
        <button
          onClick={logoutUserAction}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerSidebar;
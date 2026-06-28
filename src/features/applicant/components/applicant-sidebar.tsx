"use client";

import { logoutUserAction } from "@/features/auth/server/auth.actions";
import {
  Bookmark,
  Briefcase,
  LayoutDashboard,
  LogOut,
  Search,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const base = "/dashboard";

const navigationItems = [
  {
    name: "Home",
    icon: LayoutDashboard,
    href: base,
  },
  {
    name: "Find Jobs",
    icon: Search,
    // href: base + "/find-jobs",
    href: "/jobs",
  },
  {
    name: "Applied",
    icon: Briefcase,
    href: base + "/applied-jobs",
  },
  {
    name: "Saved",
    icon: Bookmark,
    href: base + "/saved-jobs",
  },
  {
    name: "Settings",
    icon: Settings,
    href: base + "/settings",
  },
];

const ApplicantSidebar = () => {
  const pathname = usePathname(); // detect current route

  return (
    <>
      {/* ---------- DESKTOP SIDEBAR ---------- */}
      <div className="hidden md:flex h-screen w-64 bg-white border-r border-slate-200 shadow-sm flex-col sticky top-0">
        {/* Logo / Title */}
        <div className="p-6 border-b border-slate-200">
          <Link href="/" className="flex items-center gap-2">
            {/* <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-400 shrink-0">
              <Briefcase className="w-4 h-4 text-white" />
            </span> */}
            <h1 className="text-lg font-bold text-[#0B1F3A] leading-tight">
              Applicant Dashboard
            </h1>
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4 space-y-1.5 overflow-y-auto">
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
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                  }`}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Bottom Section (Logout) */}
        <div className="p-4 border-t border-slate-200">
          <form action={logoutUserAction}>
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all"
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </form>
        </div>
      </div>

      {/* ---------- MOBILE BOTTOM NAV ---------- */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-[0_-8px_24px_-12px_rgba(11,31,58,0.18)] pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center justify-between px-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href || "#"}
                className={`flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors
                  ${isActive ? "text-blue-600" : "text-slate-500"}`}
              >
                <Icon
                  size={20}
                  className={isActive ? "text-blue-600" : "text-slate-400"}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}

          <form action={logoutUserAction} className="flex flex-1">
            <button
              type="submit"
              className="flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium text-slate-500"
            >
              <LogOut size={20} className="text-slate-400" />
              <span>Logout</span>
            </button>
          </form>
        </div>
      </nav>
    </>
  );
};

export default ApplicantSidebar;
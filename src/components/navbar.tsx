import Link from "next/link";
import { Briefcase, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

import { logoutUserAction } from "@/features/auth/server/auth.actions";
import { getCurrentUser } from "@/features/auth/server/auth.queries";

export default async function Navbar() {
  const user = await getCurrentUser();

  const dashboardHref =
    user?.role === "employer" ? "/employer-dashboard" : "/dashboard/settings";

  return (
    <header className="border-b border-slate-200 bg-white/85 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-[#0B1F3A]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-400">
            <Briefcase className="w-4 h-4 text-white" />
          </span>
          YeJobs
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link href="/jobs" className="hover:text-blue-600 transition-colors">
            Find Job
          </Link>
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Employers
          </Link>
        </nav>

        {/* Desktop auth actions */}
        <div className="hidden md:flex items-center gap-3">
          {!user ? (
            <>
              <Button
                variant="ghost"
                className="text-[#0B1F3A] hover:text-blue-600 hover:bg-blue-50"
                asChild
              >
                <Link href="/login">Sign In</Link>
              </Button>
              <Button
                className="bg-[#0B1F3A] text-white hover:bg-blue-600 shadow-sm"
                asChild
              >
                <Link href="/register">Post a Job</Link>
              </Button>
            </>
          ) : (
            <>
              <Button
                asChild
                variant="outline"
                className="border-slate-200 text-[#0B1F3A] hover:border-blue-500 hover:text-blue-600"
              >
                <Link href={dashboardHref}>Dashboard</Link>
              </Button>

              <form action={logoutUserAction}>
                <Button
                  variant="ghost"
                  type="submit"
                  size="icon"
                  title="Log out"
                  className="hover:bg-red-50"
                >
                  <LogOut className="w-5 h-5 text-slate-500 hover:text-red-600 transition-colors" />
                </Button>
              </form>
            </>
          )}
        </div>

        {/* ---------- MOBILE: Dashboard/Sign-in stays visible + hamburger for the rest ---------- */}
        <div className="md:hidden flex items-center gap-2">
          {/* Primary action always visible on mobile */}
          {!user ? (
            <Button
              size="sm"
              className="bg-[#0B1F3A] text-white hover:bg-blue-600 shadow-sm"
              asChild
            >
              <Link href="/login">Sign In</Link>
            </Button>
          ) : (
            <Button
              size="sm"
              asChild
              variant="outline"
              className="border-slate-200 text-[#0B1F3A] hover:border-blue-500 hover:text-blue-600"
            >
              <Link href={dashboardHref}>Dashboard</Link>
            </Button>
          )}

          <input type="checkbox" id="nav-toggle" className="peer hidden" />

          <label
            htmlFor="nav-toggle"
            aria-label="Open menu"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-[#0B1F3A] hover:bg-blue-50 cursor-pointer peer-checked:hidden"
          >
            <Menu className="w-6 h-6" />
          </label>

          {/* Backdrop */}
          <label
            htmlFor="nav-toggle"
            aria-label="Close menu"
            className="hidden peer-checked:block fixed inset-0 top-16 z-40 bg-[#0B1F3A]/40 backdrop-blur-sm cursor-pointer"
          />

          {/* Drawer */}
          <div
            className="hidden peer-checked:flex fixed top-16 right-0 z-50 h-[calc(100vh-4rem)] w-72 max-w-[85vw]
              flex-col bg-white border-l border-slate-200 shadow-2xl
              translate-x-full peer-checked:translate-x-0 transition-transform duration-300"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
              <span className="text-sm font-semibold text-[#0B1F3A]">
                Menu
              </span>
              <label
                htmlFor="nav-toggle"
                aria-label="Close menu"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </label>
            </div>

            <nav className="flex flex-col p-4 gap-1 text-base font-medium text-slate-600">
              <Link
                href="/"
                className="rounded-lg px-3 py-3 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/jobs"
                className="rounded-lg px-3 py-3 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                Find Job
              </Link>
              <Link
                href="/"
                className="rounded-lg px-3 py-3 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                Employers
              </Link>
            </nav>

            <div className="mt-auto p-4 border-t border-slate-200 flex flex-col gap-2">
              {!user ? (
                <Button
                  className="w-full justify-center bg-[#0B1F3A] text-white hover:bg-blue-600 shadow-sm"
                  asChild
                >
                  <Link href="/register">Post a Job</Link>
                </Button>
              ) : (
                <form action={logoutUserAction}>
                  <Button
                    variant="ghost"
                    type="submit"
                    className="w-full justify-center gap-2 text-red-600 hover:bg-red-50 hover:text-red-600"
                  >
                    <LogOut className="w-4 h-4" />
                    Log out
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
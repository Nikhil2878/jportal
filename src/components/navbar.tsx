import Link from "next/link";
import { Briefcase, LogOut } from "lucide-react"; // Import LogOut icon
import { Button } from "@/components/ui/button";

import { logoutUserAction } from "@/features/auth/server/auth.actions";
import { getCurrentUser } from "@/features/auth/server/auth.queries";

export default async function Navbar() {
  const user = await getCurrentUser();

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

        <div className="flex items-center gap-3">
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
                <Link
                  href={
                    user.role === "employer"
                      ? "/employer-dashboard"
                      : "/dashboard/settings"
                  }
                >
                  Dashboard
                </Link>
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
      </div>
    </header>
  );
}
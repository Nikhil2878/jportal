import ApplicantSidebar from "@/features/applicant/components/applicant-sidebar";
import { getCurrentUser } from "@/features/auth/server/auth.queries";
import { redirect } from "next/navigation";
import React from "react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  if (!user) return redirect("/login");

  if (user.role !== "applicant") return redirect("/employer-dashboard");

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar renders desktop rail + mobile bottom nav internally */}
      <ApplicantSidebar />

      {/* Main Content */}
      <div className="flex-1 min-h-screen w-full p-4 pb-24 sm:p-6 md:pb-6 bg-slate-50">
        {children}
      </div>
    </div>
  );
}
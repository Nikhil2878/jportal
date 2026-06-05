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


  return(

  <div className="flex">
  {/* Sidebar (hidden on mobile) */}
  <div className="hidden md:block">
    <ApplicantSidebar />
  </div>

  {/* Main Content */}
  <div className="flex-1 p-6 bg-blue-50 min-h-screen">
    {children}
  </div>
</div>
  )
}



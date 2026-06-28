import { getCurrentUser } from "@/features/auth/server/auth.queries";
import EmployerSidebar from "@/features/employers/components/employer-sidebar";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  if (!user) return redirect("/login");

  if (user.role !== "employer") return redirect("/dashboard");

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar renders desktop rail + mobile bottom nav internally */}
      <EmployerSidebar />

      {/* Main Content */}
      <div className="flex-1 min-h-screen w-full p-4 pb-24 sm:p-6 md:pb-6 bg-slate-50">
        {children}
      </div>
    </div>
  );
}
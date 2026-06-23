
import ApplicantSidebar from "@/features/applicant/components/applicant-sidebar";
import { getCurrentUser } from "@/features/auth/server/auth.queries";

export default async function JobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  const isApplicant = user?.role === "applicant";

  if (isApplicant) {
    return (
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
    );
  }

  return (
    <main className="bg-gray-50/30 min-h-[calc(100vh-64px)]">{children}</main>
  );
}
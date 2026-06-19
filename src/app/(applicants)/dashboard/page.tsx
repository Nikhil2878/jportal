import { redirect } from "next/navigation";
import { getCurrentUser } from "@/features/auth/server/auth.queries";
import { ApplicantStats } from "@/features/applicant/components/applicant-stats";
import { ApplicantProfileStatus } from "@/features/applicant/components/applicant-profile-status";
// import { RecentApplications } from "@/features/applicant/components/recent-applications";


export default async function ApplicantDashboard() {
  const user = await getCurrentUser();
  if (!user) return redirect("/login");
  // if (user) return redirect("/dashboard");

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Hello, <span className="capitalize">{user.name}</span>
        </h1>
        <p className="text-gray-500">
          Here is your daily activities and job alerts
        </p>
      </div>

      <ApplicantStats />

      <ApplicantProfileStatus />

      {/* <RecentApplications /> */}
    </div>
  );
}
import { logoutUserAction } from "@/features/auth/server/auth.actions";
import { getCurrentUser } from "@/features/auth/server/auth.queries";
import { EmployerProfileCompletionStatus } from "@/features/employers/components/employer-profile-status";
import { StatsCards } from "@/features/employers/components/employer-stats";
import { redirect } from "next/navigation";


const EmployerDashboard = async() => {

    const user = await getCurrentUser();
    console.log("Employer data : ",user);
    if(!user) return redirect("/login");
    return(
        <div className="space-y-6">
           <div>
            <h1 className="text-2xl font-semibold text-foreground">Hello, <span className="capitalize text-blue-600">{user?.name.toLowerCase()}</span></h1>
            <p className="text-muted-foreground">Here is your daily activities and applications</p>
           </div>
           <StatsCards />
           <EmployerProfileCompletionStatus />
           </div>
    )
}
export default EmployerDashboard;

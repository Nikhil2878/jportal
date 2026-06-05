import { logoutUserAction } from "@/features/auth/server/auth.actions";
import { getCurrentUser } from "@/features/auth/server/auth.queries";
import { redirect } from "next/navigation";

const ApplicantDashboard = async() => {
        const user = await getCurrentUser();
        console.log("Employer data : ",user);
        if(!user) return redirect("/login");
    return (
        <div>
            <h1>Hello applicant dashboard</h1>
                        <button onClick={logoutUserAction}>Logout</button>
            
        </div>
    )
}
export default ApplicantDashboard;
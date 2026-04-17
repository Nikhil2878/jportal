import { logoutUserAction } from "@/features/auth/server/auth.actions";

const ApplicantDashboard = () => {
    return (
        <div>
            <h1>Hello applicant dashboard</h1>
                        <button onClick={logoutUserAction}>Logout</button>
            
        </div>
    )
}
export default ApplicantDashboard;
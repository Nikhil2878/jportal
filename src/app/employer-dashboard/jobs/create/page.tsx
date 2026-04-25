import { getCurrentUser } from "@/features/auth/server/auth.queries";
import JobForm from "@/features/employers/components/employer-job-form";
import { redirect } from "next/navigation";

const EmployerJobs = async() => {
     const user = await getCurrentUser();
        console.log("Employer data : ",user);
        if(!user) return redirect("/login");



    return(
        <div>
            <h1>Post a new job</h1>
            <JobForm />
        </div>
    )
}
export default EmployerJobs;
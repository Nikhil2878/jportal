import EmployerSettingsForm from "@/features/employers/components/employer-setting-form";
import { EmployerProfileData } from "@/features/employers/employers.schema";

import { getCurrentEmployerDetails } from "@/features/servers/employer.queries";
import { redirect } from "next/navigation";
import React from "react";
const EmployerSettings = async  () => {
    const employer = await getCurrentEmployerDetails();
    
      if (!employer) return redirect("/login");
      console.log("Current user data : ",employer);
    
    return(<div><EmployerSettingsForm 
     initialData={
          {
            name: employer.employerDetails.name,
            description: employer.employerDetails.description,
            organizationType: employer.employerDetails.organizationType,
            teamSize: employer.employerDetails.teamSize,
            location: employer.employerDetails.location,
            websiteUrl: employer.employerDetails.websiteUrl,
            yearOfEstablishment:
              employer.employerDetails.yearOfEstablishment?.toString(),
            avatarUrl: employer.avatarUrl,
            bannerImageUrl: employer.employerDetails.bannerImageUrl,

          } as EmployerProfileData
        }
/></div>
    )
}
export default EmployerSettings;
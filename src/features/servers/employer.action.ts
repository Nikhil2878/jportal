"use server";
import { employers, jobs, users } from "@/drizzle/schema";
import { getCurrentUser } from "../auth/server/auth.queries";
import { db } from "@/config/db";
import { eq } from "drizzle-orm";
import { EmployerProfileData, employerProfileSchema} from "../employers/employers.schema";



export const updateEmployerProfileAction = async(data:EmployerProfileData) => {
    try{
        const currentUser = await getCurrentUser();
        if(!currentUser || currentUser.role !== "employer"){
            return {status: "ERROR", message: "Unauthorized"};
        }
        const {data: validatedData,error} = employerProfileSchema.safeParse(data);
            if(error) return {status: "ERROR",message: error.issues[0].message};
                const{ 
        name,
        description,
        yearOfEstablishment,
        location,
        websiteUrl,
        organizationType,
        teamSize,
        avatarUrl,
        bannerImageUrl,
    } = data;

   const updatedEmployer = await db
      .update(employers)
      .set({
        name,
        description,
        location,
        websiteUrl,
        organizationType,
        teamSize,
        bannerImageUrl,
        yearOfEstablishment: yearOfEstablishment
          ? parseInt(yearOfEstablishment)
          : null,
      })
      .where(eq(employers.id, currentUser.id))
    
      await db
      .update(users)
      .set({
        avatarUrl,
      })
      .where(eq(users.id,currentUser.id));



    console.log("employers updated hai",updatedEmployer);
     return{
    status: "SUCCESS",
    message:"Profile updated successfully", 
        }
    }catch(error){
         return{
    status: "ERROR",
    message:"Something went wrong, Please Try Again Later", 
        };
    }
}


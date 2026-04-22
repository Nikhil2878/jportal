"use server";

import { db } from "@/config/db";
import { JobFormData, jobSchema } from "../employers/jobs/jobs.schema";
import { jobs } from "@/drizzle/schema";
import { getCurrentUser } from "../auth/server/auth.queries";

export const createJobAction = async (data: JobFormData) => {
  try {
    const { success, data: result, error } = jobSchema.safeParse(data);
    if (!success) {
      console.log("❌ ZOD ERRORS:", error.flatten());
      console.log("❌ RECEIVED DATA:", data);

      return {
        status: "ERROR",
        message: error.issues[0].message,
      };
    }

    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== "employer") {
      return { status: "ERROR", message: "Unauthorized" };
    }

    await db.insert(jobs).values({ ...result, employerId: currentUser.id });
    return { status: "SUCCESS", message: "Job posted successfully" };

    // console.log("server job post data: ", data);
    // console.log("server job post data 2: ", result);
  } catch (error) {
    return {
      status: "ERROR",
      message: "Something went wrong, please try again",
    };
  }
};


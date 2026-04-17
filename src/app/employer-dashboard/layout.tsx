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

// if(user){
//     if(user.role === "applicant") return redirect("/dashboard");
//     if(user.role === "employer") return redirect("/employer-dashboard");
//      }

  return(
  //  <div className="flex min-h-screen bg-background">
  //   <EmployerSidebar /> 
  //   <main className="container max-auto mt-5 ml-70 mr-5">
  //           {children}
  //   </main>
  //       </div>
  <div className="flex">
  {/* Sidebar (hidden on mobile) */}
  <div className="hidden md:block">
    <EmployerSidebar />
  </div>

  {/* Main Content */}
  <div className="flex-1 p-6 bg-blue-50 min-h-screen">
    {children}
  </div>
</div>
  )
}



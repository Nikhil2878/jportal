import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { getCurrentEmployerDetails } from "@/features/servers/employer.queries";
// import { getCurrentEmployerDetails } from "@/features/server/employers.queries";
import { ShieldAlertIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export async function EmployerProfileCompletionStatus() {
  const currentEmployer = await getCurrentEmployerDetails();

  if (!currentEmployer) return redirect("/login");

  if (currentEmployer.isProfileCompleted) return null;

  return (
    <div className="w-full">
      <Item
        variant="destructive"
        className="rounded-xl border border-red-200 bg-red-50 shadow-sm p-4 flex items-center justify-between gap-4"
      >
        {/* Left Content */}
        <div className="flex items-center gap-4">
          
          {/* Icon */}
          <ItemMedia
            variant="icon"
            className="bg-red-100 text-red-600 rounded-full p-2"
          >
            <ShieldAlertIcon size={20} />
          </ItemMedia>

          {/* Text */}
          <ItemContent>
            <ItemTitle className="text-red-700 font-semibold">
              Complete Your Profile
            </ItemTitle>

            <ItemDescription className="text-red-600 text-sm">
              Your employer profile is incomplete. Complete it to unlock job
              posting and access all features.
            </ItemDescription>
          </ItemContent>
        </div>

        {/* CTA */}
        <ItemActions>
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            asChild
          >
            <Link href="/employer-dashboard/settings">
              Complete Now
            </Link>
          </Button>
        </ItemActions>
      </Item>
    </div>
  );
}
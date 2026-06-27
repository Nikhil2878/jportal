import Link from "next/link";
import Image from "next/image";
import { Search, MapPin, Building2, ArrowRight, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import { db } from "@/config/db";
import { jobs, employers } from "@/drizzle/schema";
import { desc, eq } from "drizzle-orm";
import { formatDistanceToNow } from "date-fns";

//This is comment for explaining
//This is another comment for explaining
async function getFeaturedJobs() {
  return await db
    .select({ job: jobs, employer: employers })
    .from(jobs)
    .leftJoin(employers, eq(jobs.employerId, employers.id))
    .orderBy(desc(jobs.createdAt))
    .limit(6);
}

export default async function HomePage() {
  const featuredJobs = await getFeaturedJobs();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* HERO */}
        <section className="relative overflow-hidden bg-[#0B1F3A] py-20 lg:py-32">
          {/* ambient glow + grid backdrop */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(680px 460px at 14% 18%, rgba(30,94,255,0.40), transparent 60%), radial-gradient(560px 420px at 88% 78%, rgba(6,182,212,0.28), transparent 60%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
              backgroundSize: "42px 42px",
              maskImage:
                "radial-gradient(circle at 50% 30%, black 0%, transparent 75%)",
            }}
          />

          <div className="container relative z-10 mx-auto max-w-7xl px-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm font-medium text-blue-200 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_0_4px_rgba(34,211,238,0.25)]" />
              {featuredJobs.length > 0
                ? `${featuredJobs.length}+ roles open right now`
                : "New roles added daily"}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
              Find a job that suits <br className="hidden md:block" />
              your interest &amp; skills{" "}
              <span className="text-cyan-400">🔥</span>
            </h1>
            <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
              Discover thousands of job opportunities with top companies. Your
              next career move starts right here.
            </p>

            <form
              action="/jobs"
              method="GET"
              className="max-w-3xl mx-auto bg-white p-2.5 sm:p-2 rounded-2xl sm:rounded-full shadow-[0_30px_60px_-20px_rgba(7,21,41,0.55)] flex flex-col sm:flex-row items-stretch sm:items-center gap-2 border border-white/50"
            >
              <div className="flex-1 flex items-center gap-3 rounded-xl sm:rounded-full bg-slate-50 sm:bg-transparent px-4 py-3 sm:py-0 w-full">
                <Search className="w-5 h-5 text-slate-400 shrink-0" />
                <Input
                  name="search" // ?search="full"
                  type="text"
                  placeholder="Job title, keyword..."
                  className="border-0 bg-transparent focus-visible:ring-0 shadow-none text-base h-auto p-0"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full sm:w-auto rounded-xl sm:rounded-full px-8 h-12 sm:h-11 text-base bg-blue-600 hover:bg-blue-700 text-white shadow-[0_8px_20px_-6px_rgba(30,94,255,0.55)]"
              >
                Search Jobs
              </Button>
            </form>
          </div>
        </section>

        {/* FEATURED JOBS */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="flex justify-between items-end mb-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Featured jobs
                </span>
                <h2 className="text-3xl font-bold text-[#0B1F3A] mt-2">
                  Know your worth
                </h2>
                <p className="text-slate-500 mt-2">
                  Find the job that qualifies your life.
                </p>
              </div>
              <Button
                variant="outline"
                className="hidden sm:flex gap-2 rounded-lg border-slate-200 text-[#0B1F3A] hover:border-blue-500 hover:text-blue-600"
                asChild
              >
                <Link href="/jobs">
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredJobs.map(({ job, employer }) => (
                <Card
                  key={job.id}
                  className="relative overflow-hidden border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 group"
                >
                  {/* signature accent rail */}
                  <span className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-600 to-cyan-400" />

                  <CardContent className="p-6">
                    <div className="flex gap-4 mb-4">
                      <div className="h-12 w-12 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center overflow-hidden relative shrink-0">
                        {employer?.bannerImageUrl ? (
                          <Image
                            src={employer.bannerImageUrl}
                            alt="Logo"
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <Building2 className="w-6 h-6 text-blue-400" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-[#0B1F3A] group-hover:text-blue-600 transition-colors line-clamp-1">
                          {job.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                          <Badge
                            variant="secondary"
                            className="font-normal bg-blue-50 text-blue-700 hover:bg-blue-50"
                          >
                            {job.jobType}
                          </Badge>
                          <span>•</span>
                          <span>
                            {formatDistanceToNow(new Date(job.createdAt))} ago
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-slate-600 mb-6">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-400" />{" "}
                        {job.location || "Remote"}
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-slate-400" />{" "}
                        {employer?.name || "Company"}
                      </div>
                    </div>

                    <Button
                      className="w-full bg-[#0B1F3A] text-white hover:bg-blue-600 transition-colors"
                      asChild
                    >
                      <Link href={`/jobs/${job.id}`}>Apply Now</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* mobile-only View All, since the header one is hidden below sm */}
            <div className="mt-8 flex justify-center sm:hidden">
              <Button
                variant="outline"
                className="gap-2 rounded-lg border-slate-200 text-[#0B1F3A] hover:border-blue-500 hover:text-blue-600"
                asChild
              >
                <Link href="/jobs">
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#071529] text-slate-300 py-12">
        <div className="container mx-auto max-w-7xl px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-xl text-white">
            <Briefcase className="w-6 h-6 text-cyan-400" /> YeJobs
          </div>
          <p className="text-sm">© {new Date().getFullYear()} YeJobs.</p>
        </div>
      </footer>
    </div>
  );
}
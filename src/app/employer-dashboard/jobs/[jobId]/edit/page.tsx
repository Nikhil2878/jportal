interface PageProps {
  params: Promise<{ jobId: string }>;
}

export default async function EditJob({ params }: PageProps) {
  // Next.js 15+ में params को await करना ज़रूरी है
  const { jobId } = await params;

  return (
    <h1>Edit job page of jobs id: {jobId}</h1>
  );
}

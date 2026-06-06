interface PageProps {
  params: Promise<{ jobId: string }>;
}
const ApplicantEditJob = async({ params}:PageProps) => {

    const { jobId } = await params; 
    return(
        <>
        <h1>Card Id is : {jobId}</h1>
        </>
    )
}

export default ApplicantEditJob;
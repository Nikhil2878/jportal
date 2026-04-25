interface PageProps {
  params: Promise<{ jobId: string }>;
}
const EditJob = async({ params}:PageProps) => {

    const { jobId } = await params; 
    return(
        <>
        <h1>Edit job page of jobs id : {jobId}</h1>
        </>
    )
}

export default EditJob;
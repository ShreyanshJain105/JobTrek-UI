import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link, useParams } from "react-router-dom";
import JobDesc from "../JobDesc/JobDesc";
import RecommendedJobs from "../JobDesc/RecommendedJobs";
import { useEffect, useState } from "react";
import { getJob } from "../Services/JobService";




const JobsDes =()=>{
    const {id} =useParams();
    const [job,setJob]=useState<any>(null);
    useEffect(()=>{
        window.scroll(0,0);
        getJob(id).then((res)=>{
            setJob(res);
        }).catch((err)=>{
            console.log(err);
        })

    },[id]);
    return(
        <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] p-4">
             <Link className="my-5 inline-block" to="/find-jobs">
                <Button leftSection={<IconArrowLeft size={20}/> } color="brightSun.4" variant="light" >Back</Button>
            </Link>
             <div className="flex gap-5 justify-around">
                <JobDesc {...job}/>
                <RecommendedJobs/>
             </div>
        </div>
    )
}
export default JobsDes;
import { useParams } from "react-router-dom";
import PostedJobb from "../PostedJob/PostedJobb";
import PostedJobDescription from "../PostedJob/PostedJobDescription";
import { useSafeMantineTheme } from "@mantine/core";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getJobPostedBy } from "../Services/JobService";
const PostedJob = () => {
    const {id}=useParams();
    const user=useSelector((state:any)=>state.user);
    const [jobList,setJobList]=useState<any[]>([]);
    const [job,setJob]=useState<any>({});
    useEffect(()=>{
        window.scrollTo(0,0);
        getJobPostedBy(user.id).then((res)=>{
            setJobList(res);
            setJob(res.find((item:any)=>item.id==id));
        }).catch((err)=>{
            console.log(err);
        })
    },[id]);
    return (
        <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] px-4">
            <div className="flex gap-5">
                <PostedJobb job={job} jobList={jobList}/>
                <PostedJobDescription {...job}/>
            </div>
        </div>
    )
}

export default PostedJob;
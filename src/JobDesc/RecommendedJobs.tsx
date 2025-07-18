import { jobList } from "../Data/JobsData";
import JobCard from "../FindJobs/JobCard";

const RecommendedJobs=()=>{
     return <div>
        <div className="text-xl font-semibold mb-5">Recommeded Jobs </div>
        <div className="flex flex-col flex-wrap gap-5 ">
            {
                jobList.map((job,index)=>index<6 &&<JobCard key={index} {...job}/>)
            }
        </div>
    </div>
}
export default RecommendedJobs;
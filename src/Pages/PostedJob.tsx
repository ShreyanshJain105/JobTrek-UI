import { useNavigate, useParams } from "react-router-dom";
import PostedJobb from "../PostedJob/PostedJobb";
import PostedJobDescription from "../PostedJob/PostedJobDescription";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getJobPostedBy } from "../Services/JobService";

const PostedJob = () => {
    const { id } = useParams();
    const user = useSelector((state: any) => state.user);
    const [jobList, setJobList] = useState<any[]>([]);
    const [job, setJob] = useState<any>({});
    const navigate = useNavigate();

    useEffect(() => {
         window.scrollTo(0, 0);
        getJobPostedBy(user.id).then((res) => {
                setJobList(res);
                if(res && res.length>0 && Number(id)==0)navigate(`/posted-jobs/${res[0].id}`);
                setJob(res.find((item: any) => item.id== id));
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    return (
        <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] px-4">
            <div className="flex gap-5 justify-around py-5">
                <PostedJobb job={job} jobList={jobList} />
                <PostedJobDescription {...job} />
            </div>
        </div>
    );
};

export default PostedJob;

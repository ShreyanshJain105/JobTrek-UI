import { useNavigate, useParams } from "react-router-dom";
import PostedJobb from "../PostedJob/PostedJobb";
import PostedJobDescription from "../PostedJob/PostedJobDescription";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getJobPostedBy } from "../Services/JobService";

const PostedJob = () => {
  const { id } = useParams();                    // id is string | undefined
  const jobId = Number(id ?? 0);                 // normalize to number
  const user = useSelector((state: any) => state.user);
  const [jobList, setJobList] = useState<any[]>([]);
  const [job, setJob] = useState<any>({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.id) return;                       // wait for user to be available
    window.scrollTo(0, 0);

    getJobPostedBy(user.id)
      .then((res) => {
        setJobList(res || []);

        if (res && res.length > 0) {
          // If placeholder 0, redirect to the first real job id
          if (jobId === 0) {
            navigate(`/posted-jobs/${res[0].id}`, { replace: true });
          }
          // Set current job (fallback to first if not found)
          const current = res.find((item: any) => item.id === jobId);
          setJob(current ?? res[0]);
        } else {
          setJob({});
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [jobId, user?.id, navigate]);

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

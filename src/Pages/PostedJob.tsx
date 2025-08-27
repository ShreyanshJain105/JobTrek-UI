import { useNavigate, useParams } from "react-router-dom";
import PostedJobb from "../PostedJob/PostedJobb";
import PostedJobDescription from "../PostedJob/PostedJobDescription";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getJobPostedBy } from "../Services/JobService";
import { Button, Drawer } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

const PostedJob = () => {
  const { id } = useParams();                    // id is string | undefined
  const jobId = Number(id ?? 0);                 // normalize to number
  const user = useSelector((state: any) => state.user);
  const [opened, { open, close }] = useDisclosure(false);
  const [jobList, setJobList] = useState<any[]>([]);
  const [job, setJob] = useState<any>({});
  const navigate = useNavigate();
  const matches = useMediaQuery('(max-width:475px)');
  

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
      <Button my="xs" autoContrast size="sm" variant="default" onClick={open}>
        All Jobs
      </Button>
      <Drawer opened={opened} onClose={close} title="Authentication">
        <PostedJobb job={job} jobList={jobList} />
      </Drawer>
      <div className="flex gap-5 justify-around py-5">
        <PostedJobb job={job} jobList={jobList} />
        <PostedJobDescription {...job} />
      </div>
    </div>
  );
};

export default PostedJob;

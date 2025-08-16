import { Tabs } from "@mantine/core";
import PostedJobCard from "./PostedJobcard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PostedJobb = (props: any) => {
  const { id } = useParams();
  const selectedId = Number(id); // ✅ convert string param to number

  const [activeTab, setActiveTab] = useState<string>("ACTIVE");

  // Sync tab with selected job status
  useEffect(() => {
    if (props.job?.jobStatus) {
      setActiveTab(props.job.jobStatus);
    }
  }, [props.job]);

  return (
    <div className="w-1/5 mt-5">
      <div className="text-2xl font-semibold mb-5">Jobs</div>
      <div>
        <Tabs
          autoContrast
          variant="pills"
          value={activeTab}
          onChange={(value) => value && setActiveTab(value)} // ✅ fix TS error
        >
          <Tabs.List className="[&_button[aria-selected='false']]:bg-mine-shaft-900 font-medium">
            <Tabs.Tab value="ACTIVE">
              Active [
              {props.jobList?.filter(
                (job: any) => job?.jobStatus === "ACTIVE"
              ).length || 0}
              ]
            </Tabs.Tab>
            <Tabs.Tab value="DRAFT">
              Drafts [
              {props.jobList?.filter(
                (job: any) => job?.jobStatus === "DRAFT"
              ).length || 0}
              ]
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>

        <div className="flex flex-col gap-5 mt-5">
          {props.jobList
            ?.filter((job: any) => job?.jobStatus === activeTab)
            .map((item: any) => (
              <PostedJobCard
                key={item.id}
                {...item}
                selectedId={selectedId}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default PostedJobb;

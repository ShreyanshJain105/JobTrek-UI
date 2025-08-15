import { Tabs } from "@mantine/core";
import PostedJobCard from "./PostedJobcard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PostedJobb = (props: any) => {
  
    const { id } = useParams();

    const [activeTab,setActiveTab]=useState<string | null>('ACTIVE');
    useEffect(()=>{
        setActiveTab(props.job?.jobStatus||'ACTIVE');

    },[props.job]);
    return <div className="w-1/6 mt-5">
        <div className="text-2xl font-semibold mb-5 ">Jobs </div>
        <div>
            <Tabs autoContrast variant="pills" defaultValue="ACTIVE" onChange={setActiveTab} value={activeTab}>
                <Tabs.List className="[&_button[aria-selected='false']]:bg-mine-shaft-900
                 font-medium ">
                    <Tabs.Tab value="ACTIVE">Active[{props.jobList?.filter((job:any)=>job?.jobStatus=="ACTIVE").length}]</Tabs.Tab>
                    <Tabs.Tab value="DRAFT">Drafts[{props.jobList?.filter((job:any)=>job?.jobStatus=="DRAFT").length}]</Tabs.Tab>
                </Tabs.List>
            </Tabs>
            <div className="flex flex-col gap-5 mt-5 ">
                {
                    props.jobList?.filter((job:any)=>job?.jobStatus==activeTab).
                    map((item:any, index:any) => <PostedJobCard key={index} {...item} selectedId={id}  />)
                }
            </div>

        </div>

    </div>
}
export default PostedJobb;
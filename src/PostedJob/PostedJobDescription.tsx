import { Badge, Tabs } from "@mantine/core";
import JobDesc from "../JobDesc/JobDesc";
import { talentData } from "../Data/TalentData";
import TalentCard from "../FindTalent/TalentCard";

const PostedJobDescription = (props: any) => {
    return <div className="mt-5 w-3/4 px-5">
        <div className="text-2xl font-semibold flex items-center">{props.jobTitle} <Badge ml="sm" variant="light" color="brightSun.4" size="sm">{props.jobStatus}</Badge> </div>
        <div className="font-medium text-mine-shaft-300 mb-5">
            {props.location}
        </div>
        <div>
            <Tabs variant="outline" radius="lg" defaultValue="overview">
                <Tabs.List className="[&_button]:!text-lg font-semibold mb-5 [&_button[data-active='true']]:text-bright-sun-400  ">
                    <Tabs.Tab value="overview">Overview</Tabs.Tab>
                    <Tabs.Tab value="applicants">Applicants</Tabs.Tab>
                    <Tabs.Tab value="invited">Invited</Tabs.Tab>
                    <Tabs.Tab value="offered">Offered</Tabs.Tab>
                    <Tabs.Tab value="rejected">Rejected</Tabs.Tab>

                </Tabs.List>

                <Tabs.Panel value="overview" className="[&>div]:w-full">
                    <JobDesc {...props} edit />
                </Tabs.Panel>
                <Tabs.Panel value="applicants">
                    <div className="flex mt-10 flex-wrap gap- justify-around">
                        {
                            props.applicants?.filter((x: any) => x.applicationStatus == "APPLIED").
                            map((talent: any, index: any) => <TalentCard key={index} {...talent} posted />)
                        }
                    </div>
                </Tabs.Panel>
                <Tabs.Panel value="invited">
                    <div className="flex mt-10 flex-wrap gap-5 justify-around">
                        {
                            props.applicants?.filter((x: any) => x.applicationStatus == "INTERVIEWING").map((talent: any,
                             index: any) => <TalentCard key={index} {...talent} invited={true} />)
                        }
                    </div>
                </Tabs.Panel>
            </Tabs>
        </div>
    </div>
}

export default PostedJobDescription;
import { Divider, Text } from "@mantine/core";
import { IconBookmark, IconClockHour3 } from "@tabler/icons-react";
import { Link } from "react-router-dom";


const JobCard=(props:any)=>{
    return <Link to="/jobs" className="bg-mine-shaft-900 p-4 w-72 flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-400 ">
        <div className="flex justify-between">
            <div className="flex gap-2 items-center">
                <div className="p-2 bg-mine-shaft-800 rounded-md">
                    <img className="h-7 " src={`/Icons/${props.company}.png`} alt="" />
                </div>
                <div>
                    <div className="font-semibold">{props.jobTitle}</div>
                    <div className="text-xs text-mine-shaft-300">{props.company} &#x2022; {props.applicants} Applicants</div>
                </div>
            </div>
            <div><IconBookmark className="text-mine-shaft-300 cursor-pointer"/></div>
        </div>
        <div className="flex gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-800 [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs "> 
            <div>{props.experience}</div>
            <div>{props.jobType}</div>
            <div>{props.location}</div>
        </div>
        <Text className="!text-xs text-justify !text-mine-shaft-300 " lineClamp={3}>
           {props.description}
        </Text>
        <Divider size="xs" color="mineShaft.7"/>
        <div className="flex justify-between">
            <div className="font-semibold text-mine-shaft-200">
                &#8377;{props.package}
            </div>
            <div className=" p-1 flex gap-1 text-xs test-mine-shaft-400 items-center">
                <IconClockHour3 className="h-5 w-5 " stroke={1.5}/> <span className="leading-5">Posted {props.postedDaysAgo} days ago</span>
            </div>
        </div>
    </Link>
}
export default JobCard;
import { Avatar, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

const DreamJob = () => {
    return (
        
            <div className="flex sm-mx:flex-col-reverse items-center px-16 bs-mx:px-10 md-mx:px-5">
                <div className="flex flex-col w-[45%] sm-mx:w-full gap-3">
                    <div className="text-6xl bs-mx:text-5xl md-mx:text-4xl sm-mx:text-3xl   font-bold leading-tight text-mine-shaft-100 [&>span]:text-bright-sun-400">Find your <span>dream </span><span>job </span>with us</div>
                    <div className="text-lg md-mx:text-base  text-mine-shaft-200">
                        Good life begins with good company.
                        Start exploring 1000+ jobs in 1 place
                    </div>
                    <div className="flex gap-3 mt-5 items-center">
                        <TextInput className="bg-mine-shaft-900 rounded-lg p-1 px-2 text-mine-shaft-100 [&_input]:text-mine-shaft-100 " variant="unstyled" label="Job Title" placeholder="Software Developer Engineer"/>
                        <TextInput className="bg-mine-shaft-900 rounded-lg p-1 px-2 text-mine-shaft-100 [&_input]:text-mine-shaft-100 " variant="unstyled" label="Job Type" placeholder="FullTime"/>

                        <div className="flex items-center jusitfy-center h-full w-20 bg-bright-sun-400 text-mine-shaft-100 rounded-lg p-2 hover:bg-bright-sun-500 cursor-pointer">
                            <IconSearch className="h-[80%] w-[85%]" />
                        </div>
                    </div>
                </div>
                <div className="w-[55%] sm-mx:w-full flex items-center justify-center">
                    <div className="w-[30rem] relative">
                        <img src="/Boy.png" alt="Person looking for job opportunities" />
                        <div className="absolute -right-10 bs-mx:right-0 w-fit top-[50%] border-bright-sun-400 border rounded-lg p-2 xs-mx:top-[10%] top-[50%] xs-mx:-left-5
                        backdrop-blur-md">
                            <div className="text-center mb-1 text-sm text-mine-shaft-100">10k+ got Jobs</div>
                            <Avatar.Group>
                                <Avatar src="avatar.png" />
                                <Avatar src="avatar1.png" />
                                <Avatar src="avatar2.png" />
                                <Avatar>+9K</Avatar>
                                </Avatar.Group>
                        </div>
                        <div className="absolute xs:-left-5  w-fit top-[29%] bs-mx:top-[35%] xs-mx:top-[60%] border-bright-sun-400 border rounded-lg p-2 xs-mx:!right-0
                        backdrop-blur-md  gap-3 flex flex-col">
                            <div className="flex gap-2 items-center ">
                                <div className="w-20 h-10 p-1 bg-mine-shaft-900 rounded-lg">
                                    <img src="/Slack.png" alt="Slack" />
                                </div>
                                <div className="text-sm text-mine-shaft-100">
                                    <div>Software Engineer</div>
                                    <div className="text-mine-shaft-200 text-xs">San Francisco</div>
                                </div>
                            </div>
                            <div className="flex justify-around gap-2 text-mine-shaft-200 text-xs">
                                <span>1 day ago</span>
                                <span>120 Applicants</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
       
    );
}

export default DreamJob;
import { Button, Divider } from "@mantine/core";
import { IconBriefcase, IconMapPin } from "@tabler/icons-react";
import ExperinceCard from "./ExperinceCard";
import CertifyCard from "./CertifyCard";
import {profile} from "../Data/TalentData";


const Profile=()=>{
    const skills=['React', 'Spring Boot', 'Java', 'Python', 'Node.js', 'MongoDB', 'Express', 'Django', 'PostgreSQL'];

    return <div className="w-4/5 mmx-auto">
        <div className="relative">
            <img className="rounded-t-2xl" src="/Profile/banner.jpg" alt="" />
            <img className="rounded-full w-48 h-48 -bottom-1/3 absolute left-3 border-mine-shaft-950 border-8"
             src="/avatar.png" alt="" />
        </div>
        <div className="px-3 mt-16 ">
                <div className="text-3xl font-semibold flex justify-between">jarood word  
                   
                </div>
                <div className="text-xl flex flex gap-1 items-center"><IconBriefcase className="h-5 w-5 " stroke={1.5}/>SDE &bull; Google</div>
                <div className=" flex gap-1 text-lg test-mine-shaft-300 items-center">
                    <IconMapPin className="h-5 w-5 " stroke={1.5}/>{props.location}
                </div>
            </div>
            <Divider mx="xs" my="xl"/>
            <div className="px-3">
                <div className="text-2xl font-semibold mb-3">About</div>
                <div className="text-sm  text-mine-shaft-300 text-justify">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum, delectus!
    
                </div>
            </div>
            <Divider mx="xs" my="xl"/>
            <div className="px-3">
                <div className="text-2xl font-semibold mb-3">Skills</div>
                <div className="flex flex-wrap gap-2">
                    {
                        props.skills.map((skill:any,index:any)=> <div key={index} className="bg-bright-sun-300 text-sm font-medium bg-opacity-15 rounded-3xl text-bright-sun-400 px-4 py-1">{skill}</div>
                        )
                    }
                   
                    </div>
            </div>
            <Divider mx="xs" my="xl"/>
              <div className="px-3 ">
                <div className="text-2xl font-semibold mb-5">Experience</div>
                <div className="flex flex-col gap-8">
                     {
                    props.experience.map((exp:any,index:any)=> <ExperinceCard key={index} {...exp} />
                    )
                }
                </div>
               
            </div>
            <Divider mx="xs" my="xl"/>
              <div className="px-3">
                <div className="text-2xl font-semibold mb-5">certifications</div>
                 <div className="flex flex-col gap-8">
                     {
                    props.certifications.map((certi:any,index:any)=> <CertifyCard key={index} {...certi} />
                    )
                }
                </div>
            </div>

    </div>
}

export default Profile;
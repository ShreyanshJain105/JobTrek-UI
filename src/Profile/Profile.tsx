import { ActionIcon, Button, Divider, TagsInput, Textarea } from "@mantine/core";
import { IconBriefcase, IconDeviceFloppy, IconMapPin, IconPencil, IconPlus } from "@tabler/icons-react";
import ExperinceCard from "./ExperinceCard";
import CertifyCard from "./CertifyCard";
import { useEffect, useState } from "react";
import SelectInput from "./SelectInput";
import fields from "../Data/Profile";
import ExpInput from "./ExpInput";
import { profile } from "../Data/TalentData"; // Removed this import since you're using local data
import CertiInput from "./CertiInput";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../Services/ProfileService";
import Info from "./Info";
import { setProfile } from "../Slices/ProfileSlice";
import About from "./About";
import Skills from "./Skills";

const Profile = () => {
    const dispatch=useDispatch();
    const user=useSelector((state:any)=>state.user);
    const profile=useSelector((state:any)=>state.profile);
    const [skills, setSkills] = useState(['React', 'Spring Boot', 'Java', 'Python', 'Node.js', 'MongoDB', 'Express', 'Django', 'PostgreSQL']);
    const [edit, setEdit] = useState([false, false, false, false, false]);
    const [about, setAbout] = useState('Lorem ipsum dolor, sit amet consectetur adipisicing elit. A, tenetur?');
    const [addExp, setAddExp] = useState(false);
    const [addCerti, setAddCerti] = useState(false);
    const handleEdit = (index: number) => {
        const newEdit = [...edit];
        newEdit[index] = !newEdit[index];
        setEdit(newEdit);
    }
    useEffect(()=>{
        console.log(profile);
        getProfile(user.id).then((data:any)=>{
            dispatch(setProfile(data));
            console.log(data);
        }).catch((error:any)=>{
            console.log(error);
        })
    },[]);

    return (
        <div className="w-4/5 mx-auto">
            <div className="relative">
                <img className="rounded-t-2xl" src="/Profile/banner.jpg" alt="" />
                <img className="rounded-full w-48 h-48 -bottom-1/3 absolute left-3 border-mine-shaft-950 border-8"
                    src="/avatar.png" alt="" />
            </div>
            <div className="px-3 mt-20 ">
                
                <Info/>
                <Divider mx="xs" my="xl" />

                <About/>
            </div>
            <Divider mx="xs" my="xl" />
            <Skills/>


            <Divider mx="xs" my="xl" />
            <div className="px-3 ">
                <div className="text-2xl font-semibold mb-5 flex justify-between">Experience
                    <div className="flex gap-2">
                        <ActionIcon onClick={() => setAddExp(true)} size="lg" color="brightSun.4" variant="subtle" >
                            <IconPlus className="h-4/5 w-4/5" />
                        </ActionIcon>

                        <ActionIcon onClick={() => handleEdit(3)} size="lg" color="brightSun.4" variant="subtle" >
                            {edit[3] ? <IconDeviceFloppy className="h-4/5 w-4/5" /> : <IconPencil className="h-4/5 w-4/5" />}
                        </ActionIcon></div></div>
                <div className="flex flex-col gap-8">
                    {
                        profile?.experiences?.map((exp: any, index: number) => <ExperinceCard key={index} {...exp} edit={edit[3]} />)
                    }
                    {addExp && <ExpInput add setEdit={setAddExp} />}
                </div>
            </div>
            <Divider mx="xs" my="xl" />
            <div className="px-3">
                <div className="text-2xl font-semibold mb-5 flex justify-between">Certifications
                    <div className="flex gap-2">
                        <ActionIcon onClick={() => setAddCerti(true)} size="lg" color="brightSun.4" variant="subtle" >
                            <IconPlus className="h-4/5 w-4/5" />
                        </ActionIcon>
                    

                    <ActionIcon onClick={() => handleEdit(4)} size="lg" color="brightSun.4" variant="subtle" >
                        {edit[4] ? <IconDeviceFloppy className="h-4/5 w-4/5" /> : <IconPencil className="h-4/5 w-4/5" />}
                    </ActionIcon></div></div>
                <div className="flex flex-col gap-8">
                    {
                        profile?.certifications?.map((certi: any, index: number) => <CertifyCard key={index} edit={edit[4]} {...certi} />)
                    }
                    {
                        addCerti && <CertiInput setEdit={setAddCerti} />
                    }
                </div>
            </div>
        </div>
    );
}

export default Profile;
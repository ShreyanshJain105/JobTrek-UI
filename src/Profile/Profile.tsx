import { ActionIcon, Avatar, Button, Divider, FileInput, Overlay, TagsInput, Textarea } from "@mantine/core";
import { IconBriefcase, IconDeviceFloppy, IconEdit, IconMapPin, IconPencil, IconPlus } from "@tabler/icons-react";
import ExperinceCard from "./ExperinceCard";
import CertifyCard from "./CertifyCard";
import { useEffect, useState } from "react";
import ExpInput from "./ExpInput";
import CertiInput from "./CertiInput";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../Services/ProfileService";
import Info from "./Info";
import { changeProfile, setProfile } from "../Slices/ProfileSlice";
import About from "./About";
import Skills from "./Skills";
import Experience from "./Experience";
import Certificate from "./Certificate";
import { useHover } from "@mantine/hooks";
import { resolve } from "path";
import { error } from "console";
import { successNotification } from "../Services/NotificationService";

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);
    const profile = useSelector((state: any) => state.profile);
  
    useEffect(() => {
        console.log(profile);
        getProfile(user.id).then((data: any) => {
            dispatch(setProfile(data));
            console.log(data);
        }).catch((error: any) => {
            console.log(error);
        })
    }, []);
    const {hovered,ref}=useHover();
    const handleFileChange=async(image:any)=>{
        let picture:any = await getBase64(image);
        console.log(picture);
        let updateProfile={...profile,picture:picture.split(',')[1]};
        dispatch(changeProfile(updateProfile));
        successNotification("Success", "Profile Picture updated successfully");
   

    }
    const getBase64=(file:any)=>{
        return new Promise((resolve,reject)=>{
            const reader=new FileReader();
            reader.readAsDataURL(file);
            reader.onload=()=>resolve(reader.result);
            reader.onerror=error=>reject(error);
        })
    }

    return (
        <div className="w-4/5 mx-auto">
            <div className="relative">
                <img className="rounded-t-2xl" src="/Profile/banner.jpg" alt="" />
                <div ref={ref} className="absolute flex items-center justify-center -bottom-1/3 left-3">
                <Avatar className="!w-48 !h-48 border-mine-shaft-950 border-8 rounded-full" 
                src={profile.picture?`data:image/jpeg;base64,${profile.picture}`:"/Avatar.png"} alt="" />
                {hovered && <Overlay className="!rounded-full" color="#000" backgroundOpacity={0.75}/>}
                {hovered && <IconEdit className="absolute z-[300] !w-16 !h-16"/>}

                {hovered && <FileInput onChange={handleFileChange} className="absolute z-[301] [&_*]:!rounded-full 
                [&_*]:!h-full !h-full w-full  " variant="transparent" accept="image/png,image/jpeg" />}

                </div>
            </div>
            <div className="px-3 mt-20 ">

                <Info />
                <Divider mx="xs" my="xl" />

                <About />
            </div>
            <Divider mx="xs" my="xl" />
            <Skills />


            <Divider mx="xs" my="xl" />

            <Experience />

            <Divider mx="xs" my="xl" />
            <Certificate/>
        </div>
    );
}

export default Profile;
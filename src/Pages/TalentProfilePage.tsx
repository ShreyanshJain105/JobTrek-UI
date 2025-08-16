import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import Profile from "../TalentProfile/Profile";
import { profile } from "../Data/TalentData";
import Recommendtalent from "../TalentProfile/Recommendtalent";
import { useEffect, useState } from "react";
import { getAllProfiles } from "../Services/ProfileService";



const TalentProfilePage =()=>{
    const [talents,setTalents]=useState<any[]>([]);
    useEffect(()=>{
        getAllProfiles().then((res)=>{
            setTalents(res);
        }).catch((err)=>{
            console.log(err);
        })
    },[])
    const navigate=useNavigate();
    return(
        <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] p-4">
            
                <Button leftSection={<IconArrowLeft size={20}/> } my="sm" 
                color="brightSun.4" variant="light" onClick={()=>navigate(-1)} >Back</Button>
           
             <div className="flex gap-5 ">
                <Profile {...profile[0]}/>
                <Recommendtalent talents={talents}/>
             </div>
        </div>
    )
}
export default TalentProfilePage;
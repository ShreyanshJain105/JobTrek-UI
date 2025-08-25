import { ActionIcon } from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { formatDate } from "../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";

const CertifyCard = (props: any) => {
     const dispatch=useDispatch();
    const profile = useSelector((state:any)=>state.profile);
    const handledelete=()=>{
        let certi=[...profile.certifications];
        certi.splice(props.index,1);
        let updateProfile = {...profile,certifications:certi};
        dispatch(changeProfile(updateProfile));
        successNotification("Success","Certificate Deleted Successfully");
    }
    return <div className="flex justify-between  sm-mx:flex-wrap">
        <div className="flex gap-2 items-center">
            <div className="p-2 bg-mine-shaft-800 rounded-md shrink-0">
                <img className="h-7 " src={`/Icons/${props.issuer}.png`} alt="" />
            </div>
            <div>
                <div className="font-semibold xs-mx:text-sm">{props.title}</div>
                <div className="text-sm text-mine-shaft-300">{props.issuer}</div>
            </div>
        </div>
        <div className="flex items-center sm-mx:gap-2 items-end sm-mx:flex-row  ">
            <div className="flex flex-col items-end">
                <div className="text-sm text-mine-shaft-300 xs-mx:text-xs">{formatDate(props.issueDate)} </div>
                <div className="text-sm text-mine-shaft-300  xs-mx:text-xs">{props.certificateId}</div>
            </div>
            {props.edit && <ActionIcon size="lg" color="red.4" variant="subtle">  
                <IconTrash onClick={handledelete} className="h-4/5 w-4/5" stroke={1.5} />
            </ActionIcon>}
        </div>
    </div>
    

}
export default CertifyCard;
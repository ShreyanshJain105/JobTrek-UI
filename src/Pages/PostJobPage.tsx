import { Button, Divider } from "@mantine/core";
import Profile from "../TalentProfile/Profile";
import Recommendtalent from "../TalentProfile/Recommendtalent";
import PostJob from "../PostJob/PostJob";


const PostJobPage=()=>{
    return(
        <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] p-4">
            <PostJob/>
        </div>
    )
}

export default PostJobPage;
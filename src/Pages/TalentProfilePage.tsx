import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link } from "react-router-dom";


const TalentProfilePage =()=>{
    return(
        <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] p-4">
            <Divider size="xs"  />
             <Link className="my-5 inline-block" to="/find-talent">
                <Button leftSection={<IconArrowLeft size={20}/> } color="brightSun.4" variant="light" >Back</Button>
            </Link>
             <Divider size="xs"  />
        </div>
    )
}
export default TalentProfilePage;
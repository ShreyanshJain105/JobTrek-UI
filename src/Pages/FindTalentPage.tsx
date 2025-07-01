import { Divider } from "@mantine/core";
import SearchBar from "../FindTalent/SearchBar";

const FindTalentPage =()=>{
    return(
        <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins']">
            <Divider size="xs" mx="md" />
            <SearchBar/>
            
        </div>
    )
}
export default FindTalentPage;
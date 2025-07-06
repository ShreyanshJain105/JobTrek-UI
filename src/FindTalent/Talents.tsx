import { talentData } from "../Data/TalentData";
import Sort from "../FindJobs/Sort";
import TalentCard from "./TalentCard";

const Talents=()=>{
    return <div className="p-5">
        <div className=" flex justify-between">
            <div className="text-2xl font-semibold">Talents</div>
            <Sort/>
        </div>
        <div className="mt-10 ml-20 flex flex-wrap gap-10 justify-between">
            {
                talentData.map((talent,index)=><TalentCard key={index} {...talent} />)
            }
           
        </div>
        
        
    </div>

}
export default Talents;
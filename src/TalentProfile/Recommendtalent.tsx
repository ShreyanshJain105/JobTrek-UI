import TalentCard from "../FindTalent/TalentCard";
import {talentData} from "../Data/TalentData";

const Recommendtalent=()=>{
    return <div>
        <div className="text-xl font-semibold mb-5">Recommeded Talent </div>
        <div className="flex flex-col flex-wrap gap-5 ">
            {
                talentData.map((talent,index)=>index<5 &&<TalentCard key={index} {...talent}/>)
            }
        </div>
    </div>
}
export default Recommendtalent;
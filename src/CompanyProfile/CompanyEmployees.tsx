import { talentData } from "../Data/TalentData";
import TalentCard from "../FindTalent/TalentCard";

const CompanyEmployees=()=>{
    return <div className="flex mt-10 flex-wrap gap-10 ">
            {
                talentData.map((talent,index)=>index<6&&<TalentCard key={index} {...talent} />)
            }
           
        </div>
}
export default CompanyEmployees;
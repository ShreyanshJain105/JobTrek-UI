import { similar } from "../Data/Company";
import { talentData } from "../Data/TalentData";
import TalentCard from "../FindTalent/TalentCard";
import CompanyCard from "./CompanyCard";

const SimilarCompanies=()=>{
     return <div className="w-1/4">
        <div className="text-xl font-semibold mb-5">Similar Companies </div>
        <div className="flex flex-col flex-wrap gap-5 ">
            {
                similar.map((company,index)=><CompanyCard key={index} {...company}/>)
            }
        </div>
    </div>
}
export default SimilarCompanies;
import TalentCard from "../FindTalent/TalentCard";
import { useParams } from "react-router-dom";

const Recommendtalent=(props:any)=>{
    const {id} = useParams();
    return <div>
        <div className="text-xl font-semibold mb-5">Recommeded Talent </div>
        <div className="flex flex-col flex-wrap gap-5 ">
            {
                props?.talents?.map((talent:any,index:any)=>index<5 && id!=talent.id &&<TalentCard key={index} {...talent}/>)
            }
        </div>
    </div>
}
export default Recommendtalent;
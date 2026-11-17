import { useParams } from "react-router-dom";
import { getSimilarCompanies } from "../Data/Company";
import CompanyCard from "./CompanyCard";
import { IconSparkles } from "@tabler/icons-react";

interface SimilarCompaniesProps {
    companyName?: string;
}

const SimilarCompanies = (props: SimilarCompaniesProps) => {
    const { name: paramName } = useParams<{ name?: string }>();
    const currentName = props.companyName || paramName || "Google";
    const peers = getSimilarCompanies(currentName);

    return (
        <aside className="w-full lg:w-80 shrink-0 flex flex-col gap-6">
            <div className="bg-white dark:bg-slate-900/70 p-6 rounded-3xl border border-slate-200/90 dark:border-white/10 backdrop-blur-xl shadow-xl flex flex-col gap-5 transition-colors">
                <div className="flex items-center gap-2.5 pb-4 border-b border-slate-200 dark:border-white/[0.08]">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 dark:text-amber-400">
                        <IconSparkles size={18} />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">Peer Enterprises</h3>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">Similar sector leaders</p>
                    </div>
                </div>

                <div className="flex flex-col gap-2.5">
                    {peers.map((company, index) => (
                        <CompanyCard key={company.name || index} {...company} />
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default SimilarCompanies;

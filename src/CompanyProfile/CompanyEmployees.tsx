import { talentData } from "../Data/TalentData";
import TalentCard from "../FindTalent/TalentCard";
import { IconUsers } from "@tabler/icons-react";

interface CompanyEmployeesProps {
    companyName?: string;
}

const CompanyEmployees = ({ companyName }: CompanyEmployeesProps) => {
    // Show a sample cohort of vetted professionals matching this domain
    const employees = talentData.slice(0, 6);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between text-xs sm:text-sm text-slate-600 dark:text-slate-400 px-1">
                <span className="flex items-center gap-1.5 font-medium">
                    <IconUsers size={16} className="text-amber-500" />
                    <span>
                        Vetted alumni & verified team members connected with <strong className="text-slate-900 dark:text-white font-semibold">{companyName || "the organization"}</strong>
                    </span>
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {employees.map((talent, index) => (
                    <TalentCard key={index} {...talent} />
                ))}
            </div>
        </div>
    );
};

export default CompanyEmployees;

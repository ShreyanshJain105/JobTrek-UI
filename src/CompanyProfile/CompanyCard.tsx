import { IconArrowUpRight, IconUsers } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const CompanyCard = (props: any) => {
    const companyName = props.name || "Company";
    const storedIcon = localStorage.getItem(`company_icon_${companyName.toLowerCase()}`);
    // Start with SVG if not custom stored, fall back to PNG, then initial
    const initialLogo = storedIcon || `/Icons/${companyName}.svg`;

    return (
        <Link
            to={`/company/${encodeURIComponent(companyName)}`}
            className="group p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] hover:bg-slate-100 dark:hover:bg-white/[0.06] border border-slate-200/80 dark:border-white/[0.05] hover:border-amber-500/40 dark:hover:border-amber-500/30 transition-all flex items-center justify-between gap-3 shadow-xs hover:shadow-md"
        >
            <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-2 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                    <img
                        className="w-full h-full object-contain"
                        src={initialLogo}
                        alt={companyName}
                        onError={(e: any) => {
                            if (e.target.src.endsWith(".svg")) {
                                e.target.src = `/Icons/${companyName}.png`;
                            } else {
                                e.target.style.display = 'none';
                                if (e.target.parentElement) {
                                    e.target.parentElement.innerHTML = `<span class="text-amber-500 dark:text-amber-400 font-bold text-sm font-display">${companyName.charAt(0)}</span>`;
                                }
                            }
                        }}
                    />
                </div>
                <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors truncate font-display">
                        {companyName}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                        <IconUsers size={12} className="text-slate-400 dark:text-slate-500 shrink-0" />
                        <span className="truncate">{props.employees || "1,000+"} Employees</span>
                    </p>
                </div>
            </div>

            <IconArrowUpRight size={16} className="text-slate-400 dark:text-slate-500 group-hover:text-amber-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
        </Link>
    );
};

export default CompanyCard;

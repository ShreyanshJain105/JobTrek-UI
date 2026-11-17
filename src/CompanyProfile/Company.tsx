import { Avatar, AvatarGroup } from "@mantine/core";
import { 
    IconMapPin, 
    IconUsers, 
    IconBriefcase, 
    IconInfoCircle,
    IconDiscountCheck,
    IconBuildingSkyscraper,
    IconWorld
} from "@tabler/icons-react";
import AboutCompany from "./AboutCompany";
import CompanyJobs from "./CompanyJobs";
import CompanyEmployees from "./CompanyEmployees";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { getCompanyDetails } from "../Data/Company";

const Company = () => {
    const { name } = useParams<{ name?: string }>();
    const companyName = name || "Google";
    const company = getCompanyDetails(companyName);
    const [activeTab, setActiveTab] = useState<string>("about");

    // Check custom uploaded logo or standard files
    const storedIcon = localStorage.getItem(`company_icon_${company.Name.toLowerCase()}`);
    const logoSrc = storedIcon || `/Icons/${company.Name}.svg`;

    return (
        <div className="flex-1 min-w-0 flex flex-col gap-8">
            {/* Header Hero Card */}
            <div className="bg-white dark:bg-slate-900/70 rounded-3xl border border-slate-200/90 dark:border-white/10 overflow-hidden shadow-xl backdrop-blur-xl transition-colors">
                <div className="h-44 sm:h-56 w-full relative bg-gradient-to-r from-amber-500/15 via-slate-700/40 to-amber-900/20 dark:from-amber-500/20 dark:via-slate-800 dark:to-amber-900/30 overflow-hidden">
                    <img
                        className="w-full h-full object-cover opacity-30 mix-blend-overlay"
                        src="/Profile/banner.jpg"
                        alt="Company Banner"
                        onError={(e: any) => {
                            e.target.style.display = 'none';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                </div>

                <div className="px-6 sm:px-10 pb-8 relative">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 -mt-16 sm:-mt-20 mb-6">
                        <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl p-3 bg-white dark:bg-slate-900 border-4 border-slate-100 dark:border-slate-950 shadow-2xl flex items-center justify-center shrink-0">
                            <img
                                className="w-full h-full object-contain"
                                src={logoSrc}
                                alt={company.Name}
                                onError={(e: any) => {
                                    // Try PNG fallback if SVG fails, otherwise show initial
                                    if (e.target.src.endsWith(".svg")) {
                                        e.target.src = `/Icons/${company.Name}.png`;
                                    } else {
                                        e.target.style.display = 'none';
                                        e.target.parentElement.innerHTML = `<span class="text-amber-500 dark:text-amber-400 font-bold text-3xl font-display">${company.Name.charAt(0)}</span>`;
                                    }
                                }}
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold shadow-xs">
                                <IconDiscountCheck size={14} />
                                <span>Verified Enterprise</span>
                            </span>
                            <AvatarGroup>
                                <Avatar src="/Avatar.png" radius="xl" size="sm" />
                                <Avatar src="/Avatar.png" radius="xl" size="sm" />
                                <Avatar radius="xl" size="sm" color="amber">+10k</Avatar>
                            </AvatarGroup>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2.5">
                        <div className="flex flex-wrap items-center gap-3">
                            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
                                {company.Name}
                            </h1>
                            <span className="px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold font-mono">
                                {company.Size}
                            </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                            <div className="flex items-center gap-1.5">
                                <IconMapPin size={16} className="text-amber-500 shrink-0" />
                                <span>{company.Headquarters}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <IconBuildingSkyscraper size={16} className="text-amber-500 shrink-0" />
                                <span>{company.Industry}</span>
                            </div>
                            {company.Website && (
                                <a
                                    href={company.Website}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 hover:underline"
                                >
                                    <IconWorld size={16} className="shrink-0" />
                                    <span>Website</span>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="p-1 rounded-2xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 flex gap-1 transition-colors">
                <button
                    type="button"
                    onClick={() => setActiveTab("about")}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                        activeTab === "about"
                            ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                >
                    <IconInfoCircle size={16} />
                    <span>Company Dossier</span>
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab("jobs")}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                        activeTab === "jobs"
                            ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                >
                    <IconBriefcase size={16} />
                    <span>Open Positions</span>
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab("employees")}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                        activeTab === "employees"
                            ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                >
                    <IconUsers size={16} />
                    <span>People & Culture</span>
                </button>
            </div>

            {/* Tab Contents */}
            <div className="bg-white dark:bg-slate-900/70 p-6 sm:p-8 rounded-3xl border border-slate-200/90 dark:border-white/10 backdrop-blur-xl shadow-xl transition-colors">
                {activeTab === "about" && <AboutCompany companyName={company.Name} />}
                {activeTab === "jobs" && <CompanyJobs companyName={company.Name} />}
                {activeTab === "employees" && <CompanyEmployees companyName={company.Name} />}
            </div>
        </div>
    );
};

export default Company;

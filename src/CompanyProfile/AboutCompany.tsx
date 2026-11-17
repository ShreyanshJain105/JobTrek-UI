import { getCompanyDetails } from "../Data/Company";
import { 
    IconWorld, 
    IconBuildingSkyscraper, 
    IconUsers, 
    IconMapPin, 
    IconSparkles,
    IconCalendar,
    IconUserCheck
} from "@tabler/icons-react";
import { useParams } from "react-router-dom";

interface AboutCompanyProps {
    companyName?: string;
}

const AboutCompany = (props: AboutCompanyProps) => {
    const { name } = useParams<{ name?: string }>();
    const targetName = props.companyName || name || "Google";
    const company = getCompanyDetails(targetName);

    return (
        <div className="flex flex-col gap-6 pt-2">
            {/* Overview / Mission */}
            {company.Overview && (
                <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200/90 dark:border-white/10 shadow-sm flex flex-col gap-2.5 transition-colors">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                        <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest font-mono">
                            Enterprise Overview
                        </span>
                    </div>
                    {company.Tagline && (
                        <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white font-display">
                            &ldquo;{company.Tagline}&rdquo;
                        </h3>
                    )}
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                        {company.Overview}
                    </p>
                </div>
            )}

            {/* Structured Company Facts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {company.Industry && (
                    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/90 dark:border-white/10 flex items-start gap-3.5 shadow-xs transition-colors">
                        <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
                            <IconBuildingSkyscraper size={20} />
                        </div>
                        <div className="min-w-0">
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold block">
                                Industry Sector
                            </span>
                            <span className="text-sm font-bold text-slate-900 dark:text-white mt-0.5 truncate block">
                                {company.Industry}
                            </span>
                        </div>
                    </div>
                )}

                {company.Size && (
                    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/90 dark:border-white/10 flex items-start gap-3.5 shadow-xs transition-colors">
                        <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
                            <IconUsers size={20} />
                        </div>
                        <div className="min-w-0">
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold block">
                                Global Workforce
                            </span>
                            <span className="text-sm font-bold text-slate-900 dark:text-white mt-0.5 truncate block">
                                {company.Size}
                            </span>
                        </div>
                    </div>
                )}

                {company.Headquarters && (
                    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/90 dark:border-white/10 flex items-start gap-3.5 shadow-xs transition-colors">
                        <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
                            <IconMapPin size={20} />
                        </div>
                        <div className="min-w-0">
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold block">
                                Primary Headquarters
                            </span>
                            <span className="text-sm font-bold text-slate-900 dark:text-white mt-0.5 truncate block">
                                {company.Headquarters}
                            </span>
                        </div>
                    </div>
                )}

                {company.Founded && (
                    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/90 dark:border-white/10 flex items-start gap-3.5 shadow-xs transition-colors">
                        <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
                            <IconCalendar size={20} />
                        </div>
                        <div className="min-w-0">
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold block">
                                Inception Year
                            </span>
                            <span className="text-sm font-bold text-slate-900 dark:text-white mt-0.5 truncate block">
                                {company.Founded}
                            </span>
                        </div>
                    </div>
                )}

                {company.KeyPeople && (
                    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/90 dark:border-white/10 flex items-start gap-3.5 shadow-xs sm:col-span-2 lg:col-span-2 transition-colors">
                        <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
                            <IconUserCheck size={20} />
                        </div>
                        <div className="min-w-0">
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold block">
                                Leadership & Founders
                            </span>
                            <span className="text-sm font-bold text-slate-900 dark:text-white mt-0.5 truncate block">
                                {company.KeyPeople}
                            </span>
                        </div>
                    </div>
                )}

                {company.Website && (
                    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/90 dark:border-white/10 flex items-start gap-3.5 shadow-xs sm:col-span-2 lg:col-span-3 transition-colors">
                        <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
                            <IconWorld size={20} />
                        </div>
                        <div className="min-w-0 flex-1">
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold block">
                                Official Digital Portal
                            </span>
                            <a
                                href={company.Website}
                                target="_blank"
                                rel="noreferrer"
                                className="text-sm font-bold text-amber-600 dark:text-amber-400 hover:text-amber-500 transition-colors truncate block mt-0.5 hover:underline"
                            >
                                {company.Website}
                            </a>
                        </div>
                    </div>
                )}
            </div>

            {/* Specialties Badges */}
            {company.Specialties && Array.isArray(company.Specialties) && (
                <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200/90 dark:border-white/10 flex flex-col gap-3 shadow-xs transition-colors">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                        <IconSparkles size={14} className="text-amber-500" />
                        <span>Core Engineering Domains & Technical Verticals</span>
                    </span>
                    <div className="flex flex-wrap gap-2 pt-1">
                        {company.Specialties.map((item: string, index: number) => (
                            <span
                                key={index}
                                className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AboutCompany;

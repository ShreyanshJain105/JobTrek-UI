import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllJobs } from "../Services/JobService";
import { IconMapPin, IconCurrencyDollar, IconArrowUpRight, IconSparkles } from "@tabler/icons-react";

const RecommendedJobs = () => {
    const { id } = useParams();
    const [jobList, setJobList] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getAllJobs()
            .then((res) => {
                setJobList(res || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching recommended jobs:", err);
                setLoading(false);
            });
    }, []);

    const filteredJobs = jobList.filter((job: any) => String(job.id) !== String(id) && job.jobStatus === "ACTIVE").slice(0, 5);

    return (
        <aside className="w-full lg:w-96 shrink-0 flex flex-col gap-6">
            <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10 backdrop-blur-xl shadow-md dark:shadow-xl flex flex-col gap-5 transition-colors">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.08] pb-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 dark:text-amber-400">
                            <IconSparkles size={18} />
                        </div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display">Recommended Roles</h2>
                    </div>
                    <Link
                        to="/find-jobs"
                        className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-500 transition-colors flex items-center gap-1 group"
                    >
                        View all
                        <IconArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                </div>

                {loading ? (
                    <div className="flex flex-col gap-4">
                        {[1, 2, 3].map((n) => (
                            <div key={n} className="p-4 rounded-2xl bg-slate-100 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.04] animate-pulse flex flex-col gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-white/5" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-slate-200 dark:bg-white/10 rounded w-3/4" />
                                        <div className="h-3 bg-slate-200 dark:bg-white/5 rounded w-1/2" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredJobs.length === 0 ? (
                    <div className="text-center py-8 text-slate-500 text-sm">
                        No other matching roles found at this time.
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {filteredJobs.map((job: any) => {
                            const iconSrc = job.companyIcon || (job.company ? localStorage.getItem(`company_icon_${job.company.toLowerCase()}`) : null) || `/Icons/${job.company}.svg` || `/Icons/${job.company}.png`;
                            return (
                                <Link
                                    key={job.id}
                                    to={`/jobs/${job.id}`}
                                    className="group relative p-4 rounded-2xl bg-slate-50/80 dark:bg-white/[0.02] hover:bg-slate-100 dark:hover:bg-white/[0.06] border border-slate-200/90 dark:border-white/[0.05] hover:border-amber-500/30 transition-all duration-300 flex flex-col gap-3 shadow-xs hover:shadow-md"
                                >
                                    <div className="flex items-start gap-3.5">
                                        <div className="w-11 h-11 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-2 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                                            <img
                                                className="w-full h-full object-contain"
                                                src={iconSrc}
                                                alt={job.company || "Company"}
                                                onError={(e: any) => {
                                                    if (e.target.src.endsWith('.svg')) {
                                                        e.target.src = `/Icons/${job.company}.png`;
                                                    } else {
                                                        e.target.style.display = 'none';
                                                        e.target.parentElement.innerHTML = `<span class="text-amber-500 dark:text-amber-400 font-bold text-base font-display">${(job.company || "C").charAt(0)}</span>`;
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-1 font-display">
                                                {job.jobTitle}
                                            </h3>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate mt-0.5">
                                                {job.company}
                                            </p>
                                        </div>
                                        <div className="text-slate-400 group-hover:text-amber-500 transition-colors">
                                            <IconArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-200/80 dark:border-white/[0.04] text-[11px] text-slate-500 dark:text-slate-400">
                                        <span className="flex items-center gap-1">
                                            <IconMapPin size={12} className="text-amber-500 dark:text-slate-500" />
                                            {job.location || "Remote"}
                                        </span>
                                        <span className="text-slate-300 dark:text-slate-700">&bull;</span>
                                        <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold font-mono">
                                            <IconCurrencyDollar size={12} />
                                            {job.packageOffered ? `${job.packageOffered} LPA` : (job.package || "Competitive")}
                                        </span>
                                        <span className="text-slate-300 dark:text-slate-700">&bull;</span>
                                        <span className="text-slate-500 dark:text-slate-400 truncate max-w-[100px]">
                                            {job.experience || "Entry"}
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </aside>
    );
};

export default RecommendedJobs;

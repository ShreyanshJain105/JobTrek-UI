import { useEffect, useState } from "react";
import JobCard from "../FindJobs/JobCard";
import { getAllJobs } from "../Services/JobService";
import { jobList as fallbackJobs } from "../Data/JobsData";
import { IconSearchOff, IconBriefcase, IconArrowRight } from "@tabler/icons-react";
import { useParams, Link } from "react-router-dom";

interface CompanyJobsProps {
    companyName?: string;
}

const CompanyJobs = (props: CompanyJobsProps) => {
    const { name: paramName } = useParams<{ name?: string }>();
    const targetCompany = (props.companyName || paramName || "Google").trim();

    const [jobs, setJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getAllJobs()
            .then((res) => {
                const allList = (res && res.length > 0) ? res : fallbackJobs;
                // Filter strictly by the current company name (case-insensitive)
                const filtered = allList.filter((j: any) => {
                    const cName = (j.company || "").toLowerCase().trim();
                    const target = targetCompany.toLowerCase().trim();
                    return cName === target || cName.includes(target) || target.includes(cName);
                });
                setJobs(filtered);
                setLoading(false);
            })
            .catch(() => {
                const filtered = fallbackJobs.filter((j: any) => {
                    const cName = (j.company || "").toLowerCase().trim();
                    const target = targetCompany.toLowerCase().trim();
                    return cName === target || cName.includes(target) || target.includes(cName);
                });
                setJobs(filtered);
                setLoading(false);
            });
    }, [targetCompany]);

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                {[1, 2, 3, 4].map((n) => (
                    <div key={n} className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 animate-pulse h-48" />
                ))}
            </div>
        );
    }

    if (jobs.length === 0) {
        return (
            <div className="text-center py-12 px-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-white/5 flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center">
                    <IconSearchOff size={28} />
                </div>
                <div className="space-y-1 max-w-md">
                    <h4 className="text-base font-bold text-slate-900 dark:text-white font-display">
                        No Active Openings for {targetCompany}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        There are currently no open requisitions listed for {targetCompany}. Check back regularly or explore thousands of other tech openings across top enterprises.
                    </p>
                </div>
                <Link
                    to="/find-jobs"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 transition-all shadow-md mt-2"
                >
                    <span>Browse All Available Jobs</span>
                    <IconArrowRight size={14} />
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between text-xs sm:text-sm text-slate-600 dark:text-slate-400 px-1">
                <span className="flex items-center gap-1.5 font-medium">
                    <IconBriefcase size={16} className="text-amber-500" />
                    <span>
                        <strong className="text-slate-900 dark:text-white font-semibold">{jobs.length}</strong> active position{jobs.length !== 1 ? 's' : ''} currently hiring at <strong className="text-slate-900 dark:text-white">{targetCompany}</strong>
                    </span>
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {jobs.map((job, index) => (
                    <JobCard key={job.id || index} {...job} />
                ))}
            </div>
        </div>
    );
};

export default CompanyJobs;

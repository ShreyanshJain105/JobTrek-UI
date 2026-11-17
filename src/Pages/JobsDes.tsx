import { IconArrowLeft, IconChevronRight } from "@tabler/icons-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import JobDesc from "../JobDesc/JobDesc";
import RecommendedJobs from "../JobDesc/RecommendedJobs";
import { useEffect, useState } from "react";
import { getJob } from "../Services/JobService";

const JobsDes = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scroll(0, 0);
        setLoading(true);
        getJob(id)
            .then((res) => {
                setJob(res);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching job details:", err);
                setLoading(false);
            });
    }, [id]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans pb-16 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                {/* Navigation Breadcrumbs */}
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
                    <Link to="/find-jobs" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
                        Jobs
                    </Link>
                    <IconChevronRight size={14} className="text-slate-400 dark:text-slate-600" />
                    <span className="text-slate-800 dark:text-slate-200 font-medium truncate max-w-[200px] sm:max-w-xs">
                        {job?.jobTitle || "Job Details"}
                    </span>
                </div>

                <div className="mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-white/10 hover:border-amber-500/30 transition-all shadow-sm"
                    >
                        <IconArrowLeft size={16} className="text-amber-500 dark:text-amber-400" />
                        <span>Back</span>
                    </button>
                </div>

                {/* Main Content Layout */}
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {loading ? (
                        <div className="flex-1 w-full p-8 rounded-3xl bg-slate-900/60 border border-white/10 animate-pulse space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-white/10" />
                                <div className="flex-1 space-y-3">
                                    <div className="h-6 bg-white/10 rounded w-1/3" />
                                    <div className="h-4 bg-white/5 rounded w-1/4" />
                                </div>
                            </div>
                            <div className="h-32 bg-white/5 rounded-2xl" />
                            <div className="h-48 bg-white/5 rounded-2xl" />
                        </div>
                    ) : (
                        <JobDesc {...job} />
                    )}
                    <RecommendedJobs />
                </div>
            </div>
        </div>
    );
};

export default JobsDes;

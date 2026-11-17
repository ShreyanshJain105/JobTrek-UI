import { IconArrowLeft, IconChevronRight } from "@tabler/icons-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ApplyJobComp from "../ApplyJob/ApplyJobComp";
import { useEffect, useState } from "react";
import { getJob } from "../Services/JobService";

const ApplyJobPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
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
                console.error("Error fetching job details for application:", err);
                setLoading(false);
            });
    }, [id]);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                {/* Navigation Breadcrumbs */}
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 mb-6">
                    <Link to="/find-jobs" className="hover:text-amber-400 transition-colors">
                        Jobs
                    </Link>
                    <IconChevronRight size={14} className="text-slate-600" />
                    <Link to={`/jobs/${id}`} className="hover:text-amber-400 transition-colors truncate max-w-[150px] sm:max-w-xs">
                        {job?.jobTitle || "Job"}
                    </Link>
                    <IconChevronRight size={14} className="text-slate-600" />
                    <span className="text-amber-400 font-medium">Apply</span>
                </div>

                <div className="mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-white/10 hover:border-amber-500/30 transition-all shadow-sm"
                    >
                        <IconArrowLeft size={16} className="text-amber-400" />
                        <span>Back</span>
                    </button>
                </div>

                {loading ? (
                    <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 animate-pulse space-y-6">
                        <div className="h-6 bg-white/10 rounded w-1/3" />
                        <div className="h-10 bg-white/5 rounded" />
                        <div className="h-10 bg-white/5 rounded" />
                        <div className="h-32 bg-white/5 rounded" />
                    </div>
                ) : (
                    <ApplyJobComp {...job} />
                )}
            </div>
        </div>
    );
};

export default ApplyJobPage;

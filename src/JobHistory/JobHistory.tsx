import { useEffect, useState } from "react";
import Card from "./Card";
import { getAllJobs } from "../Services/JobService";
import { useSelector } from "react-redux";
import { 
    IconHistory, 
    IconBookmark, 
    IconSend, 
    IconCalendarCheck, 
    IconChecklist,
    IconSearchOff
} from "@tabler/icons-react";

const JobHistory = () => {
    const [activeTab, setActiveTab] = useState<string>('APPLIED');
    const user = useSelector((state: any) => state.user);
    const profile = useSelector((state: any) => state.profile);
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
                console.error("Error loading jobs history:", err);
                setLoading(false);
            });
    }, []);

    const appliedJobs = jobList.filter((job: any) =>
        job.applicants?.some(
            (applicant: any) => applicant.applicantId === user?.id && applicant.applicationStatus === "APPLIED"
        )
    );

    const savedJobs = jobList.filter((job: any) =>
        profile?.savedJobs?.includes(job.id)
    );

    const offeredJobs = jobList.filter((job: any) =>
        job.applicants?.some(
            (applicant: any) => applicant.applicantId === user?.id && applicant.applicationStatus === "OFFERED"
        )
    );

    const interviewingJobs = jobList.filter((job: any) =>
        job.applicants?.some(
            (applicant: any) => applicant.applicantId === user?.id && applicant.applicationStatus === "INTERVIEWING"
        )
    );

    let displayList = appliedJobs;
    if (activeTab === "SAVED") displayList = savedJobs;
    else if (activeTab === "OFFERED") displayList = offeredJobs;
    else if (activeTab === "INTERVIEWING") displayList = interviewingJobs;

    return (
        <div className="flex flex-col gap-8 max-w-7xl mx-auto">
            {/* Header / Hero Banner */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 backdrop-blur-xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                        <IconHistory size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                            Application Journey
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-400 mt-1">
                            Track your active submissions, bookmarks, scheduled interviews, and incoming offers.
                        </p>
                    </div>
                </div>
            </div>

            {/* Stage Selector Tabs */}
            <div className="p-1 rounded-2xl bg-slate-900/60 border border-white/5 flex flex-wrap gap-1">
                <button
                    type="button"
                    onClick={() => setActiveTab("APPLIED")}
                    className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                        activeTab === "APPLIED"
                            ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                            : "text-slate-400 hover:text-white"
                    }`}
                >
                    <IconSend size={16} />
                    <span>Applied</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                        activeTab === "APPLIED" ? "bg-slate-950/20 text-slate-950 font-bold" : "bg-white/5 text-slate-400"
                    }`}>
                        {appliedJobs.length}
                    </span>
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab("SAVED")}
                    className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                        activeTab === "SAVED"
                            ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                            : "text-slate-400 hover:text-white"
                    }`}
                >
                    <IconBookmark size={16} />
                    <span>Saved Roles</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                        activeTab === "SAVED" ? "bg-slate-950/20 text-slate-950 font-bold" : "bg-white/5 text-slate-400"
                    }`}>
                        {savedJobs.length}
                    </span>
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab("INTERVIEWING")}
                    className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                        activeTab === "INTERVIEWING"
                            ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                            : "text-slate-400 hover:text-white"
                    }`}
                >
                    <IconCalendarCheck size={16} />
                    <span>Interviews</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                        activeTab === "INTERVIEWING" ? "bg-slate-950/20 text-slate-950 font-bold" : "bg-white/5 text-slate-400"
                    }`}>
                        {interviewingJobs.length}
                    </span>
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab("OFFERED")}
                    className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                        activeTab === "OFFERED"
                            ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                            : "text-slate-400 hover:text-white"
                    }`}
                >
                    <IconChecklist size={16} />
                    <span>Offers</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                        activeTab === "OFFERED" ? "bg-slate-950/20 text-slate-950 font-bold" : "bg-white/5 text-slate-400"
                    }`}>
                        {offeredJobs.length}
                    </span>
                </button>
            </div>

            {/* List or Loading Grid */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((n) => (
                        <div key={n} className="p-6 rounded-3xl bg-slate-900/50 border border-white/5 animate-pulse flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-white/10" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-white/10 rounded w-2/3" />
                                    <div className="h-3 bg-white/5 rounded w-1/3" />
                                </div>
                            </div>
                            <div className="h-8 bg-white/5 rounded" />
                            <div className="h-10 bg-white/5 rounded-xl" />
                        </div>
                    ))}
                </div>
            ) : displayList.length === 0 ? (
                <div className="glass-panel p-12 rounded-3xl border border-white/10 text-center flex flex-col items-center justify-center my-6">
                    <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
                        <IconSearchOff size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-white font-display">
                        No Roles in &quot;{activeTab.toLowerCase()}&quot;
                    </h3>
                    <p className="text-sm text-slate-400 max-w-sm mt-1">
                        {activeTab === "APPLIED" && "You haven't submitted any job applications yet."}
                        {activeTab === "SAVED" && "You haven't bookmarked any jobs yet. Browse jobs to save interesting roles."}
                        {activeTab === "INTERVIEWING" && "No interviews scheduled yet. You'll be notified when employers schedule one."}
                        {activeTab === "OFFERED" && "No formal offers extended at this moment."}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayList.map((job: any, index: number) => (
                        <Card
                            key={job.id || index}
                            {...job}
                            {...{ [activeTab.toLowerCase()]: true }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default JobHistory;

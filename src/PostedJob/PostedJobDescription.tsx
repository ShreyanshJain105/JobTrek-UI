import { useEffect, useState } from "react";
import JobDesc from "../JobDesc/JobDesc";
import TalentCard from "../FindTalent/TalentCard";
import { 
    IconLayoutDashboard, 
    IconUsers, 
    IconCalendarCheck, 
    IconChecklist, 
    IconUserX, 
    IconMapPin, 
    IconBriefcase,
    IconSearchOff
} from "@tabler/icons-react";

const PostedJobDescription = (props: any) => {
    const [tab, setTab] = useState("overview");
    const [candidateList, setCandidateList] = useState<any[]>([]);

    const appliedCandidates = props.applicants?.filter((x: any) => x.applicationStatus === "APPLIED") || [];
    const invitedCandidates = props.applicants?.filter((x: any) => x.applicationStatus === "INTERVIEWING") || [];
    const offeredCandidates = props.applicants?.filter((x: any) => x.applicationStatus === "OFFERED") || [];
    const rejectedCandidates = props.applicants?.filter((x: any) => x.applicationStatus === "REJECTED") || [];

    const handleTabChange = (value: string) => {
        setTab(value);
        if (value === "applicants") {
            setCandidateList(appliedCandidates);
        } else if (value === "invited") {
            setCandidateList(invitedCandidates);
        } else if (value === "offered") {
            setCandidateList(offeredCandidates);
        } else if (value === "rejected") {
            setCandidateList(rejectedCandidates);
        } else {
            setCandidateList([]);
        }
    };

    useEffect(() => {
        handleTabChange("overview");
    }, [props]);

    if (!props.jobTitle) {
        return (
            <div className="flex-1 glass-panel p-12 rounded-3xl border border-white/10 flex flex-col items-center justify-center min-h-[50vh] text-center">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
                    <IconBriefcase size={32} />
                </div>
                <h3 className="text-xl font-bold text-white font-display">No Job Selected</h3>
                <p className="text-sm text-slate-400 max-w-sm mt-1">
                    Select a job listing from the sidebar or publish a new role to view applicant pipelines and job metrics.
                </p>
            </div>
        );
    }

    return (
        <div className="flex-1 min-w-0 flex flex-col gap-6">
            {/* Header / Pipeline Overview Card */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 backdrop-blur-xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                            {props.jobTitle}
                        </h2>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                            props.jobStatus === "ACTIVE" 
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                : props.jobStatus === "DRAFT"
                                ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                : "bg-slate-800 text-slate-400 border border-white/5"
                        }`}>
                            {props.jobStatus}
                        </span>
                    </div>

                    <div className="text-xs sm:text-sm text-slate-400 mt-1 flex items-center gap-3">
                        <span className="flex items-center gap-1">
                            <IconMapPin size={14} className="text-slate-500" />
                            {props.location || "Remote"}
                        </span>
                        <span className="text-slate-600">&bull;</span>
                        <span className="font-semibold text-slate-300">
                            {props.applicants?.length || 0} Total Application{(props.applicants?.length === 1) ? "" : "s"}
                        </span>
                    </div>
                </div>
            </div>

            {/* Pipeline Stage Tabs */}
            <div className="p-1 rounded-2xl bg-slate-900/60 border border-white/5 flex flex-wrap gap-1">
                <button
                    type="button"
                    onClick={() => handleTabChange("overview")}
                    className={`flex-1 min-w-[110px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                        tab === "overview"
                            ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                            : "text-slate-400 hover:text-white"
                    }`}
                >
                    <IconLayoutDashboard size={16} />
                    <span>Overview</span>
                </button>

                <button
                    type="button"
                    onClick={() => handleTabChange("applicants")}
                    className={`flex-1 min-w-[110px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                        tab === "applicants"
                            ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                            : "text-slate-400 hover:text-white"
                    }`}
                >
                    <IconUsers size={16} />
                    <span>Applicants</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                        tab === "applicants" ? "bg-slate-950/20 text-slate-950 font-bold" : "bg-white/5 text-slate-400"
                    }`}>
                        {appliedCandidates.length}
                    </span>
                </button>

                <button
                    type="button"
                    onClick={() => handleTabChange("invited")}
                    className={`flex-1 min-w-[110px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                        tab === "invited"
                            ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                            : "text-slate-400 hover:text-white"
                    }`}
                >
                    <IconCalendarCheck size={16} />
                    <span>Invited</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                        tab === "invited" ? "bg-slate-950/20 text-slate-950 font-bold" : "bg-white/5 text-slate-400"
                    }`}>
                        {invitedCandidates.length}
                    </span>
                </button>

                <button
                    type="button"
                    onClick={() => handleTabChange("offered")}
                    className={`flex-1 min-w-[110px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                        tab === "offered"
                            ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                            : "text-slate-400 hover:text-white"
                    }`}
                >
                    <IconChecklist size={16} />
                    <span>Offered</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                        tab === "offered" ? "bg-slate-950/20 text-slate-950 font-bold" : "bg-white/5 text-slate-400"
                    }`}>
                        {offeredCandidates.length}
                    </span>
                </button>

                <button
                    type="button"
                    onClick={() => handleTabChange("rejected")}
                    className={`flex-1 min-w-[110px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                        tab === "rejected"
                            ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                            : "text-slate-400 hover:text-white"
                    }`}
                >
                    <IconUserX size={16} />
                    <span>Rejected</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                        tab === "rejected" ? "bg-slate-950/20 text-slate-950 font-bold" : "bg-white/5 text-slate-400"
                    }`}>
                        {rejectedCandidates.length}
                    </span>
                </button>
            </div>

            {/* Stage Panels */}
            {tab === "overview" && (
                <div className="w-full">
                    <JobDesc
                        {...props}
                        edit={true}
                        closed={props.jobStatus === "CLOSED"}
                    />
                </div>
            )}

            {tab !== "overview" && (
                <div className="w-full">
                    {candidateList.length === 0 ? (
                        <div className="glass-panel p-12 rounded-3xl border border-white/10 text-center flex flex-col items-center justify-center my-4">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 mb-3">
                                <IconSearchOff size={28} />
                            </div>
                            <h4 className="text-base font-bold text-white font-display">No Candidates in this Stage</h4>
                            <p className="text-xs text-slate-400 max-w-sm mt-1">
                                {tab === "applicants" && "No unreviewed applications remaining for this role."}
                                {tab === "invited" && "No candidates have been scheduled for an interview yet."}
                                {tab === "offered" && "No formal job offers have been extended yet."}
                                {tab === "rejected" && "No candidates have been disqualified."}
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
                            {candidateList.map((talent: any, idx: number) => (
                                <TalentCard
                                    key={idx}
                                    {...talent}
                                    posted={tab === "applicants"}
                                    invited={tab === "invited"}
                                    offered={tab === "offered"}
                                    rejected={tab === "rejected"}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PostedJobDescription;

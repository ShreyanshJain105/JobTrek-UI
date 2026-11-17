import PostedJobCard from "./PostedJobcard";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { IconPlus, IconBriefcase } from "@tabler/icons-react";

const PostedJobb = (props: any) => {
    const { id } = useParams();
    const selectedId = Number(id);
    const [activeTab, setActiveTab] = useState<string>("ACTIVE");

    useEffect(() => {
        if (props.job?.jobStatus) {
            setActiveTab(props.job.jobStatus);
        }
    }, [props.job]);

    const activeCount = props.jobList?.filter((j: any) => j?.jobStatus === "ACTIVE").length || 0;
    const draftCount = props.jobList?.filter((j: any) => j?.jobStatus === "DRAFT").length || 0;
    const closedCount = props.jobList?.filter((j: any) => j?.jobStatus === "CLOSED").length || 0;

    const currentList = props.jobList?.filter((j: any) => j?.jobStatus === activeTab) || [];

    return (
        <div className="w-full flex flex-col gap-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                        <IconBriefcase size={18} />
                    </div>
                    <h3 className="text-lg font-bold text-white font-display">Manage Roles</h3>
                </div>
                <Link
                    to="/post-job"
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 transition-colors shadow-sm"
                >
                    <IconPlus size={14} />
                    <span>New</span>
                </Link>
            </div>

            {/* Status Pills */}
            <div className="p-1 rounded-2xl bg-slate-900/80 border border-white/5 flex gap-1">
                <button
                    type="button"
                    onClick={() => setActiveTab("ACTIVE")}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                        activeTab === "ACTIVE"
                            ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                            : "text-slate-400 hover:text-white"
                    }`}
                >
                    <span>Active</span>
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                        activeTab === "ACTIVE" ? "bg-slate-950/20 text-slate-950" : "bg-white/5 text-slate-400"
                    }`}>
                        {activeCount}
                    </span>
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab("DRAFT")}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                        activeTab === "DRAFT"
                            ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                            : "text-slate-400 hover:text-white"
                    }`}
                >
                    <span>Drafts</span>
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                        activeTab === "DRAFT" ? "bg-slate-950/20 text-slate-950" : "bg-white/5 text-slate-400"
                    }`}>
                        {draftCount}
                    </span>
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab("CLOSED")}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                        activeTab === "CLOSED"
                            ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                            : "text-slate-400 hover:text-white"
                    }`}
                >
                    <span>Closed</span>
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                        activeTab === "CLOSED" ? "bg-slate-950/20 text-slate-950" : "bg-white/5 text-slate-400"
                    }`}>
                        {closedCount}
                    </span>
                </button>
            </div>

            {/* List */}
            <div className="flex flex-col gap-2.5 max-h-[70vh] overflow-y-auto pr-1">
                {currentList.length === 0 ? (
                    <div className="text-center py-8 text-xs text-slate-500">
                        No {activeTab.toLowerCase()} roles found.
                    </div>
                ) : (
                    currentList.map((item: any) => (
                        <PostedJobCard
                            key={item.id}
                            {...item}
                            selectedId={selectedId}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default PostedJobb;

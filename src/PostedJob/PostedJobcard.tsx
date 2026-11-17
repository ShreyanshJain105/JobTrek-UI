import { Link } from "react-router-dom";
import { timeAgo } from "../Services/Utilities";
import { IconMapPin, IconUsers } from "@tabler/icons-react";

const PostedJobCard = (props: any) => {
    const isSelected = props.id === props.selectedId;

    return (
        <Link
            to={`/posted-jobs/${props.id}`}
            className={`group relative p-3.5 sm:p-4 rounded-2xl transition-all duration-200 border flex flex-col gap-2 ${
                isSelected
                    ? "bg-amber-500/10 border-amber-500/40 shadow-lg shadow-amber-500/5 ring-1 ring-amber-500/30"
                    : "bg-slate-900/40 hover:bg-slate-900/80 border-white/[0.06] hover:border-white/10"
            }`}
        >
            <div className="flex items-start justify-between gap-2">
                <h4 className={`text-sm font-bold font-display truncate transition-colors ${
                    isSelected ? "text-amber-400" : "text-white group-hover:text-amber-300"
                }`}>
                    {props.jobTitle}
                </h4>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                    props.jobStatus === "ACTIVE" 
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : props.jobStatus === "DRAFT"
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        : "bg-slate-800 text-slate-400 border border-white/5"
                }`}>
                    {props.jobStatus}
                </span>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-white/[0.04]">
                <span className="flex items-center gap-1 truncate">
                    <IconMapPin size={12} className="text-slate-500 shrink-0" />
                    <span className="truncate">{props.location || "Remote"}</span>
                </span>
                <span className="text-[11px] text-slate-500 shrink-0">
                    {timeAgo(props.postTime)}
                </span>
            </div>

            {props.applicants && (
                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <IconUsers size={12} className="text-amber-400" />
                    <span>{props.applicants.length} Applicant{props.applicants.length === 1 ? "" : "s"}</span>
                </div>
            )}
        </Link>
    );
};

export default PostedJobCard;

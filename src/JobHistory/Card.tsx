import { 
    IconBookmark, 
    IconBookmarkFilled, 
    IconCalendarMonth, 
    IconMapPin, 
    IconBriefcase, 
    IconCurrencyDollar, 
    IconArrowUpRight,
    IconCheck,
    IconX
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { timeAgo, timeAgoOrFromNow } from "../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";

const Card = (props: any) => {
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.profile);

    const handleSaveJob = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        let savedJobs: any = profile.savedJobs ? [...profile.savedJobs] : [];

        if (savedJobs.includes(props.id)) {
            savedJobs = savedJobs.filter((id: any) => id !== props.id);
        } else {
            savedJobs = [...savedJobs, props.id];
        }
        dispatch(changeProfile({ ...profile, savedJobs }));
    };

    const isSaved = profile.savedJobs?.includes(props.id);

    return (
        <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-white/[0.08] hover:border-amber-500/30 backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5 flex flex-col justify-between group h-full">
            <div className="flex flex-col gap-4">
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/10 p-2.5 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                            <img
                                className="w-full h-full object-contain"
                                src={props.companyIcon || (props.company ? localStorage.getItem(`company_icon_${props.company.toLowerCase()}`) : null) || `/Icons/${props.company}.png`}
                                alt={props.company || "Company"}
                                onError={(e: any) => {
                                    e.target.style.display = 'none';
                                    e.target.parentElement.innerHTML = `<span class="text-amber-400 font-bold text-lg font-display">${(props.company || "C").charAt(0)}</span>`;
                                }}
                            />
                        </div>

                        <div className="min-w-0">
                            <h3 className="font-bold text-base sm:text-lg text-white font-display group-hover:text-amber-400 transition-colors truncate">
                                {props.jobTitle}
                            </h3>
                            <p className="text-xs text-slate-400 font-medium truncate mt-0.5">
                                {props.company} &bull; <span className="text-slate-500">{props.applicants?.length || 0} applicants</span>
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleSaveJob}
                        className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-slate-400 hover:text-amber-400 transition-colors shrink-0"
                    >
                        {isSaved ? (
                            <IconBookmarkFilled size={18} className="text-amber-400" />
                        ) : (
                            <IconBookmark size={18} />
                        )}
                    </button>
                </div>

                {/* Badge Pills */}
                <div className="flex flex-wrap gap-1.5">
                    {props.experience && (
                        <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-slate-300 text-[11px] font-medium flex items-center gap-1">
                            <IconBriefcase size={12} className="text-slate-500" />
                            {props.experience}
                        </span>
                    )}
                    {props.jobType && (
                        <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-slate-300 text-[11px] font-medium">
                            {props.jobType}
                        </span>
                    )}
                    {props.location && (
                        <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-slate-300 text-[11px] font-medium flex items-center gap-1">
                            <IconMapPin size={12} className="text-slate-500" />
                            {props.location}
                        </span>
                    )}
                </div>

                {/* Brief Summary */}
                {props.about && (
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {props.about}
                    </p>
                )}

                {/* Interview Alert Banner */}
                {(props.interviewing || (props.applicationStatus === "INTERVIEWING" && props.interviewTime)) && (
                    <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-2.5 text-xs text-amber-400 font-semibold">
                        <IconCalendarMonth size={16} className="shrink-0" />
                        <span>Interview: {timeAgoOrFromNow(props.interviewTime)}</span>
                    </div>
                )}
            </div>

            {/* Bottom Meta & Actions */}
            <div className="pt-4 mt-4 border-t border-white/[0.06] flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs">
                    <span className="text-emerald-400 font-bold flex items-center gap-1 text-sm">
                        <IconCurrencyDollar size={16} />
                        {props.packageOffered || props.package} LPA
                    </span>
                    <span className="text-slate-500 text-[11px]">
                        Posted {timeAgo(props.postTime)}
                    </span>
                </div>

                {/* Offer Action Buttons */}
                {props.offered && (
                    <div className="flex gap-2">
                        <button
                            type="button"
                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all"
                        >
                            <IconCheck size={14} />
                            <span>Accept Offer</span>
                        </button>
                        <button
                            type="button"
                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 transition-all"
                        >
                            <IconX size={14} />
                            <span>Decline</span>
                        </button>
                    </div>
                )}

                <Link
                    to={`/jobs/${props.id}`}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-white/10 hover:border-amber-500/30 transition-all shadow-sm"
                >
                    <span>View Role Details</span>
                    <IconArrowUpRight size={14} className="text-amber-400" />
                </Link>
            </div>
        </div>
    );
};

export default Card;

import { Button, Text } from "@mantine/core";
import { IconBookmark, IconBookmarkFilled, IconClock, IconMapPin } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { timeAgo } from "../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";

const JobCard = (props: any) => {
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.profile);

    const handleSaveJob = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        let savedJobs: any = profile?.savedJobs ? [...profile.savedJobs] : [];
        if (savedJobs.includes(props.id)) {
            savedJobs = savedJobs.filter((id: any) => id !== props.id);
        } else {
            savedJobs = [...savedJobs, props.id];
        }
        dispatch(changeProfile({ ...profile, savedJobs }));
    };

    const isSaved = profile?.savedJobs?.includes(props.id);
    const companyIconSrc = props.companyIcon || (props.company ? localStorage.getItem(`company_icon_${props.company.toLowerCase()}`) : null) || `/Icons/${props.company}.svg`;

    return (
        <div className="group relative p-5 rounded-2xl bg-white dark:bg-slate-900/70 hover:bg-slate-50/80 dark:hover:bg-slate-900/95 border border-slate-200/90 dark:border-white/[0.07] hover:border-amber-500/40 dark:hover:border-amber-500/35 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 shadow-xs hover:shadow-lg dark:hover:shadow-glow-sm flex flex-col justify-between gap-4 h-full">
            {/* Top Row: Company & Title & Bookmark */}
            <div>
                <div className="flex items-start justify-between gap-3">
                    <div className="flex gap-3 items-center min-w-0">
                        <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-white/10 p-2 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                            <img 
                                className="w-full h-full object-contain" 
                                src={companyIconSrc} 
                                alt={props.company || "Company"}
                                onError={(e: any) => {
                                    if (e.target.src.endsWith('.svg')) {
                                        e.target.src = `/Icons/${props.company}.png`;
                                    } else {
                                        e.target.style.display = 'none';
                                        e.target.parentElement.innerHTML = `<span class="text-amber-500 dark:text-amber-400 font-bold text-base font-display">${(props.company || "C").charAt(0)}</span>`;
                                    }
                                }}
                            />
                        </div>
                        <div className="min-w-0">
                            <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors truncate font-display">
                                {props.jobTitle}
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                                <Link to={`/company/${props.company}`} className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-medium">
                                    {props.company}
                                </Link>
                                <span className="mx-1.5 text-slate-300 dark:text-slate-600">&bull;</span>
                                <span className="text-slate-500 dark:text-slate-400">{props.applicants?.length || 0} applied</span>
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleSaveJob}
                        aria-label={isSaved ? "Remove from saved jobs" : "Save job"}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-all shrink-0 cursor-pointer"
                    >
                        {isSaved ? (
                            <IconBookmarkFilled size={20} className="text-amber-500 dark:text-amber-400" />
                        ) : (
                            <IconBookmark size={20} />
                        )}
                    </button>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                    {props.experience && (
                        <span className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/[0.05]">
                            {props.experience}
                        </span>
                    )}
                    {props.jobType && (
                        <span className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/[0.05]">
                            {props.jobType}
                        </span>
                    )}
                    {props.location && (
                        <span className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/[0.05] flex items-center gap-1">
                            <IconMapPin size={12} className="text-amber-500 dark:text-amber-400" />
                            {props.location}
                        </span>
                    )}
                </div>

                {/* About snippet */}
                <Text lineClamp={2} className="!text-xs text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                    {props.about || props.description?.replace(/<[^>]+>/g, '') || "Exciting opportunity to build cutting-edge software with our team."}
                </Text>
            </div>

            {/* Bottom Row: Salary + Action */}
            <div className="pt-3 border-t border-slate-200/80 dark:border-white/[0.06] flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500">Package</span>
                        <div className="text-sm font-bold text-slate-900 dark:text-white font-mono flex items-center gap-0.5">
                            <span className="text-amber-500 dark:text-amber-400">&#8377;</span>{props.packageOffered} <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">LPA</span>
                        </div>
                    </div>

                    <div className="text-[11px] text-slate-500 flex items-center gap-1 font-mono">
                        <IconClock size={13} />
                        <span>{timeAgo(props.postTime)}</span>
                    </div>
                </div>

                <Link to={`/jobs/${props.id}`} className="w-full">
                    <Button 
                        fullWidth
                        variant="subtle"
                        size="xs"
                        className="bg-amber-500/10 hover:bg-amber-500 hover:text-slate-950 text-amber-600 dark:text-amber-300 border border-amber-500/30 font-semibold rounded-xl py-2 transition-all duration-200"
                    >
                        View Details
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default JobCard;

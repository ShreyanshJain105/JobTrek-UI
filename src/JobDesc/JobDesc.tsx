import { Button } from "@mantine/core";
import { IconBookmark, IconBookmarkFilled, IconCheck } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { card } from "../Data/JobDescData";
import DOMPurify from 'dompurify';
import { timeAgo } from "../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { useEffect, useState } from "react";
import { postJob } from "../Services/JobService";
import { errorNotification, successNotification } from "../Services/NotificationService";

const JobDesc = (props: any) => {
    const user = useSelector((state: any) => state.user);
    const [applied, setapplied] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const profile = useSelector((state: any) => state.profile);

    const handleSaveJob = () => {
        let savedJobs: any = profile?.savedJobs ? [...profile.savedJobs] : [];
        if (savedJobs.includes(props.id)) {
            savedJobs = savedJobs.filter((id: any) => id !== props.id);
        } else {
            savedJobs = [...savedJobs, props.id];
        }
        dispatch(changeProfile({ ...profile, savedJobs }));
    };

    useEffect(() => {
        if (props.applicants?.some((applicant: any) => applicant.applicantId === user?.id)) {
            setapplied(true);
        } else {
            setapplied(false);
        }
    }, [props.applicants, user?.id]);

    const data = DOMPurify.sanitize(props.description || "");
    const isSuperadmin = user?.accountType === "SUPERADMIN";
    const canManage = props.edit || isSuperadmin;

    const handleClose = () => {
        postJob({ ...props, jobStatus: "CLOSED" })
            .then(() => {
                successNotification("Job Closed", "The job has been closed successfully");
                setTimeout(() => {
                    navigate(isSuperadmin ? "/admin" : "/posted-job");
                }, 300);
            })
            .catch(() => {
                errorNotification("Job Not Closed", "The job could not be closed. Please try again.");
            });
    };

    const isSaved = profile?.savedJobs?.includes(props.id);
    const companyIconSrc = props.companyIcon || (props.company ? localStorage.getItem(`company_icon_${props.company.toLowerCase()}`) : null) || `/Icons/${props.company}.svg` || `/Icons/${props.company}.png`;

    return (
        <div className="flex-1 min-w-0 flex flex-col gap-8">
            {/* Main Header Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-white/[0.08] backdrop-blur-xl shadow-md dark:shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-colors">
                <div className="flex gap-4 items-center min-w-0">
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-white/10 p-3 flex items-center justify-center shrink-0 shadow-sm">
                        <img 
                            className="w-full h-full object-contain" 
                            src={companyIconSrc} 
                            alt={props.company || "Company"} 
                            onError={(e: any) => {
                                if (e.target.src.endsWith('.svg')) {
                                    e.target.src = `/Icons/${props.company}.png`;
                                } else {
                                    e.target.style.display = 'none';
                                    e.target.parentElement.innerHTML = `<span class="text-amber-500 dark:text-amber-400 font-bold text-2xl font-display">${(props.company || "C").charAt(0)}</span>`;
                                }
                            }}
                        />
                    </div>
                    <div className="min-w-0">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight truncate">
                            {props.jobTitle}
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 flex flex-wrap items-center gap-2">
                            <Link to={`/company/${props.company}`} className="text-amber-600 dark:text-amber-400 hover:text-amber-500 font-semibold transition-colors">
                                {props.company}
                            </Link>
                            <span className="text-slate-300 dark:text-slate-600">&bull;</span>
                            <span>Posted {timeAgo(props.postTime)}</span>
                            <span className="text-slate-300 dark:text-slate-600">&bull;</span>
                            <span className="font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded-full text-xs">
                                {props.applicants?.length || 0} Applicants
                            </span>
                        </p>
                    </div>
                </div>

                {/* Header CTA Buttons */}
                <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
                    <button
                        type="button"
                        onClick={handleSaveJob}
                        aria-label="Save job"
                        className="p-3 rounded-xl bg-slate-100 dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 transition-all shrink-0 cursor-pointer"
                    >
                        {isSaved ? <IconBookmarkFilled size={20} className="text-amber-500 dark:text-amber-400" /> : <IconBookmark size={20} />}
                    </button>

                    {(canManage || !applied) && (
                        <Link to={canManage ? `/post-job/${props.id}` : `/apply-job/${props.id}`} className="flex-1 md:flex-initial">
                            <Button 
                                size="md"
                                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 rounded-xl shadow-glow-sm transition-all"
                            >
                                {props.closed ? "Reopen Role" : canManage ? "Edit Role" : "Apply Now"}
                            </Button>
                        </Link>
                    )}

                    {!canManage && applied && (
                        <Button 
                            size="md" 
                            disabled 
                            leftSection={<IconCheck size={18} />}
                            className="w-full md:w-auto bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 rounded-xl font-bold cursor-default"
                        >
                            Application Submitted
                        </Button>
                    )}

                    {canManage && !props.closed && (
                        <Button 
                            color="red" 
                            variant="subtle"
                            size="md" 
                            onClick={handleClose}
                            className="hover:bg-red-500/10 text-red-500 dark:text-red-400 rounded-xl"
                        >
                            Close Listing
                        </Button>
                    )}
                </div>
            </div>

            {/* Quick Facts Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {card.map((item: any, index: number) => (
                    <div key={index} className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/[0.07] backdrop-blur-xl flex flex-col gap-1 shadow-xs transition-colors">
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-mono uppercase tracking-wider">
                            <item.icon size={16} className="text-amber-500 dark:text-amber-400" />
                            <span>{item.name}</span>
                        </div>
                        <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-mono mt-1">
                            {props ? props[item.id] : "NA"} {item.id === "packageOffered" && <span className="text-xs text-amber-500 dark:text-amber-400 font-normal">LPA</span>}
                        </div>
                    </div>
                ))}
            </div>

            {/* Required Skills Section */}
            {props?.skillsRequired && props.skillsRequired.length > 0 && (
                <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/[0.07] backdrop-blur-xl flex flex-col gap-4 shadow-xs transition-colors">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display uppercase tracking-wide">
                        Required Core Competencies
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {props.skillsRequired.map((skill: string, index: number) => (
                            <span 
                                key={index} 
                                className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30 tracking-wide shadow-xs"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Job Description (Sanitized HTML) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/[0.07] backdrop-blur-xl flex flex-col gap-4 shadow-xs transition-colors">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display uppercase tracking-wide">
                    Role Overview & Responsibilities
                </h2>
                <div 
                    className="prose prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed [&_h3]:text-slate-900 dark:[&_h3]:text-white [&_h4]:text-slate-900 dark:[&_h4]:text-white [&_li]:my-1.5 [&_ul]:list-disc [&_ul]:pl-5 [&_p]:my-3"
                    dangerouslySetInnerHTML={{ __html: data }} 
                />
            </div>

            {/* About Company Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/[0.07] backdrop-blur-xl flex flex-col gap-5 shadow-xs transition-colors">
                <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-slate-200 dark:border-white/[0.06]">
                    <div className="flex gap-3 items-center">
                        <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 p-2 flex items-center justify-center border border-slate-200 dark:border-white/10 shadow-xs">
                            <img 
                                className="w-full h-full object-contain" 
                                src={companyIconSrc} 
                                alt="" 
                                onError={(e: any) => {
                                    e.target.style.display = 'none';
                                    e.target.parentElement.innerHTML = `<span class="text-amber-500 dark:text-amber-400 font-bold text-base font-display">${(props.company || "C").charAt(0)}</span>`;
                                }}
                            />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white font-display">{props.company}</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Enterprise Technology Partner</p>
                        </div>
                    </div>
                    <Link to={`/company/${props.company}`}>
                        <Button 
                            variant="subtle" 
                            color="yellow" 
                            size="sm"
                            className="text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 rounded-xl font-semibold"
                        >
                            View Company Profile &rarr;
                        </Button>
                    </Link>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {props.about || "A forward-thinking organization committed to delivering innovative solutions, exceptional value, and long-term impact. Built on a culture of excellence, integrity, and cross-functional engineering autonomy."}
                </p>
            </div>
        </div>
    );
};

export default JobDesc;

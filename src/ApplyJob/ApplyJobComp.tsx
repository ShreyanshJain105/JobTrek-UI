import ApplicationForm from "./ApplicationForm";
import { timeAgo } from "../Services/Utilities";
import { IconMapPin, IconUsers, IconCurrencyDollar, IconClock } from "@tabler/icons-react";

const ApplyJobComp = (props: any) => {
    return (
        <div className="w-full flex flex-col gap-8">
            {/* Header Hero Card */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 backdrop-blur-xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-4 sm:gap-5 min-w-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-900 border border-white/10 p-3 flex items-center justify-center shrink-0 shadow-md">
                        <img
                            className="w-full h-full object-contain"
                            src={`/Icons/${props.company}.png`}
                            alt={props.company || "Company"}
                            onError={(e: any) => {
                                e.target.style.display = 'none';
                                e.target.parentElement.innerHTML = `<span class="text-amber-400 font-bold text-2xl font-display">${(props.company || "C").charAt(0)}</span>`;
                            }}
                        />
                    </div>
                    <div className="min-w-0">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1.5">
                            Role Application
                        </div>
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white font-display tracking-tight truncate">
                            {props.jobTitle}
                        </h1>
                        <div className="text-xs sm:text-sm text-slate-400 mt-1 flex flex-wrap items-center gap-3">
                            <span className="font-semibold text-slate-300">{props.company}</span>
                            <span className="text-slate-600">&bull;</span>
                            <span className="flex items-center gap-1">
                                <IconClock size={14} className="text-slate-500" />
                                {timeAgo(props.postTime)}
                            </span>
                            <span className="text-slate-600">&bull;</span>
                            <span className="flex items-center gap-1">
                                <IconUsers size={14} className="text-slate-500" />
                                {props.applicants ? props.applicants.length : 0} applicants
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap md:flex-col items-start md:items-end gap-2 shrink-0">
                    {props.package && (
                        <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold flex items-center gap-1">
                            <IconCurrencyDollar size={16} />
                            {props.package} LPA
                        </div>
                    )}
                    {props.location && (
                        <div className="text-xs text-slate-400 flex items-center gap-1">
                            <IconMapPin size={14} className="text-slate-500" />
                            {props.location}
                        </div>
                    )}
                </div>
            </div>

            {/* Application Form */}
            <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 backdrop-blur-xl shadow-xl">
                <ApplicationForm />
            </div>
        </div>
    );
};

export default ApplyJobComp;

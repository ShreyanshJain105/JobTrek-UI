import { formatDate } from "../Services/Utilities";
import { IconMapPin, IconCalendar } from "@tabler/icons-react";

const ExperinceCard = (props: any) => {
    return (
        <div className="relative pl-6 sm:pl-8 pb-8 border-l border-white/10 last:border-l-0 last:pb-0 group">
            {/* Timeline node */}
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-amber-400 group-hover:scale-125 transition-transform" />

            <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-white/[0.06] hover:border-amber-500/30 transition-all flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 p-2 flex items-center justify-center shrink-0">
                            <img
                                className="w-full h-full object-contain"
                                src={`/Icons/${props.company}.png`}
                                alt={props.company || "Company"}
                                onError={(e: any) => {
                                    e.target.style.display = 'none';
                                    e.target.parentElement.innerHTML = `<span class="text-amber-400 font-bold text-sm font-display">${(props.company || "C").charAt(0)}</span>`;
                                }}
                            />
                        </div>
                        <div>
                            <h4 className="font-bold text-white text-base font-display">
                                {props.title}
                            </h4>
                            <div className="text-xs text-slate-400 font-medium flex items-center gap-2 mt-0.5">
                                <span className="text-slate-300 font-semibold">{props.company}</span>
                                {props.location && (
                                    <>
                                        <span className="text-slate-600">&bull;</span>
                                        <span className="flex items-center gap-1">
                                            <IconMapPin size={12} className="text-slate-500" />
                                            {props.location}
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-semibold text-slate-300 self-start sm:self-auto shrink-0">
                        <IconCalendar size={13} className="text-amber-400" />
                        <span>{formatDate(props.startDate)} &mdash; {formatDate(props.endDate)}</span>
                    </div>
                </div>

                {props.description && (
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2 border-t border-white/[0.04]">
                        {props.description}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ExperinceCard;

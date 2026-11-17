import { useParams, Link } from "react-router-dom";
import { IconSparkles, IconArrowUpRight, IconBriefcase } from "@tabler/icons-react";
import { Avatar } from "@mantine/core";

const Recommendtalent = (props: any) => {
    const { id } = useParams();
    const otherTalents = (props?.talents || [])
        .filter((t: any) => t.id !== id)
        .slice(0, 4);

    return (
        <aside className="w-full lg:w-96 shrink-0 flex flex-col gap-6">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 backdrop-blur-xl shadow-xl flex flex-col gap-5">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                            <IconSparkles size={18} />
                        </div>
                        <h3 className="text-lg font-bold text-white font-display">Related Talent</h3>
                    </div>
                    <Link
                        to="/find-talent"
                        className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1 group"
                    >
                        Explore all
                        <IconArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                </div>

                {otherTalents.length === 0 ? (
                    <p className="text-xs text-slate-500 text-center py-6">
                        No other candidate profiles available.
                    </p>
                ) : (
                    <div className="flex flex-col gap-3">
                        {otherTalents.map((talent: any) => (
                            <Link
                                key={talent.id}
                                to={`/talent-profile/${talent.id}`}
                                className="group p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.05] hover:border-amber-500/30 transition-all flex flex-col gap-2.5 shadow-sm hover:shadow-md"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 p-0.5 shrink-0">
                                            <Avatar
                                                size="100%"
                                                radius="md"
                                                src={
                                                    talent.picture
                                                        ? `data:image/jpeg;base64,${talent.picture}`
                                                        : "/Avatar.png"
                                                }
                                                alt={talent.name}
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors truncate font-display">
                                                {talent.name}
                                            </h4>
                                            <p className="text-xs text-slate-400 truncate">
                                                {talent.jobTitle}
                                            </p>
                                        </div>
                                    </div>
                                    <IconArrowUpRight size={16} className="text-slate-500 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                                </div>

                                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/[0.04]">
                                    <span className="flex items-center gap-1">
                                        <IconBriefcase size={12} className="text-slate-500" />
                                        {talent.totalExp || 1} years exp
                                    </span>
                                    <span className="text-slate-300 font-medium">
                                        {talent.company || "Available"}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </aside>
    );
};

export default Recommendtalent;

import { Avatar } from "@mantine/core";
import { work } from "../Data/Data";

const Working = () => {
    return (
        <section className="py-20 border-t border-white/[0.05] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-xs font-bold font-mono uppercase tracking-widest text-amber-400">
                        STREAMLINED LIFECYCLE
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white mt-2">
                        How <span className="text-gradient-solar">JobTrek</span> Works
                    </h2>
                    <p className="text-sm sm:text-base text-slate-400 mt-3">
                        A seamless, four-step journey from discovering opportunities to receiving offer letters.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
                    {/* Visual with Badge */}
                    <div className="flex-1 w-full max-w-lg lg:max-w-none flex items-center justify-center relative">
                        <div className="relative w-full max-w-md">
                            <img 
                                className="w-full h-auto object-contain drop-shadow-2xl" 
                                src="/Working/Girl.png" 
                                alt="Candidate workflow" 
                                loading="lazy" 
                                decoding="async" 
                            />
                            
                            {/* Floating Profile Readiness Badge */}
                            <div className="absolute right-0 top-1/4 p-3.5 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-amber-500/25 shadow-glow-sm flex items-center gap-3">
                                <Avatar 
                                    className="ring-2 ring-amber-400/40" 
                                    src="/avatar1.png" 
                                    size={42} 
                                    radius="xl"
                                    alt="Profile"
                                />
                                <div>
                                    <p className="text-xs font-bold text-white">Profile Readiness</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="w-20 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                                            <div className="w-[85%] h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full" />
                                        </div>
                                        <span className="text-[10px] font-mono text-amber-300 font-bold">85%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step Cards */}
                    <div className="flex-1 flex flex-col gap-4 w-full">
                        {work.map((item, index) => (
                            <div 
                                key={index} 
                                className="group p-5 rounded-2xl bg-white dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-900/80 border border-slate-200/80 dark:border-white/[0.06] hover:border-amber-500/40 dark:hover:border-amber-500/30 shadow-xs hover:shadow-md transition-all duration-300 flex items-start gap-4"
                            >
                                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 dark:text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 flex items-center justify-center font-mono font-bold text-base shrink-0 transition-colors">
                                    0{index + 1}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-base font-bold font-display text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                                            {item.name}
                                        </h3>
                                    </div>
                                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Working;

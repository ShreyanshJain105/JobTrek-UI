import Marquee from "react-fast-marquee";
import { companies } from "../Data/Data";

const Companies = () => {
    return (
        <section className="py-10 sm:py-14 border-y border-slate-200/80 dark:border-white/[0.06] bg-slate-50/70 dark:bg-slate-950/80 relative overflow-hidden transition-colors">
            {/* Header / Subtitle */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold mb-2 shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    <span>Industry Recognition</span>
                </div>
                <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400 font-mono">
                    TRUSTED BY TEAMS AT HIGH-GROWTH COMPANIES & FORBES LEADERS
                </p>
            </div>

            <div className="relative">
                {/* Soft Edge Fade Gradients - blends seamlessly into parent in both light and dark */}
                <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-44 z-10 pointer-events-none bg-gradient-to-r from-slate-50 via-slate-50/90 to-transparent dark:from-slate-950 dark:via-slate-950/90 dark:to-transparent" />
                <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-44 z-10 pointer-events-none bg-gradient-to-l from-slate-50 via-slate-50/90 to-transparent dark:from-slate-950 dark:via-slate-950/90 dark:to-transparent" />

                <Marquee speed={35} pauseOnHover gradient={false}>
                    {companies.map((company, index) => (
                        <div 
                            key={index} 
                            className="mx-2.5 sm:mx-3 py-3 px-6 sm:px-8 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/[0.08] shadow-xs hover:shadow-md hover:border-amber-500/40 dark:hover:border-amber-500/30 transition-all duration-300 hover:scale-105 flex items-center justify-center cursor-pointer group"
                        >
                            <img 
                                src={`/Companies/${company}.png`} 
                                alt={company}
                                className="h-6 sm:h-7 w-auto max-w-[120px] object-contain opacity-80 dark:opacity-75 group-hover:opacity-100 transition-all duration-300 dark:brightness-125" 
                                loading="lazy"
                            />
                        </div>
                    ))}
                </Marquee>
            </div>
        </section>
    );
};

export default Companies;

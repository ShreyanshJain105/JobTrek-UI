import { Avatar, Rating } from "@mantine/core";
import { testimonials } from "../Data/Data";
import { IconQuote } from "@tabler/icons-react";

const Testimonials = () => {
    return (
        <section className="py-20 border-t border-white/[0.05] relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-xs font-bold font-mono uppercase tracking-widest text-amber-500 dark:text-amber-400">
                        SUCCESS STORIES
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-slate-900 dark:text-white mt-2">
                        What Candidates & Founders <span className="text-gradient-solar">Say</span>
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-3">
                        Read how top engineers and hiring managers navigate career moves with JobTrek.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {testimonials.map((data, index) => (
                        <div 
                            key={index}  
                            className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/[0.08] hover:border-amber-500/40 dark:hover:border-amber-500/30 shadow-xs hover:shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between gap-5 relative group"
                        >
                            <IconQuote size={28} className="text-amber-500/30 dark:text-amber-400/20 group-hover:text-amber-500/50 transition-colors" />

                            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                                &quot;{data.testimonial}&quot;
                            </p>

                            <div className="flex items-center gap-3 pt-4 border-t border-slate-200/80 dark:border-white/[0.06]">
                                <Avatar 
                                    className="ring-1 ring-amber-400/30" 
                                    src="/avatar.png" 
                                    size={40} 
                                    radius="xl"
                                    alt={data.name}
                                />
                                <div className="min-w-0">
                                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate font-display">{data.name}</p>
                                    <Rating value={data.rating} fractions={2} readOnly size="xs" color="yellow" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;

import { Carousel } from "@mantine/carousel";
import { jobcategory } from "../Data/Data";
import { IconArrowLeft, IconArrowRight, IconArrowUpRight } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const JobCategory = () => {
    const navigate = useNavigate();

    return (
        <section className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="text-xs font-bold font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400">
                        CURATED PATHWAYS
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-slate-900 dark:text-white mt-2">
                        Explore by <span className="text-gradient-solar">Specialization</span>
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-3">
                        Discover vetted openings across high-impact engineering, product, and leadership domains.
                    </p>
                </div>

                <Carousel 
                    className="focus-visible:[&_button]:!outline-none
                    [&_button]:!bg-white dark:[&_button]:!bg-slate-800 [&_button]:!text-slate-700 dark:[&_button]:!text-amber-400 [&_button]:!border [&_button]:!border-slate-200 dark:[&_button]:!border-white/10 [&_button]:hover:!bg-amber-500 [&_button]:hover:!text-slate-950 [&_button]:transition-all [&_button]:shadow-sm"
                    slideSize={{ base: '100%', sm: '50%', md: '33.333333%', lg: '25%' }}
                    slideGap="lg" 
                    emblaOptions={{
                        loop: true,
                        align: 'start',
                    }}
                    nextControlIcon={<IconArrowRight size={20} stroke={2.5} />}
                    previousControlIcon={<IconArrowLeft size={20} stroke={2.5} />}
                >
                    {jobcategory.map((category, index) => (
                        <Carousel.Slide key={category.name || index}>
                            <div 
                                onClick={() => navigate("/find-jobs")}
                                className="group relative p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/[0.08] hover:border-amber-500/40 shadow-xs hover:shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between h-[230px]"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-slate-950 flex items-center justify-center transition-all duration-200">
                                        <img 
                                            className="h-6 w-6 object-contain group-hover:brightness-0 transition-all" 
                                            src={`/Category/${category.name}.png`}
                                            alt={category.name}
                                        />
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/[0.03] text-slate-400 dark:text-slate-500 group-hover:text-amber-500 group-hover:bg-amber-500/10 flex items-center justify-center transition-colors">
                                        <IconArrowUpRight size={16} />
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                                        {category.name}
                                    </h3>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-1">
                                        {category.description}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between pt-3 border-t border-slate-200/80 dark:border-white/[0.05]">
                                    <span className="text-xs font-mono font-semibold text-amber-400">
                                        {category.jobCount}
                                    </span>
                                    <span className="text-[11px] text-slate-500 group-hover:text-slate-300 transition-colors">
                                        View Roles &rarr;
                                    </span>
                                </div>
                            </div>
                        </Carousel.Slide>
                    ))}
                </Carousel>
            </div>
        </section>
    );
};

export default JobCategory;

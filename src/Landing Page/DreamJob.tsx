import { Avatar, TextInput, Button } from "@mantine/core";
import { IconSearch, IconBriefcase, IconSparkles, IconTrendingUp } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DreamJob = () => {
    const [title, setTitle] = useState("");
    const [jobType, setJobType] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate("/find-jobs");
    };

    return (
        <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-amber-500/15 via-amber-500/5 to-transparent blur-[120px] pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
                    {/* Left Column: Headline & Search */}
                    <div className="flex-1 flex flex-col gap-6 max-w-2xl text-center lg:text-left">
                        {/* Live Pill Badge */}
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-semibold w-fit mx-auto lg:mx-0 shadow-glow-sm">
                            <IconSparkles size={14} className="animate-spin-slow" />
                            <span>Next-Gen Career Marketplace</span>
                            <span className="w-1 h-1 rounded-full bg-amber-400" />
                            <span className="text-slate-400 font-normal">Over 1,200+ Verified Tech Roles</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                            Unlock your next <br className="hidden sm:inline" />
                            <span className="text-gradient-solar">dream career</span> today.
                        </h1>

                        {/* Subtitle */}
                        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
                            Connect with verified high-growth teams and top engineering companies. Zero noise, transparent salary packages, and fast-track hiring.
                        </p>

                        {/* Connected Glass Search Bar */}
                        <div className="p-2 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/90 dark:border-white/10 shadow-xl dark:shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row gap-2 max-w-xl mx-auto lg:mx-0 w-full">
                            <div className="flex-1 flex items-center px-3 py-1 bg-slate-100/80 dark:bg-white/[0.03] rounded-xl border border-slate-200 dark:border-white/[0.05] focus-within:border-amber-500/40 transition-colors">
                                <IconSearch size={18} className="text-amber-500 shrink-0 mr-2" />
                                <TextInput 
                                    className="w-full text-sm [&_input]:bg-transparent [&_input]:border-none [&_input]:text-slate-900 dark:[&_input]:text-white [&_input]:placeholder:text-slate-400 dark:[&_input]:placeholder:text-slate-500" 
                                    variant="unstyled" 
                                    placeholder="Role title (e.g. React Engineer)"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                />
                            </div>

                            <div className="flex-1 flex items-center px-3 py-1 bg-slate-100/80 dark:bg-white/[0.03] rounded-xl border border-slate-200 dark:border-white/[0.05] focus-within:border-amber-500/40 transition-colors">
                                <IconBriefcase size={18} className="text-amber-500 shrink-0 mr-2" />
                                <TextInput 
                                    className="w-full text-sm [&_input]:bg-transparent [&_input]:border-none [&_input]:text-slate-900 dark:[&_input]:text-white [&_input]:placeholder:text-slate-400 dark:[&_input]:placeholder:text-slate-500" 
                                    variant="unstyled" 
                                    placeholder="Type (e.g. Full-time, Remote)"
                                    value={jobType}
                                    onChange={(e) => setJobType(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                />
                            </div>

                            <Button 
                                onClick={handleSearch}
                                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl shadow-glow-sm transition-all sm:w-auto w-full flex items-center justify-center gap-2"
                            >
                                <span>Search</span>
                            </Button>
                        </div>

                        {/* Trust Metric Row */}
                        <div className="flex items-center justify-center lg:justify-start gap-6 pt-2 text-xs text-slate-500 dark:text-slate-400">
                            <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                <span>142 New jobs posted this week</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <IconTrendingUp size={14} className="text-amber-400" />
                                <span>Top tier tech compensation</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Hero Visual with Micro-cards */}
                    <div className="flex-1 w-full max-w-lg lg:max-w-none flex items-center justify-center relative">
                        <div className="relative w-full max-w-md">
                            {/* Ambient halo behind image */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-orange-500/10 rounded-full blur-3xl -z-10" />

                            <img 
                                src="/Boy.png" 
                                alt="Professional discovering opportunities" 
                                decoding="async"
                                className="w-full h-auto object-contain drop-shadow-2xl" 
                            />

                            {/* Floating Glass Metric Card 1: 10k+ hired */}
                            <div className="absolute -right-4 sm:-right-8 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-2xl bg-slate-900/85 backdrop-blur-xl border border-amber-500/20 shadow-glow-sm flex flex-col gap-2 animate-bounce-subtle">
                                <div className="flex items-center justify-between gap-3">
                                    <span className="text-xs font-bold text-white font-display">10,000+ Placed</span>
                                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">98% match</span>
                                </div>
                                <Avatar.Group spacing="xs">
                                    <Avatar src="/avatar.png" size={28} radius="xl" />
                                    <Avatar src="/avatar1.png" size={28} radius="xl" />
                                    <Avatar src="/avatar2.png" size={28} radius="xl" />
                                    <Avatar size={28} radius="xl" className="bg-amber-500/20 text-amber-300 font-bold text-[10px] border border-amber-500/30">
                                        +9k
                                    </Avatar>
                                </Avatar.Group>
                            </div>

                            {/* Floating Glass Metric Card 2: Slack Lead Role */}
                            <div className="absolute -left-4 sm:-left-8 top-1/4 p-3.5 rounded-2xl bg-slate-900/85 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col gap-2 max-w-[210px]">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-9 h-9 rounded-xl bg-slate-800 p-1.5 flex items-center justify-center border border-white/10">
                                        <img src="/Slack.png" alt="Slack" className="w-full h-full object-contain" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs font-bold text-white truncate">Staff Engineer</p>
                                        <p className="text-[11px] text-slate-400 truncate">San Francisco, CA</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-white/5 pt-2">
                                    <span className="text-amber-400 font-semibold">$180k - $220k</span>
                                    <span>120 Applicants</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DreamJob;

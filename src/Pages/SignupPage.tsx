import { 
    IconArrowLeft, 
    IconRouteSquare, 
    IconCheck, 
    IconShieldCheck, 
    IconStarFilled,
    IconBolt
} from "@tabler/icons-react";
import Signup from "../SignupLogin/Signup";
import Login from "../SignupLogin/Login";
import { useLocation, useNavigate } from "react-router-dom";

const SignupPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isSignup = location.pathname === '/signup';

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans relative overflow-x-hidden transition-colors">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 -right-40 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Back Home Pill */}
            <div className="absolute top-5 left-5 sm:top-6 sm:left-6 z-30">
                <button
                    onClick={() => navigate("/")}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/90 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10 hover:border-amber-500/40 transition-all shadow-md backdrop-blur-md"
                >
                    <IconArrowLeft size={16} className="text-amber-500" />
                    <span>Back to Portal</span>
                </button>
            </div>

            {/* Split Screen Container */}
            <div className="w-full min-h-screen flex flex-col lg:flex-row">
                {/* Form Column (Left) */}
                <div className="w-full lg:w-1/2 flex-shrink-0 flex items-center justify-center p-6 sm:p-10 lg:p-12 z-10 pt-20 lg:pt-12">
                    {isSignup ? <Signup /> : <Login />}
                </div>

                {/* Editorial Showcase Column (Right - visible on desktop) */}
                <div className="hidden lg:flex flex-1 relative items-center justify-center p-12 lg:p-16 bg-gradient-to-br from-slate-100 via-white to-slate-100 dark:from-slate-900/90 dark:via-slate-950 dark:to-slate-900 border-l border-slate-200 dark:border-white/[0.08] overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/15 via-transparent to-transparent pointer-events-none" />

                    <div className="relative z-10 max-w-lg flex flex-col gap-8">
                        {/* Brand Header */}
                        <div className="flex items-center gap-3.5">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                                <IconRouteSquare size={26} className="text-slate-950" stroke={2.5} />
                            </div>
                            <div>
                                <span className="font-display font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
                                    Job<span className="text-amber-500 dark:text-amber-400">Trek</span>
                                </span>
                                <p className="text-[10px] text-amber-600 dark:text-amber-400/80 font-mono tracking-widest uppercase">
                                    Enterprise Careers
                                </p>
                            </div>
                        </div>

                        {/* Title & Description */}
                        <div className="space-y-3">
                            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white font-display leading-tight">
                                {isSignup
                                    ? "Accelerate Your Tech Journey with High-Growth Teams"
                                    : "Welcome Back to Your Career Command Center"}
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                Join verified software engineers, product leaders, and top tech companies hiring transparently with zero recruiter spam.
                            </p>
                        </div>

                        {/* Stats Banner */}
                        <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-200/50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] backdrop-blur-md">
                            <div className="text-center">
                                <div className="text-lg font-extrabold text-slate-900 dark:text-white font-display">15,000+</div>
                                <div className="text-[11px] text-slate-500 dark:text-slate-400">Curated Jobs</div>
                            </div>
                            <div className="text-center border-x border-slate-300 dark:border-white/[0.08]">
                                <div className="text-lg font-extrabold text-amber-500 dark:text-amber-400 font-display">₹35 LPA</div>
                                <div className="text-[11px] text-slate-500 dark:text-slate-400">Avg Tech CTC</div>
                            </div>
                            <div className="text-center">
                                <div className="text-lg font-extrabold text-slate-900 dark:text-white font-display">48 Hrs</div>
                                <div className="text-[11px] text-slate-500 dark:text-slate-400">Direct Reply</div>
                            </div>
                        </div>

                        {/* Feature Highlights */}
                        <div className="flex flex-col gap-3.5">
                            <div className="flex items-center gap-3 text-xs text-slate-700 dark:text-slate-300">
                                <div className="p-1 rounded-xl bg-amber-500/20 text-amber-500 dark:text-amber-400 shrink-0">
                                    <IconCheck size={16} />
                                </div>
                                <span>Curated senior & principal roles with verified compensation ranges</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-slate-700 dark:text-slate-300">
                                <div className="p-1 rounded-xl bg-amber-500/20 text-amber-500 dark:text-amber-400 shrink-0">
                                    <IconShieldCheck size={16} />
                                </div>
                                <span>Direct recruiter access with instantaneous interactive messaging</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-slate-700 dark:text-slate-300">
                                <div className="p-1 rounded-xl bg-amber-500/20 text-amber-500 dark:text-amber-400 shrink-0">
                                    <IconBolt size={16} />
                                </div>
                                <span>One-click interview scheduling and automated formal offer delivery</span>
                            </div>
                        </div>

                        {/* Testimonial Quote Pill */}
                        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 flex flex-col gap-2.5 shadow-xl">
                            <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400">
                                {[...Array(5)].map((_, i) => (
                                    <IconStarFilled key={i} size={13} />
                                ))}
                            </div>
                            <p className="text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed">
                                &quot;JobTrek eliminated third-party agencies and allowed me to connect directly with the hiring engineering manager. Signed my offer in under two weeks.&quot;
                            </p>
                            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200 dark:border-white/5">
                                <span className="font-semibold text-slate-900 dark:text-white">Priya Sharma</span>
                                <span className="text-amber-600 dark:text-amber-400/90">Staff Frontend Engineer &bull; FinTech</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;

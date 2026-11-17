import React, { useEffect, useState } from "react";
import { IconRouteSquare, IconShieldCheck } from "@tabler/icons-react";

interface AuthLoadingOverlayProps {
    visible: boolean;
    title?: string;
    subtitle?: string;
}

const AuthLoadingOverlay: React.FC<AuthLoadingOverlayProps> = ({
    visible,
    title = "Authenticating Session",
    subtitle = "Please wait while we establish your secure connection."
}) => {
    const [secondsElapsed, setSecondsElapsed] = useState(0);

    useEffect(() => {
        let timer: any = null;
        if (visible) {
            setSecondsElapsed(0);
            timer = setInterval(() => {
                setSecondsElapsed((prev) => prev + 1);
            }, 1000);
        } else {
            setSecondsElapsed(0);
        }
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [visible]);

    if (!visible) return null;

    // Dynamic message to reassure user during cold starts
    let dynamicMessage = "Verifying your security credentials...";
    if (secondsElapsed >= 6) {
        dynamicMessage = "Waking up cloud server resources, almost there...";
    } else if (secondsElapsed >= 3) {
        dynamicMessage = "Connecting to JobTrek cloud cluster...";
    }

    return (
        <div 
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/75 backdrop-blur-md transition-opacity duration-300 px-4 animate-in fade-in"
            role="dialog"
            aria-modal="true"
            aria-live="polite"
        >
            <div className="w-full max-w-sm p-8 rounded-3xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-white/10 shadow-2xl shadow-black/30 flex flex-col items-center text-center relative overflow-hidden">
                {/* Ambient Glow */}
                <div className="absolute -top-12 -left-12 w-32 h-32 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-amber-600/15 rounded-full blur-2xl pointer-events-none" />

                {/* Animated Logo with Ripple Rings */}
                <div className="relative flex items-center justify-center my-2">
                    <div className="absolute w-20 h-20 rounded-3xl bg-amber-500/20 animate-ping opacity-60" />
                    <div className="absolute w-24 h-24 rounded-3xl bg-amber-500/10 animate-pulse" />
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-xl shadow-amber-500/30 text-slate-950 relative z-10 transition-transform">
                        <IconRouteSquare size={34} stroke={2.5} className="animate-pulse" />
                    </div>
                </div>

                {/* Product Name */}
                <div className="mt-4 flex items-center justify-center gap-1 font-display font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white">
                    <span>Job</span>
                    <span className="text-amber-500 dark:text-amber-400">Trek</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-[11px] font-semibold mt-1">
                    <IconShieldCheck size={13} />
                    <span>{title}</span>
                </div>

                {/* Moving Animated Indeterminate Progress Bar */}
                <div className="w-full h-2 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden mt-6 relative shadow-inner">
                    <div className="animate-indeterminate-bar bg-gradient-to-r from-amber-400 via-amber-500 to-amber-300 shadow-md shadow-amber-500/50" />
                </div>

                {/* Dynamic Status Text */}
                <div className="mt-4 min-h-[44px] flex flex-col justify-center">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100 transition-all">
                        {dynamicMessage}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {subtitle}
                    </p>
                </div>

                <div className="mt-3 text-[11px] font-mono text-slate-400 dark:text-slate-500">
                    {secondsElapsed > 0 && `Connecting: ${secondsElapsed}s`}
                </div>
            </div>
        </div>
    );
};

export default AuthLoadingOverlay;

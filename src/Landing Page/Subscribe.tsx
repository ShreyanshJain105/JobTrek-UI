import { Button, TextInput } from "@mantine/core";
import { IconBellRinging, IconMail } from "@tabler/icons-react";
import { useState } from "react";
import { notifications } from "@mantine/notifications";

const Subscribe = () => {
    const [email, setEmail] = useState("");

    const handleSubscribe = () => {
        if (!email || !email.includes("@")) {
            notifications.show({
                title: "Invalid Email",
                message: "Please enter a valid email address.",
                color: "red",
            });
            return;
        }
        notifications.show({
            title: "Subscribed Successfully",
            message: "You'll receive personalized role alerts weekly.",
            color: "teal",
        });
        setEmail("");
    };

    return (
        <section className="py-20 border-t border-slate-200/80 dark:border-white/[0.05] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative rounded-3xl bg-gradient-to-br from-slate-100 via-white to-slate-100 dark:from-slate-900/80 dark:via-slate-900/40 dark:to-slate-900/80 border border-slate-200 dark:border-white/10 p-8 sm:p-14 text-center overflow-hidden shadow-xl dark:shadow-2xl">
                    {/* Background Radial Glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-500 flex items-center justify-center shadow-glow-sm">
                            <IconBellRinging size={24} />
                        </div>

                        <div>
                            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight">
                                Never Miss High-Impact <span className="text-gradient-solar">Roles</span>
                            </h2>
                            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2">
                                Receive personalized notifications whenever engineering or executive roles matching your stack go live.
                            </p>
                        </div>

                        <div className="w-full max-w-md flex flex-col sm:flex-row gap-2.5 p-2 rounded-2xl bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-white/10 shadow-xl dark:shadow-2xl backdrop-blur-xl">
                            <div className="flex-1 flex items-center px-3 bg-slate-100/80 dark:bg-white/[0.03] rounded-xl border border-slate-200 dark:border-white/[0.04]">
                                <IconMail size={18} className="text-amber-500 shrink-0 mr-2" />
                                <TextInput
                                    className="w-full text-sm [&_input]:bg-transparent [&_input]:border-none [&_input]:text-slate-900 dark:[&_input]:text-white [&_input]:placeholder:text-slate-400 dark:[&_input]:placeholder:text-slate-500"
                                    variant="unstyled"
                                    placeholder="Enter your work email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                                />
                            </div>
                            <Button 
                                onClick={handleSubscribe}
                                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl shadow-glow-sm transition-all"
                            >
                                Subscribe
                            </Button>
                        </div>

                        <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                            <span>🔒 No spam. Curated high-salary opportunities only. Unsubscribe at any time.</span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Subscribe;

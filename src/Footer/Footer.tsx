import {
    IconBrandFacebook,
    IconBrandInstagram,
    IconBrandLinkedin,
    IconBrandX,
    IconRouteSquare,
    IconHeartFilled
} from "@tabler/icons-react";
import { useLocation, Link } from "react-router-dom";

const footerSections = [
    {
        title: "Product",
        links: [
            { label: "Find Jobs", to: "/find-jobs" },
            { label: "Find Companies", to: "/company/Google" },
            { label: "Find Employees", to: "/find-talent" },
            { label: "Post a Job", to: "/post-job/0" },
            { label: "Career Resources", to: "/page/resources" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About Us", to: "/page/about" },
            { label: "Contact Us", to: "/page/contact" },
            { label: "Privacy Policy", to: "/page/privacy" },
            { label: "Terms & Conditions", to: "/page/terms" },
            { label: "Careers", to: "/page/careers" },
        ],
    },
    {
        title: "Support",
        links: [
            { label: "Help & Support", to: "/page/help" },
            { label: "Feedback", to: "/page/feedback" },
            { label: "FAQs", to: "/page/faq" },
            { label: "Contact Support", to: "/page/contact-support" },
            { label: "Community Guidelines", to: "/page/guidelines" },
        ],
    },
    {
        title: "Resources",
        links: [
            { label: "Blog", to: "/page/blog" },
            { label: "Career Advice", to: "/page/career-advice" },
            { label: "Salary Guide", to: "/page/salary-guide" },
            { label: "Resume Builder", to: "/page/resume-builder" },
            { label: "Interview Tips", to: "/page/interview-tips" },
        ],
    },
];

const Footer = () => {
    const location = useLocation();

    if (location.pathname === "/signup" || location.pathname === "/login") {
        return null;
    }

    return (
        <footer className="relative bg-slate-950 border-t border-white/[0.08] text-slate-400 font-sans pt-16 pb-12 overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-amber-500/5 blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col gap-12">
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <Link to="/" className="flex items-center gap-2.5 group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
                                <IconRouteSquare size={22} className="text-slate-950" stroke={2.5} />
                            </div>
                            <span className="font-display font-extrabold text-2xl tracking-tight text-white">
                                Job<span className="text-amber-400">Trek</span>
                            </span>
                        </Link>

                        <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                            Next-generation enterprise career orchestration platform. Connecting elite software engineers with world-class engineering teams and high-growth technology companies.
                        </p>

                        <div className="flex items-center gap-2.5 pt-2">
                            {[
                                { icon: IconBrandX, label: "Twitter", href: "https://x.com/ShreyanshShah06" },
                                { icon: IconBrandLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/shreyanshjain1206/" },
                                { icon: IconBrandInstagram, label: "Instagram", href: "https://www.instagram.com/shreyanshshah.12/" },
                                { icon: IconBrandFacebook, label: "Facebook", href: "#" },
                            ].map(({ icon: Icon, label, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-xl bg-white/[0.03] hover:bg-amber-500/10 border border-white/[0.08] hover:border-amber-500/30 text-slate-400 hover:text-amber-400 flex items-center justify-center transition-all"
                                    title={label}
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Link Columns */}
                    <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-8">
                        {footerSections.map((section, index) => (
                            <div key={index} className="flex flex-col gap-3.5">
                                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                                    {section.title}
                                </h4>
                                <ul className="flex flex-col gap-2.5">
                                    {section.links.map((link, linkIndex) => (
                                        <li key={linkIndex}>
                                            <Link
                                                to={link.to}
                                                className="text-xs sm:text-sm text-slate-400 hover:text-amber-400 transition-colors inline-block hover:translate-x-1 duration-200"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Subfooter Row */}
                <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5 flex-wrap text-center sm:text-left">
                        <span>&copy; {new Date().getFullYear()} JobTrek SaaS Corp. All rights reserved.</span>
                        <span className="text-slate-700 hidden sm:inline">&bull;</span>
                        <span className="flex items-center gap-1">
                            Engineered with <IconHeartFilled size={12} className="text-amber-500" /> by <strong className="text-slate-300">Shreyansh Jain</strong>
                        </span>
                    </div>

                    <div className="flex items-center gap-6">
                        <Link to="/page/privacy" className="hover:text-amber-400 cursor-pointer transition-colors">
                            Privacy Policy
                        </Link>
                        <Link to="/page/terms" className="hover:text-amber-400 cursor-pointer transition-colors">
                            Terms of Service
                        </Link>
                        <Link to="/page/security" className="hover:text-amber-400 cursor-pointer transition-colors">
                            Security & Trust
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
    IconArrowLeft, 
    IconCheck, 
    IconShieldCheck, 
    IconSparkles, 
    IconMail, 
    IconMapPin, 
    IconSend, 
    IconChevronDown, 
    IconChevronUp,
    IconStarFilled,
    IconFileText,
    IconBriefcase,
    IconLock,
    IconHelp,
    IconDeviceLaptop,
    IconCurrencyDollar,
    IconSearch,
    IconBook,
    IconHeartHandshake
} from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

interface ContentPageProps {
    type?: string;
}

const ContentPage = ({ type: propType }: ContentPageProps) => {
    const params = useParams();
    const navigate = useNavigate();
    const activeType = propType || params.type || "about";

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [activeType]);

    // Interactive States
    const [faqOpen, setFaqOpen] = useState<{ [key: number]: boolean }>({ 0: true });
    const [feedbackRating, setFeedbackRating] = useState(5);
    const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
    const [contactSubmitted, setContactSubmitted] = useState(false);
    const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });

    const toggleFaq = (index: number) => {
        setFaqOpen(prev => ({ ...prev, [index]: !prev[index] }));
    };

    const handleContactSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setContactSubmitted(true);
        notifications.show({
            title: "Inquiry Received",
            message: "Our engineering operations team will reach out within 24 business hours.",
            color: "teal",
            icon: <IconCheck size={18} />,
        });
        setContactForm({ name: "", email: "", subject: "", message: "" });
    };

    const handleFeedbackSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFeedbackSubmitted(true);
        notifications.show({
            title: "Feedback Submitted",
            message: "Thank you for helping us elevate the JobTrek career platform!",
            color: "teal",
            icon: <IconCheck size={18} />,
        });
    };

    // Render logic per page type
    const renderContent = () => {
        switch (activeType) {
            case "about":
                return (
                    <div className="flex flex-col gap-10">
                        <div className="space-y-4">
                            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
                                Our Mission & DNA
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
                                Powering Transparent, High-Velocity Tech Careers
                            </h2>
                            <p className="text-slate-300 text-base leading-relaxed">
                                JobTrek was founded on a simple premise: engineering recruitment is fundamentally broken by endless middleman agencies, ghosting, and obscured compensation bands. We built the first verified career orchestration platform directly connecting elite technical talent with the world's most ambitious tech enterprises.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { title: "Transparent Compensation", desc: "Every job listing on JobTrek features strict, verified salary bands upfront. Zero guessing games." },
                                { title: "Direct Recruiter Access", desc: "Engineers speak directly with hiring managers and lead architects via real-time encrypted messaging." },
                                { title: "Zero Agency Spam", desc: "No unsolicited automated messages. Only verified companies and authenticated candidates." },
                            ].map((pillar, i) => (
                                <div key={i} className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                                        <IconSparkles size={20} />
                                    </div>
                                    <h4 className="text-lg font-bold text-white font-display">{pillar.title}</h4>
                                    <p className="text-xs text-slate-400 leading-relaxed">{pillar.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div className="glass-panel p-8 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                            <div>
                                <h3 className="text-xl font-bold text-white font-display">Ready to explore active openings?</h3>
                                <p className="text-xs text-slate-400 mt-1">Browse 15,000+ curated engineering and product roles.</p>
                            </div>
                            <Link to="/find-jobs" className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all shrink-0">
                                Explore Jobs &rarr;
                            </Link>
                        </div>
                    </div>
                );

            case "contact":
            case "contact-support":
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <div className="flex flex-col gap-6">
                            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold w-fit">
                                Get in Touch
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
                                We're Here to Help You Succeed
                            </h2>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                Have inquiries regarding enterprise employer partnerships, hiring solutions, candidate verification, or technical platform assistance? Our dedicated support team is available 24/7.
                            </p>

                            <div className="flex flex-col gap-4 pt-4 border-t border-white/[0.08]">
                                <div className="flex items-center gap-3 text-sm text-slate-300">
                                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                                        <IconMail size={18} />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-white">Direct Email</div>
                                        <div className="text-xs text-slate-400">support@jobtrek.io</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-300">
                                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                                        <IconMapPin size={18} />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-white">Global Headquarters</div>
                                        <div className="text-xs text-slate-400">100 Tech Oasis Blvd, Suite 400, San Francisco, CA</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl">
                            {contactSubmitted ? (
                                <div className="text-center py-12 flex flex-col items-center gap-3">
                                    <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                                        <IconCheck size={28} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white font-display">Message Dispatched!</h3>
                                    <p className="text-xs text-slate-400 max-w-sm">
                                        Thank you for reaching out. A dedicated talent advisor will contact you within 24 hours.
                                    </p>
                                    <button 
                                        onClick={() => setContactSubmitted(false)}
                                        className="mt-3 px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white"
                                    >
                                        Send Another Message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
                                    <h3 className="text-lg font-bold text-white font-display">Send a Direct Inquiry</h3>
                                    <div>
                                        <label className="text-xs font-semibold text-slate-300 mb-1 block">Your Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={contactForm.name}
                                            onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                                            placeholder="Alex Vance"
                                            className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white text-sm focus:border-amber-500 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-slate-300 mb-1 block">Work Email</label>
                                        <input
                                            type="email"
                                            required
                                            value={contactForm.email}
                                            onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                                            placeholder="alex@company.com"
                                            className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white text-sm focus:border-amber-500 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-slate-300 mb-1 block">Subject</label>
                                        <input
                                            type="text"
                                            required
                                            value={contactForm.subject}
                                            onChange={e => setContactForm({ ...contactForm, subject: e.target.value })}
                                            placeholder="Enterprise Hiring Solutions"
                                            className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white text-sm focus:border-amber-500 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-slate-300 mb-1 block">Message</label>
                                        <textarea
                                            rows={4}
                                            required
                                            value={contactForm.message}
                                            onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                                            placeholder="Tell us about your team size, tech stack, or questions..."
                                            className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white text-sm focus:border-amber-500 focus:outline-none resize-none"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2 mt-1"
                                    >
                                        <IconSend size={16} />
                                        <span>Submit Inquiry</span>
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                );

            case "privacy":
                return (
                    <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 space-y-6">
                        <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
                            Legal & Compliance
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                            Privacy Policy & Data Protection
                        </h2>
                        <p className="text-xs text-slate-400">Effective Date: January 1, 2026 &bull; Version 3.4</p>

                        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed pt-4 border-t border-white/[0.08]">
                            <h4 className="text-base font-bold text-white font-display">1. Information We Collect</h4>
                            <p>
                                We collect candidate resumes, profile bio, contact email, job application status, and verified interview time schedules. We will never sell personal candidate data to third-party telemarketers or non-authenticated job aggregators.
                            </p>

                            <h4 className="text-base font-bold text-white font-display pt-2">2. Candidate Shield Architecture</h4>
                            <p>
                                Candidate contact details and uploaded CV files are only revealed to authenticated employers when you formally submit an application to their published job requisition.
                            </p>

                            <h4 className="text-base font-bold text-white font-display pt-2">3. Right to Data Erasure (GDPR / CCPA)</h4>
                            <p>
                                Users can request immediate permanent deletion of their profile, uploaded certificates, and account history at any time by contacting privacy@jobtrek.io.
                            </p>
                        </div>
                    </div>
                );

            case "terms":
                return (
                    <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 space-y-6">
                        <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
                            Platform Terms
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                            Terms of Service & Usage Agreement
                        </h2>
                        <p className="text-xs text-slate-400">Effective Date: January 1, 2026</p>

                        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed pt-4 border-t border-white/[0.08]">
                            <h4 className="text-base font-bold text-white font-display">1. Employer Commitments</h4>
                            <p>
                                Employers posting job requisitions on JobTrek must represent legitimate hiring entities and guarantee genuine intent to interview and extend offers. Posting misleading or phantom listings is strictly prohibited and subject to account suspension.
                            </p>

                            <h4 className="text-base font-bold text-white font-display pt-2">2. Candidate Integrity</h4>
                            <p>
                                Candidates warrant that all listed experience, skills, and certifications are accurate and verifiable. Any misrepresentation will result in immediate termination of platform privileges.
                            </p>

                            <h4 className="text-base font-bold text-white font-display pt-2">3. Direct Messaging Etiquette</h4>
                            <p>
                                Real-time recruiter messaging is strictly reserved for recruitment conversations, scheduling, and package negotiations. Unsolicited commercial advertising will result in an immediate permanent ban.
                            </p>
                        </div>
                    </div>
                );

            case "faq":
            case "help":
            case "support":
                return (
                    <div className="flex flex-col gap-8">
                        <div className="space-y-3">
                            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
                                Knowledge Base
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
                                Frequently Asked Questions
                            </h2>
                            <p className="text-slate-300 text-sm">
                                Find clear answers on application pipelines, interview scheduling, direct messaging, and employer verification.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3">
                            {[
                                { q: "How does direct recruiter chat work on JobTrek?", a: "When an employer extends an interview invitation or job offer, a direct secure chat thread is enabled. Both parties can discuss package details, start dates, and onboarding requirements with instant delivery." },
                                { q: "Are salary bands guaranteed on all job postings?", a: "Yes. Every role listed on JobTrek requires a transparent minimum and maximum compensation band (in LPA / USD). Listings without transparent packages are rejected during moderation." },
                                { q: "Can I download or view my submitted CV?", a: "Yes, from your Job History page, you can review all applied jobs, view your submitted CV base64 preview, and check real-time pipeline status (Applied, Interviewing, Offered, Rejected)." },
                                { q: "How do employers schedule candidate interviews?", a: "Employers click 'Schedule' on any candidate card, pick an available calendar date and time, and JobTrek dispatches an instant notification to the candidate's account." },
                                { q: "Is JobTrek free for software engineers?", a: "100% free forever for candidates. Engineers never pay fees for searching, applying, messaging recruiters, or receiving formal offers." },
                            ].map((item, idx) => (
                                <div key={idx} className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
                                    <button
                                        onClick={() => toggleFaq(idx)}
                                        className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                                    >
                                        <span className="font-bold text-sm sm:text-base text-white font-display">{item.q}</span>
                                        {faqOpen[idx] ? <IconChevronUp size={18} className="text-amber-400 shrink-0" /> : <IconChevronDown size={18} className="text-slate-500 shrink-0" />}
                                    </button>
                                    {faqOpen[idx] && (
                                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 border-t border-white/[0.04] leading-relaxed">
                                            {item.a}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case "salary-guide":
                return (
                    <div className="flex flex-col gap-8">
                        <div className="space-y-3">
                            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
                                2026 Compensation Index
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
                                Engineering & Tech Salary Benchmarks
                            </h2>
                            <p className="text-slate-300 text-sm">
                                Real data distilled from verified offers accepted across top tech enterprises and tier-1 startups.
                            </p>
                        </div>

                        <div className="glass-panel rounded-3xl border border-white/10 overflow-x-auto shadow-xl">
                            <table className="w-full text-left text-xs sm:text-sm">
                                <thead className="bg-slate-900/90 border-b border-white/[0.08] text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                                    <tr>
                                        <th className="p-4 sm:p-5">Engineering Discipline</th>
                                        <th className="p-4 sm:p-5">Entry (1-2 yrs)</th>
                                        <th className="p-4 sm:p-5">Mid-Level (3-5 yrs)</th>
                                        <th className="p-4 sm:p-5">Senior / Lead (6+ yrs)</th>
                                        <th className="p-4 sm:p-5">Demand Index</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/[0.05] text-slate-200">
                                    {[
                                        { role: "Frontend Engineer (React / Next.js)", entry: "₹12 - ₹18 LPA", mid: "₹22 - ₹36 LPA", sr: "₹42 - ₹70 LPA", demand: "🔥 High" },
                                        { role: "Backend Engineer (Java / Go / Node)", entry: "₹14 - ₹20 LPA", mid: "₹26 - ₹45 LPA", sr: "₹50 - ₹85 LPA", demand: "🔥 Very High" },
                                        { role: "Full Stack Engineer", entry: "₹14 - ₹22 LPA", mid: "₹25 - ₹42 LPA", sr: "₹48 - ₹80 LPA", demand: "🔥 High" },
                                        { role: "AI / ML & LLM Ops Specialist", entry: "₹18 - ₹28 LPA", mid: "₹35 - ₹65 LPA", sr: "₹70 - ₹120+ LPA", demand: "⚡ Surging" },
                                        { role: "Product Designer / UI-UX Lead", entry: "₹10 - ₹16 LPA", mid: "₹20 - ₹34 LPA", sr: "₹38 - ₹60 LPA", demand: "📈 Moderate" },
                                        { role: "Cloud DevOps & Platform Architect", entry: "₹15 - ₹22 LPA", mid: "₹28 - ₹48 LPA", sr: "₹55 - ₹95 LPA", demand: "🔥 Very High" },
                                    ].map((row, i) => (
                                        <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                                            <td className="p-4 sm:p-5 font-bold text-white font-display">{row.role}</td>
                                            <td className="p-4 sm:p-5 text-slate-300">{row.entry}</td>
                                            <td className="p-4 sm:p-5 text-amber-400 font-semibold">{row.mid}</td>
                                            <td className="p-4 sm:p-5 text-emerald-400 font-bold">{row.sr}</td>
                                            <td className="p-4 sm:p-5 font-mono text-xs">{row.demand}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );

            case "resume-builder":
            case "career-advice":
            case "interview-tips":
            case "resources":
                return (
                    <div className="flex flex-col gap-8">
                        <div className="space-y-3">
                            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
                                Career Acceleration Hub
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
                                Expert Tech Resume & Interview Playbook
                            </h2>
                            <p className="text-slate-300 text-sm">
                                Master high-impact technical resumes, system design discussions, and compensation negotiation strategies.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { title: "ATS-Proof Technical Resume Checklist", desc: "Format achievements with quantifiable metrics: 'Reduced P99 API latency by 42% utilizing Redis caching and connection pooling.'", tag: "Resume Formula" },
                                { title: "System Design Interview Framework", desc: "Always begin with functional vs non-functional requirements, traffic estimation, storage schema, API contracts, and single points of failure.", tag: "Architectural Prep" },
                                { title: "Behavioral STAR Method Mastery", desc: "Structure high-stakes conflict resolution and leadership stories using Situation, Task, Action, and Measurable Result.", tag: "Leadership" },
                                { title: "Offer Package Negotiation Secrets", desc: "Evaluate base salary, performance bonuses, joining bonuses, and stock options with 4-year vesting schedules.", tag: "Compensation" },
                            ].map((guide, idx) => (
                                <div key={idx} className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-between gap-4">
                                    <div className="flex flex-col gap-2">
                                        <span className="text-[10px] uppercase font-mono font-bold text-amber-400">{guide.tag}</span>
                                        <h4 className="text-lg font-bold text-white font-display">{guide.title}</h4>
                                        <p className="text-xs text-slate-300 leading-relaxed">{guide.desc}</p>
                                    </div>
                                    <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-amber-400 font-semibold">
                                        <span>Read Full Guide &rarr;</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case "blog":
                return (
                    <div className="flex flex-col gap-8">
                        <div className="space-y-3">
                            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
                                Engineering Journal
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
                                Insights from Top Engineering Teams
                            </h2>
                            <p className="text-slate-300 text-sm">
                                Deep dives into distributed systems, tech leadership, and modern hiring paradigms.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { title: "How High-Growth FinTechs Evaluate Senior Engineers in 2026", date: "Nov 12, 2026", read: "6 min read", author: "Dev Lead" },
                                { title: "Microservices vs Modular Monolith: The Pragmatic Choice", date: "Nov 8, 2026", read: "9 min read", author: "Cloud Architect" },
                                { title: "The Death of Recruiter Ghosting: Building Direct Hiring Loops", date: "Oct 29, 2026", read: "5 min read", author: "Talent Ops" },
                                { title: "Scaling MongoDB Atlas and Spring Boot to 10M DAU", date: "Oct 21, 2026", read: "12 min read", author: "Principal Engineer" },
                            ].map((post, idx) => (
                                <div key={idx} className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-between gap-4 hover:border-amber-500/30 transition-all cursor-pointer">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                                            <span>{post.date}</span>
                                            <span>&bull;</span>
                                            <span>{post.read}</span>
                                        </div>
                                        <h4 className="text-lg font-bold text-white font-display group-hover:text-amber-400 transition-colors">
                                            {post.title}
                                        </h4>
                                    </div>
                                    <div className="pt-3 border-t border-white/[0.06] text-xs text-amber-400 font-semibold">
                                        Read Article &rarr;
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case "feedback":
                return (
                    <div className="max-w-xl mx-auto glass-panel p-8 rounded-3xl border border-white/10 shadow-xl space-y-6">
                        <div className="space-y-2 text-center">
                            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
                                Community Voice
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                                Share Your Experience
                            </h2>
                            <p className="text-xs text-slate-400">
                                Your input directly shapes our roadmap, candidate tools, and recruiter features.
                            </p>
                        </div>

                        {feedbackSubmitted ? (
                            <div className="text-center py-8 flex flex-col items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                                    <IconCheck size={24} />
                                </div>
                                <h4 className="text-lg font-bold text-white font-display">Feedback Received!</h4>
                                <p className="text-xs text-slate-400">Thank you for helping us elevate JobTrek.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleFeedbackSubmit} className="flex flex-col gap-4">
                                <div>
                                    <label className="text-xs font-semibold text-slate-300 block mb-2">Overall Platform Rating</label>
                                    <div className="flex items-center gap-2 justify-center py-2 bg-slate-900/60 rounded-xl border border-white/5">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <button
                                                type="button"
                                                key={star}
                                                onClick={() => setFeedbackRating(star)}
                                                className={`p-1.5 transition-transform hover:scale-110 ${feedbackRating >= star ? "text-amber-400" : "text-slate-600"}`}
                                            >
                                                <IconStarFilled size={24} />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-semibold text-slate-300 block mb-1">What can we improve?</label>
                                    <textarea
                                        rows={4}
                                        required
                                        placeholder="Tell us about search filters, messaging, employer cards, or performance..."
                                        className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white text-sm focus:border-amber-500 focus:outline-none resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md shadow-amber-500/20 transition-all"
                                >
                                    Submit Feedback
                                </button>
                            </form>
                        )}
                    </div>
                );

            case "careers":
                return (
                    <div className="flex flex-col gap-8">
                        <div className="space-y-3">
                            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
                                Join the Team
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
                                Build the Future of Tech Work
                            </h2>
                            <p className="text-slate-300 text-sm">
                                We're hiring senior systems engineers, product designers, and developer advocates.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3">
                            {[
                                { title: "Staff Frontend Architect", location: "Remote &bull; Global", team: "Engineering", type: "Full-Time", salary: "₹50 - ₹75 LPA" },
                                { title: "Principal Distributed Systems Engineer", location: "San Francisco / Remote", team: "Core Infra", type: "Full-Time", salary: "₹75 - ₹110 LPA" },
                                { title: "Senior Product Designer", location: "Bangalore / Remote", team: "Product & UX", type: "Full-Time", salary: "₹35 - ₹55 LPA" },
                            ].map((job, idx) => (
                                <div key={idx} className="glass-panel p-5 sm:p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-bold text-base text-white font-display">{job.title}</h4>
                                            <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-semibold">{job.team}</span>
                                        </div>
                                        <div className="text-xs text-slate-400 mt-1 flex items-center gap-3">
                                            <span>{job.location}</span>
                                            <span>&bull;</span>
                                            <span className="text-emerald-400 font-semibold">{job.salary}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => notifications.show({ title: "Application Opened", message: "Redirecting to JobTrek internal recruiter portal...", color: "amber" })}
                                        className="px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 font-bold text-xs transition-colors shrink-0"
                                    >
                                        Apply Now &rarr;
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case "guidelines":
                return (
                    <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 space-y-6">
                        <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
                            Community Standards
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                            Community & Professional Guidelines
                        </h2>
                        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed pt-4 border-t border-white/[0.08]">
                            <h4 className="text-base font-bold text-white font-display">1. Respectful Communication</h4>
                            <p>
                                Recruiter-to-candidate interactions must be transparent, professional, and courteous. Hate speech, discrimination based on gender, race, religion, or orientation will result in permanent expulsion.
                            </p>
                            <h4 className="text-base font-bold text-white font-display pt-2">2. Genuine Job Opportunities</h4>
                            <p>
                                Employers are prohibited from soliciting unpaid trial labor or posting deceptive promotional content disguised as engineering requisitions.
                            </p>
                        </div>
                    </div>
                );

            case "security":
                return (
                    <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 space-y-6">
                        <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
                            Infrastructure Security
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                            Security, Trust & Privacy Shield
                        </h2>
                        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed pt-4 border-t border-white/[0.08]">
                            <h4 className="text-base font-bold text-white font-display">1. Encryption In-Transit & At-Rest</h4>
                            <p>
                                All traffic to JobTrek is encrypted via TLS 1.3. Sensitive documents including resumes and credentials are stored securely with cryptographic AES-256 isolation.
                            </p>
                            <h4 className="text-base font-bold text-white font-display pt-2">2. Token Authentication</h4>
                            <p>
                                Authenticated sessions use signed JSON Web Tokens (JWT) with automatic expiration and stateless revocation checks.
                            </p>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold text-white font-display capitalize">{activeType.replace("-", " ")}</h2>
                        <p className="text-sm text-slate-300">
                            Welcome to the JobTrek career and resource directory. Everything you need to accelerate your technical journey.
                        </p>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans py-10 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10 flex flex-col gap-8">
                {/* Back to Home Button */}
                <div>
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white border border-white/10 hover:border-amber-500/30 transition-all shadow-sm"
                    >
                        <IconArrowLeft size={16} className="text-amber-400" />
                        <span>Go Back</span>
                    </button>
                </div>

                {/* Page Content Body */}
                <div className="w-full">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default ContentPage;
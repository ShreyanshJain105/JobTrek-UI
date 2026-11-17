import { 
    IconBriefcase, 
    IconBuildingSkyscraper, 
    IconMapPin, 
    IconMessageDots, 
    IconAward, 
    IconTimeline, 
    IconUserCheck
} from "@tabler/icons-react";
import ExperinceCard from "./ExperinceCard";
import CertifyCard from "./CertifyCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfile } from "../Services/ProfileService";
import { useDisclosure } from "@mantine/hooks";
import ChatModal from "../Chat/ChatModal";

const Profile = (props: any) => {
    const { id } = useParams<{ id: string }>();
    const [profile, setProfile] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [chatOpened, { open: openChat, close: closeChat }] = useDisclosure(false);

    useEffect(() => {
        if (id) {
            setLoading(true);
            getProfile(id)
                .then((res) => {
                    setProfile(res);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Error fetching talent profile:", err);
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) {
        return (
            <div className="flex-1 w-full glass-panel p-8 rounded-3xl border border-white/10 animate-pulse space-y-6">
                <div className="h-44 bg-white/5 rounded-2xl" />
                <div className="flex items-center gap-4">
                    <div className="w-24 h-24 rounded-full bg-white/10" />
                    <div className="flex-1 space-y-3">
                        <div className="h-6 bg-white/10 rounded w-1/3" />
                        <div className="h-4 bg-white/5 rounded w-1/4" />
                    </div>
                </div>
                <div className="h-28 bg-white/5 rounded-2xl" />
                <div className="h-40 bg-white/5 rounded-2xl" />
            </div>
        );
    }

    return (
        <div className="flex-1 min-w-0 flex flex-col gap-8">
            {/* Profile Header & Hero Banner Card */}
            <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-xl">
                <div className="h-44 sm:h-52 w-full relative bg-gradient-to-r from-amber-500/20 via-slate-800 to-amber-900/30 overflow-hidden">
                    <img
                        className="w-full h-full object-cover opacity-40 mix-blend-overlay"
                        src="/Profile/banner.jpg"
                        alt="Profile Banner"
                        onError={(e: any) => {
                            e.target.style.display = 'none';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                </div>

                <div className="px-6 sm:px-10 pb-8 relative">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 -mt-16 sm:-mt-20 mb-6">
                        <div className="relative">
                            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl p-1 bg-gradient-to-tr from-amber-400 to-amber-600 shadow-2xl">
                                <img
                                    className="w-full h-full object-cover rounded-[22px] bg-slate-900"
                                    src={
                                        profile.picture
                                            ? `data:image/jpeg;base64,${profile.picture}`
                                            : "/Avatar.png"
                                    }
                                    alt={profile?.name || "Candidate"}
                                />
                            </div>
                            <span className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-950 shadow-sm" />
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={openChat}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all shadow-md shadow-amber-500/20 active:scale-[0.98]"
                            >
                                <IconMessageDots size={16} />
                                <span>Message Talent</span>
                            </button>
                        </div>
                    </div>

                    {/* Basic Info */}
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-wrap items-center gap-3">
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                                {profile?.name}
                            </h1>
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                                <IconUserCheck size={14} /> Available
                            </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300">
                            <span className="flex items-center gap-1.5 font-medium">
                                <IconBriefcase size={16} className="text-amber-400" />
                                {profile?.jobTitle || "Software Engineer"} &bull; <strong className="text-white">{profile?.company || "Open to hire"}</strong>
                            </span>
                            {profile?.location && (
                                <>
                                    <span className="text-slate-600 hidden sm:inline">&bull;</span>
                                    <span className="flex items-center gap-1 text-slate-400">
                                        <IconMapPin size={15} className="text-slate-500" />
                                        {profile.location}
                                    </span>
                                </>
                            )}
                            <span className="text-slate-600 hidden sm:inline">&bull;</span>
                            <span className="flex items-center gap-1.5 text-slate-400">
                                <IconBuildingSkyscraper size={15} className="text-slate-500" />
                                {profile?.totalExp || 1} {profile?.totalExp === 1 ? "Year" : "Years"} Experience
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* About Dossier */}
            {profile?.about && (
                <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 backdrop-blur-xl shadow-xl flex flex-col gap-4">
                    <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
                        <span>About</span>
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                        {profile.about}
                    </p>
                </div>
            )}

            {/* Core Competencies & Skills */}
            {profile?.skills && profile.skills.length > 0 && (
                <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 backdrop-blur-xl shadow-xl flex flex-col gap-4">
                    <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
                        <span>Core Competencies & Skills</span>
                    </h3>
                    <div className="flex flex-wrap gap-2 pt-1">
                        {profile.skills.map((skill: string, index: number) => (
                            <span
                                key={index}
                                className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs sm:text-sm font-semibold tracking-wide hover:bg-amber-500/20 transition-colors"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Professional Experience */}
            {profile?.experiences && profile.experiences.length > 0 && (
                <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 backdrop-blur-xl shadow-xl flex flex-col gap-6">
                    <div className="flex items-center gap-2 pb-4 border-b border-white/[0.08]">
                        <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                            <IconTimeline size={18} />
                        </div>
                        <h3 className="text-lg font-bold text-white font-display">Work History</h3>
                    </div>
                    <div className="flex flex-col pt-2">
                        {profile.experiences.map((exp: any, index: number) => (
                            <ExperinceCard key={index} {...exp} />
                        ))}
                    </div>
                </div>
            )}

            {/* Certifications & Badges */}
            {profile?.certifications && profile.certifications.length > 0 && (
                <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 backdrop-blur-xl shadow-xl flex flex-col gap-6">
                    <div className="flex items-center gap-2 pb-4 border-b border-white/[0.08]">
                        <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                            <IconAward size={18} />
                        </div>
                        <h3 className="text-lg font-bold text-white font-display">Certifications</h3>
                    </div>
                    <div className="flex flex-col gap-4 pt-1">
                        {profile.certifications.map((certi: any, index: number) => (
                            <CertifyCard key={index} {...certi} />
                        ))}
                    </div>
                </div>
            )}

            {/* Direct Recruiter Chat Modal */}
            <ChatModal
                opened={chatOpened}
                close={closeChat}
                applicant={profile}
                jobTitle={profile?.jobTitle}
                status="VERIFIED TALENT"
            />
        </div>
    );
};

export default Profile;

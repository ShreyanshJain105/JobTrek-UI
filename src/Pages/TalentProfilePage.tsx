import { IconArrowLeft, IconChevronRight } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import Profile from "../TalentProfile/Profile";
import Recommendtalent from "../TalentProfile/Recommendtalent";
import { useEffect, useState } from "react";
import { getAllProfiles } from "../Services/ProfileService";

const TalentProfilePage = () => {
    const [talents, setTalents] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        window.scroll(0, 0);
        getAllProfiles()
            .then((res) => setTalents(res || []))
            .catch((err) => console.error("Error fetching profiles:", err));
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                {/* Navigation Breadcrumbs */}
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 mb-6">
                    <Link to="/find-talent" className="hover:text-amber-400 transition-colors">
                        Talent
                    </Link>
                    <IconChevronRight size={14} className="text-slate-600" />
                    <span className="text-slate-200 font-medium">Candidate Profile</span>
                </div>

                <div className="mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-white/10 hover:border-amber-500/30 transition-all shadow-sm"
                    >
                        <IconArrowLeft size={16} className="text-amber-400" />
                        <span>Back</span>
                    </button>
                </div>

                {/* Main Split Layout */}
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    <Profile />
                    <Recommendtalent talents={talents} />
                </div>
            </div>
        </div>
    );
};

export default TalentProfilePage;

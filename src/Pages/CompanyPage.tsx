import { IconArrowLeft, IconChevronRight } from "@tabler/icons-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Company from "../CompanyProfile/Company";
import SimilarCompanies from "../CompanyProfile/SimilarCompanies";

const CompanyPage = () => {
    const navigate = useNavigate();
    const { name } = useParams<{ name?: string }>();
    const displayName = name ? decodeURIComponent(name) : "Company Overview";

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans pb-20 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                {/* Navigation Breadcrumbs */}
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
                    <Link to="/find-jobs" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                        Explore
                    </Link>
                    <IconChevronRight size={14} className="text-slate-400 dark:text-slate-600" />
                    <span className="text-slate-900 dark:text-slate-200 font-semibold">{displayName}</span>
                </div>

                <div className="mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-white/10 hover:border-amber-500/40 transition-all shadow-xs"
                    >
                        <IconArrowLeft size={16} className="text-amber-500" />
                        <span>Back</span>
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    <Company />
                    <SimilarCompanies companyName={displayName} />
                </div>
            </div>
        </div>
    );
};

export default CompanyPage;

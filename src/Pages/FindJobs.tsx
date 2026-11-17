import SearchBar from "../FindJobs/SearchBar";
import Jobs from "../FindJobs/Jobs";

const FindJobs = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-mine-shaft-950 text-slate-900 dark:text-slate-100 pb-16 transition-colors">
            <SearchBar />
            <Jobs />
        </div>
    );
};

export default FindJobs;

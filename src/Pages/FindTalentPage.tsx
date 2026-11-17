import SearchBar from "../FindTalent/SearchBar";
import Talents from "../FindTalent/Talents";

const FindTalentPage = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col gap-8">
                {/* Search Bar Header */}
                <SearchBar />

                {/* Candidate Feed */}
                <Talents />
            </div>
        </div>
    );
};

export default FindTalentPage;

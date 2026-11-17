import { useEffect, useState } from "react";
import Sort from "../FindJobs/Sort";
import TalentCard from "./TalentCard";
import { getAllProfiles } from "../Services/ProfileService";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../Slices/FilterSlice";
import { IconUsers, IconSearchOff } from "@tabler/icons-react";

const Talents = () => {
    const dispatch = useDispatch();
    const [talents, setTalents] = useState<any[]>([]);
    const [filteredTalents, setFilteredTalents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const filter = useSelector((state: any) => state.filter);
    const sort = useSelector((state: any) => state.sort);

    useEffect(() => {
        dispatch(resetFilter());
        setLoading(true);
        getAllProfiles()
            .then((res) => {
                setTalents(res || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error loading talents:", err);
                setLoading(false);
            });
    }, [dispatch]);

    useEffect(() => {
        let list = [...talents];

        if (filter.name) {
            list = list.filter((talent: any) =>
                (talent.name || "").toLowerCase().includes(filter.name.toLowerCase())
            );
        }

        if (filter["Job Title"]?.length) {
            list = list.filter((talent: any) =>
                filter["Job Title"].some((title: string) =>
                    (talent.jobTitle || "").toLowerCase().includes(title.toLowerCase())
                )
            );
        }

        if (filter.Location?.length) {
            list = list.filter((talent: any) =>
                filter.Location.some((loc: string) =>
                    (talent.location || "").toLowerCase().includes(loc.toLowerCase())
                )
            );
        }

        if (filter.Skills?.length) {
            list = list.filter((talent: any) =>
                filter.Skills.some((skill: string) =>
                    (talent.skills || []).some(
                        (s: string) => s.toLowerCase() === skill.toLowerCase()
                    )
                )
            );
        }

        if (filter.exp?.length) {
            list = list.filter(
                (talent: any) =>
                    filter.exp[0] <= (talent.totalExp || 0) &&
                    (talent.totalExp || 0) <= filter.exp[1]
            );
        }

        if (sort === "Experience: Low to High") {
            list.sort((a, b) => (a.totalExp || 0) - (b.totalExp || 0));
        } else if (sort === "Experience: High to Low") {
            list.sort((a, b) => (b.totalExp || 0) - (a.totalExp || 0));
        }

        setFilteredTalents(list);
    }, [filter, sort, talents]);

    return (
        <div className="flex flex-col gap-6">
            {/* Header / Counter Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                        <IconUsers size={20} />
                    </div>
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                            Available Candidates
                        </h2>
                        <p className="text-xs text-slate-400 mt-0.5">
                            {filteredTalents.length} verified candidate{filteredTalents.length === 1 ? "" : "s"} ready for hire
                        </p>
                    </div>
                </div>

                <div className="self-end sm:self-auto">
                    <Sort sort="talent" />
                </div>
            </div>

            {/* Grid or Skeletons */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                        <div key={n} className="p-6 rounded-3xl bg-slate-900/50 border border-white/5 animate-pulse flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-14 h-14 rounded-2xl bg-white/10" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-white/10 rounded w-2/3" />
                                    <div className="h-3 bg-white/5 rounded w-1/2" />
                                </div>
                            </div>
                            <div className="h-10 bg-white/5 rounded-xl" />
                            <div className="h-12 bg-white/5 rounded-xl" />
                        </div>
                    ))}
                </div>
            ) : filteredTalents.length === 0 ? (
                <div className="glass-panel p-12 rounded-3xl border border-white/10 text-center flex flex-col items-center justify-center my-8">
                    <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
                        <IconSearchOff size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-white font-display">No Candidates Found</h3>
                    <p className="text-sm text-slate-400 max-w-sm mt-1">
                        Try expanding your filter parameters, searching for alternative roles, or clearing filters.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTalents.map((talent: any, idx: number) => (
                        <TalentCard key={talent.id || idx} {...talent} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Talents;

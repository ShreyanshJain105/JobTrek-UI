import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import Sort from "./Sort";
import { getAllJobs } from "../Services/JobService";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../Slices/FilterSlice";
import { resetSort } from "../Slices/SortSlice";
import { Button } from "@mantine/core";
import { IconBriefcaseOff } from "@tabler/icons-react";

const Jobs = () => {
    const dispatch = useDispatch();
    const [jobList, setJobList] = useState<any[]>([]);
    const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const filter = useSelector((state: any) => state.filter);
    const sort = useSelector((state: any) => state.sort);

    useEffect(() => {
        dispatch(resetFilter());
        dispatch(resetSort());
        setLoading(true);
        getAllJobs()
            .then((res) => {
                const active = (res || []).filter((job: any) => job.jobStatus === "ACTIVE");
                active.sort((a: any, b: any) => {
                    const timeB = new Date(b.postTime || 0).getTime();
                    const timeA = new Date(a.postTime || 0).getTime();
                    return timeB !== timeA ? timeB - timeA : Number(b.id || 0) - Number(a.id || 0);
                });
                setJobList(active);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [dispatch]);

    useEffect(() => {
        let filterjob = jobList;

        if (filter["Job Title"] && filter["Job Title"].length > 0) {
            filterjob = filterjob.filter((job: any) =>
                (filter["Job Title"] || []).some((title: any) =>
                    (job.jobTitle || "").toLowerCase().includes((title || "").toLowerCase())
                )
            );
        }

        if (filter.Location && filter.Location.length > 0) {
            filterjob = filterjob.filter((job: any) =>
                (filter.Location || []).some((location: any) =>
                    (job.location || "").toLowerCase().includes((location || "").toLowerCase())
                )
            );
        }

        if (filter.Experience && filter.Experience.length > 0) {
            filterjob = filterjob.filter((job: any) =>
                (filter.Experience || []).some((exp: any) =>
                    (job.experience || "").toLowerCase().includes((exp || "").toLowerCase())
                )
            );
        }

        if (filter["Job Type"] && filter["Job Type"].length > 0) {
            filterjob = filterjob.filter((job: any) =>
                (filter["Job Type"] || []).some((type: any) =>
                    (job.jobType || "").toLowerCase().includes((type || "").toLowerCase())
                )
            );
        }

        if (filter.salary && filter.salary.length === 2) {
            filterjob = filterjob.filter((job: any) => {
                const pkg = Number(job.packageOffered || 0);
                return pkg >= filter.salary[0] && pkg <= filter.salary[1];
            });
        }

        setFilteredJobs(filterjob);
    }, [filter, jobList]);

    useEffect(() => {
        if (sort === "Most Recent") {
            setFilteredJobs((prev) =>
                [...prev].sort((a: any, b: any) => new Date(b.postTime).getTime() - new Date(a.postTime).getTime())
            );
        } else if (sort === "Salary: Low to High") {
            setFilteredJobs((prev) =>
                [...prev].sort((a: any, b: any) => Number(a.packageOffered || 0) - Number(b.packageOffered || 0))
            );
        } else if (sort === "Salary: High to Low") {
            setFilteredJobs((prev) =>
                [...prev].sort((a: any, b: any) => Number(b.packageOffered || 0) - Number(a.packageOffered || 0))
            );
        }
    }, [sort]);

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-white/[0.06]">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
                        Available Opportunities
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Showing <span className="text-amber-500 dark:text-amber-400 font-semibold">{filteredJobs.length}</span> vetted tech openings
                    </p>
                </div>
                <Sort sort="job" />
            </div>

            {/* Loading Skeletons */}
            {loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} className="h-64 rounded-2xl bg-slate-900/40 border border-white/5 animate-pulse p-5 flex flex-col justify-between">
                            <div className="flex gap-3 items-center">
                                <div className="w-12 h-12 rounded-xl bg-slate-800" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-slate-800 rounded w-3/4" />
                                    <div className="h-3 bg-slate-800 rounded w-1/2" />
                                </div>
                            </div>
                            <div className="h-12 bg-slate-800/60 rounded-xl" />
                        </div>
                    ))}
                </div>
            )}

            {/* Jobs Grid */}
            {!loading && filteredJobs.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
                    {filteredJobs.map((job: any) => (
                        <JobCard key={job.id} {...job} />
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!loading && filteredJobs.length === 0 && (
                <div className="py-20 text-center flex flex-col items-center justify-center max-w-md mx-auto">
                    <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                        <IconBriefcaseOff size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-white font-display">No Matches Found</h3>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
                        No active jobs matched your current filter criteria. Try broadening your keywords, location, or salary range.
                    </p>
                    <Button 
                        onClick={() => dispatch(resetFilter())}
                        className="mt-6 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl"
                        size="sm"
                    >
                        Reset All Filters
                    </Button>
                </div>
            )}
        </section>
    );
};

export default Jobs;

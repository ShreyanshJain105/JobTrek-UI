import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import Sort from "./Sort";
import { getAllJobs } from "../Services/JobService";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../Slices/FilterSlice";
import { resetSort } from "../Slices/SortSlice";

const Jobs = () => {
    const dispatch = useDispatch();
    const [jobList, setJobList] = useState([{}]);
    const [filteredJobs, setFilteredJobs] = useState<any>([]);
    const filter = useSelector((state: any) => state.filter);
    const sort = useSelector((state: any) => state.sort);


    useEffect(() => {
        dispatch(resetFilter())
        dispatch(resetSort());
        getAllJobs()
            .then((res) => {
                setJobList(res.filter((job: any) => job.jobStatus === "ACTIVE"));
                console.log(res[0]);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    const experienceMapping: any = {
        "fresher (0-1 years)": "fresher (0-1 years)",
        "entry level (1-2 years)": "entry level (0-2 years)", // ❌ ye bas ek hi string match karega
        "junior (2-4 years)": "junior (2-4 years)",
        "mid level (4-6 years)": "mid level (2-5 years)",
        "senior (6-8 years)": "senior level (5-8 years)",
        "lead (8-10 years)": "lead (8-10 years)"
    };


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
                (filter.Experience || []).some((x: any) =>
                    (experienceMapping[job.experience?.toLowerCase()] || "")
                        .includes(x.toLowerCase())
                )
            );
        }


        if (filter["Job Type"] && filter["Job Type"].length > 0) {
            filterjob = filterjob.filter((job: any) =>
                (filter["Job Type"] || []).some((title: any) =>
                    (job.jobType || "").toLowerCase().includes((title || "").toLowerCase())
                )
            );
        }

        if (filter.salary && filter.salary.length > 0) {

            filterjob = filterjob.filter((jobs: any) => filter.salary[0]
                <= jobs.packageOffered
                && jobs.packageOffered <= filter.salary[1]
            );

        }

        setFilteredJobs(filterjob);
    }, [filter, jobList]);

    useEffect(() => {
        if (sort === "Most Recent") {
            setJobList(
                [...jobList].sort(
                    (a: any, b: any) =>
                        new Date(b.postTime).getTime() - new Date(a.postTime).getTime()
                )
            );
        } else if (sort === "Salary: Low to High") {
            setJobList(
                [...jobList].sort((a: any, b: any) => a.packageOffered - b.packageOffered)
            );
        } else if (sort === "Salary: High to Low") {
            setJobList(
                [...jobList].sort((a: any, b: any) => b.packageOffered - a.packageOffered)
            );
        }else{

        }
    }, [sort]);


    return <div className="p-5">
        <div className=" flex justify-between flex-wrap mt-5">
            <div className="text-2xl font-semibold  xs-mx:text-xl">Recommended Jobs</div>
            <Sort sort="job" />
        </div>
        <div className="mt-10 flex flex-wrap gap-5">
            {
                filteredJobs.map((job: any, index: any) => <JobCard key={index} {...job} />)
            }
        </div>


    </div>

}
export default Jobs;
import { useEffect, useState } from "react";
import Sort from "../FindJobs/Sort";
import TalentCard from "./TalentCard";
import { getAllProfiles } from "../Services/ProfileService";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../Slices/FilterSlice";

const Talents = () => {
  const dispatch = useDispatch();
  const [talents, setTalents] = useState<any>([]);
  const [filteredTalents, setFilteredTalents] = useState<any>([]);

  const filter = useSelector((state: any) => state.filter);
  const sort = useSelector((state: any) => state.sort); // ✅ Correct slice

  useEffect(() => {
    dispatch(resetFilter());
    getAllProfiles()
      .then((res) => setTalents(res))
      .catch((err) => console.log(err));
  }, []);

  // 🔹 Filtering
  useEffect(() => {
    let filterTalent = [...talents];

    if (filter.name) {
      filterTalent = filterTalent.filter((talent: any) =>
        (talent.name || "").toLowerCase().includes(filter.name.toLowerCase())
      );
    }

    if (filter["Job Title"]?.length) {
      filterTalent = filterTalent.filter((talent: any) =>
        filter["Job Title"].some((title: any) =>
          (talent.jobTitle || "").toLowerCase().includes(title.toLowerCase())
        )
      );
    }

    if (filter.Location?.length) {
      filterTalent = filterTalent.filter((talent: any) =>
        filter.Location.some((location: any) =>
          (talent.location || "").toLowerCase().includes(location.toLowerCase())
        )
      );
    }

    if (filter.Skills?.length) {
      filterTalent = filterTalent.filter((talent: any) =>
        filter.Skills.some((skill: any) =>
          (talent.skills || []).some(
            (s: any) => s.toLowerCase() === skill.toLowerCase()
          )
        )
      );
    }

    if (filter.exp?.length) {
      filterTalent = filterTalent.filter(
        (talent: any) =>
          filter.exp[0] <= talent.totalExp &&
          talent.totalExp <= filter.exp[1]
      );
    }

    // Apply Sorting AFTER filter
    if (sort === "Experience: Low to High") {
      filterTalent.sort((a, b) => a.totalExp - b.totalExp);
    } else if (sort === "Experience: High to Low") {
      filterTalent.sort((a, b) => b.totalExp - a.totalExp);
    }

    setFilteredTalents(filterTalent);
  }, [filter, sort, talents]);

  return (
    <div className="p-5">
      <div className="flex justify-between">
        <div className="text-2xl font-semibold">Talents</div>
        <Sort sort="talent" />
      </div>
      <div className="flex mt-10 flex-wrap gap-5 justify-between mx-14">
        {filteredTalents?.length ? (
          filteredTalents.map((talent: any, index: number) => (
            <TalentCard key={index} {...talent} />
          ))
        ) : (
          <div className="text-xl font-semibold">
            No talents found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default Talents;

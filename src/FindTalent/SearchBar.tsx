import { Collapse, RangeSlider, useMantineColorScheme } from "@mantine/core";
import { useState } from "react";
import { searchFields } from "../Data/TalentData";
import MultiInput from "../FindJobs/MultiInput";
import { IconSearch, IconAdjustmentsHorizontal, IconX } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../Slices/FilterSlice";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

const SearchBar = () => {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const [opened, { toggle }] = useDisclosure(false);
    const dispatch = useDispatch();
    const [expRange, setExpRange] = useState<[number, number]>([0, 50]);
    const [name, setName] = useState("");
    const { colorScheme } = useMantineColorScheme();
    const isDark = typeof document !== "undefined"
        ? (document.documentElement.classList.contains("dark") || (!document.documentElement.classList.contains("light") && colorScheme === "dark"))
        : colorScheme === "dark";

    const handleNameChange = (val: string) => {
        setName(val);
        dispatch(updateFilter({ name: val }));
    };

    const handleExpChange = (val: [number, number]) => {
        setExpRange(val);
        dispatch(updateFilter({ exp: val }));
    };

    return (
        <div className="w-full">
            {/* Mobile Filter Toggle */}
            {isMobile && (
                <div className="flex justify-end mb-4">
                    <button
                        onClick={toggle}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-500 text-slate-950 text-xs font-bold transition-all shadow-md"
                    >
                        {opened ? <IconX size={16} /> : <IconAdjustmentsHorizontal size={16} />}
                        <span>{opened ? "Close Filters" : "Filter Candidates"}</span>
                    </button>
                </div>
            )}

            <Collapse in={opened || !isMobile}>
                <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900/70 border border-slate-200/90 dark:border-white/10 backdrop-blur-xl shadow-md dark:shadow-xl flex flex-col lg:flex-row items-stretch lg:items-center gap-4 transition-colors">
                    {/* Candidate Name Search */}
                    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-100/90 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 flex-1 min-w-[200px]">
                        <IconSearch size={18} className="text-amber-500 dark:text-amber-400 shrink-0" />
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => handleNameChange(e.target.value)}
                            placeholder="Candidate name or keyword..."
                            className="w-full bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none"
                        />
                        {name && (
                            <button
                                onClick={() => handleNameChange("")}
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                            >
                                <IconX size={14} />
                            </button>
                        )}
                    </div>

                    {/* MultiSelect Filter Dropdowns */}
                    <div className="flex flex-wrap sm:flex-nowrap gap-3 flex-[2]">
                        {searchFields.map((field, idx) => (
                            <div key={idx} className="flex-1 min-w-[140px]">
                                <MultiInput {...field} />
                            </div>
                        ))}
                    </div>

                    {/* Experience Range Slider */}
                    <div className="px-4 py-3 rounded-2xl bg-slate-100/90 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 flex flex-col justify-center min-w-[200px] lg:w-56 shrink-0">
                        <div className="flex items-center justify-between text-xs mb-2">
                            <span className="font-semibold text-slate-600 dark:text-slate-400">Experience</span>
                            <span className="font-bold text-amber-600 dark:text-amber-400">
                                {expRange[0]} - {expRange[1]} yrs
                            </span>
                        </div>
                        <RangeSlider
                            size="xs"
                            color="amber"
                            value={expRange}
                            onChange={setExpRange}
                            onChangeEnd={handleExpChange}
                            min={0}
                            max={50}
                            minRange={1}
                            styles={{
                                bar: { backgroundColor: "#f59e0b" },
                                thumb: { borderColor: "#f59e0b", backgroundColor: isDark ? "#0b0f19" : "#ffffff" },
                                track: { backgroundColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(15, 23, 42, 0.1)" }
                            }}
                        />
                    </div>
                </div>
            </Collapse>
        </div>
    );
};

export default SearchBar;

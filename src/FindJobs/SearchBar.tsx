import { Button, Collapse, RangeSlider, useMantineColorScheme } from "@mantine/core";
import { dropdownData } from "../Data/JobsData";
import MultiInput from "./MultiInput";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateFilter, resetFilter } from "../Slices/FilterSlice";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconFilter, IconRotateClockwise } from "@tabler/icons-react";

const SearchBar = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [opened, { toggle }] = useDisclosure(false);
    const dispatch = useDispatch();
    const [value, setValue] = useState<[number, number]>([0, 300]);
    const { colorScheme } = useMantineColorScheme();
    const isDark = typeof document !== "undefined"
        ? (document.documentElement.classList.contains("dark") || (!document.documentElement.classList.contains("light") && colorScheme === "dark"))
        : colorScheme === "dark";

    const handleChange = (range: [number, number]) => {
        dispatch(updateFilter({ salary: range }));
    };

    const handleReset = () => {
        setValue([0, 300]);
        dispatch(resetFilter());
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
            {/* Mobile Filter Toggle */}
            {isMobile && (
                <div className="flex justify-between items-center mb-4">
                    <Button
                        onClick={toggle}
                        radius="xl"
                        size="sm"
                        leftSection={<IconFilter size={16} />}
                        variant="filled"
                        className="bg-amber-500 text-slate-950 font-bold"
                    >
                        {opened ? "Hide Filters" : "Filter Opportunities"}
                    </Button>

                    <Button
                        onClick={handleReset}
                        variant="subtle"
                        size="sm"
                        color="gray"
                        leftSection={<IconRotateClockwise size={14} />}
                        className="text-slate-400 hover:text-white"
                    >
                        Reset
                    </Button>
                </div>
            )}

            <Collapse in={opened || !isMobile}>
                <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900/70 border border-slate-200/90 dark:border-white/[0.08] backdrop-blur-xl shadow-md dark:shadow-xl flex flex-col lg:flex-row items-stretch lg:items-center gap-4 transition-colors">
                    {/* Filter Dropdowns Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 flex-1 w-full">
                        {dropdownData.map((item, index) => (
                            <div key={item.title || index} className="w-full">
                                <MultiInput {...item} />
                            </div>
                        ))}
                    </div>

                    {/* Salary Range Slider */}
                    <div className="w-full lg:w-72 bg-slate-100/90 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-white/5 p-3 flex flex-col justify-center shrink-0">
                        <div className="flex text-xs font-semibold justify-between text-slate-700 dark:text-slate-300 mb-2">
                            <span className="font-display">Salary Range</span>
                            <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">
                                &#8377;{value[0]} - &#8377;{value[1]} LPA
                            </span>
                        </div>
                        <RangeSlider
                            size="xs"
                            color="amber"
                            value={value}
                            min={0}
                            max={300}
                            onChangeEnd={handleChange}
                            onChange={setValue}
                            styles={{
                                thumb: { borderWidth: 2, borderColor: '#f59e0b', backgroundColor: isDark ? '#090d16' : '#ffffff' },
                                bar: { backgroundColor: '#f59e0b' },
                                track: { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(15, 23, 42, 0.1)' }
                            }}
                        />
                    </div>

                    {/* Reset Filters on Desktop */}
                    {!isMobile && (
                        <button
                            type="button"
                            onClick={handleReset}
                            title="Reset all filters"
                            className="p-2.5 rounded-2xl text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-white/[0.05] border border-slate-200 dark:border-white/[0.06] hover:border-amber-500/30 transition-all cursor-pointer shrink-0 self-center"
                        >
                            <IconRotateClockwise size={18} />
                        </button>
                    )}
                </div>
            </Collapse>
        </div>
    );
};

export default SearchBar;

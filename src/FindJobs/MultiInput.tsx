import { Checkbox, Combobox, Group, ScrollArea, useCombobox, useMantineColorScheme } from '@mantine/core';
import { IconChevronDown, IconX } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilter } from '../Slices/FilterSlice';

const MultiInput = (props: any) => {
    const dispatch = useDispatch();
    const filter = useSelector((state: any) => state.filter);
    const { colorScheme } = useMantineColorScheme();
    const isDark = typeof document !== "undefined"
        ? (document.documentElement.classList.contains("dark") || (!document.documentElement.classList.contains("light") && colorScheme === "dark"))
        : colorScheme === "dark";

    const combobox = useCombobox({
        onDropdownClose: () => {
            combobox.resetSelectedOption();
            setSearch('');
        },
        onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
    });

    const [search, setSearch] = useState('');
    const [data, setData] = useState<string[]>(props.options || []);
    const [value, setValue] = useState<string[]>([]);

    useEffect(() => {
        setData(props.options || []);
    }, [props.options]);

    // Sync local state if Redux filter is reset
    useEffect(() => {
        const filterVal = filter?.[props.title];
        if (Array.isArray(filterVal)) {
            setValue(filterVal);
        } else if (!filterVal) {
            setValue([]);
        }
    }, [filter, props.title]);

    const exactOptionMatch = data.some((item) => item.toLowerCase() === search.trim().toLowerCase());

    const handleValueSelect = (val: string) => {
        setSearch('');

        if (val === '$create') {
            const newOption = search.trim();
            if (!newOption) return;
            const updatedData = [...data, newOption];
            const updatedValue = [...value, newOption];
            setData(updatedData);
            setValue(updatedValue);
            dispatch(updateFilter({ [props.title]: updatedValue }));
        } else {
            const updatedValue = value.includes(val)
                ? value.filter((v) => v !== val)
                : [...value, val];
            setValue(updatedValue);
            dispatch(updateFilter({ [props.title]: updatedValue }));
        }
    };

    const handleClearAll = (e: React.MouseEvent) => {
        e.stopPropagation();
        setValue([]);
        dispatch(updateFilter({ [props.title]: [] }));
    };

    const filteredOptions = data.filter((item) =>
        item.toLowerCase().includes(search.trim().toLowerCase())
    );

    const options = filteredOptions.map((item) => (
        <Combobox.Option
            value={item}
            key={item}
            active={value.includes(item)}
            className={`px-2.5 py-1.5 rounded-xl text-xs sm:text-sm cursor-pointer transition-colors ${
                isDark 
                    ? "text-slate-300 hover:text-amber-400 hover:bg-amber-500/10" 
                    : "text-slate-700 hover:text-amber-600 hover:bg-amber-500/10"
            }`}
        >
            <Group gap="xs" wrap="nowrap" justify="space-between">
                <span className="truncate">{item}</span>
                <Checkbox
                    size="xs"
                    color="amber"
                    checked={value.includes(item)}
                    onChange={() => {}}
                    aria-hidden
                    tabIndex={-1}
                    style={{ pointerEvents: 'none' }}
                    styles={{
                        input: {
                            backgroundColor: value.includes(item) ? '#f59e0b' : (isDark ? 'rgba(15, 23, 42, 0.8)' : '#ffffff'),
                            borderColor: value.includes(item) ? '#f59e0b' : (isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(15, 23, 42, 0.2)'),
                            borderRadius: '4px',
                        },
                    }}
                />
            </Group>
        </Combobox.Option>
    ));

    const IconComp = props.icon;

    return (
        <Combobox
            store={combobox}
            onOptionSubmit={handleValueSelect}
            withinPortal={true}
            position="bottom-start"
            middlewares={{ flip: true, shift: true }}
            width="target"
            shadow="xl"
            transitionProps={{ duration: 150, transition: 'fade' }}
            styles={{
                dropdown: {
                    backgroundColor: isDark ? '#0b0f19' : '#ffffff',
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(15, 23, 42, 0.12)',
                    borderRadius: '16px',
                    boxShadow: isDark 
                        ? '0 20px 25px -5px rgba(0, 0, 0, 0.7), 0 8px 10px -6px rgba(0, 0, 0, 0.7)'
                        : '0 10px 25px -5px rgba(15, 23, 42, 0.12), 0 8px 10px -6px rgba(15, 23, 42, 0.08)',
                    padding: '8px',
                    zIndex: 1000,
                    minWidth: '200px',
                },
            }}
        >
            <Combobox.DropdownTarget>
                <div
                    onClick={() => combobox.toggleDropdown()}
                    className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl border transition-all cursor-pointer min-h-[42px] max-h-[42px] overflow-hidden ${
                        isDark
                            ? "bg-slate-900/60 hover:bg-slate-900/90 border-white/5 hover:border-amber-500/30"
                            : "bg-white hover:bg-slate-50 border-slate-200 hover:border-amber-500/40 shadow-sm"
                    }`}
                >
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                        {IconComp && (
                            <div className="text-amber-500 shrink-0">
                                <IconComp size={16} />
                            </div>
                        )}

                        <div className="flex items-center gap-1.5 min-w-0 flex-1 overflow-hidden">
                            {value.length === 0 ? (
                                <span className="text-xs sm:text-sm font-medium text-slate-400 truncate">
                                    {props.title}
                                </span>
                            ) : (
                                <div className="flex items-center gap-1 min-w-0">
                                    <span className="px-2 py-0.5 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-500 dark:text-amber-400 text-xs font-semibold truncate max-w-[110px]">
                                        {value[0]}
                                    </span>
                                    {value.length > 1 && (
                                        <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold shrink-0 ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700'}`}>
                                            +{value.length - 1}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0 text-slate-400">
                        {value.length > 0 && (
                            <button
                                type="button"
                                onClick={handleClearAll}
                                className="p-0.5 hover:text-amber-500 transition-colors"
                                title="Clear selection"
                            >
                                <IconX size={12} />
                            </button>
                        )}
                        <IconChevronDown size={14} className="text-slate-400" />
                    </div>
                </div>
            </Combobox.DropdownTarget>

            <Combobox.Dropdown>
                <Combobox.Search
                    value={search}
                    onChange={(event) => setSearch(event.currentTarget.value)}
                    placeholder={`Search ${props.title}...`}
                    styles={{
                        input: {
                            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.8)' : '#f8fafc',
                            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(15, 23, 42, 0.1)',
                            color: isDark ? '#f8fafc' : '#0f172a',
                            borderRadius: '10px',
                            fontSize: '0.8125rem',
                            padding: '6px 10px',
                            marginBottom: '6px',
                            '&:focus': {
                                borderColor: '#f59e0b',
                            },
                        },
                    }}
                />

                <Combobox.Options>
                    <ScrollArea.Autosize mah={220} type="scroll">
                        {options}
                        {!exactOptionMatch && search.trim().length > 0 && (
                            <Combobox.Option
                                value="$create"
                                className="px-2.5 py-1.5 rounded-xl text-xs font-semibold text-amber-500 hover:bg-amber-500/10 cursor-pointer"
                            >
                                + Add &quot;{search.trim()}&quot;
                            </Combobox.Option>
                        )}
                        {exactOptionMatch && search.trim().length > 0 && options.length === 0 && (
                            <Combobox.Empty className="text-xs text-slate-400 text-center py-3">
                                No matching options
                            </Combobox.Empty>
                        )}
                    </ScrollArea.Autosize>
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
};

export default MultiInput;

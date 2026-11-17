import { Combobox, InputBase, ScrollArea, useCombobox, useMantineColorScheme } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useInputStyles } from '../Services/ThemeStyles';

const SelectInput = (props: any) => {
    useEffect(() => {
        setData(props.options || []);
        const val = props.form.getInputProps(props.name).value;
        setValue(val);
        setSearch(val || '');
    }, [props]);

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const [data, setData] = useState<string[]>([]);
    const [value, setValue] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const inputStyles = useInputStyles();
    const { colorScheme } = useMantineColorScheme();
    const isDark = typeof document !== "undefined"
        ? (document.documentElement.classList.contains("dark") || (!document.documentElement.classList.contains("light") && colorScheme === "dark"))
        : colorScheme === "dark";

    const exactOptionMatch = data.some((item) => item.toLowerCase() === search?.toLowerCase().trim());
    const filteredOptions = exactOptionMatch
        ? data
        : data.filter((item) => item.toLowerCase().includes(search?.toLowerCase().trim()));

    const options = filteredOptions.map((item) => (
        <Combobox.Option
            value={item}
            key={item}
            className={`px-3 py-2 rounded-xl text-xs sm:text-sm cursor-pointer transition-colors ${
                isDark 
                    ? "text-slate-300 hover:text-amber-400 hover:bg-amber-500/10" 
                    : "text-slate-700 hover:text-amber-600 hover:bg-amber-500/10"
            }`}
        >
            {item}
        </Combobox.Option>
    ));

    return (
        <Combobox
            store={combobox}
            withinPortal={true}
            position="bottom-start"
            shadow="xl"
            width="target"
            onOptionSubmit={(val) => {
                if (val === '$create') {
                    setData((current) => [...current, search]);
                    setValue(search);
                    props.form.setFieldValue(props.name, search);
                } else {
                    setValue(val);
                    setSearch(val);
                    props.form.setFieldValue(props.name, val);
                }
                combobox.closeDropdown();
            }}
        >
            <Combobox.Target>
                <InputBase
                    {...props.form.getInputProps(props.name)}
                    withAsterisk
                    label={props.label}
                    leftSection={props.leftSection ? <props.leftSection stroke={1.5} size={18} className="text-amber-400" /> : undefined}
                    value={search}
                    rightSection={<Combobox.Chevron style={{ color: isDark ? "#64748b" : "#94a3b8" }} />}
                    onChange={(event) => {
                        combobox.openDropdown();
                        combobox.updateSelectedOptionIndex();
                        setSearch(event.currentTarget.value);
                    }}
                    onClick={() => combobox.openDropdown()}
                    onFocus={() => combobox.openDropdown()}
                    onBlur={() => {
                        combobox.closeDropdown();
                        setSearch(value || '');
                    }}
                    placeholder={props.placeholder}
                    rightSectionPointerEvents="none"
                    styles={inputStyles}
                />
            </Combobox.Target>

            <Combobox.Dropdown
                style={{
                    backgroundColor: isDark ? "#0b0f19" : "#ffffff",
                    borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(15, 23, 42, 0.1)",
                    borderRadius: "16px",
                    boxShadow: isDark
                        ? "0 20px 25px -5px rgba(0, 0, 0, 0.5)"
                        : "0 10px 25px -5px rgba(15, 23, 42, 0.12)",
                    padding: "6px",
                }}
            >
                <Combobox.Options>
                    <ScrollArea.Autosize mah={200} type="scroll">
                        {options}
                        {!exactOptionMatch && search?.trim()?.length > 0 && (
                            <Combobox.Option
                                value="$create"
                                style={{
                                    padding: "8px 12px",
                                    borderRadius: "10px",
                                    fontSize: "0.8125rem",
                                    color: "#f59e0b",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                }}
                            >
                                + Create &quot;{search}&quot;
                            </Combobox.Option>
                        )}
                    </ScrollArea.Autosize>
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
};

export default SelectInput;

import { Menu, ActionIcon, Tooltip } from "@mantine/core";
import { useMantineColorScheme } from "@mantine/core";
import { 
    IconSun, 
    IconMoon, 
    IconDeviceDesktop, 
    IconCheck 
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
    const { colorScheme, setColorScheme } = useMantineColorScheme();
    const [current, setCurrent] = useState<"dark" | "light" | "auto">(() => {
        const saved = localStorage.getItem("jobtrek_appearance") as "dark" | "light" | "auto";
        return saved || "dark";
    });

    const applyThemeToDOM = (scheme: "dark" | "light" | "auto") => {
        const root = document.documentElement;
        root.classList.remove("dark", "light");

        let resolvedDark = false;
        if (scheme === "dark") {
            resolvedDark = true;
            root.classList.add("dark");
        } else if (scheme === "light") {
            resolvedDark = false;
            root.classList.add("light");
        } else {
            // System
            resolvedDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            root.classList.add(resolvedDark ? "dark" : "light");
        }

        root.setAttribute("data-theme", scheme);
        root.setAttribute("data-mantine-color-scheme", resolvedDark ? "dark" : "light");
        localStorage.setItem("jobtrek_appearance", scheme);
        localStorage.setItem("mantine-color-scheme-value", resolvedDark ? "dark" : "light");
        try {
            setColorScheme(scheme);
        } catch (e) {
            // Fallback
        }
    };

    useEffect(() => {
        applyThemeToDOM(current);
        localStorage.setItem("jobtrek_appearance", current);

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = () => {
            if (current === "auto") {
                applyThemeToDOM("auto");
            }
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [current]);

    const handleSelect = (mode: "dark" | "light" | "auto") => {
        setCurrent(mode);
        applyThemeToDOM(mode);
    };

    return (
        <Menu shadow="xl" width={175} position="bottom-end" radius="md">
            <Menu.Target>
                <Tooltip label="Change Appearance" position="bottom" withArrow>
                    <button
                        type="button"
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/[0.04] hover:bg-amber-500/10 border border-white/[0.08] hover:border-amber-500/30 text-slate-300 hover:text-amber-400 flex items-center justify-center transition-all shadow-sm group cursor-pointer"
                        aria-label="Theme mode switcher"
                    >
                        {current === "dark" && (
                            <IconMoon size={18} className="text-amber-400 group-hover:scale-110 transition-transform" />
                        )}
                        {current === "light" && (
                            <IconSun size={18} className="text-amber-500 group-hover:rotate-45 transition-transform" />
                        )}
                        {current === "auto" && (
                            <IconDeviceDesktop size={18} className="text-slate-300 group-hover:scale-110 transition-transform" />
                        )}
                    </button>
                </Tooltip>
            </Menu.Target>

            <Menu.Dropdown className="bg-white dark:bg-[#0b0f19] border border-slate-200 dark:border-white/10 p-1.5 rounded-2xl shadow-2xl backdrop-blur-xl">
                <Menu.Label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 px-2 py-1">
                    Appearance
                </Menu.Label>

                <Menu.Item
                    onClick={() => handleSelect("dark")}
                    className={`rounded-xl px-2.5 py-2 text-xs font-semibold flex items-center justify-between cursor-pointer transition-colors ${
                        current === "dark"
                            ? "bg-amber-500/15 text-amber-500 dark:text-amber-400 font-bold"
                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                    }`}
                    leftSection={<IconMoon size={15} className="text-amber-500 shrink-0" />}
                >
                    <div className="flex items-center justify-between w-full">
                        <span>Black (Dark)</span>
                        {current === "dark" && <IconCheck size={14} className="text-amber-500" />}
                    </div>
                </Menu.Item>

                <Menu.Item
                    onClick={() => handleSelect("light")}
                    className={`rounded-xl px-2.5 py-2 text-xs font-semibold flex items-center justify-between cursor-pointer transition-colors ${
                        current === "light"
                            ? "bg-amber-500/15 text-amber-500 dark:text-amber-400 font-bold"
                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                    }`}
                    leftSection={<IconSun size={15} className="text-amber-500 shrink-0" />}
                >
                    <div className="flex items-center justify-between w-full">
                        <span>Light</span>
                        {current === "light" && <IconCheck size={14} className="text-amber-500" />}
                    </div>
                </Menu.Item>

                <Menu.Item
                    onClick={() => handleSelect("auto")}
                    className={`rounded-xl px-2.5 py-2 text-xs font-semibold flex items-center justify-between cursor-pointer transition-colors ${
                        current === "auto"
                            ? "bg-amber-500/15 text-amber-500 dark:text-amber-400 font-bold"
                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                    }`}
                    leftSection={<IconDeviceDesktop size={15} className="text-slate-400 shrink-0" />}
                >
                    <div className="flex items-center justify-between w-full">
                        <span>System</span>
                        {current === "auto" && <IconCheck size={14} className="text-amber-500" />}
                    </div>
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};

export default ThemeSwitcher;
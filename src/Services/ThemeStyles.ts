import { useMantineColorScheme } from "@mantine/core";

/**
 * Accurately determines if dark mode is active by checking both Mantine state
 * and DOM classList/attributes to avoid desynchronization.
 */
const checkIsDark = (colorScheme: string): boolean => {
    if (typeof document !== "undefined") {
        if (document.documentElement.classList.contains("dark")) return true;
        if (document.documentElement.classList.contains("light")) return false;
        const domAttr = document.documentElement.getAttribute("data-mantine-color-scheme");
        if (domAttr === "dark") return true;
        if (domAttr === "light") return false;
    }
    return colorScheme === "dark";
};

/**
 * Returns Mantine `styles` prop objects that adapt to the current color scheme.
 * Configured with generous left/right padding to prevent icon & text overlap.
 */
export const useInputStyles = (hasLeftSection: boolean = true, isTextarea: boolean = false) => {
    const { colorScheme } = useMantineColorScheme();
    const isDark = checkIsDark(colorScheme);

    const baseInputStyle: Record<string, any> = {
        backgroundColor: isDark ? "rgba(15, 23, 42, 0.85)" : "#ffffff",
        borderColor: isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(15, 23, 42, 0.16)",
        color: isDark ? "#f8fafc" : "#0f172a",
        borderRadius: "14px",
        fontSize: "0.875rem",
        paddingLeft: hasLeftSection ? "52px" : "16px",
        paddingRight: "44px",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
        "&:focus": {
            borderColor: "#f59e0b",
            boxShadow: "0 0 0 2px rgba(245, 158, 11, 0.2)",
        },
        "&::placeholder": {
            color: isDark ? "#64748b" : "#94a3b8",
            opacity: 1,
        },
    };

    if (!isTextarea) {
        baseInputStyle.height = "46px";
    }

    return {
        root: {
            width: "100%",
        },
        wrapper: {
            width: "100%",
        },
        input: baseInputStyle,
        innerInput: {
            paddingLeft: hasLeftSection ? "48px" : "16px",
            paddingRight: "44px",
            height: "100%",
            color: isDark ? "#f8fafc" : "#0f172a",
        },
        section: {
            width: "46px",
            pointerEvents: "none" as const,
        },
        label: {
            color: isDark ? "#cbd5e1" : "#334155",
            fontSize: "0.875rem",
            fontWeight: 600 as const,
            marginBottom: "6px",
        },
    };
};

/**
 * Returns pill/tag styles for TagsInput adapted to color scheme.
 */
export const useTagsInputStyles = () => {
    const inputStyles = useInputStyles(false);
    const { colorScheme } = useMantineColorScheme();
    const isDark = checkIsDark(colorScheme);

    return {
        ...inputStyles,
        input: {
            ...inputStyles.input,
            paddingLeft: "14px",
            paddingRight: "14px",
            minHeight: "46px",
            height: "auto",
        },
        pill: {
            backgroundColor: isDark
                ? "rgba(245, 158, 11, 0.18)"
                : "rgba(245, 158, 11, 0.12)",
            border: "1px solid rgba(245, 158, 11, 0.35)",
            color: isDark ? "#fbbf24" : "#d97706",
            fontWeight: 600,
            borderRadius: "8px",
        },
    };
};

/**
 * Returns RichTextEditor styles adapted to color scheme.
 */
export const useEditorStyles = () => {
    const { colorScheme } = useMantineColorScheme();
    const isDark = checkIsDark(colorScheme);

    return {
        root: {
            border: "none",
            backgroundColor: isDark ? "rgba(15, 23, 42, 0.85)" : "#ffffff",
        },
        toolbar: {
            backgroundColor: isDark ? "#0f172a" : "#f8fafc",
            borderColor: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(15, 23, 42, 0.1)",
            padding: "8px",
        },
        content: {
            backgroundColor: isDark ? "rgba(15, 23, 42, 0.85)" : "#ffffff",
            color: isDark ? "#f8fafc" : "#0f172a",
            minHeight: "180px",
            padding: "16px",
            fontSize: "0.875rem",
            lineHeight: "1.6",
        },
        control: {
            backgroundColor: "transparent",
            borderColor: "transparent",
            color: isDark ? "#94a3b8" : "#475569",
            borderRadius: "8px",
            "&:hover": {
                backgroundColor: isDark
                    ? "rgba(255, 255, 255, 0.08)"
                    : "rgba(15, 23, 42, 0.08)",
                color: isDark ? "#ffffff" : "#0f172a",
            },
            "&[data-active=\"true\"]": {
                backgroundColor: "rgba(245, 158, 11, 0.2)",
                color: "#f59e0b",
            },
        },
    };
};

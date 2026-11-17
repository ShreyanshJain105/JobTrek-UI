import {
    PasswordInput,
    TextInput,
    Checkbox,
    LoadingOverlay,
} from "@mantine/core";
import { IconAt, IconCheck, IconLock, IconUser, IconArrowRight, IconSparkles } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../Services/UserService";
import { notifications } from "@mantine/notifications";
import { signupValidation } from "../Services/FormValidation";
import { useInputStyles } from "../Services/ThemeStyles";
import { useMantineColorScheme } from "@mantine/core";

const defaultForm = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "APPLICANT",
};

const Signup = () => {
    const [data, setData] = useState<{ [key: string]: string }>(defaultForm);
    const [formError, setFormError] = useState<{ [key: string]: string }>(defaultForm);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(true);
    const inputStyles = useInputStyles();
    const { colorScheme } = useMantineColorScheme();
    const isDark = colorScheme === "dark";

    const handleChange = (event: any) => {
        if (typeof event === "string") {
            setData({ ...data, accountType: event });
            return;
        }
        let name = event.target.name;
        let value = event.target.value;
        setData({ ...data, [name]: value });
        setFormError({ ...formError, [name]: signupValidation(name, value) });

        if (name === "password" && data.confirmPassword !== "") {
            let err = "";
            if (data.confirmPassword !== value) err = "Passwords do not match.";
            setFormError({ ...formError, [name]: signupValidation(name, value), confirmPassword: err });
        }
        if (name === "confirmPassword") {
            if (data.password !== value) {
                setFormError({ ...formError, [name]: "Passwords do not match." });
            } else {
                setFormError({ ...formError, confirmPassword: "" });
            }
        }
    };

    const handleSubmit = () => {
        let valid = true;
        let newFormError: { [key: string]: string } = {};

        for (let key in data) {
            if (key === "accountType") continue;
            if (key !== "confirmPassword") {
                newFormError[key] = signupValidation(key, data[key]);
            } else if (data[key] !== data["password"]) {
                newFormError[key] = "Passwords do not match.";
            }
            if (newFormError[key]) valid = false;
        }
        setFormError(newFormError);

        if (valid) {
            setLoading(true);
            registerUser(data)
                .then(() => {
                    setData(defaultForm);
                    notifications.show({
                        title: "Account Created Successfully",
                        message: "Redirecting to sign-in page...",
                        icon: <IconCheck size={18} />,
                        color: "teal",
                    });
                    setTimeout(() => {
                        setLoading(false);
                        navigate("/login");
                    }, 400);
                })
                .catch((err) => {
                    setLoading(false);
                    console.error(err);
                    notifications.show({
                        title: "Registration Failed",
                        message: err?.response?.data?.errorMessage || "Unable to register account. Please try again.",
                        color: "red",
                    });
                });
        }
    };

    return (
        <div className="w-full max-w-lg mx-auto flex flex-col justify-center relative py-6 px-4 sm:px-6">
            <LoadingOverlay
                visible={loading}
                zIndex={1000}
                overlayProps={{ radius: "sm", blur: 3, backgroundOpacity: 0.6 }}
                loaderProps={{ color: "amber", type: "bars" }}
            />

            <div className="flex flex-col gap-5">
                <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-3">
                        <IconSparkles size={14} />
                        <span>Join the JobTrek Network</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
                        Create Your Account
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Find top-tier engineering roles or hire exceptional talent.
                    </p>
                </div>

                <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <TextInput
                        value={data.name}
                        onChange={handleChange}
                        name="name"
                        label="Full Legal Name"
                        placeholder="e.g. Alex Vance"
                        withAsterisk
                        error={formError.name}
                        leftSection={<IconUser size={18} className="text-amber-500 dark:text-amber-400 shrink-0" />}
                        leftSectionPointerEvents="none"
                        leftSectionWidth={46}
                        size="md"
                        styles={inputStyles}
                    />

                    <TextInput
                        value={data.email}
                        onChange={handleChange}
                        name="email"
                        leftSection={<IconAt size={18} className="text-amber-500 dark:text-amber-400 shrink-0" />}
                        leftSectionPointerEvents="none"
                        leftSectionWidth={46}
                        size="md"
                        label="Email Address"
                        withAsterisk
                        placeholder="you@domain.com"
                        error={formError.email}
                        styles={inputStyles}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <PasswordInput
                            error={formError.password}
                            value={data.password}
                            name="password"
                            onChange={handleChange}
                            withAsterisk
                            leftSection={<IconLock size={18} className="text-amber-500 dark:text-amber-400 shrink-0" />}
                            leftSectionPointerEvents="none"
                            leftSectionWidth={46}
                            rightSectionWidth={46}
                            size="md"
                            label="Password"
                            placeholder="At least 8 chars"
                            styles={inputStyles}
                        />

                        <PasswordInput
                            error={formError.confirmPassword}
                            value={data.confirmPassword}
                            name="confirmPassword"
                            onChange={handleChange}
                            withAsterisk
                            leftSection={<IconLock size={18} className="text-amber-500 dark:text-amber-400 shrink-0" />}
                            leftSectionPointerEvents="none"
                            leftSectionWidth={46}
                            rightSectionWidth={46}
                            size="md"
                            label="Confirm Password"
                            placeholder="Repeat password"
                            styles={inputStyles}
                        />
                    </div>

                    {/* Account Type Selector Pills */}
                    <div className="flex flex-col gap-2 pt-1">
                        <label className="text-xs font-semibold" style={{ color: isDark ? "#cbd5e1" : "#334155" }}>
                            I am joining JobTrek as a: <span className="text-amber-400">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setData({ ...data, accountType: "APPLICANT" })}
                                className={`p-3 rounded-2xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                                    data.accountType === "APPLICANT"
                                        ? "bg-amber-500/15 border-amber-500/50 text-amber-400 ring-2 ring-amber-500/20 shadow-md"
                                        : isDark
                                            ? "bg-slate-900/60 border-white/10 text-slate-400 hover:text-white hover:border-white/20"
                                            : "bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-800 hover:border-slate-300"
                                }`}
                            >
                                <span className="font-bold text-sm">Job Seeker</span>
                                <span className="text-[11px] opacity-75">Apply for roles</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setData({ ...data, accountType: "EMPLOYER" })}
                                className={`p-3 rounded-2xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                                    data.accountType === "EMPLOYER"
                                        ? "bg-amber-500/15 border-amber-500/50 text-amber-400 ring-2 ring-amber-500/20 shadow-md"
                                        : isDark
                                            ? "bg-slate-900/60 border-white/10 text-slate-400 hover:text-white hover:border-white/20"
                                            : "bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-800 hover:border-slate-300"
                                }`}
                            >
                                <span className="font-bold text-sm">Employer</span>
                                <span className="text-[11px] opacity-75">Post jobs & hire</span>
                            </button>
                        </div>
                    </div>

                    <Checkbox
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.currentTarget.checked)}
                        label={
                            <span className="text-xs text-slate-400">
                                I agree to the <span className="text-amber-400 font-semibold cursor-pointer hover:underline">Terms of Service</span> and <span className="text-amber-400 font-semibold cursor-pointer hover:underline">Privacy Policy</span>
                            </span>
                        }
                        color="amber"
                    />

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading || !termsAccepted}
                        className="mt-1 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 disabled:opacity-50 transition-all shadow-lg shadow-amber-500/20 active:scale-[0.98]"
                    >
                        <span>Create Account</span>
                        <IconArrowRight size={18} />
                    </button>
                </form>

                <div className="pt-3 border-t border-white/[0.08] text-center text-xs text-slate-400">
                    Already have an account?{" "}
                    <button
                        type="button"
                        onClick={() => {
                            navigate("/login");
                            setFormError(defaultForm);
                            setData(defaultForm);
                        }}
                        className="font-bold text-amber-400 hover:text-amber-300 hover:underline transition-colors ml-1"
                    >
                        Sign in
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Signup;

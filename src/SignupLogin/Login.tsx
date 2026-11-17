import {
    LoadingOverlay,
    PasswordInput,
    TextInput,
} from "@mantine/core";
import { IconAt, IconLock, IconArrowRight, IconShieldLock } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginValidation } from "../Services/FormValidation";
import { useDisclosure } from "@mantine/hooks";
import ResetPassword from "./ResetPassword";
import { useDispatch } from "react-redux";
import { setUser } from "../Slices/UserSlice";
import {
    errorNotification,
    successNotification,
} from "../Services/NotificationService";
import { loginUser } from "../Services/AuthService";
import { jwtDecode } from "jwt-decode";
import { setJwt } from "../Slices/JwtSlice";
import { useInputStyles } from "../Services/ThemeStyles";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const inputStyles = useInputStyles();
    const form = {
        email: "",
        password: "",
    };
    const [data, setData] = useState<{ [key: string]: string }>(form);
    const [formError, setFormError] = useState<{ [key: string]: string }>(form);
    const [opened, { open, close }] = useDisclosure(false);
    const navigate = useNavigate();

    const handleChange = (event: any) => {
        setFormError({ ...formError, [event.target.name]: "" });
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleSubmit = () => {
        let valid = true;
        let newFormError: { [key: string]: string } = {};
        for (let key in data) {
            newFormError[key] = loginValidation(key, data[key]);
            if (newFormError[key]) valid = false;
        }
        setFormError(newFormError);

        if (valid) {
            setLoading(true);
            loginUser(data)
                .then((res) => {
                    successNotification(
                        "Welcome Back",
                        "Authentication verified successfully."
                    );
                    dispatch(setJwt(res.jwt));
                    const decoded: any = jwtDecode(res.jwt);
                    dispatch(setUser({ ...decoded, email: decoded.sub }));
                    setTimeout(() => {
                        navigate("/");
                    }, 250);
                })
                .catch((err) => {
                    setLoading(false);
                    const msg = err?.response?.data?.errorMessage || "Invalid credentials. Please verify your email and password.";
                    errorNotification("Login Failed", msg);
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

            <div className="flex flex-col gap-6">
                <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-3">
                        <IconShieldLock size={14} />
                        <span>Secure Access</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
                        Sign In to JobTrek
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Access your candidate dashboard, applications, and saved roles.
                    </p>
                </div>

                <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <TextInput
                        leftSection={<IconAt size={18} className="text-amber-500 dark:text-amber-400 shrink-0" />}
                        leftSectionPointerEvents="none"
                        leftSectionWidth={46}
                        size="md"
                        label="Email Address"
                        withAsterisk
                        placeholder="you@domain.com"
                        error={formError.email}
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        styles={inputStyles}
                    />

                    <div className="flex flex-col gap-1">
                        <PasswordInput
                            withAsterisk
                            leftSection={<IconLock size={18} className="text-amber-500 dark:text-amber-400 shrink-0" />}
                            leftSectionPointerEvents="none"
                            leftSectionWidth={46}
                            rightSectionWidth={46}
                            size="md"
                            label="Account Password"
                            placeholder="Enter password"
                            value={data.password}
                            error={formError.password}
                            name="password"
                            onChange={handleChange}
                            styles={inputStyles}
                        />
                        <div className="flex justify-end pt-1">
                            <button
                                type="button"
                                onClick={open}
                                className="text-xs text-amber-500 hover:text-amber-400 hover:underline transition-colors font-medium"
                            >
                                Forgot password?
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 disabled:opacity-50 transition-all shadow-lg shadow-amber-500/20 active:scale-[0.98]"
                    >
                        <span>Sign In</span>
                        <IconArrowRight size={18} />
                    </button>
                </form>

                <div className="pt-4 border-t border-white/[0.08] text-center text-xs text-slate-400">
                    Don't have an account yet?{" "}
                    <button
                        type="button"
                        onClick={() => {
                            navigate("/signup");
                            setFormError(form);
                            setData(form);
                        }}
                        className="font-bold text-amber-400 hover:text-amber-300 hover:underline transition-colors ml-1"
                    >
                        Create an account
                    </button>
                </div>
            </div>

            <ResetPassword opened={opened} close={close} />
        </div>
    );
};

export default Login;

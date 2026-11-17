import { Modal, PasswordInput, PinInput, TextInput, useMantineColorScheme } from "@mantine/core";
import { IconAt, IconLock, IconCheck, IconRotateClockwise, IconKey } from "@tabler/icons-react";
import { useState } from "react";
import { changePass, sendOtp, verifyOtp } from "../Services/UserService";
import { signupValidation } from "../Services/FormValidation";
import { errorNotification, successNotification } from "../Services/NotificationService";
import { useInterval } from "@mantine/hooks";
import { useInputStyles } from "../Services/ThemeStyles";

const ResetPassword = (props: any) => {
    const inputStyles = useInputStyles();
    const { colorScheme } = useMantineColorScheme();
    const isDark = colorScheme === "dark";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passErr, setPassErr] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otpSending, setOtpSending] = useState(false);
    const [verified, setVerified] = useState(false);
    const [resendLoader, setResendLoader] = useState(false);
    const [seconds, setSeconds] = useState(60);

    const interval = useInterval(() => {
        if (seconds === 0) {
            setResendLoader(false);
            setSeconds(60);
            interval.stop();
        } else {
            setSeconds((s) => s - 1);
        }
    }, 1000);

    const handleSendOtp = () => {
        if (!email) {
            errorNotification("Email Required", "Please enter your registered email address.");
            return;
        }
        setOtpSending(true);
        sendOtp(email)
            .then(() => {
                successNotification("OTP Dispatched", "Enter the 6-digit code sent to your inbox.");
                setOtpSent(true);
                setOtpSending(false);
                setResendLoader(true);
                interval.start();
            })
            .catch((err) => {
                console.error(err);
                setOtpSending(false);
                errorNotification("OTP Failed", err?.response?.data?.errorMessage || "Could not dispatch reset email.");
            });
    };

    const handleVerifyOtp = (otp: string) => {
        verifyOtp(email, otp)
            .then(() => {
                successNotification("OTP Verified", "Please specify your new account password.");
                setVerified(true);
            })
            .catch((err) => {
                console.error(err);
                errorNotification("Verification Failed", err?.response?.data?.errorMessage || "Invalid or expired OTP.");
            });
    };

    const resendOtp = () => {
        if (resendLoader) return;
        handleSendOtp();
    };

    const changeEmail = () => {
        setOtpSent(false);
        setResendLoader(false);
        setSeconds(60);
        setVerified(false);
        interval.stop();
    };

    const handleResetPassword = () => {
        const err = signupValidation("password", password);
        if (err) {
            setPassErr(err);
            return;
        }

        changePass(email, password)
            .then(() => {
                successNotification("Password Changed", "You can now log in with your updated credentials.");
                props.close();
            })
            .catch((err) => {
                console.error(err);
                errorNotification("Reset Failed", err?.response?.data?.errorMessage || "Unable to change password.");
            });
    };

    return (
        <Modal
            opened={props.opened}
            onClose={props.close}
            title={
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 dark:text-amber-400">
                        <IconKey size={18} />
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white font-display text-base">Reset Account Password</span>
                </div>
            }
            centered
            styles={{
                content: {
                    backgroundColor: isDark ? "#0b0f19" : "#ffffff",
                    border: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(15, 23, 42, 0.12)",
                    borderRadius: "24px",
                    padding: "20px",
                },
                header: {
                    backgroundColor: "transparent",
                    paddingBottom: "12px",
                    borderBottom: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(15, 23, 42, 0.08)",
                },
            }}
        >
            <div className="flex flex-col gap-5 pt-3">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                    Enter your registered email address to receive a single-use verification code.
                </p>

                <div className="flex flex-col gap-2">
                    <TextInput
                        leftSection={<IconAt size={18} className="text-amber-500 dark:text-amber-400" />}
                        label="Account Email"
                        withAsterisk
                        placeholder="yourname@domain.com"
                        name="email"
                        value={email}
                        disabled={otpSent}
                        onChange={(e) => setEmail(e.target.value)}
                        styles={inputStyles}
                    />

                    {!otpSent && (
                        <button
                            type="button"
                            disabled={!email || otpSending}
                            onClick={handleSendOtp}
                            className="mt-2 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 disabled:opacity-50 transition-all shadow-md shadow-amber-500/20"
                        >
                            <span>{otpSending ? "Sending OTP..." : "Send Verification OTP"}</span>
                        </button>
                    )}
                </div>

                {otpSent && !verified && (
                    <div className="flex flex-col items-center gap-4 py-2 border-y border-slate-200 dark:border-white/[0.08]">
                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Enter the 6-digit OTP code:
                        </span>
                        <PinInput
                            onComplete={handleVerifyOtp}
                            length={6}
                            size="md"
                            gap="sm"
                            type="number"
                            styles={{
                                input: {
                                    backgroundColor: isDark ? "rgba(15, 23, 42, 0.8)" : "#f8fafc",
                                    borderColor: isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(15, 23, 42, 0.15)",
                                    color: "#f59e0b",
                                    fontWeight: 700,
                                    borderRadius: "12px",
                                },
                            }}
                        />

                        <div className="flex gap-2 w-full pt-1">
                            <button
                                type="button"
                                onClick={resendOtp}
                                disabled={resendLoader}
                                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-amber-500 bg-amber-500/10 hover:bg-amber-500/20 disabled:opacity-50 border border-amber-500/30 transition-all"
                            >
                                <IconRotateClockwise size={14} />
                                <span>{resendLoader ? `Resend (${seconds}s)` : "Resend Code"}</span>
                            </button>
                            <button
                                type="button"
                                onClick={changeEmail}
                                className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all"
                            >
                                Change Email
                            </button>
                        </div>
                    </div>
                )}

                {verified && (
                    <div className="flex flex-col gap-4 pt-1">
                        <PasswordInput
                            withAsterisk
                            leftSection={<IconLock size={18} className="text-amber-500 dark:text-amber-400" />}
                            label="New Account Password"
                            placeholder="Enter new password (min 8 chars)"
                            value={password}
                            error={passErr}
                            name="password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setPassErr(signupValidation("password", e.target.value));
                            }}
                            styles={inputStyles}
                        />

                        <button
                            type="button"
                            onClick={handleResetPassword}
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/20"
                        >
                            <IconCheck size={18} />
                            <span>Update Password & Finish</span>
                        </button>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default ResetPassword;

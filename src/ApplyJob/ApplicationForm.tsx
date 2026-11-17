import { FileInput, LoadingOverlay, NumberInput, Textarea, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { 
    IconEdit, 
    IconEyeCheck, 
    IconPaperclip, 
    IconSend, 
    IconUser, 
    IconMail, 
    IconPhone, 
    IconWorld, 
    IconFileText, 
    IconCheck, 
    IconArrowRight 
} from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBase64 } from "../Services/Utilities";
import { applyJob } from "../Services/JobService";
import { errorNotification, successNotification } from "../Services/NotificationService";
import { useSelector } from "react-redux";
import { useInputStyles } from "../Services/ThemeStyles";

const ApplicationForm = () => {
    const inputStyles = useInputStyles();
    const user = useSelector((state: any) => state.user);
    const { id } = useParams();
    const [preview, setPreview] = useState(false);
    const [submit, setSubmit] = useState(false);
    const navigate = useNavigate();

    const form = useForm({
        mode: "controlled",
        validateInputOnChange: true,
        initialValues: {
            name: user?.name || '',
            email: user?.email || '',
            phone: '',
            website: '',
            resume: null as File | null,
            coverLetter: ''
        },
        validate: {
            name: isNotEmpty("Full name is required"),
            email: isNotEmpty("Email address is required"),
            phone: isNotEmpty("Phone number is required"),
            website: isNotEmpty("Portfolio or LinkedIn URL is required"),
            resume: isNotEmpty("Resume / CV document is required"),
        }
    });

    const handlePreview = () => {
        const validation = form.validate();
        if (validation.hasErrors) {
            window.scrollTo({ top: 100, behavior: 'smooth' });
            return;
        }
        window.scrollTo({ top: 100, behavior: 'smooth' });
        setPreview(!preview);
    };

    const handleSubmit = async () => {
        if (!user?.id) {
            errorNotification("Authentication Required", "Please log in to submit your job application");
            navigate("/login");
            return;
        }

        setSubmit(true);
        try {
            let resume: any = await getBase64(form.getValues().resume);
            let applicant = {
                ...form.getValues(),
                applicantId: user.id,
                resume: resume ? resume.split(',')[1] : ""
            };
            await applyJob(id, applicant);
            setSubmit(false);
            successNotification("Application Submitted", "Your job application has been delivered to the hiring team.");
            navigate("/job-history");
        } catch (err: any) {
            setSubmit(false);
            const msg = err?.response?.data?.errorMessage || "Failed to submit application. Please try again.";
            errorNotification("Submission Failed", msg);
        }
    };

    return (
        <div className="relative">
            <LoadingOverlay
                className="!fixed"
                visible={submit}
                zIndex={1000}
                overlayProps={{ radius: 'sm', blur: 3, backgroundOpacity: 0.6 }}
                loaderProps={{ color: 'amber', type: 'bars' }}
            />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/[0.08] mb-8 gap-4">
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                        {preview ? "Review Your Application" : "Candidate Application"}
                    </h2>
                    <p className="text-sm text-slate-400 mt-1">
                        {preview 
                            ? "Verify your submission details before dispatching to the recruitment team." 
                            : "Provide your professional credentials and current contact information."}
                    </p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${!preview ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-slate-800 text-slate-400'}`}>
                        1. Edit
                    </span>
                    <IconArrowRight size={14} className="text-slate-600" />
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${preview ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-slate-800 text-slate-400'}`}>
                        2. Review & Send
                    </span>
                </div>
            </div>

            {preview ? (
                /* Application Preview State */
                <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/5 flex items-start gap-3">
                            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
                                <IconUser size={18} />
                            </div>
                            <div className="min-w-0">
                                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block">Candidate Name</span>
                                <span className="text-sm font-semibold text-white truncate block mt-0.5">{form.values.name}</span>
                            </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/5 flex items-start gap-3">
                            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
                                <IconMail size={18} />
                            </div>
                            <div className="min-w-0">
                                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block">Email Address</span>
                                <span className="text-sm font-semibold text-white truncate block mt-0.5">{form.values.email}</span>
                            </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/5 flex items-start gap-3">
                            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
                                <IconPhone size={18} />
                            </div>
                            <div className="min-w-0">
                                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block">Phone Number</span>
                                <span className="text-sm font-semibold text-white truncate block mt-0.5">{form.values.phone}</span>
                            </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/5 flex items-start gap-3">
                            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
                                <IconWorld size={18} />
                            </div>
                            <div className="min-w-0">
                                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block">Portfolio / Profile</span>
                                <a 
                                    href={form.values.website.startsWith('http') ? form.values.website : `https://${form.values.website}`} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="text-sm font-semibold text-amber-400 hover:text-amber-300 truncate block mt-0.5"
                                >
                                    {form.values.website}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Resume File Card */}
                    <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400">
                                <IconFileText size={22} />
                            </div>
                            <div>
                                <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Attached Resume</span>
                                <p className="text-sm font-bold text-white mt-0.5">
                                    {form.values.resume?.name || "Uploaded Resume File"}
                                </p>
                            </div>
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                            <IconCheck size={14} /> Ready
                        </span>
                    </div>

                    {/* Cover Letter */}
                    {form.values.coverLetter && (
                        <div className="p-5 rounded-2xl bg-slate-900/50 border border-white/5">
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">Cover Letter</span>
                            <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                                {form.values.coverLetter}
                            </p>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/[0.08]">
                        <button
                            type="button"
                            onClick={handlePreview}
                            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-sm text-slate-300 hover:text-white bg-slate-900 border border-white/10 hover:border-amber-500/30 transition-all"
                        >
                            <IconEdit size={18} />
                            <span>Edit Information</span>
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 active:scale-[0.98]"
                        >
                            <IconSend size={18} />
                            <span>Confirm & Submit Application</span>
                        </button>
                    </div>
                </div>
            ) : (
                /* Editable Application Form */
                <form className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); handlePreview(); }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TextInput
                            {...form.getInputProps("name")}
                            label="Full Legal Name"
                            withAsterisk
                            placeholder="e.g. Alex Vance"
                            styles={inputStyles}
                        />
                        <TextInput
                            {...form.getInputProps("email")}
                            label="Email Address"
                            withAsterisk
                            placeholder="alex@domain.com"
                            styles={inputStyles}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <NumberInput
                            {...form.getInputProps("phone")}
                            label="Phone Number"
                            withAsterisk
                            hideControls
                            min={0}
                            clampBehavior="strict"
                            placeholder="e.g. 9876543210"
                            styles={inputStyles}
                        />
                        <TextInput
                            {...form.getInputProps("website")}
                            label="Portfolio / GitHub / LinkedIn"
                            withAsterisk
                            placeholder="https://portfolio.dev"
                            styles={inputStyles}
                        />
                    </div>

                    <FileInput
                        {...form.getInputProps("resume")}
                        accept=".pdf,.doc,.docx"
                        leftSection={<IconPaperclip size={18} className="text-amber-400" />}
                        label="Upload Resume / CV"
                        placeholder="Attach PDF, DOC, or DOCX (Max 5MB)"
                        withAsterisk
                        leftSectionPointerEvents="none"
                        styles={inputStyles}
                    />

                    <Textarea
                        {...form.getInputProps("coverLetter")}
                        placeholder="Tell the hiring manager why you're a great fit for this position..."
                        label="Cover Letter (Optional)"
                        autosize
                        minRows={4}
                        styles={inputStyles}
                    />

                    <div className="pt-4 border-t border-white/[0.08] flex justify-end">
                        <button
                            type="button"
                            onClick={handlePreview}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-sm text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 active:scale-[0.98]"
                        >
                            <IconEyeCheck size={18} />
                            <span>Preview Application</span>
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ApplicationForm;


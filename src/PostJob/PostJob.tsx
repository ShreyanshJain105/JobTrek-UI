import { NumberInput, TagsInput, Textarea } from "@mantine/core";
import { content, fields } from "../Data/PostJob";
import SelectInput from "./SelectInput";
import TextEditor from "./TextEditor";
import { isNotEmpty, useForm } from "@mantine/form";
import { getJob, postJob } from "../Services/JobService";
import { errorNotification, successNotification } from "../Services/NotificationService";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { 
    IconSend, 
    IconDeviceFloppy, 
    IconArrowLeft, 
    IconBriefcase, 
    IconCurrencyDollar,
    IconUpload,
    IconPhoto,
    IconCheck,
    IconRefresh,
    IconTrash
} from "@tabler/icons-react";
import { useInputStyles, useTagsInputStyles } from "../Services/ThemeStyles";

const standardCompanies = [
    "adobe", "airbnb", "amazon", "apple", "google", "hubspot", "ibm",
    "instagram", "linkedin", "meta", "microsoft", "netflix", "openai",
    "salesforce", "spotify", "stripe", "tesla", "twitter", "uber", "zoom"
];

const PostJob = () => {
    const { id } = useParams();
    const [editorData, setEditorData] = useState(content);
    const [loading, setLoading] = useState(false);
    const user = useSelector((state: any) => state.user);
    const navigate = useNavigate();
    const select = fields;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const inputWithIconStyles = useInputStyles(true, false);
    const textareaStyles = useInputStyles(false, true);
    const tagsInputStyles = useTagsInputStyles();

    const form = useForm({
        mode: "controlled",
        validateInputOnChange: true,
        initialValues: {
            jobTitle: '',
            company: '',
            companyIcon: '',
            experience: '',
            jobType: '',
            location: '',
            packageOffered: '',
            skillsRequired: [] as string[],
            about: '',
            description: content
        },
        validate: {
            jobTitle: isNotEmpty("Title is required"),
            company: isNotEmpty("Company is required"),
            experience: isNotEmpty("Experience is required"),
            jobType: isNotEmpty("Job type is required"),
            location: isNotEmpty("Location is required"),
            packageOffered: isNotEmpty("Package is required"),
            skillsRequired: isNotEmpty("At least 1 skill is required"),
            about: isNotEmpty("About section is required"),
            description: isNotEmpty("Description is required")
        }
    });

    // Detect if an icon already exists for the company
    const selectedCompany = form.values.company?.trim();
    const customIcon = form.values.companyIcon;
    const storedIcon = selectedCompany ? localStorage.getItem(`company_icon_${selectedCompany.toLowerCase()}`) : null;
    const isBuiltIn = selectedCompany && standardCompanies.includes(selectedCompany.toLowerCase());
    const builtInIconPath = isBuiltIn ? `/Icons/${selectedCompany.charAt(0).toUpperCase() + selectedCompany.slice(1).toLowerCase()}.png` : null;

    // Active displayed icon (prioritize custom uploaded, then stored, then built-in)
    const activeIcon = customIcon || storedIcon || builtInIconPath;

    useEffect(() => {
        window.scrollTo(0, 0);
        if (id && id !== "0") {
            getJob(id)
                .then((res) => {
                    form.setValues(res);
                    setEditorData(res.description);
                })
                .catch((err) => {
                    console.error("Error loading job for edit:", err);
                });
        } else {
            form.reset();
            setEditorData(content);
        }
    }, [id]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            errorNotification("File Too Large", "Please choose an image under 2MB.");
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            const dataUrl = reader.result as string;
            form.setFieldValue("companyIcon", dataUrl);
            if (form.values.company) {
                localStorage.setItem(`company_icon_${form.values.company.toLowerCase()}`, dataUrl);
            }
            successNotification("Company Icon Set", "Brand logo uploaded successfully.");
        };
        reader.readAsDataURL(file);
    };

    const handleRemoveCustomIcon = () => {
        form.setFieldValue("companyIcon", "");
        if (form.values.company) {
            localStorage.removeItem(`company_icon_${form.values.company.toLowerCase()}`);
        }
        successNotification("Icon Reset", "Custom company icon removed.");
    };

    const handlePost = async () => {
        form.validate();
        if (!form.isValid()) {
            window.scrollTo({ top: 150, behavior: 'smooth' });
            return;
        }
        setLoading(true);
        try {
            const payload = {
                ...form.getValues(),
                id,
                postedBy: user.id,
                jobStatus: "ACTIVE",
                companyIcon: activeIcon || ""
            };
            const res = await postJob(payload);
            setLoading(false);
            successNotification("Job Published", "Your job posting is now active and accepting applicants.");
            navigate(`/posted-jobs/${res.id}`);
        } catch (err: any) {
            setLoading(false);
            console.error(err);
            errorNotification("Unable to Post Job", err?.response?.data?.errorMessage || "Please try again.");
        }
    };

    const handleDraft = async () => {
        setLoading(true);
        try {
            const payload = {
                ...form.getValues(),
                id,
                postedBy: user.id,
                jobStatus: "DRAFT",
                companyIcon: activeIcon || ""
            };
            const res = await postJob(payload);
            setLoading(false);
            successNotification("Draft Saved", "Your job has been saved to drafts.");
            navigate(`/posted-jobs/${res.id}`);
        } catch (err: any) {
            setLoading(false);
            console.error(err);
            errorNotification("Unable to Save Draft", err?.response?.data?.errorMessage || "Please try again.");
        }
    };

    return (
        <div className="max-w-5xl mx-auto flex flex-col gap-8 pb-16">
            {/* Hidden File Input for Icon Upload */}
            <input
                type="file"
                ref={fileInputRef}
                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                className="hidden"
                onChange={handleFileChange}
            />

            {/* Header Card */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/90 dark:border-white/10 backdrop-blur-xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 dark:text-amber-400 shrink-0">
                        <IconBriefcase size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">
                            {id && id !== "0" ? "Update Job Listing" : "Create New Job Opening"}
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                            Specify role requirements, target compensation, and candidate expectations.
                        </p>
                    </div>
                </div>

                <Link
                    to="/posted-jobs"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:border-amber-500/30 transition-all shrink-0"
                >
                    <IconArrowLeft size={16} className="text-amber-500 dark:text-amber-400" />
                    <span>My Listings</span>
                </Link>
            </div>

            {/* Main Form Body */}
            <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-200/90 dark:border-white/10 backdrop-blur-xl shadow-xl flex flex-col gap-8">
                {/* Section 1: Role Overview */}
                <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-white/[0.08]">
                        <span className="text-xs font-bold text-amber-500 dark:text-amber-400 uppercase tracking-widest font-mono">01.</span>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">Role Overview</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <SelectInput form={form} name="jobTitle" {...select[0]} />
                        <SelectInput form={form} name="company" {...select[1]} />
                    </div>

                    {/* Company Icon Upload / Preview Row */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-slate-100/90 dark:bg-slate-900/60 border border-slate-200 dark:border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-white/10 p-2.5 flex items-center justify-center shrink-0 shadow-inner">
                                {activeIcon ? (
                                    <img
                                        src={activeIcon}
                                        alt="Company Logo"
                                        className="w-full h-full object-contain"
                                        onError={(e: any) => {
                                            e.target.style.display = 'none';
                                            e.target.parentElement.innerHTML = `<span class="text-amber-500 dark:text-amber-400 font-bold text-lg font-display">${(selectedCompany || "C").charAt(0)}</span>`;
                                        }}
                                    />
                                ) : (
                                    <div className="text-slate-400 dark:text-slate-500">
                                        <IconPhoto size={26} />
                                    </div>
                                )}
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-slate-900 dark:text-white font-display">
                                        {activeIcon ? "Company Brand Icon Active" : "Company Icon Not Set"}
                                    </span>
                                    {activeIcon && (
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold">
                                            <IconCheck size={12} />
                                            <span>{isBuiltIn && !customIcon ? "Built-in" : "Custom"}</span>
                                        </span>
                                    )}
                                </div>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
                                    {activeIcon
                                        ? "This logo will appear on all job cards, search feeds, and applicant notification headers."
                                        : "Upload a clean logo to help candidates instantly recognize your brand in search results (PNG, JPG, SVG)."}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                            {activeIcon ? (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold transition-all shadow-sm"
                                    >
                                        <IconRefresh size={14} />
                                        <span>Replace Icon</span>
                                    </button>
                                    {customIcon && (
                                        <button
                                            type="button"
                                            onClick={handleRemoveCustomIcon}
                                            title="Remove custom upload"
                                            className="p-2 rounded-xl bg-white dark:bg-white/[0.04] hover:bg-rose-500/15 border border-slate-200 dark:border-white/10 hover:border-rose-500/30 text-slate-500 dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
                                        >
                                            <IconTrash size={16} />
                                        </button>
                                    )}
                                </>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400 text-xs font-bold transition-all shadow-md shadow-amber-500/20"
                                >
                                    <IconUpload size={16} />
                                    <span>Upload Company Icon</span>
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <SelectInput form={form} name="experience" {...select[2]} />
                        <SelectInput form={form} name="jobType" {...select[3]} />
                    </div>
                </div>

                {/* Section 2: Compensation & Location */}
                <div className="flex flex-col gap-5 pt-4 border-t border-slate-200 dark:border-white/[0.08]">
                    <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-white/[0.08]">
                        <span className="text-xs font-bold text-amber-500 dark:text-amber-400 uppercase tracking-widest font-mono">02.</span>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">Location & Compensation</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <SelectInput form={form} name="location" {...select[4]} />
                        <NumberInput
                            {...form.getInputProps('packageOffered')}
                            label="Target Annual Salary (LPA)"
                            placeholder="e.g. 24"
                            min={1}
                            max={300}
                            clampBehavior="strict"
                            hideControls
                            withAsterisk
                            leftSection={<IconCurrencyDollar size={18} className="text-amber-500 dark:text-amber-400" />}
                            leftSectionWidth={46}
                            styles={inputWithIconStyles}
                        />
                    </div>

                    <TagsInput
                        withAsterisk
                        {...form.getInputProps('skillsRequired')}
                        label="Required Technical Skills & Competencies"
                        placeholder="Type skill and press Enter..."
                        clearable
                        acceptValueOnBlur
                        splitChars={[',', ' ', '|']}
                        styles={tagsInputStyles}
                    />
                </div>

                {/* Section 3: Job Brief & Rich Description */}
                <div className="flex flex-col gap-5 pt-4 border-t border-slate-200 dark:border-white/[0.08]">
                    <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-white/[0.08]">
                        <span className="text-xs font-bold text-amber-500 dark:text-amber-400 uppercase tracking-widest font-mono">03.</span>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">Description & Narrative</h3>
                    </div>

                    <Textarea
                        {...form.getInputProps('about')}
                        withAsterisk
                        label="Executive Summary / About the Company & Mission"
                        autosize
                        minRows={3}
                        placeholder="Provide a concise 2-3 sentence overview that highlights company mission and role purpose..."
                        styles={textareaStyles}
                    />

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Full Job Description & Candidate Responsibilities <span className="text-amber-500 dark:text-amber-400">*</span>
                        </label>
                        <TextEditor form={form} data={editorData} />
                    </div>
                </div>

                {/* Submit Actions */}
                <div className="pt-6 border-t border-slate-200 dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-end gap-4">
                    <button
                        type="button"
                        onClick={handleDraft}
                        disabled={loading}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:border-amber-500/30 transition-all"
                    >
                        <IconDeviceFloppy size={18} />
                        <span>Save as Draft</span>
                    </button>

                    <button
                        type="button"
                        onClick={handlePost}
                        disabled={loading}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/20 active:scale-[0.98]"
                    >
                        <IconSend size={18} />
                        <span>Publish Role Listing</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostJob;
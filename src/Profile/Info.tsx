import { useState } from "react";
import fields from "../Data/Profile";
import { NumberInput } from "@mantine/core";
import {
    IconBriefcase,
    IconBuildingSkyscraper,
    IconCheck,
    IconMapPin,
    IconPencil,
    IconX,
} from "@tabler/icons-react";
import SelectInput from "./SelectInput";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";
import { useInputStyles } from "../Services/ThemeStyles";


const Info = () => {
    const inputStyles = useInputStyles();
    const select = fields;
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);
    const profile = useSelector((state: any) => state.profile);

    const [edit, setEdit] = useState(false);

    const form = useForm({
        mode: "controlled",
        initialValues: { 
            jobTitle: profile.jobTitle || "", 
            company: profile.company || "", 
            location: profile.location || "", 
            totalExp: profile.totalExp || 1 
        },
    });

    const handleClick = () => {
        if (!edit) {
            form.setValues({
                jobTitle: profile.jobTitle || "",
                company: profile.company || "",
                location: profile.location || "",
                totalExp: profile.totalExp || 1,
            });
            setEdit(true);
        } else {
            setEdit(false);
        }
    };

    const handleSave = () => {
        setEdit(false);
        let updateProfile = { ...profile, ...form.getValues() };
        dispatch(changeProfile(updateProfile));
        successNotification("Changes Saved", "Profile information updated successfully");
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                        {user.name || "Candidate"}
                    </h1>
                </div>

                <div className="flex items-center gap-2">
                    {edit && (
                        <button
                            type="button"
                            onClick={handleSave}
                            className="p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-colors"
                            title="Save Changes"
                        >
                            <IconCheck size={18} />
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={handleClick}
                        className={`p-2 rounded-xl transition-colors border ${
                            edit 
                                ? "bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border-rose-500/30"
                                : "bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-amber-400 border-white/10"
                        }`}
                        title={edit ? "Cancel" : "Edit Profile"}
                    >
                        {edit ? <IconX size={18} /> : <IconPencil size={18} />}
                    </button>
                </div>
            </div>

            {edit ? (
                <div className="p-5 rounded-2xl bg-slate-900/40 border border-white/5 flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <SelectInput form={form} name="jobTitle" {...select[0]} />
                        <SelectInput form={form} name="company" {...select[1]} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <SelectInput form={form} name="location" {...select[2]} />
                        <NumberInput
                            name="totalExp"
                            {...form.getInputProps("totalExp")}
                            label="Total Experience (Years)"
                            hideControls
                            clampBehavior="strict"
                            min={1}
                            max={50}
                            withAsterisk
                            styles={inputStyles}
                        />
                    </div>
                </div>
            ) : (
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-slate-300">
                    <div className="flex items-center gap-1.5 font-medium">
                        <IconBriefcase size={16} className="text-amber-400" />
                        <span>{profile.jobTitle || "Job Title"} &bull; <strong className="text-white">{profile.company || "Company"}</strong></span>
                    </div>
                    {profile.location && (
                        <>
                            <span className="text-slate-600 hidden sm:inline">&bull;</span>
                            <div className="flex items-center gap-1 text-slate-400">
                                <IconMapPin size={15} className="text-slate-500" />
                                <span>{profile.location}</span>
                            </div>
                        </>
                    )}
                    <span className="text-slate-600 hidden sm:inline">&bull;</span>
                    <div className="flex items-center gap-1.5 text-slate-400">
                        <IconBuildingSkyscraper size={15} className="text-slate-500" />
                        <span>{profile.totalExp || 1} Years Experience</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Info;



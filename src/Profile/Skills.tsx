import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";
import { TagsInput } from "@mantine/core";
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";
import { useTagsInputStyles } from "../Services/ThemeStyles";

const Skills = () => {
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const profile = useSelector((state: any) => state.profile);
    const [skills, setSkills] = useState<string[]>([]);
    const tagsInputStyles = useTagsInputStyles();

    const handleClick = () => {
        if (!edit) {
            setEdit(true);
            setSkills(profile.skills || []);
        } else {
            setEdit(false);
        }
    };

    const handleSave = () => {
        setEdit(false);
        let updateProfile = { ...profile, skills };
        dispatch(changeProfile(updateProfile));
        successNotification("Changes Saved", "Skills updated successfully");
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <h3 className="text-base sm:text-lg font-bold text-white font-display">
                    Skills & Competencies
                </h3>
                <div className="flex items-center gap-2">
                    {edit && (
                        <button
                            type="button"
                            onClick={handleSave}
                            className="p-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-colors"
                            title="Save Changes"
                        >
                            <IconCheck size={16} />
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={handleClick}
                        className={`p-1.5 rounded-xl transition-colors border ${
                            edit 
                                ? "bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border-rose-500/30"
                                : "bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-amber-400 border-white/10"
                        }`}
                        title={edit ? "Cancel" : "Edit Skills"}
                    >
                        {edit ? <IconX size={16} /> : <IconPencil size={16} />}
                    </button>
                </div>
            </div>

            {edit ? (
                <TagsInput
                    value={skills}
                    onChange={setSkills}
                    placeholder="Type skill and press enter..."
                    splitChars={[",", " ", "|"]}
                    styles={tagsInputStyles}
                />
            ) : (
                <div className="flex flex-wrap gap-2 pt-1">
                    {profile?.skills && profile.skills.length > 0 ? (
                        profile.skills.map((skill: string, index: number) => (
                            <span
                                key={index}
                                className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs sm:text-sm font-semibold tracking-wide hover:bg-amber-500/20 transition-colors"
                            >
                                {skill}
                            </span>
                        ))
                    ) : (
                        <p className="text-sm text-slate-500">No skills added yet.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Skills;

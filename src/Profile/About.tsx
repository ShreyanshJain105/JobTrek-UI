import { Textarea } from "@mantine/core";
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";
import { useInputStyles } from "../Services/ThemeStyles";

const About = () => {
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const profile = useSelector((state: any) => state.profile);
    const [about, setAbout] = useState("");
    const inputStyles = useInputStyles();

    const handleClick = () => {
        if (!edit) {
            setEdit(true);
            setAbout(profile.about || "");
        } else {
            setEdit(false);
        }
    };

    const handleSave = () => {
        setEdit(false);
        let updateProfile = { ...profile, about };
        dispatch(changeProfile(updateProfile));
        successNotification("Changes Saved", "About section updated successfully");
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <h3 className="text-base sm:text-lg font-bold text-white font-display">
                    About
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
                        title={edit ? "Cancel" : "Edit About"}
                    >
                        {edit ? <IconX size={16} /> : <IconPencil size={16} />}
                    </button>
                </div>
            </div>

            {edit ? (
                <Textarea
                    value={about}
                    onChange={(event) => setAbout(event.currentTarget.value)}
                    autosize
                    minRows={3}
                    placeholder="Describe your background, technical interests, and goals..."
                    styles={inputStyles}
                />
            ) : (
                <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                    {profile?.about || "No biographical information added yet. Click edit to introduce yourself."}
                </p>
            )}
        </div>
    );
};

export default About;

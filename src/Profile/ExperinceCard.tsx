import { useState } from "react";
import ExpInput from "./ExpInput";
import { formatDate } from "../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";
import { IconMapPin, IconCalendar, IconEdit, IconTrash } from "@tabler/icons-react";

const ExperinceCard = (props: any) => {
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.profile);
    const [edit, setEdit] = useState(false);

    const handleDelete = () => {
        let exp = [...profile.experiences];
        exp.splice(props.index, 1);
        let updateProfile = { ...profile, experiences: exp };
        dispatch(changeProfile(updateProfile));
        successNotification("Success", "Experience deleted successfully");
    };

    if (edit) {
        return <ExpInput {...props} setEdit={setEdit} />;
    }

    return (
        <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-white/[0.06] hover:border-amber-500/30 transition-all flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 p-2 flex items-center justify-center shrink-0">
                        <img
                            className="w-full h-full object-contain"
                            src={`/Icons/${props.company}.png`}
                            alt={props.company || "Company"}
                            onError={(e: any) => {
                                e.target.style.display = 'none';
                                e.target.parentElement.innerHTML = `<span class="text-amber-400 font-bold text-sm font-display">${(props.company || "C").charAt(0)}</span>`;
                            }}
                        />
                    </div>
                    <div>
                        <h4 className="font-bold text-white text-base font-display">
                            {props.title}
                        </h4>
                        <div className="text-xs text-slate-400 font-medium flex items-center gap-2 mt-0.5">
                            <span className="text-slate-300 font-semibold">{props.company}</span>
                            {props.location && (
                                <>
                                    <span className="text-slate-600">&bull;</span>
                                    <span className="flex items-center gap-1">
                                        <IconMapPin size={12} className="text-slate-500" />
                                        {props.location}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-semibold text-slate-300 self-start sm:self-auto shrink-0">
                    <IconCalendar size={13} className="text-amber-400" />
                    <span>{formatDate(props.startDate)} &mdash; {props.working ? "Present" : formatDate(props.endDate)}</span>
                </div>
            </div>

            {props.description && (
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2 border-t border-white/[0.04]">
                    {props.description}
                </p>
            )}

            {props.edit && (
                <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/[0.06]">
                    <button
                        type="button"
                        onClick={() => setEdit(true)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-white/10 hover:border-amber-500/30 transition-all"
                    >
                        <IconEdit size={14} className="text-amber-400" />
                        <span>Edit</span>
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 transition-all"
                    >
                        <IconTrash size={14} />
                        <span>Delete</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default ExperinceCard;

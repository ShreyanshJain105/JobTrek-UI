import { IconTrash, IconCertificate, IconShieldCheck } from "@tabler/icons-react";
import { formatDate } from "../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";

const CertifyCard = (props: any) => {
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.profile);

    const handleDelete = () => {
        let certi = [...profile.certifications];
        certi.splice(props.index, 1);
        let updateProfile = { ...profile, certifications: certi };
        dispatch(changeProfile(updateProfile));
        successNotification("Success", "Certification deleted successfully");
    };

    return (
        <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/[0.06] hover:border-amber-500/30 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 p-2 flex items-center justify-center text-amber-400 shrink-0">
                    <IconCertificate size={20} />
                </div>
                <div>
                    <h4 className="font-bold text-white text-sm sm:text-base font-display">
                        {props.title}
                    </h4>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">
                        Issued by <span className="text-slate-300 font-semibold">{props.issuer}</span>
                    </p>
                </div>
            </div>

            <div className="flex sm:flex-col items-start sm:items-end justify-between w-full sm:w-auto gap-1 border-t sm:border-t-0 pt-2 sm:pt-0 border-white/[0.04]">
                <div className="inline-flex items-center gap-1 text-xs text-emerald-400 font-semibold">
                    <IconShieldCheck size={14} />
                    <span>Issued {formatDate(props.issueDate)}</span>
                </div>
                {props.certificateId && (
                    <div className="text-[11px] text-slate-500 font-mono">
                        ID: {props.certificateId}
                    </div>
                )}
                {props.edit && (
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="mt-1 p-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
                        title="Delete Certification"
                    >
                        <IconTrash size={16} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default CertifyCard;

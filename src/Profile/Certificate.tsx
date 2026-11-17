import { useState } from "react";
import CertiInput from "./CertiInput";
import CertifyCard from "./CertifyCard";
import { useSelector } from "react-redux";
import { IconPlus, IconPencil, IconX } from "@tabler/icons-react";

const Certificate = () => {
    const profile = useSelector((state: any) => state.profile);
    const [edit, setEdit] = useState(false);
    const [addCerti, setAddCerti] = useState(false);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <h3 className="text-base sm:text-lg font-bold text-white font-display">
                    Certifications & Licenses
                </h3>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setAddCerti(true)}
                        className="p-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 transition-colors"
                        title="Add Certification"
                    >
                        <IconPlus size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => setEdit(!edit)}
                        className={`p-1.5 rounded-xl transition-colors border ${
                            edit 
                                ? "bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border-rose-500/30"
                                : "bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-amber-400 border-white/10"
                        }`}
                        title={edit ? "Done" : "Manage Certifications"}
                    >
                        {edit ? <IconX size={16} /> : <IconPencil size={16} />}
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                {profile?.certifications && profile.certifications.length > 0 ? (
                    profile.certifications.map((certi: any, index: number) => (
                        <CertifyCard key={index} index={index} edit={edit} {...certi} />
                    ))
                ) : (
                    <p className="text-sm text-slate-500">No certifications added yet.</p>
                )}

                {addCerti && <CertiInput setEdit={setAddCerti} />}
            </div>
        </div>
    );
};

export default Certificate;

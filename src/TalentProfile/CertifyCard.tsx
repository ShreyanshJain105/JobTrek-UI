import { formatDate } from "../Services/Utilities";
import { IconCertificate, IconShieldCheck } from "@tabler/icons-react";

const CertifyCard = (props: any) => {
    return (
        <div className="glass-panel p-5 rounded-2xl border border-white/[0.06] hover:border-amber-500/30 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 p-2 flex items-center justify-center text-amber-400 shrink-0">
                    <IconCertificate size={22} />
                </div>
                <div>
                    <h4 className="font-bold text-white text-sm sm:text-base font-display">
                        {props.name}
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
            </div>
        </div>
    );
};

export default CertifyCard;

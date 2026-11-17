import { useInputStyles } from "../Services/ThemeStyles";
import { TextInput } from "@mantine/core";
import fields from "../Data/Profile";
import SelectInput from "./SelectInput";
import { MonthPickerInput } from "@mantine/dates";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";
import { IconCheck, IconX, IconCertificate } from "@tabler/icons-react";


const CertiInput = (props: any) => {
    const inputStyles = useInputStyles();
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.profile);
    const select = fields;

    const form = useForm({
        mode: 'controlled',
        validateInputOnChange: true,
        initialValues: {
            title: "",
            issuer: "",
            issueDate: null as Date | null,
            certificateId: ""
        },
        validate: {
            title: isNotEmpty("Certification title is required"),
            issuer: isNotEmpty("Issuing organization is required"),
            issueDate: isNotEmpty("Issue date is required")
        }
    });

    const handleSave = () => {
        form.validate();
        if (!form.isValid()) return;

        let certi = profile?.certifications ? [...profile.certifications] : [];
        const formValues = form.getValues();
        
        let dateIso = new Date().toISOString();
        if (formValues.issueDate && formValues.issueDate instanceof Date) {
            dateIso = formValues.issueDate.toISOString();
        } else if (formValues.issueDate) {
            const d = new Date(formValues.issueDate);
            if (!isNaN(d.getTime())) dateIso = d.toISOString();
        }

        certi.push({
            ...formValues,
            issueDate: dateIso,
        });

        let updateProfile = { ...profile, certifications: certi };
        props.setEdit(false);
        dispatch(changeProfile(updateProfile));
        successNotification("Success", "Certificate added successfully");
    };

    return (
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/50 border border-amber-500/30 flex flex-col gap-4">
            <div className="flex items-center gap-2 pb-2 border-b border-white/[0.08]">
                <IconCertificate size={18} className="text-amber-400" />
                <h4 className="text-sm sm:text-base font-bold text-white font-display">
                    Add New Certification
                </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextInput
                    {...form.getInputProps("title")}
                    label="Credential Name"
                    withAsterisk
                    placeholder="e.g. AWS Solutions Architect"
                    styles={inputStyles}
                />
                <SelectInput form={form} name="issuer" {...select[1]} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <MonthPickerInput
                    {...form.getInputProps("issueDate")}
                    label="Issue Date"
                    placeholder="Select issue date"
                    maxDate={new Date()}
                    withAsterisk
                    styles={inputStyles}
                />
                <TextInput
                    {...form.getInputProps("certificateId")}
                    label="Credential ID / Verification URL"
                    placeholder="e.g. CERT-839210"
                    styles={inputStyles}
                />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/[0.06]">
                <button
                    type="button"
                    onClick={() => props.setEdit(false)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-white/10 hover:bg-slate-800 transition-all"
                >
                    <IconX size={14} />
                    <span>Discard</span>
                </button>
                <button
                    type="button"
                    onClick={handleSave}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 transition-all shadow-md shadow-amber-500/20"
                >
                    <IconCheck size={14} />
                    <span>Save Certification</span>
                </button>
            </div>
        </div>
    );
};

export default CertiInput;



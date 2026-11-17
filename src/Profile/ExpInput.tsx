import { useInputStyles } from "../Services/ThemeStyles";
import { Checkbox, Textarea } from "@mantine/core";
import fields from "../Data/Profile";
import SelectInput from "./SelectInput";
import { useEffect } from "react";
import { MonthPickerInput } from "@mantine/dates";
import { useDispatch, useSelector } from "react-redux";
import { isNotEmpty, useForm } from "@mantine/form";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";
import { IconCheck, IconX, IconBriefcase } from "@tabler/icons-react";


const ExpInput = (props: any) => {
    const inputStyles = useInputStyles();
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.profile);
    const select = fields;

    const form = useForm({
        mode: 'controlled',
        validateInputOnChange: true,
        initialValues: {
            title: '',
            company: '',
            location: '',
            description: '',
            startDate: new Date(),
            endDate: new Date(),
            working: false
        },
        validate: {
            title: isNotEmpty("Title is required"),
            company: isNotEmpty("Company is required"),
            location: isNotEmpty("Location is required"),
            description: isNotEmpty("Description is required")
        }
    });

    useEffect(() => {
        if (!props.add) {
            form.setValues({
                title: props.title || '',
                company: props.company || '',
                location: props.location || '',
                description: props.description || '',
                startDate: props.startDate ? new Date(props.startDate) : new Date(),
                endDate: props.endDate ? new Date(props.endDate) : new Date(),
                working: props.working || false
            });
        }
    }, []);

    const handleSave = () => {
        form.validate();
        if (!form.isValid()) return;

        let exp = profile?.experiences ? [...profile.experiences] : [];
        const values = form.getValues();
        const payload = {
            ...values,
            startDate: new Date(values.startDate).toISOString(),
            endDate: values.working ? new Date().toISOString() : new Date(values.endDate).toISOString(),
        };

        if (props.add) {
            exp.push(payload);
        } else {
            exp[props.index] = payload;
        }

        let updateProfile = { ...profile, experiences: exp };
        props.setEdit(false);
        dispatch(changeProfile(updateProfile));
        successNotification("Changes Saved", `Experience ${props.add ? "Added" : "Updated"} successfully`);
    };

    return (
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/50 border border-amber-500/30 flex flex-col gap-4">
            <div className="flex items-center gap-2 pb-2 border-b border-white/[0.08]">
                <IconBriefcase size={18} className="text-amber-400" />
                <h4 className="text-sm sm:text-base font-bold text-white font-display">
                    {props.add ? "Add Work Experience" : "Edit Work Experience"}
                </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SelectInput form={form} name="title" {...select[0]} />
                <SelectInput form={form} name="company" {...select[1]} />
            </div>

            <SelectInput form={form} name="location" {...select[2]} />

            <Textarea
                {...form.getInputProps('description')}
                withAsterisk
                label="Role Description & Contributions"
                autosize
                minRows={3}
                placeholder="Key accomplishments and technologies used..."
                styles={inputStyles}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <MonthPickerInput
                    {...form.getInputProps("startDate")}
                    label="Start Date"
                    placeholder="Pick Date"
                    maxDate={form.getValues().endDate || undefined}
                    withAsterisk
                    styles={inputStyles}
                />
                <MonthPickerInput
                    {...form.getInputProps("endDate")}
                    label="End Date"
                    placeholder="Pick Date"
                    maxDate={new Date()}
                    minDate={form.getValues().startDate || undefined}
                    withAsterisk
                    disabled={form.getValues().working}
                    styles={inputStyles}
                />
            </div>

            <div className="pt-1">
                <Checkbox
                    checked={form.getValues().working}
                    onChange={(event) => form.setFieldValue("working", event.currentTarget.checked)}
                    label={<span className="text-xs text-slate-300 font-medium">Currently Working Here</span>}
                    color="amber"
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
                    <span>Save Experience</span>
                </button>
            </div>
        </div>
    );
};

export default ExpInput;



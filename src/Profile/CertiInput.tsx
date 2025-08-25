import { Button, TextInput } from "@mantine/core";
import fields from "../Data/Profile";
import SelectInput from "./SelectInput";
import { MonthPickerInput } from "@mantine/dates";
import { useState } from "react";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";
import { useMediaQuery } from "@mantine/hooks";

const CertiInput = (props: any) => {
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.profile);
    
    const form = useForm({
        mode: 'controlled',
        validateInputOnChange: true,
        initialValues: {
            title: "",
            issuer: "",
            issueDate: null, // Changed from "" to null to match MonthPickerInput
            certificateId: ""
        },
        validate: {
            title: isNotEmpty("Title is required"),
            issuer: isNotEmpty("Issuer is required"),
            issueDate: isNotEmpty("Issue Date is required")
        }
    });

    const handleSave = () => {
        form.validate();
        if (!form.isValid()) return;
        
        let certi = [...profile.certifications];
        const formValues = form.getValues();
        certi.push(formValues);
        
        // Safe date conversion
        const lastCertIndex = certi.length - 1;
        const issueDate = certi[lastCertIndex].issueDate;
        
        if (issueDate && issueDate instanceof Date) {
            certi[lastCertIndex].issueDate = issueDate.toISOString();
        } else if (issueDate) {
            // Try to convert to Date if it's not already
            const date = new Date(issueDate);
            if (!isNaN(date.getTime())) {
                certi[lastCertIndex].issueDate = date.toISOString();
            } else {
                console.error("Invalid date:", issueDate);
                return;
            }
        } else {
            console.error("No issue date provided");
            return;
        }
        
        let updateProfile = {...profile, certifications: certi};
        props.setEdit(false);
        dispatch(changeProfile(updateProfile));
        successNotification("Success", "Certificate Added successfully");
    }

    const select = fields;
    return <div className="flex flex-col gap-3">
        <div>Add Certificate</div>
        <div className="flex gap-10 [&>*]:w-1/2 my-3 xs-mx:[&>*]:w-full xs-mx:flex-wrap md-mx:gap-5">
            <TextInput {...form.getInputProps("title")} label="Title"
                withAsterisk
                placeholder="Enter Title"
            />
            <SelectInput form={form} name="issuer" {...select[1]} />
        </div>
        <div className="flex gap-10 [&>*]:w-1/2 my-3 xs-mx:[&>*]:w-full xs-mx:flex-wrap md-mx:gap-5">
            <MonthPickerInput
                {...form.getInputProps("issueDate")}
                label="Issue Date"
                placeholder="Pick Date"
                maxDate={new Date()}
                withAsterisk
            />
            <TextInput {...form.getInputProps("certificateId")} label="Crediential ID "
                withAsterisk
                placeholder="Enter ID"
            />
        </div>
        <div className="flex gap-5 ">
            <Button onClick={handleSave}
                color="green.8" variant="light">Save</Button>
            <Button color="red.8" onClick={() => props.setEdit(false)}
                variant="light">Discard</Button>
        </div>
    </div>
}
export default CertiInput;
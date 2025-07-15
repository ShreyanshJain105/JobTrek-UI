import { Button, TextInput } from "@mantine/core";
import fields from "../Data/Profile";
import SelectInput from "./SelectInput";
import { MonthPickerInput } from "@mantine/dates";
import { useState } from "react";

const CertiInput = (props: any) => {
     const [issueDate, setIssueDate] = useState<string | null>(null);
    const select = fields;
    return <div className="flex flex-col gap-3">
        <div>Add Certificate</div>
        <div className="flex gap-10 [&>*]:w-1/2">
            <TextInput label="Title"
                withAsterisk
                placeholder="Enter Title"
            />
            <SelectInput {...select[1]} />
        </div>

        <div className="flex gap-10 [&>*]:w-1/2">
            <MonthPickerInput
                            label="Issue Date"
                            placeholder="Pick Date"
                            value={issueDate}
                            onChange={setIssueDate}
                            maxDate={new Date()}
                            withAsterisk
                        />
                        <TextInput label="Crediential ID "
                withAsterisk
                placeholder="Enter ID"
            />
        </div>

        <div className="flex gap-5 ">
            <Button onClick={() => props.setEdit(false)} color="brifhtSun.4" variant="outline">Save</Button>
            <Button color="red.8" onClick={() => props.setEdit(false)} variant="light">Discard</Button>
        </div>

        

         

    </div>
}
export default CertiInput;
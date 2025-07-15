import { Anchor, Button, Checkbox, Textarea } from "@mantine/core";
import fields from "../Data/Profile";
import SelectInput from "./SelectInput";
import { useState } from "react";
import { MonthPickerInput } from "@mantine/dates";



const ExpInput = (props: any) => {
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
    const [checked, setChecked] = useState(false);
    const select = fields;
    const [desc, setDesc] = useState("loremddwnkndnciwndinwksnvcewdcesd")
    return <div className="flex flex-col gap-3">
        <div className="text-lg font-semibold">{props.add?"Add":"Edit"} Experience</div>
        <div className="flex gap-10 [&>*]:w-1/2">
            <SelectInput {...select[0]} />
            <SelectInput {...select[1]} />
        </div>
        <SelectInput {...select[2]} />
        <Textarea
            label="Summary "
            value={desc}
            withAsterisk
            onChange={(event) => setDesc(event.currentTarget.value)}
            autosize minRows={3} placeholder="Enter Summary "
        />
        <div className="flex gap-10 [&>*]:w-1/2">
            <MonthPickerInput
                label="Start Date"
                placeholder="Pick Date"
                value={startDate}
                onChange={setStartDate}
                maxDate={endDate || undefined}
                withAsterisk
            />
            <MonthPickerInput
                label="End Date"
                placeholder="Pick Date"
                value={endDate}
                onChange={setEndDate}
                maxDate={new Date()}
                minDate={startDate || undefined}
                withAsterisk
                disabled={checked}
            />

        </div>
        <Checkbox
            autoContrast
            label="Currently Working Here"
            checked={checked}
            onChange={(event) => setChecked(event.currentTarget.checked)}
        />
        <div className="flex gap-5 ">
            <Button onClick={() => props.setEdit(false)} color="brifhtSun.4" variant="outline">Save</Button>
            <Button color="red.8" onClick={() => props.setEdit(false)} variant="light">Discard</Button>
        </div>

    </div>
}
export default ExpInput;
import { Button, NumberInput, TagsInput, Textarea } from "@mantine/core";
import { content, fields } from "../Data/PostJob";
import SelectInput from "./SelectInput";
import TextEditor from "./TextEditor";
import { IconArrowLeft } from "@tabler/icons-react";
import { isNotEmpty, useForm } from "@mantine/form";

const PostJob = () => {
    const select = fields;
    const form = useForm({
        mode: "controlled",
        validateInputOnChange: true,
        initialValues: {
            jobTitle: '',
            company: '',
            experience: '',
            jobType: '',
            location: '',
            packageOffered: '',
            skillsRequired: [],
            about: '',
            description: content
        },
        validate: {
            jobTitle: isNotEmpty("Title is required"),
            company: isNotEmpty("Company is required"),
            experience: isNotEmpty("Experience is required"),
            jobType: isNotEmpty("Job type is required"),
            location: isNotEmpty("Location is required"),
            packageOffered: isNotEmpty("Package is required"),
            skillsRequired: isNotEmpty("Atleast 1 skill is required"),
            about: isNotEmpty("About section is required"),
            description: isNotEmpty("Description is required")
        }
    });
    
    return <div className="w-4/5 mx-auto">
        <div className="text-2xl font-semibold mb-5">Post a Job </div>
        <div className="flex flex-col gap-5 ">
            <div className="flex gap-10 [&>*]:w-1/2">
                <SelectInput form={form} name="jobTitle" {...select[0]} />
                <SelectInput form={form} name="company" {...select[1]} />
            </div>
            <div className="flex gap-10 [&>*]:w-1/2">
                <SelectInput form={form} name="experience" {...select[2]} />
                <SelectInput form={form} name="jobType" {...select[3]} />
            </div>
            <div className="flex gap-10 [&>*]:w-1/2">
                <SelectInput form={form} name="location" {...select[4]} />
                  <NumberInput {...form.getInputProps('packageOffered')} label="Salary" placeholder="Enter Salary" min={1} max={300} clampBehavior="strict" hideControls withAsterisk />
            </div>
            <TagsInput withAsterisk {...form.getInputProps('skillsRequired')} label="Skills" placeholder="Enter Skills" 
            clearable acceptValueOnBlur splitChars={[',', ' ', '|']} />

             <Textarea {...form.getInputProps('about')} withAsterisk className="my-3"
                        label="About" autosize minRows={3} placeholder="Enter About Job....... "
                    />
            <div className="[&_button[data-active='true']]:!text-bright-sun-400 [&_button[data-active='true']]:!bg-bright-sun-400/20 ">

                <div className="text-sm font-medium">Job Description <span className="text-red-500">*</span></div>
                <TextEditor form={form} />
            </div>
            <div className="flex gap-4 ">
                <Button color="brightSun.4" variant="light" >Publish Job </Button>
                <Button color="brightSun.4" variant="outline" >Save as draft </Button>

            </div>
        </div>
    </div>
}

export default PostJob;
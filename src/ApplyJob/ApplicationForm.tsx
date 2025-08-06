import { Button, FileInput, LoadingOverlay, NumberInput, Textarea, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconEdit, IconEyeCheck, IconPaperclip, IconRosetteDiscountCheck } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBase64 } from "../Services/Utilities";
import { applyJob } from "../Services/JobService";
import { Id } from "tabler-icons-react";
import { errorNotification, successNotification } from "../Services/NotificationService";
import { useSelector } from "react-redux";

const ApplicationForm = () => {
    const user=useSelector((state:any)=>state.user);
    const {id} = useParams();
    const [preview, setpreview] = useState(false);
    const [submit, setSubmit] = useState(false);
    const navigate = useNavigate();
    const handlePreview = () => {
        form.validate();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if(!form.isValid())return;
        setpreview(!preview);
        
    }
    const handleSubmit =async  () => {
        setSubmit(true);
        let resume:any =await getBase64(form.getValues().resume);
        let applicant ={...form.getValues(),applicantId:user.id,resume:resume.split(',')[1]};
        applyJob(id,applicant).then((res)=>{
            setSubmit(false);
            successNotification("Success","Application Submitted Successfully");
            navigate("/job-history")
        }).catch((err)=>{
            setSubmit(false);
            errorNotification("Error",err.response.data.errorMessage);
        })

    }
    const form = useForm({
        mode: "controlled",
        validateInputOnChange: true,
        initialValues: {
            name: '',
            email: '',
            phone: '',
            website: '',
            resume: null,
            coverLetter: ''
        },
        validate: {
            name: isNotEmpty("Name is Required"),
            email: isNotEmpty("Email is Required"),
            phone: isNotEmpty("Phone is Required"),
            website: isNotEmpty("Website is Required"),
            resume: isNotEmpty("Resume is Required"),
            
        }

    })
    return <div>
        <LoadingOverlay
            className="!fixed "
            visible={submit}
            zIndex={1000}
            overlayProps={{ radius: 'sm', blur: 2 }}
            loaderProps={{ color: 'brightSun.4', type: 'bars' }}
        />

        <div className="text-xl font-semibold mb-5 ">Submit Your Application</div>
        <div className="flex flex-col gap-5 ">
            <div className="flex gap-10 [*>*]:w-1/2">
                <TextInput {...form.getInputProps("name")} readOnly={preview} variant={preview ? "unstyled" : "default"} className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`} label="Full Name" withAsterisk placeholder="Enter Name " />
                <TextInput {...form.getInputProps("email")} readOnly={preview} variant={preview ? "unstyled" : "default"} className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`} label="Email" withAsterisk placeholder="Enter E-Mail" />
            </div>
            <div className="flex gap-10 [*>*]:w-1/2">
                <NumberInput {...form.getInputProps("phone")} readOnly={preview} variant={preview ? "unstyled" : "default"} className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
                    label="PhoneNumber"
                    withAsterisk
                    hideControls
                    min={0}
                    max={9999999999}
                    clampBehavior="strict"
                    placeholder="Enter Phone Number"
                />
                <TextInput {...form.getInputProps("website")} readOnly={preview} variant={preview ? "unstyled" : "default"} className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
                    label="Personal Website" withAsterisk placeholder="Enter url" />
            </div>
            <FileInput {...form.getInputProps("resume")} accept=".pdf,.doc,.docx"
                readOnly={preview} variant={preview ? "unstyled" : "default"} className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
                leftSection={<IconPaperclip stroke={1.5} />}
                label="Attach Your cv"
                placeholder="Your cv"
                withAsterisk
                leftSectionPointerEvents="none"
            />
            <Textarea {...form.getInputProps("coverLetter")}
                readOnly={preview} variant={preview ? "unstyled" : "default"} className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
                placeholder="Type....."
                label="Cover Letter"
                autosize
                withAsterisk
                minRows={4}
            />
            {!preview && <Button onClick={handlePreview}
                leftSection={<IconEyeCheck size={20} />}
                color="brightSun.4" variant="light" >Preview
            </Button>}
            {
                preview && <div className="flex gap-10 [&>*]:w-1/2">
                    <Button
                        onClick={handlePreview}
                        leftSection={<IconEdit size={20} />}
                        fullWidth
                        color="brightSun.4" variant="outline" >Edit
                    </Button>


                    <Button onClick={handleSubmit}
                        leftSection={<IconRosetteDiscountCheck size={20} />}
                        fullWidth
                        color="brightSun.4" variant="light" >Submit
                    </Button>
                </div>
            }
        </div>
    </div>
}
export default ApplicationForm;
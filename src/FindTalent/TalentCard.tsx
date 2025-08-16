import { Avatar, Button, Divider, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCalendarMonth, IconHeart, IconMapPin } from "@tabler/icons-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { DateInput, PickerControl, TimeInput } from "@mantine/dates";
import { getProfile } from "../Services/ProfileService";
import { changeAppStatus } from "../Services/JobService";
import { errorNotification, successNotification } from "../Services/NotificationService";
import { formatInterviewTime, openBase64File } from "../Services/Utilities";

const TalentCard = (props: any) => {
    const { id } = useParams();
    const [opened, { open, close }] = useDisclosure(false);
    const [date, setDate] = useState<string | null>(null);
    const [time, setTime] = useState<any>(null);
    const ref = useRef<HTMLInputElement>(null);
    const [profile, setProfile] = useState<any>({});
    const [app, { open: openApp, close: closeApp }] = useDisclosure(false);
    useEffect(() => {
        if (props.applicantId) getProfile(props.applicantId).then((res) => {
            setProfile(res);
        }).catch((err) => {
            console.log(err);
        })
        else setProfile(props);
    }, [props]);

 const handleOffer = (status: string) => {
    // Check if date and time are available (for interview scheduling)
    if (status === "INTERVIEWING" && (!date || !time)) {
        errorNotification("Error", "Please select both date and time");
        return;
    }

    let interview: any = {
        id,
        applicantId: profile.id,
        applicationStatus: status,
        interviewTime: new Date().toISOString(), // default, will update below
    };

    if (status === "INTERVIEWING") {
        const [hours, minutes] = time.split(":").map(Number);
        const newDate = new Date(date!); // date is string|null, so non-null assertion
        newDate.setHours(hours, minutes, 0, 0);
        interview = { ...interview, interviewTime: newDate.toISOString() };
    }

    changeAppStatus(interview)
        .then(() => {
            if (status === "INTERVIEWING") {
                successNotification("Interview Scheduled", "Successfully scheduled the interview.");
            } else if (status === "OFFERED") {
                successNotification("Offered", "Offer sent successfully.");
            } else {
                successNotification("Rejected", "Applicant has been rejected.");
            }
            setTimeout(() => window.location.reload(), 2000);
        })
        .catch((err) => {
            console.error(err);
            errorNotification("Error", err.response?.data?.errorMessage || "Failed to schedule interview");
        });
};

    return <div className="bg-mine-shaft-900 p-4 w-96 flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-400 ">
        <div className="flex justify-between">
            <div className="flex gap-2 items-center">
                <div className="p-2 bg-mine-shaft-800 rounded-full">
                    <Avatar size="lg" src={profile?.picture ?
                        `data:image/jpeg;base64,${profile?.picture}` : "/Avatar.png"} alt="" />
                </div>
                <div>
                    <div className="font-semibold text-lg">{props.name}</div>
                    <div className="text-sm text-mine-shaft-300"> {profile?.jobTitle} &bull; {profile?.company}</div>
                </div>
            </div>
            <div><IconHeart className="text-mine-shaft-300 cursor-pointer" /></div>
        </div>
        <div className="flex gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-800 [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs ">
            {
                profile?.skills?.map((skill: any, index: any) => index < 4 &&
                    <div key={index}>{skill}</div>)
            }
        </div>
        <Text className="!text-xs text-justify !text-mine-shaft-300 " lineClamp={3}>
            {profile?.about}
        </Text>
        <Divider size="xs" color="mineShaft.7" />
        {
            props.invited ? <div className="flex gap-1 text-mine-shaft-200 text-sm items-center">
                <IconCalendarMonth stroke={1.5} />Interview : {formatInterviewTime(props.interviewTime)}
            </div> : <div className="flex justify-between">
                <div className="font-semibold text-mine-shaft-200">25</div>
                <div className=" p-1 flex gap-1 text-xs test-mine-shaft-400 items-center">
                    <IconMapPin className="h-5 w-5 " stroke={1.5} />{profile?.location}
                </div>
            </div>
        }
        <Divider size="xs" color="mineShaft.7" />
        <div className="flex [&>*]:w-1/2 [&>*]:p-1">
            {
                !props.invited && <>
                    <Link to={`/talent-profile/${profile?.id}`}>
                        <Button color="brightSun.4" variant="outline" fullWidth >Profile</Button>
                    </Link>
                    <div className="">
                        {props.posted ? <Button onClick={open} rightSection={<IconCalendarMonth className="w-5 h-5" />} color="brightSun.4" variant="light" fullWidth >Schedule</Button>
                            : <Button color="brightSun.4" variant="light" fullWidth >Message</Button>}
                    </div>
                </>
            }
            {
                props.invited && <>
                    <div>
                        <Button color="brightSun.4" variant="outline" onClick={()=>handleOffer("OFFERED")} fullWidth >Accept</Button>
                    </div>
                    <div>
                        <Button color="brightSun.4" variant="light" onClick={()=>handleOffer("REJECTED")} fullWidth >Reject</Button>
                    </div>
                </>
            }
        </div>
        {
            (props.invited || props.posted) && <Button color="brightSun.4"
                variant="filled" fullWidth autoContrast onClick={openApp}>View Application</Button>

        }

        <Modal opened={opened} onClose={close} title="Schedule Interview" centered>
            <div className="flex flex-col gap-4">
                <DateInput
                    value={date}
                    onChange={setDate}
                    label="Date"
                    placeholder="Enter Date "
                    minDate={new Date()}
                />

                <TimeInput label="Time" value={time} onChange={(event) => setTime(event.currentTarget.value)} ref={ref} onClick={() => ref.current?.showPicker()} />
                <Button onClick={() => handleOffer("INTERVIEWING")} color="brightSun.4" variant="light" fullWidth >Schedule</Button>
            </div>

        </Modal>
        <Modal opened={app} onClose={closeApp} radius="lg" title="Application" centered>
            <div className="flex flex-col gap-4">
                <div>
                    Email:&emsp;
                    <a
                        className="text-bright-sun-400 hover:underline cursor-pointer text-center"
                        href={`mailto:${props.email}`}
                    >
                        {props.email}
                    </a>
                </div>
                <div>
                    Website:&emsp;
                    <a
                        className="text-bright-sun-400 hover:underline cursor-pointer text-center"
                        href={props.website}
                        target="_blank"
                    >
                        {props.website}
                    </a>
                </div>
                <div>
                    Resume:&emsp;
                    <span
                        className="text-bright-sun-400 hover:underline cursor-pointer text-center"
                        onClick={() => openBase64File(props.resume)}
                    >
                        {props.name}
                    </span>
                </div>

                <div>
                    CoverLetter:&emsp;
                    <div
                    >
                        {props.CoverLetter}
                    </div>
                </div>

            </div>
        </Modal>
    </div>
}
export default TalentCard;
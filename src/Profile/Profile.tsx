import { ActionIcon, Button, Divider, TagsInput, Textarea } from "@mantine/core";
import { IconBriefcase, IconDeviceFloppy, IconMapPin, IconPencil, IconPlus } from "@tabler/icons-react";
import ExperinceCard from "./ExperinceCard";
import CertifyCard from "./CertifyCard";
import { useState } from "react";
import SelectInput from "./SelectInput";
import fields from "../Data/Profile";
import ExpInput from "./ExpInput";
import { profile } from "../Data/TalentData"; // Removed this import since you're using local data
import CertiInput from "./CertiInput";

const Profile = () => {
    const select = fields;
    const [skills, setSkills] = useState(['React', 'Spring Boot', 'Java', 'Python', 'Node.js', 'MongoDB', 'Express', 'Django', 'PostgreSQL']);
    const [edit, setEdit] = useState([false, false, false, false, false]);
    const [about, setAbout] = useState('Lorem ipsum dolor, sit amet consectetur adipisicing elit. A, tenetur?');
    const [addExp, setAddExp] = useState(false);
    const [addCerti, setAddCerti] = useState(false);
    const handleEdit = (index: number) => {
        const newEdit = [...edit];
        newEdit[index] = !newEdit[index];
        setEdit(newEdit);
    }

    return (
        <div className="w-4/5 mx-auto">
            <div className="relative">
                <img className="rounded-t-2xl" src="/Profile/banner.jpg" alt="" />
                <img className="rounded-full w-48 h-48 -bottom-1/3 absolute left-3 border-mine-shaft-950 border-8"
                    src="/avatar.png" alt="" />
            </div>
            <div className="px-3 mt-16 ">
                <div className="text-3xl font-semibold flex justify-between">Jarood Wood
                    <ActionIcon onClick={() => handleEdit(0)} size="lg" color="brightSun.4" variant="subtle" >
                        {edit[0] ? <IconDeviceFloppy className="h-4/5 w-4/5" /> : <IconPencil className="h-4/5 w-4/5" />}
                    </ActionIcon>
                </div>
                {edit[0] ? (
                    <>
                        <div className="flex gap-10 [&>*]:w-1/2">
                            <SelectInput {...select[0]} />
                            <SelectInput {...select[1]} />
                        </div>
                        <SelectInput {...select[2]} />
                    </>
                ) : (
                    <>
                        <div className="text-xl flex gap-1 items-center">
                            <IconBriefcase className="h-5 w-5" stroke={1.5} />
                            SDE • Google
                        </div>
                        <div className="flex gap-1 text-lg text-mine-shaft-300 items-center">
                            <IconMapPin className="h-5 w-5" stroke={1.5} />
                            India
                        </div>
                    </>
                )}

                <Divider mx="xs" my="xl" />
                <div className="px-3">
                    <div className="text-2xl font-semibold mb-3 flex justify-between">About<ActionIcon onClick={() => handleEdit(1)} size="lg" color="brightSun.4" variant="subtle" >
                        {edit[1] ? <IconDeviceFloppy className="h-4/5 w-4/5" /> : <IconPencil className="h-4/5 w-4/5" />}
                    </ActionIcon></div>
                    {
                        edit[1] ? (
                            <Textarea
                                value={about}
                                onChange={(event) => setAbout(event.currentTarget.value)}
                                autosize minRows={3} placeholder="Enter about yourself "
                            />
                        ) : (
                            <div className="text-sm  text-mine-shaft-300 text-justify">{about}</div>
                        )
                    }
                </div>
            </div>
            <Divider mx="xs" my="xl" />
            <div className="px-3">
                <div className="text-2xl font-semibold mb-3 flex justify-between">Skills<ActionIcon onClick={() => handleEdit(2)} size="lg" color="brightSun.4" variant="subtle" >
                    {edit[2] ? <IconDeviceFloppy className="h-4/5 w-4/5" /> : <IconPencil className="h-4/5 w-4/5" />}
                </ActionIcon></div>
                {
                    edit[2] ? (
                        <TagsInput
                            value={skills}
                            onChange={setSkills}
                            placeholder="Add skill"
                            splitChars={[',', ' ', '|']}
                        />
                    ) : (
                        <div className="flex flex-wrap gap-2">
                            {
                                skills.map((skill: string, index: number) => (
                                    <div key={index} className="bg-bright-sun-300 text-sm font-medium bg-opacity-15 rounded-3xl text-bright-sun-400 px-4 py-1">{skill}</div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
            <Divider mx="xs" my="xl" />
            <div className="px-3 ">
                <div className="text-2xl font-semibold mb-5 flex justify-between">Experience
                    <div className="flex gap-2">
                        <ActionIcon onClick={() => setAddExp(true)} size="lg" color="brightSun.4" variant="subtle" >
                            <IconPlus className="h-4/5 w-4/5" />
                        </ActionIcon>

                        <ActionIcon onClick={() => handleEdit(3)} size="lg" color="brightSun.4" variant="subtle" >
                            {edit[3] ? <IconDeviceFloppy className="h-4/5 w-4/5" /> : <IconPencil className="h-4/5 w-4/5" />}
                        </ActionIcon></div></div>
                <div className="flex flex-col gap-8">
                    {
                        profile[0].experience.map((exp: any, index: number) => <ExperinceCard key={index} {...exp} edit={edit[3]} />)
                    }
                    {addExp && <ExpInput add setEdit={setAddExp} />}
                </div>
            </div>
            <Divider mx="xs" my="xl" />
            <div className="px-3">
                <div className="text-2xl font-semibold mb-5 flex justify-between">Certifications
                    <div className="flex gap-2">
                        <ActionIcon onClick={() => setAddCerti(true)} size="lg" color="brightSun.4" variant="subtle" >
                            <IconPlus className="h-4/5 w-4/5" />
                        </ActionIcon>
                    

                    <ActionIcon onClick={() => handleEdit(4)} size="lg" color="brightSun.4" variant="subtle" >
                        {edit[4] ? <IconDeviceFloppy className="h-4/5 w-4/5" /> : <IconPencil className="h-4/5 w-4/5" />}
                    </ActionIcon></div></div>
                <div className="flex flex-col gap-8">
                    {
                        profile[0].certifications.map((certi: any, index: number) => <CertifyCard key={index} edit={edit[4]} {...certi} />)
                    }
                    {
                        addCerti && <CertiInput setEdit={setAddCerti} />
                    }
                </div>
            </div>
        </div>
    );
}

export default Profile;
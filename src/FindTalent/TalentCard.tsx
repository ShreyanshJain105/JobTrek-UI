import { Avatar, Modal, useMantineColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { 
    IconCalendarMonth, 
    IconHeart, 
    IconHeartFilled, 
    IconMapPin, 
    IconBriefcase, 
    IconMail, 
    IconWorld, 
    IconFileText, 
    IconCheck, 
    IconX, 
    IconArrowUpRight,
    IconClock,
    IconMessageDots
} from "@tabler/icons-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { DateInput, TimeInput } from "@mantine/dates";
import { getProfile } from "../Services/ProfileService";
import { changeAppStatus } from "../Services/JobService";
import { errorNotification, successNotification } from "../Services/NotificationService";
import { formatInterviewTime, openBase64File } from "../Services/Utilities";
import ChatModal from "../Chat/ChatModal";
import { useInputStyles } from "../Services/ThemeStyles";

const TalentCard = (props: any) => {
    const inputStyles = useInputStyles();
    const { colorScheme } = useMantineColorScheme();
    const isDark = colorScheme === "dark";
    const { id } = useParams();
    const [opened, { open, close }] = useDisclosure(false);
    const [date, setDate] = useState<string | null>(null);
    const [time, setTime] = useState<any>(null);
    const ref = useRef<HTMLInputElement>(null);
    const [profile, setProfile] = useState<any>({});
    const [app, { open: openApp, close: closeApp }] = useDisclosure(false);
    const [chatOpened, { open: openChat, close: closeChat }] = useDisclosure(false);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if (props.applicantId) {
            getProfile(props.applicantId)
                .then((res) => setProfile(res))
                .catch((err) => console.error("Error fetching applicant profile:", err));
        } else {
            setProfile(props);
        }
    }, [props]);

    const handleOffer = (status: string) => {
        if (status === "INTERVIEWING" && (!date || !time)) {
            errorNotification("Error", "Please select both date and time for the interview");
            return;
        }

        let interview: any = {
            id,
            applicantId: profile.id,
            applicationStatus: status,
            interviewTime: new Date().toISOString(),
        };

        if (status === "INTERVIEWING") {
            const [hours, minutes] = time.split(":").map(Number);
            const newDate = new Date(date!);
            newDate.setHours(hours, minutes, 0, 0);
            interview = { ...interview, interviewTime: newDate.toISOString() };
        }

        changeAppStatus(interview)
            .then(() => {
                if (status === "INTERVIEWING") {
                    successNotification("Interview Scheduled", "Candidate has been scheduled for an interview.");
                    close();
                } else if (status === "OFFERED") {
                    successNotification("Offer Extended", "Formal offer has been dispatched to candidate.");
                } else {
                    successNotification("Status Updated", "Candidate application rejected.");
                }
                setTimeout(() => window.location.reload(), 400);
            })
            .catch((err) => {
                console.error(err);
                errorNotification("Error", err.response?.data?.errorMessage || "Failed to update candidate status");
            });
    };

    const candidateName = profile?.name || props?.name || "Candidate";
    const jobTitle = profile?.jobTitle || "Professional";
    const company = profile?.company || "Open to Opportunities";
    const totalExp = props.totalExp || profile?.totalExp || 1;

    return (
        <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-white/[0.08] hover:border-amber-500/30 backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5 flex flex-col justify-between group h-full">
            <div className="flex flex-col gap-4">
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5 min-w-0">
                        <div className="relative shrink-0">
                            <div className="w-14 h-14 rounded-2xl p-0.5 bg-gradient-to-tr from-amber-500/40 via-white/10 to-transparent">
                                <Avatar
                                    size="100%"
                                    radius="md"
                                    src={
                                        profile?.picture
                                            ? `data:image/jpeg;base64,${profile?.picture}`
                                            : "/Avatar.png"
                                    }
                                    alt={candidateName}
                                    className="w-full h-full object-cover rounded-xl"
                                />
                            </div>
                            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-900" />
                        </div>

                        <div className="min-w-0">
                            <h3 className="font-bold text-base sm:text-lg text-white font-display group-hover:text-amber-400 transition-colors truncate">
                                {candidateName}
                            </h3>
                            <p className="text-xs text-slate-400 font-medium truncate mt-0.5">
                                {jobTitle} &bull; <span className="text-slate-300">{company}</span>
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => setLiked(!liked)}
                        className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-slate-400 hover:text-amber-400 transition-colors shrink-0"
                    >
                        {liked ? (
                            <IconHeartFilled size={18} className="text-amber-400" />
                        ) : (
                            <IconHeart size={18} />
                        )}
                    </button>
                </div>

                {/* Skills Tags */}
                {profile?.skills && profile.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                        {profile.skills.slice(0, 4).map((skill: string, index: number) => (
                            <span
                                key={index}
                                className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[11px] font-semibold"
                            >
                                {skill}
                            </span>
                        ))}
                        {profile.skills.length > 4 && (
                            <span className="px-2 py-1 rounded-lg bg-white/[0.04] text-slate-400 text-[11px] font-medium">
                                +{profile.skills.length - 4}
                            </span>
                        )}
                    </div>
                )}

                {/* About Snippet */}
                {profile?.about && (
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {profile.about}
                    </p>
                )}

                {/* Interview / Experience Meta */}
                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
                    {props.invited ? (
                        <div className="flex items-center gap-1.5 text-amber-400 font-medium">
                            <IconClock size={15} />
                            <span>{formatInterviewTime(props.interviewTime)}</span>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center gap-1.5">
                                <IconBriefcase size={14} className="text-slate-500" />
                                <span>{totalExp} {totalExp === 1 ? "year" : "years"} exp</span>
                            </div>
                            {profile?.location && (
                                <div className="flex items-center gap-1">
                                    <IconMapPin size={14} className="text-slate-500" />
                                    <span className="truncate max-w-[120px]">{profile.location}</span>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Actions Section */}
            <div className="pt-4 mt-4 border-t border-white/[0.06] flex flex-col gap-2">
                <div className="flex gap-2">
                    {!props.invited && (
                        <>
                            <Link
                                to={`/talent-profile/${profile?.id || props?.applicantId || props?.id}`}
                                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-white/10 hover:border-amber-500/30 transition-all"
                            >
                                <span>Profile</span>
                                <IconArrowUpRight size={14} />
                            </Link>

                            <div className="flex-1">
                                {props.posted ? (
                                    <button
                                        type="button"
                                        onClick={open}
                                        className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-all"
                                    >
                                        <IconCalendarMonth size={14} />
                                        <span>Schedule</span>
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={openChat}
                                        className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-200 hover:text-amber-400 bg-white/[0.04] hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/30 transition-all shadow-sm"
                                    >
                                        <IconMessageDots size={14} className="text-amber-400" />
                                        <span>Message</span>
                                    </button>
                                )}
                            </div>
                        </>
                    )}

                    {props.invited && (
                        <>
                            <button
                                type="button"
                                onClick={() => handleOffer("OFFERED")}
                                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all"
                            >
                                <IconCheck size={14} />
                                <span>Accept</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => handleOffer("REJECTED")}
                                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 transition-all"
                            >
                                <IconX size={14} />
                                <span>Reject</span>
                            </button>
                        </>
                    )}
                </div>

                {(props.invited || props.posted || props.offered) && (
                    <button
                        type="button"
                        onClick={openApp}
                        className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all shadow-md shadow-amber-500/20"
                    >
                        <IconFileText size={14} />
                        <span>View Application</span>
                    </button>
                )}
            </div>

            {/* Schedule Interview Modal */}
            <Modal
                opened={opened}
                onClose={close}
                title={<span className="font-bold text-slate-900 dark:text-white font-display text-lg">Schedule Candidate Interview</span>}
                centered
                styles={{
                    content: {
                        backgroundColor: isDark ? "#0b0f19" : "#ffffff",
                        border: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(15, 23, 42, 0.12)",
                        borderRadius: "24px",
                        padding: "20px",
                    },
                    header: {
                        backgroundColor: "transparent",
                    },
                }}
            >
                <div className="flex flex-col gap-5 pt-2">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Select a date and time to invite <strong className="text-slate-900 dark:text-white">{candidateName}</strong> for a technical or cultural interview.
                    </p>
                    <DateInput
                        value={date}
                        onChange={setDate}
                        label="Interview Date"
                        placeholder="Select calendar date"
                        minDate={new Date()}
                        styles={inputStyles}
                    />
                    <TimeInput
                        label="Interview Time"
                        value={time}
                        onChange={(event) => setTime(event.currentTarget.value)}
                        ref={ref}
                        onClick={() => ref.current?.showPicker()}
                        styles={inputStyles}
                    />
                    <button
                        type="button"
                        onClick={() => handleOffer("INTERVIEWING")}
                        className="mt-2 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/20"
                    >
                        <IconCalendarMonth size={16} />
                        <span>Confirm & Send Invitation</span>
                    </button>
                </div>
            </Modal>

            {/* Application Details Modal */}
            <Modal
                opened={app}
                onClose={closeApp}
                title={<span className="font-bold text-slate-900 dark:text-white font-display text-lg">Applicant Dossier</span>}
                centered
                styles={{
                    content: {
                        backgroundColor: isDark ? "#0b0f19" : "#ffffff",
                        border: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(15, 23, 42, 0.12)",
                        borderRadius: "24px",
                        padding: "20px",
                    },
                    header: {
                        backgroundColor: "transparent",
                    },
                }}
            >
                <div className="flex flex-col gap-4 pt-2">
                    <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 flex items-center justify-between">
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Candidate Name</span>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">{props.name}</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 flex items-center justify-between">
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5">
                            <IconMail size={14} /> Email
                        </span>
                        <a
                            className="text-xs font-semibold text-amber-500 dark:text-amber-400 hover:underline"
                            href={`mailto:${props.email}`}
                        >
                            {props.email}
                        </a>
                    </div>

                    {props.website && (
                        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between">
                            <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                                <IconWorld size={14} /> Portfolio
                            </span>
                            <a
                                className="text-xs font-semibold text-amber-400 hover:underline truncate max-w-[200px]"
                                href={props.website.startsWith("http") ? props.website : `https://${props.website}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {props.website}
                            </a>
                        </div>
                    )}

                    {props.resume && (
                        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <IconFileText size={18} className="text-amber-400" />
                                <span className="text-xs font-bold text-white">Curriculum Vitae</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => openBase64File(props.resume)}
                                className="px-3 py-1 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors"
                            >
                                View CV
                            </button>
                        </div>
                    )}

                    {props.coverLetter && (
                        <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 flex flex-col gap-1.5">
                            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Cover Letter</span>
                            <p className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                                {props.coverLetter}
                            </p>
                        </div>
                    )}
                </div>
            </Modal>

            {/* Direct Recruiter Chat Modal */}
            <ChatModal
                opened={chatOpened}
                close={closeChat}
                applicant={{
                    ...profile,
                    ...props,
                    name: candidateName,
                    email: props.email || profile?.email,
                    jobTitle: jobTitle,
                }}
                jobTitle={props.jobTitle || jobTitle}
                status={props.offered ? "OFFERED" : props.invited ? "INTERVIEWING" : props.posted ? "APPLICANT" : "CANDIDATE"}
            />
        </div>
    );
};

export default TalentCard;

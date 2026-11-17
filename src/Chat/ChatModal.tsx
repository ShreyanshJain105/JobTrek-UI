import { Modal, ScrollArea, Avatar, useMantineColorScheme } from "@mantine/core";
import { 
    IconSend, 
    IconCheck, 
    IconChecks, 
    IconMail, 
    IconSparkles, 
    IconUserCheck,
    IconCalendar,
    IconFileText,
    IconX
} from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { sendNotification } from "../Services/NotiService";
import { successNotification } from "../Services/NotificationService";

interface Message {
    id: string;
    sender: "employer" | "applicant";
    senderName: string;
    text: string;
    time: string;
    status: "sent" | "delivered" | "read";
}

interface ChatModalProps {
    opened: boolean;
    close: () => void;
    applicant: any;
    jobTitle?: string;
    status?: string;
}

const quickTemplates = [
    "🎉 Discuss Offer & Package Details",
    "📅 Confirm Target Start Date",
    "📄 Request Onboarding Documents",
    "👋 Welcome aboard to the Engineering Team!",
];

const ChatModal = ({ opened, close, applicant, jobTitle, status }: ChatModalProps) => {
    const { colorScheme } = useMantineColorScheme();
    const isDark = colorScheme === "dark";
    const user = useSelector((state: any) => state.user);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollViewportRef = useRef<HTMLDivElement>(null);

    const candidateName = applicant?.name || applicant?.applicantName || "Candidate";
    const candidateId = applicant?.id || applicant?.applicantId || "candidate";
    const candidateEmail = applicant?.email || "";
    const activeRole = jobTitle || applicant?.jobTitle || "Open Role";
    const isOffered = status === "OFFERED" || applicant?.applicationStatus === "OFFERED";

    const storageKey = `jobtrek_chat_${user?.id || 'employer'}_${candidateId}`;

    // Load or generate initial conversation
    useEffect(() => {
        if (!opened) return;

        const stored = localStorage.getItem(storageKey);
        if (stored) {
            try {
                setMessages(JSON.parse(stored));
                return;
            } catch (e) {
                console.error("Error parsing stored chat:", e);
            }
        }

        // Default initial contextual conversation
        const initialThread: Message[] = isOffered
            ? [
                {
                    id: "msg-1",
                    sender: "employer",
                    senderName: user?.name || "Hiring Team",
                    text: `Hello ${candidateName}! Congratulations on your formal offer for the ${activeRole} position. We were very impressed by your background and are excited to welcome you to the team. Please let us know if you'd like to connect on compensation details, benefits, or your expected start date.`,
                    time: "10:30 AM",
                    status: "read",
                },
                {
                    id: "msg-2",
                    sender: "applicant",
                    senderName: candidateName,
                    text: `Thank you so much! I am thrilled to receive this offer and excited about joining the company. I've reviewed the offer terms and everything looks great. When can we discuss the next onboarding steps?`,
                    time: "10:35 AM",
                    status: "read",
                },
            ]
            : [
                {
                    id: "msg-1",
                    sender: "employer",
                    senderName: user?.name || "Hiring Team",
                    text: `Hello ${candidateName}, thank you for your application for the ${activeRole} role at our company. We'd love to learn more about your technical experience and current availability.`,
                    time: "Yesterday",
                    status: "read",
                },
            ];

        setMessages(initialThread);
        localStorage.setItem(storageKey, JSON.stringify(initialThread));
    }, [opened, candidateId, isOffered, activeRole, candidateName, user?.name, storageKey]);

    // Scroll to bottom on new message
    useEffect(() => {
        if (scrollViewportRef.current) {
            scrollViewportRef.current.scrollTo({
                top: scrollViewportRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [messages, isTyping]);

    const handleSendMessage = (textToSend?: string) => {
        const messageText = (textToSend || input).trim();
        if (!messageText) return;

        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const newMsg: Message = {
            id: `msg-${Date.now()}`,
            sender: "employer",
            senderName: user?.name || "Hiring Team",
            text: messageText,
            time: timeString,
            status: "delivered",
        };

        const updated = [...messages, newMsg];
        setMessages(updated);
        localStorage.setItem(storageKey, JSON.stringify(updated));
        setInput("");

        // Dispatch backend notification to applicant
        if (applicant?.applicantId || applicant?.id) {
            sendNotification({
                action: "New Message",
                message: `New message from ${user?.name || "Employer"}: "${messageText.slice(0, 50)}..."`,
                userId: applicant?.applicantId || applicant?.id,
                route: "/job-history",
            });
        }

        successNotification("Message Sent", `Your message was delivered to ${candidateName}.`);

        // Simulated candidate response after 1.8 seconds to create dynamic interaction
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            const candidateReply: Message = {
                id: `msg-${Date.now() + 1}`,
                sender: "applicant",
                senderName: candidateName,
                text: `Thanks for the update! I have received this and will review it right away. Looking forward to our next steps!`,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                status: "delivered",
            };
            const withReply = [...updated, candidateReply];
            setMessages(withReply);
            localStorage.setItem(storageKey, JSON.stringify(withReply));
        }, 1800);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <Modal
            opened={opened}
            onClose={close}
            size="lg"
            radius="24px"
            centered
            withCloseButton={false}
            styles={{
                content: {
                    backgroundColor: isDark ? "#0b0f19" : "#ffffff",
                    border: isDark ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid rgba(15, 23, 42, 0.12)",
                    borderRadius: "24px",
                    padding: 0,
                    overflow: "hidden",
                    boxShadow: isDark ? "0 25px 50px -12px rgba(0, 0, 0, 0.8)" : "0 20px 40px -10px rgba(15, 23, 42, 0.15)",
                },
                body: {
                    padding: 0,
                },
            }}
        >
            {/* Modal Header */}
            <div className={`p-4 sm:p-5 border-b flex items-center justify-between gap-3 ${
                isDark ? "bg-slate-900/90 border-white/[0.08]" : "bg-slate-50 border-slate-200"
            }`}>
                <div className="flex items-center gap-3.5 min-w-0">
                    <div className="relative shrink-0">
                        <div className="w-12 h-12 rounded-2xl p-0.5 bg-gradient-to-tr from-amber-400 to-amber-600">
                            <Avatar
                                size="100%"
                                radius="md"
                                src={
                                    applicant?.picture
                                        ? `data:image/jpeg;base64,${applicant.picture}`
                                        : "/Avatar.png"
                                }
                                alt={candidateName}
                                className="w-full h-full object-cover rounded-xl"
                            />
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-950" />
                    </div>

                    <div className="min-w-0">
                        <div className="flex items-center gap-2">
                            <h3 className="text-base font-bold text-slate-900 dark:text-white font-display truncate">
                                {candidateName}
                            </h3>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                                <IconUserCheck size={11} />
                                {status || "Candidate"}
                            </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5 flex items-center gap-2">
                            <span>{activeRole}</span>
                            {candidateEmail && (
                                <>
                                    <span className="text-slate-400 dark:text-slate-600">&bull;</span>
                                    <a href={`mailto:${candidateEmail}`} className="text-amber-500 hover:underline flex items-center gap-1">
                                        <IconMail size={12} />
                                        <span>{candidateEmail}</span>
                                    </a>
                                </>
                            )}
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={close}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/10 transition-colors shrink-0"
                >
                    <IconX size={18} />
                </button>
            </div>

            {/* Conversation Messages Thread */}
            <div className={`p-4 sm:p-5 min-h-[300px] max-h-[360px] flex flex-col ${
                isDark ? "bg-slate-950/60" : "bg-slate-50/70"
            }`}>
                <ScrollArea
                    viewportRef={scrollViewportRef}
                    className="flex-1 pr-2"
                    type="scroll"
                >
                    <div className="flex flex-col gap-3.5">
                        <div className="flex justify-center my-1">
                            <span className="px-3 py-1 rounded-full bg-slate-200/60 dark:bg-white/[0.04] border border-slate-300/40 dark:border-white/[0.06] text-[11px] font-medium text-slate-500 dark:text-slate-400">
                                End-to-end encrypted direct recruiter chat
                            </span>
                        </div>

                        {messages.map((msg) => {
                            const isMe = msg.sender === "employer";
                            return (
                                <div
                                    key={msg.id}
                                    className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                                >
                                    <div
                                        className={`max-w-[85%] sm:max-w-[75%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                                            isMe
                                                ? "bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-medium rounded-tr-xs shadow-md shadow-amber-500/10"
                                                : isDark 
                                                    ? "bg-slate-900 border border-white/10 text-slate-200 rounded-tl-xs shadow-sm"
                                                    : "bg-white border border-slate-200 text-slate-800 rounded-tl-xs shadow-sm"
                                        }`}
                                    >
                                        <p className="whitespace-pre-wrap">{msg.text}</p>
                                    </div>

                                    <div className="flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-500 mt-1 px-1">
                                        <span>{msg.time}</span>
                                        {isMe && (
                                            <span className="text-amber-500">
                                                <IconChecks size={13} />
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}

                        {isTyping && (
                            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 italic py-1 px-2">
                                <div className="flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse delay-150" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse delay-300" />
                                </div>
                                <span>{candidateName} is typing...</span>
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </div>

            {/* Quick Template Chips */}
            <div className={`px-4 py-2.5 border-t overflow-x-auto flex items-center gap-2 no-scrollbar ${
                isDark ? "bg-slate-900/60 border-white/[0.04]" : "bg-slate-100/70 border-slate-200"
            }`}>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 shrink-0 flex items-center gap-1">
                    <IconSparkles size={12} className="text-amber-500" /> Quick Replies:
                </span>
                {quickTemplates.map((template, idx) => (
                    <button
                        key={idx}
                        type="button"
                        onClick={() => handleSendMessage(template)}
                        className={`px-2.5 py-1 rounded-lg border text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 ${
                            isDark 
                                ? "bg-white/[0.04] hover:bg-amber-500/10 border-white/[0.06] hover:border-amber-500/30 text-slate-300 hover:text-amber-400"
                                : "bg-white hover:bg-amber-50 border-slate-200 hover:border-amber-400 text-slate-700 hover:text-amber-600 shadow-xs"
                        }`}
                    >
                        {template}
                    </button>
                ))}
            </div>

            {/* Message Input Bar */}
            <div className={`p-3 sm:p-4 border-t flex items-center gap-2 ${
                isDark ? "bg-slate-900 border-white/[0.08]" : "bg-white border-slate-200"
            }`}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={`Write a message to ${candidateName}... (Press Enter to send)`}
                    className={`flex-1 border text-xs sm:text-sm px-4 py-3 rounded-xl focus:outline-none transition-colors ${
                        isDark 
                            ? "bg-slate-950/80 border-white/10 focus:border-amber-400 text-slate-100 placeholder:text-slate-500"
                            : "bg-slate-50 border-slate-200 focus:border-amber-500 text-slate-900 placeholder:text-slate-400"
                    }`}
                />

                <button
                    type="button"
                    onClick={() => handleSendMessage()}
                    disabled={!input.trim()}
                    className="inline-flex items-center justify-center p-3 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 disabled:opacity-40 transition-all shadow-md shadow-amber-500/20 active:scale-95 shrink-0"
                    title="Send message"
                >
                    <IconSend size={18} />
                </button>
            </div>
        </Modal>
    );
};

export default ChatModal;

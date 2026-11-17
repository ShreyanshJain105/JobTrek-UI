import { useNavigate, useParams } from "react-router-dom";
import PostedJobb from "../PostedJob/PostedJobb";
import PostedJobDescription from "../PostedJob/PostedJobDescription";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getJobPostedBy } from "../Services/JobService";
import { Drawer, useMantineColorScheme } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconList } from "@tabler/icons-react";

const PostedJob = () => {
    const { id } = useParams();
    const jobId = Number(id ?? 0);
    const user = useSelector((state: any) => state.user);
    const [opened, { open, close }] = useDisclosure(false);
    const [jobList, setJobList] = useState<any[]>([]);
    const [job, setJob] = useState<any>({});
    const navigate = useNavigate();
    const isMobile = useMediaQuery("(max-width: 1024px)");
    const { colorScheme } = useMantineColorScheme();
    const isDark = colorScheme === "dark";

    useEffect(() => {
        if (!user?.id) return;
        window.scrollTo(0, 0);

        getJobPostedBy(user.id)
            .then((res) => {
                setJobList(res || []);

                if (res && res.length > 0) {
                    if (jobId === 0) {
                        navigate(`/posted-jobs/${res[0].id}`, { replace: true });
                    }
                    const current = res.find((item: any) => item.id === jobId);
                    setJob(current ?? res[0]);
                } else {
                    setJob({});
                }
            })
            .catch((err) => {
                console.error("Error loading posted jobs:", err);
            });
    }, [jobId, user?.id, navigate]);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                {/* Mobile Drawer Trigger */}
                {isMobile && (
                    <div className="mb-4 flex justify-between items-center">
                        <button
                            type="button"
                            onClick={open}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-amber-400 bg-slate-900 border border-white/10 hover:bg-slate-800 transition-all shadow-sm"
                        >
                            <IconList size={16} />
                            <span>Browse Posted Roles ({jobList.length})</span>
                        </button>
                    </div>
                )}

                {/* Mobile Drawer */}
                <Drawer
                    opened={opened}
                    onClose={close}
                    size="320px"
                    styles={{
                        content: {
                            backgroundColor: isDark ? "#0b0f19" : "#ffffff",
                            borderRight: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(15, 23, 42, 0.1)",
                            padding: "16px",
                        },
                        header: {
                            backgroundColor: "transparent",
                        },
                    }}
                    title={<span className="font-bold text-slate-900 dark:text-white font-display text-base">Your Job Listings</span>}
                >
                    <div onClick={close}>
                        <PostedJobb job={job} jobList={jobList} />
                    </div>
                </Drawer>

                {/* Desktop Split View */}
                <div className="flex gap-8 items-start">
                    {!isMobile && (
                        <aside className="w-80 shrink-0 glass-panel p-5 rounded-3xl border border-white/10 shadow-xl">
                            <PostedJobb job={job} jobList={jobList} />
                        </aside>
                    )}
                    <PostedJobDescription {...job} />
                </div>
            </div>
        </div>
    );
};

export default PostedJob;

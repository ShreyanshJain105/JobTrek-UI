import { Indicator, Menu, useMantineColorScheme } from "@mantine/core";
import { IconBell, IconCheck, IconInbox } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getNotifications, readNotifications } from "../Services/NotiService";

const NotificationMenu = () => {
    const user = useSelector((state: any) => state.user);
    const [opened, setOpened] = useState(false);
    const [notifications, setNotifications] = useState<any[]>([]);
    const navigate = useNavigate();
    const { colorScheme } = useMantineColorScheme();
    const isDark = colorScheme === "dark";

    useEffect(() => {
        if (!user?.id) {
            setNotifications([]);
            return;
        }
        getNotifications(user.id)
            .then((res) => {
                setNotifications(res || []);
            })
            .catch((err) => console.log(err));
    }, [user?.id]);

    const unread = (index: number) => {
        const notiId = notifications[index]?.id;
        const remaining = notifications.filter((_, i) => i !== index);
        setNotifications(remaining);
        if (notiId) {
            readNotifications(notiId).catch((err) => console.log(err));
        }
    };

    return (
        <Menu 
            opened={opened} 
            onChange={setOpened} 
            shadow="xl" 
            width={360}
            position="bottom-end"
            styles={{
                dropdown: {
                    backgroundColor: isDark ? '#121724' : '#ffffff',
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.1)',
                    padding: '8px',
                    borderRadius: '16px',
                    boxShadow: isDark ? '0 25px 50px -12px rgba(0, 0, 0, 0.8)' : '0 15px 35px -5px rgba(15, 23, 42, 0.15)',
                }
            }}
        >
            <Menu.Target>
                <button
                    type="button"
                    aria-label="Notifications"
                    className="relative w-9 h-9 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-amber-500/30 flex items-center justify-center text-slate-300 hover:text-amber-400 transition-all cursor-pointer"
                >
                    <Indicator 
                        disabled={notifications.length <= 0} 
                        color="yellow" 
                        size={8} 
                        processing 
                        offset={3}
                    >
                        <IconBell size={18} stroke={1.8} />
                    </Indicator>
                </button>
            </Menu.Target>

            <Menu.Dropdown>
                <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.06] mb-2">
                    <span className="text-xs font-bold text-white uppercase tracking-wider font-display">Notifications</span>
                    {notifications.length > 0 && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            {notifications.length} new
                        </span>
                    )}
                </div>

                <div className="flex flex-col gap-1.5 max-h-[320px] overflow-y-auto pr-1">
                    {notifications.map((noti: any, index: number) => (
                        <div
                            key={noti.id || index}
                            onClick={() => {
                                if (noti.route) navigate(noti.route);
                                setOpened(false);
                                unread(index);
                            }}
                            className="p-3 rounded-xl bg-white/[0.02] hover:bg-amber-500/[0.08] border border-white/[0.04] hover:border-amber-500/25 transition-all cursor-pointer flex gap-3 items-start group"
                        >
                            <div className="w-7 h-7 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <IconCheck size={14} stroke={2.5} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-slate-200 group-hover:text-amber-300 transition-colors">
                                    {noti.action}
                                </p>
                                <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">
                                    {noti.message}
                                </p>
                            </div>
                        </div>
                    ))}

                    {notifications.length === 0 && (
                        <div className="text-center py-8 px-4 flex flex-col items-center justify-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-slate-500">
                                <IconInbox size={20} />
                            </div>
                            <p className="text-xs text-slate-400 font-medium">All caught up!</p>
                            <p className="text-[11px] text-slate-600">No new notifications</p>
                        </div>
                    )}
                </div>
            </Menu.Dropdown>
        </Menu>
    );
};

export default NotificationMenu;

import { Menu, Avatar, useMantineColorScheme } from '@mantine/core';
import {
    IconUserCircle,
    IconFileText,
    IconLogout2,
    IconChevronDown,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeUser } from '../Slices/UserSlice';
import { removeJwt } from '../Slices/JwtSlice';

const ProfileMenu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: any) => state.user);
    const profile = useSelector((state: any) => state.profile);
    const [opened, setOpened] = useState(false);
    const { colorScheme } = useMantineColorScheme();
    const isDark = colorScheme === "dark";

    const handleLogout = () => {
        dispatch(removeUser());
        dispatch(removeJwt());
        navigate("/login");
    };

    return (
        <Menu 
            opened={opened} 
            onChange={setOpened} 
            shadow="xl" 
            width={220}
            position="bottom-end"
            styles={{
                dropdown: {
                    backgroundColor: isDark ? '#121724' : '#ffffff',
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.1)',
                    padding: '8px',
                    borderRadius: '12px',
                    boxShadow: isDark ? '0 20px 40px -15px rgba(0,0,0,0.7)' : '0 10px 25px -5px rgba(15, 23, 42, 0.15)',
                },
                item: {
                    color: isDark ? '#cbd5e1' : '#334155',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    fontSize: '13px',
                    fontWeight: 500,
                }
            }}
        >
            <Menu.Target>
                <button 
                    type="button"
                    className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-amber-500/30 transition-all text-left group"
                >
                    <Avatar
                        src={profile?.picture ? `data:image/jpeg;base64,${profile.picture}` : "/Avatar.png"}
                        alt={user?.name || "User"}
                        size={32}
                        radius="xl"
                        className="ring-1 ring-amber-400/30"
                    />
                    <div className="hidden sm:flex flex-col pr-1">
                        <span className="text-xs font-semibold text-slate-900 dark:text-white leading-tight">
                            {user?.name || "Account"}
                        </span>
                        <span className={`text-[10px] font-mono tracking-wider ${
                            user?.accountType === "SUPERADMIN" 
                                ? "text-purple-600 dark:text-purple-400 font-extrabold" 
                                : "text-amber-500 dark:text-amber-400"
                        }`}>
                            {user?.accountType === "SUPERADMIN" ? "SUPERADMIN" : (user?.accountType || "MEMBER")}
                        </span>
                    </div>
                    <IconChevronDown size={14} className="text-slate-400 group-hover:text-amber-400 transition-transform duration-200" />
                </button>
            </Menu.Target>

            <Menu.Dropdown>
                <div className="px-3 py-2 mb-1 border-b border-slate-200 dark:border-white/[0.06]">
                    <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">{user?.name}</p>
                        {user?.accountType === "SUPERADMIN" && (
                            <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-purple-500/15 border border-purple-500/30 text-purple-600 dark:text-purple-300">
                                ROOT
                            </span>
                        )}
                    </div>
                    <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
                </div>

                {user?.accountType === "SUPERADMIN" && (
                    <Link to="/admin">
                        <Menu.Item 
                            leftSection={<IconUserCircle size={16} className="text-purple-500 dark:text-purple-400" />}
                            className="bg-purple-500/10 text-purple-600 dark:text-purple-300 hover:bg-purple-500/20 font-bold mb-1"
                        >
                            Admin Console
                        </Menu.Item>
                    </Link>
                )}

                <Link to="/profile">
                    <Menu.Item 
                        leftSection={<IconUserCircle size={16} className="text-amber-400" />}
                        className="hover:bg-white/5 hover:text-white"
                    >
                        My Profile
                    </Menu.Item>
                </Link>

                <Link to="/job-history">
                    <Menu.Item 
                        leftSection={<IconFileText size={16} className="text-amber-400" />}
                        className="hover:bg-white/5 hover:text-white"
                    >
                        Applications
                    </Menu.Item>
                </Link>

                <Menu.Divider className="border-white/[0.06] my-1" />

                <Menu.Item
                    onClick={handleLogout}
                    color="red"
                    leftSection={<IconLogout2 size={16} />}
                    className="hover:bg-red-500/10 text-red-400 hover:text-red-300 font-semibold"
                >
                    Sign Out
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};

export default ProfileMenu;

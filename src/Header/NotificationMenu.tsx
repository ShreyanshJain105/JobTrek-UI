import { Indicator, Menu } from "@mantine/core";
import { IconBellFilled, IconUserCircle } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IconX, IconCheck } from '@tabler/icons-react';
import { Notification } from '@mantine/core';
import { Stack } from "tabler-icons-react";
import { getNotifications, readNotifications } from "../Services/NotiService";

const NotificationMenu = () => {

    const user = useSelector((state: any) => state.user);
    const [opened, setOpened] = useState(false);
    const [notifications, setNotifications] = useState<any>([]);
    const navigate = useNavigate();


    useEffect(() => {
        getNotifications(user.id).then((res) => {
            setNotifications(res);
        }).catch((err) => console.log(err));

    }, [user]);

    const unread = (index: number) => {
        let notis = [...notifications].filter((noti: any, i: number) => i !== index);
        setNotifications(notis);
        readNotifications(notifications[index].id).then((res)=>console.log(res)).catch((err)=>console.log(err));
    };
    return <Menu opened={opened} onChange={setOpened} shadow="md" width={400}>
        <Menu.Target>
            <div className='bg-mine-shaft-900 p-1.5 rounded-full'>
                <Indicator disabled={notifications.length<=0} color='brightSun.4' size={9} processing offset={5}>
                    <IconBellFilled stroke={1.5} />
                </Indicator>
            </div>
        </Menu.Target>

        <Menu.Dropdown onChange={() => setOpened(true)}>

            <div className="flex flex-col gap-1">
                {
                    notifications.map((noti: any, index: number) => <Notification
                    onClick={()=>{
                        navigate(noti.route);
                        setOpened(false);

                        unread(index);
                        
                    }}
                    key={index} className="hover:bg-mine-shaft-900 cursor-pointer"
                        onClose={() => unread(index)}
                        icon={<IconCheck size={20} />} color="teal"
                        title={noti.action} mt="md">
                        {noti.message}
                    </Notification>)
                }
                {
                    notifications.length == 0 && <div className="text-center text-mine-shaft-300">
                        No Notifications</div>
                }

            </div>

        </Menu.Dropdown>
    </Menu>
}

export default NotificationMenu;
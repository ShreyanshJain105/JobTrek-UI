import { Menu, Button, Text, Avatar, Switch } from '@mantine/core';
import {
    IconSettings,
    IconSearch,
    IconPhoto,
    IconMessageCircle,
    IconTrash,
    IconArrowsLeftRight,
    IconUserCircle,
    IconFileText,
    IconMoon,
    IconSun,
    IconMoonStars,
    IconLogout2,
} from '@tabler/icons-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ProfileMenu = () => {
    const [checked, setChecked] = useState(false);
     const [opened, setOpened] = useState(false);
    return (
        <Menu  opened={opened} onChange={setOpened} shadow="md" width={200}>
            <Menu.Target>
                <div className='flex  cursor-pointer gap-3 items-center'>
                    <div className='flex gap-2 items-center'>
                        <div>Name</div>
                        <Avatar src='my.jpeg' alt="it's" />
                    </div>
                </div>
            </Menu.Target>

            <Menu.Dropdown onChange={()=>setOpened(true)}>
                <Link to="/profile">
                <Menu.Item leftSection={<IconUserCircle size={14} />}>
                    Profile
                </Menu.Item>
                </Link>
                <Menu.Item leftSection={<IconMessageCircle size={14} />}>
                    Messages
                </Menu.Item>
                <Menu.Item leftSection={<IconFileText size={14} />}>
                    Resume
                </Menu.Item>
                <Menu.Item
                    leftSection={<IconMoon size={14} />}
                    rightSection={
                        <Switch
                            size="md"
                            color="yellow"
                            checked={checked}
                            onChange={(event) => setChecked(event.currentTarget.checked)}
                            onLabel={<IconSun size={16} stroke={2.5} color="var(--mantine-color-yellow-4)" />}
                            offLabel={<IconMoonStars size={16} stroke={2.5} color="cyan" />}
                        />
                    }
                >
                    DarkMode
                </Menu.Item>

                <Menu.Divider />
                <Menu.Item
                    color="red"
                    leftSection={<IconLogout2 size={14} />}
                >
                    Logout
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}
export default ProfileMenu;
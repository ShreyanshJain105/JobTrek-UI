import { Avatar, Indicator } from '@mantine/core';
import { IconRouteSquare ,IconBellFilled,IconSettings } from '@tabler/icons-react';
import NavLinks from './NavLinks';
import { useLocation } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';


const Header=() => {
    const location=useLocation();
    return (

       location.pathname!="/signup" && location.pathname!="/login" ? <div className="w-full bg-mine-shaft-950 text-white h-20 px-6 flex justify-between 
        items-center  ">
            <div className='flex gap-1 items-center text-bright-sun-400'>
                <IconRouteSquare className='h-8 w-8' stroke={2.5}/>
                <div className="text-3xl font-semibold ">JobTrek</div>
                
            </div>
            {NavLinks()}
             
            
                <ProfileMenu/>
                <div className='bf-mine-shaft-900 p-1.5 rounded-full'>
                    <IconSettings stroke={1.5}/>
                </div>

                 <div className='bg-mine-shaft-900 p-1.5 rounded-full'>
                    <Indicator color='brightSun.4' size={9} processing offset={5}>
                    <IconBellFilled stroke={1.5}/>
                    </Indicator>
                 </div>
            </div>
       :<></>
    ) 
}

export default Header;
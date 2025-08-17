import { Avatar, Button, Indicator } from '@mantine/core';
import { IconRouteSquare ,IconBellFilled,IconSettings } from '@tabler/icons-react';
import NavLinks from './NavLinks';
import { Link, useLocation } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProfile } from '../Services/ProfileService';
import { setProfile } from '../Slices/ProfileSlice';


const Header=() => {
    const location=useLocation();
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);
    
   useEffect(() => {
    if (user && user.id) {
        getProfile(user.id)
            .then((data: any) => {
                dispatch(setProfile(data));
            })
            .catch((error: any) => {
                console.error('Error fetching profile:', error);
            });
    }
}, [user, dispatch]);

    return (

       location.pathname!="/signup" && location.pathname!="/login" ? <div className="w-full bg-mine-shaft-950 text-white h-20 px-6 flex justify-between 
        items-center  ">
            <div className='flex gap-1 items-center text-bright-sun-400'>
                <IconRouteSquare className='h-8 w-8' stroke={2.5}/>
                <div className="text-3xl font-semibold ">JobTrek</div>
                
            </div>
            {NavLinks()}
             
            
                {user ? <ProfileMenu/> :<Link to="/login">
                <Button variant="subtle" color='brightSun.4'>Login</Button>
                </Link>}
                {/* <div className='bf-mine-shaft-900 p-1.5 rounded-full'>
                    <IconSettings stroke={1.5}/>
                </div> */}

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
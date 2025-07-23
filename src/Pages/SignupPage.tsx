import { IconArrowLeft, IconRouteSquare } from "@tabler/icons-react";
import Signup from "../SignupLogin/Signup";
import Login from "../SignupLogin/Login";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@mantine/core";

const SignupPage = () => {
    const location=useLocation();
    const navigate = useNavigate();
    return (
        <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] overflow-hidden relative ">
             <Button my="md" leftSection={<IconArrowLeft size={20}/> } 
             color="brightSun.4" 
             className="!absolute left-5  z-10"
             onClick={()=>navigate("/")} variant="light" >Home</Button>
            <div className={`w-[100vw] transition-all ease-in-out duration-1000 h-[100vh] flex [&>*]:flex-shrink-0 ${location.pathname=='/signup'?'-translate-x-1/2':'translate-x-0'}`}>
                <Login/>
                <div className={`w-1/2 h-full transition-all ease-in-out duration-1000 ${location.pathname=="/signup"?"rounded-r-[200px]":"rounded-l-[200px]"}  bg-mine-shaft-900 flex items-center gap-5 justify-center flex-col `}>
                    <div className='flex gap-1 items-center text-bright-sun-400'>
                        <IconRouteSquare className='h-16 w-16' stroke={2.5} />
                        <div className="text-6xl font-semibold ">JobTrek</div>
                    </div>
                    <div className="text-2xl text-mine-shaft-200 font-semibold">Find The Made for you </div>
                </div>
                <Signup/>
            </div>
        </div>
    )
}

export default SignupPage;
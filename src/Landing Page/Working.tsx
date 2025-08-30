import { Avatar } from "@mantine/core";
import { work } from "../Data/Data";

const Working = () => {
    return (
        <div className="mt-20 pb-5">
            <div className="text-4xl md-mx:text-3xl sm-mx:text-2xl xs-ms:text-xl font-semibold mb-3 text-mine-shaft-100 text-center">
                How it <span className="text-bright-sun-400">Works</span>
            </div>
            <div className="text-lg mb-10 sm-mx:text-base xs-mx:text-sm mx-auto text-mine-shaft-300 text-center w-1/2 sm-mx:11/12">
                Navigate the hiring process seamlessly and secure your ideal career opportunity
            </div>
          
            <div className="flex px-16 bs-mx:px-10 md-mx:px-5 gap-1 md-mx:flex-col justify-between items-center ">
                <div className="relative">
                    <img className="w-[30rem]" src="/Working/Girl.png" alt="Girl" />
                    <div className="w-36 xs-mx:w-28 flex flex-col items-center gap-1 border border-bright-sun-400 rounded-xl py-3 xp-1 backdrop-blur-md top-[15%] absolute right-0">
                        <Avatar className="!h-12 !w-12 xs-mx:!h-12 xs-mx:!w-12" src="avatar1.png" alt="it's me "/>
                        <div className="text-sm sm-mx:text-xs font-semibold text-mine-shaft-200 text-center" >Complete your Profile</div>
                        <div className="text-xs sm-mx:text-xs font-semibold text-mine-shaft-300 text-center" >70% completed</div>
                    </div>
                </div>
                <div className="flex flex-col gap-10">
                    {
                        work.map((item,index)=>
                        <div key={index} className="flex items-center gap-4">
                        <div className="p-2.5 bg-bright-sun-300 rounded-full">
                            <img className="h-12 w-12 md-mx:w-9 md-mx:h-9 md-mx:w-9 sm-mx:w-7  sm-mx:h-7 " src={`/Working/${item.name}.png`} alt={item.name} />
                        </div>
                        <div>
                            <div className="text-mine-shaft-200 text-xl md-mx:text-lg sm-mx:text-base  font-semibold">{item.name}</div>
                            <div className="text-mine-shaft-300 md-mx:text-lg sm-mx:text-base">{item.desc}</div>
                        </div>  
                    </div>)
                    }
                </div>
            </div>
        </div>
    );
}

export default Working;
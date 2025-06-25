import { Avatar } from "@mantine/core";

const Testimonials=()=>{
    return <div className="mt-20 pb-5">
            <div className="text-4xl font-semibold mb-3 text-mine-shaft-100 text-center">
                What<span className="text-bright-sun-400"> Users </span>says about us? 
            </div>
            <div>
                <div>
                    <Avatar className="h-14 w-14" src="avatar.png" alt="itsme"/>
                    <div>
                        <div>Shreyansh Jain</div>
                        <div></div>
                    </div>
                </div>

            </div>
    </div>
    
}
export default Testimonials;
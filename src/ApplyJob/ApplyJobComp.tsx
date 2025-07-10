import { Divider, NumberInput, TextInput } from "@mantine/core";

const ApplyJobComp=()=>{
    return <div className="w-2/3 mx-auto ">
         <div className="flex justify-between">
            <div className="flex gap-2 items-center">
                <div className="p-3 bg-mine-shaft-800 rounded-xl">
                    <img className="h-14 " src={`/Icons/Google.png`} alt="" />
                </div>
                <div className="flex flex-col gap-1">
                    <div className="font-semibold text-2xl">software engineer </div>
                    <div className="text-lg text-mine-shaft-300">google &bull; 3 days ago &#x2022; 48 Applicants</div>
                </div>
            </div>
        </div>
        <Divider my="xl"/>
        <div className="text-xl font-semibold mb-5 ">Submit Your Application</div>
        <div>
            <div className="flex gap-10 [*>*]:w-1/2">
            <TextInput label="Full Name" withAsterisk placeholder="Enter Name " />
            <TextInput label="Email" withAsterisk placeholder="Enter E-Mail" />
            </div>
            <div className="flex gap-10 [*>*]:w-1/2">
            <NumberInput 
                label="PhoneNumber" 
                withAsterisk 
                hideControls 
                min={0} 
                max={9999999999} 
                clampBehavior="strict" 
                placeholder="Enter Phone Number" 
            />
            <TextInput label="Personal Website" withAsterisk placeholder="Enter url" />
            </div>
        </div>
    </div>
}
export default ApplyJobComp;
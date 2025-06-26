import { Button, TextInput } from "@mantine/core";

const Subscribe =()=>{
    return <div className="justify-around mt-20 flex items-center bg-mine-shaft-900 mx-20 py-3 rounded-xl ">
        <div className="text-4xl w-2/5 font-semibold  text-mine-shaft-100 text-center">
                Never Wants to miss Any   <span className="text-bright-sun-400">Jobs ?</span>
        </div>
        <div className="flex gap-4 rounded-xl bg-mine-shaft-700 px-3 py-2 items-center">
            <TextInput className="[&_input];text-mine-shaft-100 font-semibold" variant="unstyled" size="xl" placeholder="Yourmail@gmail.com" />
            <Button className="!rounded-lg" size="lg" color="brightSun.4" variant="filled">Subscribe     </Button>
        </div>
    </div>
}
export default Subscribe;
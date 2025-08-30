import { Button, TextInput } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const Subscribe =()=>{
    const matches = useMediaQuery('(max-width:639px)')
    const matches1 = useMediaQuery('(max-width:475px)')
    return <div className="flex-wrap justify-around mt-20 flex items-center bg-mine-shaft-900 mx-20 sm-mx:mx-5  py-3 rounded-xl ">
        <div className="bs-mx:w-4/5 text-4xl md-mx:text-3xl sm-mx:text-2xl xs-ms:text-xl w-2/5 font-semibold  text-mine-shaft-100 text-center">
                Never Wants to miss Any   <span className="text-bright-sun-400">Jobs ?</span>
        </div>
        <div className="flex gap-4 rounded-xl bg-mine-shaft-700 px-3 py-2 xs:items-center xs-mx:flex-col ">
            <TextInput className="[&_input];text-mine-shaft-100 font-semibold" variant="unstyled" size={matches1?"sm":matches?"md":"xl"} placeholder="Yourmail@gmail.com" />
            <Button className="!rounded-lg" size={matches1?"sm":matches?"sm":"lg"} color="brightSun.4" variant="filled">Subscribe     </Button>
        </div>
    </div>
}
export default Subscribe;
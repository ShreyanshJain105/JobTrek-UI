import Header from "../Header/Header"
import Companies from "../Landing Page/Companies";
import DreamJob from "../Landing Page/DreamJob";
import JobCategory from "../Landing Page/JobCategory";

const HomePage = () => {
    return(
        <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins']">
            <Header/>
            <DreamJob/>
            <Companies/>
            <JobCategory/>
        </div>
    )
};

export default HomePage
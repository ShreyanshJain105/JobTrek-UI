import Companies from "../Landing Page/Companies";
import DreamJob from "../Landing Page/DreamJob";
import JobCategory from "../Landing Page/JobCategory";
import Subscribe from "../Landing Page/Subscribe";
import Testimonials from "../Landing Page/Testimonials";
import Working from "../Landing Page/Working";

const HomePage = () => {
    return(
        <div className="min-h-screen bg-slate-50 dark:bg-mine-shaft-950 text-slate-900 dark:text-mine-shaft-100 font-sans transition-colors">
            <DreamJob/>
            <Companies/>
            <JobCategory/>
            <Working/>
            <Testimonials/>
            <Subscribe/>
        </div>
    )
};

export default HomePage
import { Carousel } from "@mantine/carousel";
import { jobcategory } from "../Data/Data";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

const JobCategory = () => {
    return (
        <div className="mt-20 pb-5">
            <div className="text-4xl font-semibold md-mx:text-3xl sm-mx:text-2xl xs-ms:text-xl mb-3 text-mine-shaft-100 text-center">
                Browse <span className="text-bright-sun-400">Jobs</span> Category
            </div>
            <div className="text-lg sm-mx:text-base xs-mx:text-sm mb-10 mx-auto text-mine-shaft-300 text-center w-1/2 bsm-mx:w-11/12">
                Explore diverse job opportunities tailored to your skills. Start your career journey today
            </div>
           <Carousel 
                className="focus-visible:[&_button]:!outline-none
                [&_button]:!bg-bright-sun-400 [&_button]:!border-none [&_button]:hover:opacity-75 [&_button]:opacity-0 hover:[&_button]:opacity-100"
                slideSize="22%" 
                slideGap="md" 
                emblaOptions={{
                loop: true,
                }}
                nextControlIcon={<IconArrowRight className="h-8 w-8"  />}
                previousControlIcon={<IconArrowLeft className="h-8 w-8" />}
            >
                {/* {jobcategory.map((category, index) => (
                    <Carousel.Slide >
                        <div className="flex flex-col items-center w-64 gap-2 border border-bright-sun-400
                       p-5 rounded-xl hover:cursor-pointer hover:shadow-[0_0_5px_2px_black] my-5 transition duration-300 ease-in-out00 !shadow-bright-sun-300">
                            <div className="p-2 bg-bright-sun-300 rounded-full">
                                <img 
                                    className="h-8 w-8" 
                                    src={`/Category/${category.name}.png`}
                                    alt={category.name}
                                />
                            </div>
                            <div className="text-mine-shaft-100 text-xl font-semibold">
                                {category.name}
                            </div>
                            <div className="text-sm text-center text-mine-shaft-300">
                                {category.description}
                            </div>
                            <div className="text-bright-sun-300 text-lg">
                                {category.jobCount}
                            </div>
                        </div>
                    </Carousel.Slide>
                ))} */}
                {jobcategory.map((category, index) => (
    <Carousel.Slide key={category.name || index}>   {/* ✅ Added key here */}
        <div className="flex flex-col items-center w-64 sm-mx:w-56 xs-mx:w-48 gap-2 border border-bright-sun-400
       p-5 rounded-xl hover:cursor-pointer hover:shadow-[0_0_5px_2px_black] my-5 transition duration-300 ease-in-out00 !shadow-bright-sun-300">
            <div className="p-2 bg-bright-sun-300 rounded-full">
                <img 
                    className="h-8 w-8 sm-mx:h-6 sm-mx:w-6 xs-mx:h-4 xs-mx:w-4" 
                    src={`/Category/${category.name}.png`}
                    alt={category.name}
                />
            </div>
            <div className="text-mine-shaft-100 text-xl sm-mx:text-lg xs-mx:text-base font-semibold">
                {category.name}
            </div>
            <div className="text-sm xs-mx:text-xs text-center text-mine-shaft-300">
                {category.description}
            </div>
            <div className="text-bright-sun-300 text-lg sm-mx:text-base xs-mx:text-sm">
                {category.jobCount}
            </div>
        </div>
    </Carousel.Slide>
))}

            </Carousel>
        </div> 
    );
};

export default JobCategory;
import { Link, useLocation } from "react-router-dom";

const NavLinks = () => {
    const links = [
        { name: "Find Jobs", url: "/find-jobs" },  
        { name: "Find Talent", url: "/find-talent" },
        { name: "Post Job", url: "/post-job" },
        { name: "Posted Job", url: "/posted-job" },
        { name: "Job History", url:"/job-history"},
        // { name: "SignUp", url:"/signup"}
    ];
    
    const location = useLocation();
    
    return (
        <div className="flex gap-5 text-mine-shaft-300 h-full items-center">
            {links.map((link, index) => {
                // Check if current path exactly matches or starts with the link URL
                const isActive = location.pathname === link.url || 
                                location.pathname.startsWith(`${link.url}/`);
                
                return (
                    <div 
                        key={index}
                        className={`${
                            isActive
                                ? "border-bright-sun-400 text-bright-sun-400"
                                : "border-transparent"
                        } border-t-[3px] h-full flex items-center px-3`}
                    >
                        <Link to={link.url}>{link.name}</Link>
                    </div>
                );
            })}
        </div>
    );
};

export default NavLinks;
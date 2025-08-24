import { Link, useLocation } from "react-router-dom";

const NavLinks = () => {
  const links = [
    { name: "Find Jobs", url: "/find-jobs" },
    { name: "Find Talent", url: "/find-talent" },
    { name: "Post Job", url: "/post-job/0" },
    // Use plural + leading slash, and add a match base
    { name: "Posted Jobs", url: "/posted-jobs/0", match: "/posted-jobs" },
    { name: "Job History", url: "/job-history" },
  ];

  const location = useLocation();

  return (
    <div className="flex bs-mx:!hidden gap-5 text-mine-shaft-300 h-full items-center">
      {links.map((link, index) => {
        const matchBase = (link as any).match || link.url;
        const isActive =
          location.pathname === link.url ||
          location.pathname === matchBase ||
          location.pathname.startsWith(`${matchBase}/`);

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

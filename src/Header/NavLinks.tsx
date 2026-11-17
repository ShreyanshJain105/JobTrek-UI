import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const NavLinks = () => {
  const user = useSelector((state: any) => state.user);
  const location = useLocation();

  const isApplicant = user?.accountType === "APPLICANT";
  const isSuperadmin = user?.accountType === "SUPERADMIN";

  const allLinks = [
    { name: "Find Jobs", url: "/find-jobs" },
    { name: "Find Talent", url: "/find-talent" },
    { name: "Post Job", url: "/post-job/0", employerOnly: true },
    { name: "Posted Jobs", url: "/posted-jobs/0", match: "/posted-jobs", employerOnly: true },
    { name: "Job History", url: "/job-history" },
    { name: "Admin Console", url: "/admin", superadminOnly: true },
  ];

  // Dynamically filter links based on user role
  const links = allLinks.filter((link) => {
    if (link.superadminOnly && !isSuperadmin) {
      return false;
    }
    if (isApplicant && link.employerOnly) {
      return false;
    }
    return true;
  });

  return (
    <nav className="flex bs-mx:!hidden gap-1.5 text-sm font-medium items-center">
      {links.map((link, index) => {
        const matchBase = (link as any).match || link.url;
        const isActive =
          location.pathname === link.url ||
          location.pathname === matchBase ||
          location.pathname.startsWith(`${matchBase}/`);

        return (
          <Link
            key={index}
            to={link.url}
            className={`relative px-3.5 py-1.5 rounded-full transition-all duration-200 flex items-center gap-1.5 ${
              isActive
                ? "bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/25 shadow-glow-sm"
                : "text-slate-400 hover:text-slate-100 hover:bg-white/[0.04] border border-transparent"
            }`}
          >
            {isActive && (
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] animate-pulse" />
            )}
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default NavLinks;
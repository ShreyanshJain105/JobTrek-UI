import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
  IconRouteSquare,
} from "@tabler/icons-react";
import { footerLinks } from "../Data/Data";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  return location.pathname !== "/signup" && location.pathname !== "/login" ? (
    <div className="pt-20 pb-5 bg-mine-shaft-950 font-['poppins']">
      <div className="flex flex-wrap gap-8 lg:gap-12 ">
        {/* Brand Section */}
        <div className="w-full lg:w-1/4 flex flex-col gap-4">
          <div className="flex gap-1 items-center text-bright-sun-400">
            <IconRouteSquare className="h-6 w-6" stroke={2.5} />
            <div className="text-xl font-semibold">JobTrek</div>
          </div>
          <div className="text-sm text-mine-shaft-300">
            A comprehensive career platform featuring dynamic user profiles,
            skills management, professional certifications tracking, and
            streamlined job posting administration.
          </div>
          <div className="flex gap-3 text-bright-sun-400">
            {[
              { icon: IconBrandFacebook, label: "Facebook", href: "#" },
              {
                icon: IconBrandX,
                label: "Twitter",
                href: "https://x.com/ShreyanshShah06",
              },
              {
                icon: IconBrandInstagram,
                label: "Instagram",
                href: "https://www.instagram.com/shreyanshshah.12/",
              },
              {
                icon: IconBrandLinkedin,
                label: "LinkedIn",
                href: "https://www.linkedin.com/in/shreyanshjain1206/",
              },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-mine-shaft-900 p-2 rounded-full cursor-pointer hover:bg-mine-shaft-700 transition-colors duration-200"
                title={label}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Footer Links */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {footerLinks.map((item, index) => (
            <div key={index} className="flex flex-col space-y-3">
              <div className="font-semibold text-white text-base mb-2">
                {item.title}
              </div>
              {item.links.map((link, linkIndex) => (
                <div
                  key={linkIndex}
                  className="text-mine-shaft-300 text-sm hover:text-bright-sun-400 cursor-pointer transition-colors duration-200 hover:translate-x-2 ease-in-out"
                >
                  {link}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-12 pt-8 border-t border-mine-shaft-800">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-mine-shaft-400">
          <div className="px-2">
            © 2025 JobTrek. All rights reserved. | Developed by{" "}
            <span className="text-bright-sun-400 font-medium">
              Shreyansh Jain
            </span>
          </div>
          <div className="flex gap-6 px-5">
            <span className="hover:text-bright-sun-400 cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="hover:text-bright-sun-400 cursor-pointer transition-colors">
              Terms of Service
            </span>
            <span className="hover:text-bright-sun-400 cursor-pointer transition-colors">
              Cookie Policy
            </span>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Footer;

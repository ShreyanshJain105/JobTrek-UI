import { Avatar, Burger, Button, Drawer, Indicator } from "@mantine/core";
import {
  IconRouteSquare,
  IconBellFilled,
  IconSettings,
  IconXboxX,
  IconX,
} from "@tabler/icons-react";
import NavLinks from "./NavLinks";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfile } from "../Services/ProfileService";
import { setProfile } from "../Slices/ProfileSlice";
import NotificationMenu from "./NotificationMenu";
import { setUser } from "../Slices/UserSlice";
import { jwtDecode } from "jwt-decode";
import { setupResponseInterceptor } from "../Interceptor/AxiosInterceptor";
import { useDisclosure } from "@mantine/hooks";

const links = [
  { name: "Find Jobs", url: "/find-jobs" },
  { name: "Find Talent", url: "/find-talent" },
  { name: "Post Job", url: "/post-job/0" },
  { name: "Posted Jobs", url: "/posted-jobs/0", match: "/posted-jobs" },
  { name: "Job History", url: "/job-history" },
];

const Header = () => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const token = useSelector((state: any) => state.jwt);
  const navigate = useNavigate();

  // Setup axios interceptor
  useEffect(() => {
    setupResponseInterceptor(navigate);
  }, [navigate]);

  // Decode token and set user
  useEffect(() => {
    if (token) {
      const decoded: any = jwtDecode(token);
      dispatch(setUser({ ...decoded, email: decoded.sub }));
    }
  }, [token, navigate, dispatch]);

  // Fetch profile when user changes
  useEffect(() => {
    if (user?.profileId) {
      getProfile(user.profileId)
        .then((res) => {
          dispatch(setProfile(res));
        })
        .catch((error: any) => {
          console.error("Error fetching profile:", error);
        });
    }
  }, [user, dispatch]);

  // Hide header on signup/login
  if (location.pathname === "/signup" || location.pathname === "/login") {
    return null;
  }

  return (
    <div className="w-full bg-mine-shaft-950 text-white h-20 px-6 flex justify-between items-center">
      {/* Logo */}
      <div className="flex gap-1 items-center text-bright-sun-400">
        <IconRouteSquare className="h-8 w-8" stroke={2.5} />
        <div className="xs-mx:hidden text-3xl font-semibold">JobTrek</div>
      </div>

      {/* Desktop Nav */}
      {NavLinks()}

      {/* Login/Profile */}
      {user ? (
        <ProfileMenu />
      ) : (
        <Link to="/login">
          <Button variant="subtle" color="brightSun.4">
            Login
          </Button>
        </Link>
      )}

      {/* Notifications */}
      {user && <NotificationMenu />}

      {/* Mobile Burger + Drawer */}
      <Burger className="bs:hidden"  opened={opened} onClick={toggle} aria-label="Toggle navigation" />
      <Drawer
        position="right"
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
        opened={opened}
        size="xs"
        onClose={close}
        closeButtonProps={{ icon: <IconX size={30} stroke={1.5} /> }}
      >
        <div className="flex flex-col gap-6 items-center ">

       
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
      </Drawer>
    </div>
  );
};

export default Header;

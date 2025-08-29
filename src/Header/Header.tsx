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
  { name: "Home", url: "/" },
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
  const profile = useSelector((state: any) => state.profile);
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
    <div className="w-full bg-mine-shaft-950 text-white h-16 sm:h-20 px-3 sm:px-4 lg:px-6 flex justify-between items-center relative">
      {/* Logo */}
      <div className="flex gap-1 items-center text-bright-sun-400 flex-shrink-0">
        <IconRouteSquare className="h-6 w-6 sm:h-8 sm:w-8" stroke={2.5} />
        <div className="hidden xs:block sm:block text-xl sm:text-2xl lg:text-3xl font-semibold">
          JobTrek
        </div>
      </div>

      {/* Desktop Nav - Hidden on mobile and tablet */}
      <div className="hidden lg:flex flex-1 justify-center">
        {NavLinks()}
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        {/* Profile with Name - Always visible when user is logged in */}
        {user && (
          <div className="flex items-center gap-2">
            {/* Show name only on larger screens */}
            <div className="hidden lg:block text-sm text-mine-shaft-200">
              <span className="text-bright-sun-400 font-semibold">
                {profile?.name || user?.name || 'User'}
              </span>
            </div>
            <ProfileMenu />
          </div>
        )}

        {/* Notifications - Always visible when user is logged in */}
        {user && <NotificationMenu />}

        {/* Login Button - Always visible when user is not logged in */}
        {!user && (
          <Link to="/login">
            <Button 
              variant="subtle" 
              color="brightSun.4"
              size="xs"
              className="text-xs px-2 sm:px-3 sm:text-sm"
            >
              Login
            </Button>
          </Link>
        )}

        {/* Mobile Burger - Show on mobile and tablet */}
        <Burger 
          className="lg:hidden text-white"
          size="sm"
          opened={opened} 
          onClick={toggle} 
          aria-label="Toggle navigation"
          styles={{
            burger: {
              color: 'white',
            }
          }}
        />
      </div>

      {/* Mobile/Tablet Drawer */}
      <Drawer
        position="right"
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
        opened={opened}
        size="xs"
        onClose={close}
        closeButtonProps={{ 
          icon: <IconX size={24} stroke={1.5} />,
          className: "text-bright-sun-400 hover:bg-mine-shaft-800"
        }}
        styles={{
          content: { backgroundColor: 'var(--mantine-color-mine-shaft-950)' },
          header: { backgroundColor: 'var(--mantine-color-mine-shaft-950)', borderBottom: '1px solid var(--mantine-color-mine-shaft-800)' }
        }}
      >
        <div className="flex flex-col gap-4 p-4">
          {/* Mobile Navigation Links */}
          <div className="flex flex-col gap-3">
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
                  onClick={close}
                  className={`${
                    isActive
                      ? "text-bright-sun-400 bg-mine-shaft-800"
                      : "text-white hover:text-bright-sun-400 hover:bg-mine-shaft-900"
                  } px-4 py-3 rounded-lg transition-colors duration-200 font-medium`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile Login Button */}
          {!user && (
            <div className="pt-4 border-t border-mine-shaft-800">
              <Link to="/login" onClick={close}>
                <Button 
                  variant="filled" 
                  color="brightSun.4"
                  fullWidth
                  size="md"
                >
                  Login
                </Button>
              </Link>
            </div>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default Header;
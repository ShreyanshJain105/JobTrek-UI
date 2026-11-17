import { Button, Burger, Drawer } from "@mantine/core";
import {
  IconRouteSquare,
  IconX,
  IconSparkles,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import ProfileMenu from "./ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../Services/ProfileService";
import { setProfile } from "../Slices/ProfileSlice";
import { setUser } from "../Slices/UserSlice";
import { jwtDecode } from "jwt-decode";
import { setupResponseInterceptor } from "../Interceptor/AxiosInterceptor";
import NotificationMenu from "./NotificationMenu";
import NavLinks from "./NavLinks";
import ThemeSwitcher from "./ThemeSwitcher";
import { Link, useLocation, useNavigate } from "react-router-dom";

const allDrawerLinks = [
  { name: "Find Jobs", url: "/find-jobs" },
  { name: "Find Talent", url: "/find-talent" },
  { name: "Post Job", url: "/post-job/0", employerOnly: true },
  { name: "Posted Jobs", url: "/posted-jobs/0", match: "/posted-jobs", employerOnly: true },
  { name: "Job History", url: "/job-history" },
  { name: "Admin Console", url: "/admin", superadminOnly: true },
];

const Header = () => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const profile = useSelector((state: any) => state.profile);
  const token = useSelector((state: any) => state.jwt);
  const navigate = useNavigate();

  const isApplicant = user?.accountType === "APPLICANT";
  const isSuperadmin = user?.accountType === "SUPERADMIN";

  // Filter drawer links for applicants and superadmins
  const links = allDrawerLinks.filter((link) => {
    if (link.superadminOnly && !isSuperadmin) {
      return false;
    }
    if (isApplicant && link.employerOnly) {
      return false;
    }
    return true;
  });

  useEffect(() => {
    setupResponseInterceptor(navigate);
  }, [navigate]);

  useEffect(() => {
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        if (!user || user.id !== decoded.id) {
          dispatch(setUser({ ...decoded, email: decoded.sub }));
        }
      } catch (e) {
        console.error("Token decode error:", e);
      }
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (user?.profileId && profile?.id !== user.profileId) {
      getProfile(user.profileId)
        .then((res) => {
          dispatch(setProfile(res));
        })
        .catch((error: any) => {
          console.error("Error fetching profile:", error);
        });
    }
  }, [user?.profileId, profile?.id, dispatch]);

  if (location.pathname === "/signup" || location.pathname === "/login") {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-mine-shaft-950/85 backdrop-blur-xl border-b border-white/[0.06] transition-all">
      <div className="max-w-7xl mx-auto h-16 sm:h-20 px-4 sm:px-6 flex justify-between items-center gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 p-[1px] shadow-glow-sm transition-transform group-hover:scale-105 duration-200">
            <div className="w-full h-full bg-[#090d16] rounded-[11px] flex items-center justify-center">
              <IconRouteSquare className="h-5 w-5 text-amber-400 group-hover:rotate-6 transition-transform" stroke={2.2} />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white flex items-center gap-0.5">
              Job<span className="text-amber-400">Trek</span>
            </span>
            <span className="text-[10px] text-amber-400/80 -mt-1 font-mono tracking-wider hidden sm:block">
              ENTERPRISE CAREERS
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center justify-center">
          <NavLinks />
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
          {/* Appearance / Theme Switcher */}
          <ThemeSwitcher />

          {user && (
            <div className="flex items-center gap-2 sm:gap-3">
              <NotificationMenu />
              <ProfileMenu />
            </div>
          )}

          {!user && (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button 
                  variant="subtle" 
                  color="gray"
                  size="sm"
                  className="text-slate-300 hover:text-white hover:bg-white/5 font-medium rounded-lg text-xs sm:text-sm px-3"
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button 
                  variant="filled" 
                  color="brightSun"
                  size="sm"
                  leftSection={<IconSparkles size={14} />}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-lg text-xs sm:text-sm px-3.5 shadow-glow-sm transition-all"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Burger */}
          <Burger 
            className="lg:hidden text-white"
            size="sm"
            opened={opened} 
            onClick={toggle} 
            aria-label="Toggle navigation"
            color="#fbbf24"
          />
        </div>
      </div>

      {/* Mobile/Tablet Drawer */}
      <Drawer
        position="right"
        overlayProps={{ backgroundOpacity: 0.6, blur: 8 }}
        opened={opened}
        size="xs"
        onClose={close}
        closeButtonProps={{ 
          icon: <IconX size={20} stroke={2} />,
          className: "text-amber-400 hover:bg-white/10 rounded-lg"
        }}
        styles={{
          content: { backgroundColor: '#090d16', borderLeft: '1px solid rgba(255,255,255,0.08)' },
          header: { backgroundColor: '#090d16', borderBottom: '1px solid rgba(255,255,255,0.06)' }
        }}
        title={
          <div className="flex items-center gap-2">
            <IconRouteSquare className="h-5 w-5 text-amber-400" />
            <span className="font-bold text-white font-display text-lg">Menu</span>
          </div>
        }
      >
        <div className="flex flex-col gap-5 p-2">
          {/* Mobile Navigation Links */}
          <nav className="flex flex-col gap-1.5">
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
                  className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
                    isActive
                      ? "text-amber-400 bg-amber-500/10 border border-amber-500/25"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Auth Button */}
          {!user && (
            <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
              <Link to="/login" onClick={close}>
                <Button 
                  variant="subtle" 
                  color="gray"
                  fullWidth
                  size="md"
                  className="text-slate-300 hover:text-white"
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/signup" onClick={close}>
                <Button 
                  variant="filled" 
                  color="brightSun"
                  fullWidth
                  size="md"
                  leftSection={<IconSparkles size={16} />}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold shadow-glow-sm"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </Drawer>
    </header>
  );
};

export default Header;
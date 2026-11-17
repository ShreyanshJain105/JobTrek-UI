import {
    Avatar,
    FileInput,
} from "@mantine/core";
import { IconCamera } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import Info from "./Info";
import { changeProfile } from "../Slices/ProfileSlice";
import About from "./About";
import Skills from "./Skills";
import Experience from "./Experience";
import Certificate from "./Certificate";
import { useHover } from "@mantine/hooks";
import { successNotification } from "../Services/NotificationService";
import { getBase64 } from "../Services/Utilities";

const Profile = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.profile);
    const { hovered, ref } = useHover();

    const handleFileChange = async (image: any) => {
        if (!image) return;
        let picture: any = await getBase64(image);
        let updateProfile = { ...profile, picture: picture.split(",")[1] };
        dispatch(changeProfile(updateProfile));
        successNotification("Success", "Profile picture updated successfully");
    };

    return (
        <div className="max-w-5xl mx-auto flex flex-col gap-8 pb-16">
            {/* Profile Hero Card */}
            <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                <div className="h-44 sm:h-56 w-full relative bg-gradient-to-r from-amber-500/20 via-slate-800 to-amber-900/30 overflow-hidden">
                    <img
                        className="w-full h-full object-cover opacity-40 mix-blend-overlay"
                        src="/Profile/banner.jpg"
                        alt="Profile Banner"
                        onError={(e: any) => {
                            e.target.style.display = 'none';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                </div>

                <div className="px-6 sm:px-10 pb-8 relative">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 -mt-16 sm:-mt-20 mb-6">
                        <div className="relative" ref={ref}>
                            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl p-1 bg-gradient-to-tr from-amber-400 to-amber-600 shadow-2xl relative group cursor-pointer overflow-hidden">
                                <Avatar
                                    size="100%"
                                    radius="lg"
                                    className="w-full h-full object-cover rounded-[22px] bg-slate-900"
                                    src={
                                        profile.picture
                                            ? `data:image/jpeg;base64,${profile.picture}`
                                            : "/Avatar.png"
                                    }
                                    alt="Profile"
                                />

                                {hovered && (
                                    <div className="absolute inset-0 rounded-[22px] bg-slate-950/75 flex flex-col items-center justify-center text-amber-400 gap-1 backdrop-blur-xs transition-opacity z-10">
                                        <IconCamera size={24} />
                                        <span className="text-[10px] font-bold uppercase tracking-wider">Change</span>
                                    </div>
                                )}

                                <FileInput
                                    onChange={handleFileChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer z-20 w-full h-full"
                                    accept="image/png,image/jpeg"
                                    title="Click to update profile photo"
                                />
                            </div>
                            <span className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-950 shadow-sm" />
                        </div>
                    </div>

                    <Info />
                </div>
            </div>

            {/* About Card */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 backdrop-blur-xl shadow-xl">
                <About />
            </div>

            {/* Skills Card */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 backdrop-blur-xl shadow-xl">
                <Skills />
            </div>

            {/* Experience Card */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 backdrop-blur-xl shadow-xl">
                <Experience />
            </div>

            {/* Certifications Card */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 backdrop-blur-xl shadow-xl">
                <Certificate />
            </div>
        </div>
    );
};

export default Profile;

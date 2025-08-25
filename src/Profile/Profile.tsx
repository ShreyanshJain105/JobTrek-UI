import {
  ActionIcon,
  Avatar,
  Button,
  Divider,
  FileInput,
  Overlay,
  TagsInput,
  Textarea,
} from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../Services/ProfileService";
import Info from "./Info";
import { changeProfile, setProfile } from "../Slices/ProfileSlice";
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
    let picture: any = await getBase64(image);
    let updateProfile = { ...profile, picture: picture.split(",")[1] };
    dispatch(changeProfile(updateProfile));
    successNotification("Success", "Profile Picture updated successfully");
  };

  return (
    <div className="w-4/5 lg-mx:w-full mx-auto">
      <div className="relative px-5 ">
        <img
          className="rounded-t-2xl xs-mx:h-32"
          src="/Profile/banner.jpg"
          alt=""
        />
        <div
          ref={ref}
          className="absolute flex items-center justify-center -bottom-1/3   md-mx:bottom-10 sm-mx:bottom-16 left-3"
        >
          <Avatar
            className="!w-48 !h-48 md-mx:!w-40 md-mx:!h-40 left-6  border-mine-shaft-950 border-8 rounded-full sm-mx:!w-36 sm-mx:!h-36
                    xs-mx:!w-32 xs-mx:!w-32"
            src={
              profile.picture
                ? `data:image/jpeg;base64,${profile.picture}`
                : "/Avatar.png"
            }
            alt=""
          />
          {hovered && (
            <Overlay
              className="!rounded-full"
              color="#000"
              backgroundOpacity={0.75}
            />
          )}
          {hovered && <IconEdit className="absolute z-[300] !w-16 !h-16" />}

          {hovered && (
            <FileInput
              onChange={handleFileChange}
              className="absolute z-[301] [&_*]:!rounded-full 
                [&_*]:!h-full !h-full w-full  "
              variant="transparent"
              accept="image/png,image/jpeg"
            />
          )}
        </div>
      </div>
      <div className="px-3 mt-20 ">
        <Info />
        <Divider mx="xs" my="xl" />

        <About />
      </div>
      <Divider mx="xs" my="xl" />
      <Skills />

      <Divider mx="xs" my="xl" />

      <Experience />

      <Divider mx="xs" my="xl" />
      <Certificate />
    </div>
  );
};

export default Profile;

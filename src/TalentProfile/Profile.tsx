import { Button, Divider } from "@mantine/core";
import {
  IconBriefcase,
  IconBuildingSkyscraper,
  IconMapPin,
} from "@tabler/icons-react";
import ExperinceCard from "./ExperinceCard";
import CertifyCard from "./CertifyCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfile } from "../Services/ProfileService";
import { useMediaQuery } from "@mantine/hooks";

const Profile = (props: any) => {
  const { id } = useParams<{ id: string }>(); // get only the id string
  const matches = useMediaQuery('(max-width:475px)');
  const [profile, setProfile] = useState<any>({});
  useEffect(() => {
    if (id) {
      getProfile(id) // now sends .../get/1 instead of .../get/[object Object]
        .then((res) => {
          console.log("Fetched profile:", res);
          setProfile(res);
        })
        .catch((err) => {
          console.error("Error fetching profile:", err);
        });
    }
  }, [id]);

  return (
    <div className="w-2/3 lg-mx:w-full">
      <div className="relative">
        <img className="rounded-t-2xl h-32 xl-mx:h-40" src="/Profile/banner.jpg" alt="" />
        <img
          className="rounded-full w-48 h-48 -bottom-1/3 absolute left-3 border-mine-shaft-950 border-8
 md-mx:!w-40 md-mx:!h-40 sm-mx:!w-36 sm-mx:!h-36 xs-mx:!w-32 xs-mx:!w-32"
          src={
            profile.picture
              ? `data:image/jpeg;base64,${profile.picture}`
              : "/Avatar.png"
          }
          alt=""
        />
      </div>
      <div className="px-3 mt-16 ">
        <div className="text-3xl font-semibold flex justify-between xs-mx:text-2xl">
          {profile?.name}
          <Button size={matches?"sm":"md"} color="brightSun.4" variant="light">
            Message
          </Button>
        </div>
        <div className="text-xl flex flex gap-1 items-center xs-mx:text-base">
          <IconBriefcase className="h-5 w-5 " stroke={1.5} />
          {profile?.jobTitle} &bull; {profile?.company}
        </div>
        <div className=" flex gap-1 text-lg test-mine-shaft-300 items-center xs-mx:text-base">
          <IconMapPin className="h-5 w-5 " stroke={1.5} />
          {profile?.location}
        </div>
        <div className=" flex gap-1 text-lg test-mine-shaft-300 items-center xs-mx:text-base">
          <IconBuildingSkyscraper className="h-5 w-5 " stroke={1.5} />
          Experience: {profile?.totalExp} Yers
        </div>
      </div>
      <Divider mx="xs" my="xl" />
      <div className="px-3">
        <div className="text-2xl font-semibold mb-3">About</div>
        <div className="text-sm  text-mine-shaft-300 text-justify">
          {profile?.about}
        </div>
      </div>
      <Divider mx="xs" my="xl" />
      <div className="px-3">
        <div className="text-2xl font-semibold mb-3">Skills</div>
        <div className="flex flex-wrap gap-2">
          {profile?.skills?.map((skill: any, index: any) => (
            <div
              key={index}
              className="bg-bright-sun-300 text-sm font-medium bg-opacity-15 rounded-3xl text-bright-sun-400 px-4 py-1"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
      <Divider mx="xs" my="xl" />
      <div className="px-3 ">
        <div className="text-2xl font-semibold mb-5">Experience</div>
        <div className="flex flex-col gap-8">
          {profile?.experiences?.map((exp: any, index: any) => (
            <ExperinceCard key={index} {...exp} />
          ))}
        </div>
      </div>
      <Divider mx="xs" my="xl" />
      <div className="px-3">
        <div className="text-2xl font-semibold mb-5">certifications</div>
        <div className="flex flex-col gap-8">
          {profile?.certifications?.map((certi: any, index: any) => (
            <CertifyCard key={index} {...certi} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;

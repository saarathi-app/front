import { Metadata } from "next";

import ComingSoon from "./components/coming-soon/coming-soon";
import MentorProfile from "./components/mentorprofile/mentorprofile";

import MenteeProfile from "./components/menteeprofile/menteeprofile";

import Homepage from "./components/home/homepage";
import MentorRegistration from "./components/mentorprofile/mentorregistration";
import MenteeRegistration from "./components/menteeprofile/menteeregistration";

export const metadata: Metadata = {
  title: "Saarathi Nepal",
  description:
    "Connect with expert mentors and accelerate your growth with Saarathi.",
};

export default function Home() {
  // return <Homepage/>
  // return <ComingSoon />;
  // return <MentorProfile/>;
  return <MenteeProfile/>
  // return <MentorRegistration/>
  // return <MenteeRegistration/>
}

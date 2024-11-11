import { Metadata } from 'next';
import ComingSoon from "./components/coming-soon/coming-soon";
import MentorProfile from './components/mentorprofile/mentorprofile';
import Homepage from './components/home/homepage';
import MenteeProfile from './components/menteeprofile/menteeprofile';

export const metadata: Metadata = {
  title: "Saarathi Nepal",
  description: "Saarathi is launching soon. Join our waitlist for expert mentorship and career guidance.",
};

export default function Home() {
  // return <Homepage/>
  // return <ComingSoon />;
  // return <MentorProfile/>;
  return <MenteeProfile/>
}

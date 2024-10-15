import { Metadata } from 'next';
import ComingSoon from "./components/coming-soon/coming-soon";

export const metadata: Metadata = {
  title: "Coming Soon - Saarathi",
  description: "Saarathi is launching soon. Join our waitlist for expert mentorship and career guidance.",
};

export default function Home() {
  return <ComingSoon />;
}

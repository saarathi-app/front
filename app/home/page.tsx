import { Metadata } from 'next';
import Homepage from "../components/home/homepage";

export const metadata: Metadata = {
  title: "Saarathi - Home",
  description: "Connect with expert mentors and accelerate your growth with Saarathi.",
};

export default function HomeRoute() {
  return <Homepage />;
} 
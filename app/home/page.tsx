import { Metadata } from "next";
import Homepage from "../components/home/homepage";

export const metadata: Metadata = {
  title: "Saarathi Nepal",
  description:
    "Saarathi is launching soon. Join our waitlist for expert mentorship and career guidance.",
};

export default function Home() {
  return <Homepage />;
}

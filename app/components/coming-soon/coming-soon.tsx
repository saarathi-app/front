"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  CalendarDaysIcon,
  RocketIcon,
  BrainIcon,
  TrendingUpIcon,
  StarIcon,
  GlobeIcon,
  UsersIcon,
} from "lucide-react";
import { LightningBoltIcon } from "@radix-ui/react-icons";

export default function ComingSoon() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    d: 100,
    hr: 0,
    min: 0,
    sec: 0,
  });

  // Scroll progress calculation
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Countdown timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (
          prevTime.d === 0 &&
          prevTime.hr === 0 &&
          prevTime.min === 0 &&
          prevTime.sec === 0
        ) {
          clearInterval(timer);
          return prevTime;
        }
        const newTime = { ...prevTime };
        if (newTime.sec > 0) {
          newTime.sec--;
        } else if (newTime.min > 0) {
          newTime.min--;
          newTime.sec = 59;
        } else if (newTime.hr > 0) {
          newTime.hr--;
          newTime.min = 59;
          newTime.sec = 59;
        } else if (newTime.d > 0) {
          newTime.d--;
          newTime.hr = 23;
          newTime.min = 59;
          newTime.sec = 59;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Progress
        value={scrollProgress}
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
      />

      {/* Hero Section */}
      <motion.section
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 py-12 bg-gradient-to-br from-blue-50 to-purple-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <RocketIcon
            className="w-16 h-16 md:w-24 md:h-24 mb-6 text-blue-500"
            aria-hidden="true"
          />
        </motion.div>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
          Saarathi : Mentoring Nepal
        </h1>
        <p className="text-base md:text-lg lg:text-2xl mb-10 text-gray-600 max-w-2xl">
          Nepal's first mentorship platform for career guidance & academic and
          skill development. Stay tuned!
        </p>
        <Button
          variant="default"
          className="px-6 py-3 md:px-10 md:py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-base md:text-lg rounded-full transition-all duration-300 hover:from-blue-600 hover:to-purple-600"
        >
          Notify Me When We Launch
        </Button>
      </motion.section>

      {/* Countdown Timer Section */}
      <section
        className="py-12 md:py-16 px-4 bg-white"
        aria-label="Countdown Timer"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-gray-800">
            Launching in
          </h2>
          <div className="flex justify-center flex-wrap gap-4 text-2xl md:text-4xl font-bold">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <motion.div
                key={unit}
                className="bg-gradient-to-br from-blue-500 to-purple-500 text-white p-3 md:p-4 rounded-lg shadow-md"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
              >
                <div className="text-xl md:text-3xl">{value}</div>
                <div className="text-xs md:text-sm">{unit}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section
        className="py-12 md:py-16 px-4 bg-gray-50"
        aria-label="About Saarathi"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            About Saarathi
          </h2>
          <p className="text-base md:text-lg leading-relaxed mb-8 text-gray-600">
            Saarathi is a platform designed to connect individuals seeking
            mentorship with experienced professionals across various fields. We
            aim to empower people with the right guidance, whether they&apos;re
            looking to advance their careers, master new skills, or navigate
            complex life challenges.
          </p>
        </div>
      </section>

      {/* How We're Solving Problems Section */}
      <section
        className="py-12 md:py-16 px-4 bg-white"
        aria-label="Our Solutions"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            How We&apos;re Solving Problems
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: CalendarDaysIcon,
                title: "Flexible Scheduling",
                description:
                  "We offer flexible mentorship sessions that fit your schedule.",
                color: "text-blue-500",
              },
              {
                icon: LightningBoltIcon,
                title: "Expert Insights",
                description:
                  "Our platform brings together top industry professionals ready to share their expertise.",
                color: "text-purple-500",
              },
              {
                icon: BrainIcon,
                title: "Actionable Advice",
                description:
                  "Get practical, hands-on advice that leads to real change in your life.",
                color: "text-pink-500",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full text-center hover:shadow-lg transition-all duration-300 border-t-4 border-t-blue-500">
                  <item.icon
                    className={`w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 ${item.color}`}
                  />
                  <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600">
                    {item.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How You'll Benefit Section */}
      <section
        className="py-12 md:py-16 px-4 bg-gradient-to-br from-blue-50 to-purple-50"
        aria-label="Benefits"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            How You&apos;ll Benefit
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: UsersIcon,
                title: "Personalized Mentorship",
                description:
                  "Our mentors offer advice tailored to your individual goals.",
                color: "text-blue-500",
              },
              {
                icon: TrendingUpIcon,
                title: "Actionable Feedback",
                description:
                  "Get feedback that helps you implement strategies and see real progress.",
                color: "text-green-500",
              },
              {
                icon: GlobeIcon,
                title: "Access to a Network",
                description:
                  "Gain access to your mentor's network, opening doors to new opportunities.",
                color: "text-purple-500",
              },
              {
                icon: StarIcon,
                title: "Continuous Learning",
                description:
                  "Stay updated with the latest trends and best practices in your field.",
                color: "text-yellow-500",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 md:p-8 h-full text-center hover:shadow-lg transition-all duration-300">
                  <item.icon
                    className={`w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 ${item.color}`}
                  />
                  <h3 className="text-lg md:text-2xl font-semibold mb-4 text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600">
                    {item.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 md:py-12 text-center bg-gray-100 text-gray-600">
        <div className="flex justify-center items-center mb-4">
          <Image
            src="/logo.png"
            alt="Saarathi Logo"
            width={40}
            height={40}
            className="md:w-[50px] md:h-[50px]"
            priority
          />
        </div>
        <p>&copy; {new Date().getFullYear()} Saarathi. All rights reserved.</p>
        <div className="mt-4 space-x-4">
          <a
            href="/terms"
            className="text-sm md:text-base text-blue-500 hover:text-blue-600 transition-colors"
          >
            Terms & Conditions
          </a>
          <a
            href="/privacy"
            className="text-sm md:text-base text-blue-500 hover:text-blue-600 transition-colors"
          >
            Privacy Policy
          </a>
        </div>
      </footer>
    </div>
  );
}

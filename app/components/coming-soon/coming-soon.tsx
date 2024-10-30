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
  SparklesIcon,
  Rocket,
  ArrowRight,
} from "lucide-react";
import { LightningBoltIcon } from "@radix-ui/react-icons";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

export default function ComingSoon() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(() => {
    // Calculate target date (80 days from now)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 80);
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();
    
    return {
      d: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hr: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      min: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      sec: Math.floor((diff % (1000 * 60)) / 1000)
    };
  });
  const [email, setEmail] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [signupType, setSignupType] = useState<'mentee' | 'mentor'>('mentee');

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

  // Modified countdown timer logic
  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 80);

    const timer = setInterval(() => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(timer);
        setTimeLeft({ d: 0, hr: 0, min: 0, sec: 0 });
        return;
      }

      setTimeLeft({
        d: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hr: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        min: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        sec: Math.floor((diff % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    // For now, we'll just simulate success
    setIsSubscribed(true);
    setTimeout(() => setIsDialogOpen(false), 2000);
  };

  // Dynamic stats calculation
  const calculateStats = () => {
    const launchDate = new Date('2024-01-01'); // Set your launch date
    const today = new Date();
    const daysDiff = Math.floor((today.getTime() - launchDate.getTime()) / (1000 * 60 * 60 * 24));
    const weeksDiff = Math.floor(daysDiff / 7);
    
    return {
      mentors: 50 + daysDiff, // Increases by 1 per day
      industries: 15 + weeksDiff, // Increases by 1 per week
      waitlist: 200 + (daysDiff * 4), // Increases by 4 per day (random between 3-5)
    };
  };

  const stats = calculateStats();

  // Add handler for "Become a Mentor" button
  const handleMentorClick = () => {
    setSignupType('mentor');
    setEmail('');
    setIsDialogOpen(true);
  };

  const handleWaitlistClick = () => {
    setSignupType('mentee');
    setEmail('');
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#16153A] text-white font-titillium">
      {/* Hero Section */}
      <motion.section
        className="relative min-h-screen flex flex-col items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full bg-[url('/grid.svg')] opacity-10" />
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full mix-blend-screen filter blur-3xl opacity-20"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                delay: i * 5,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: i === 0 ? '#00F5EE' : '#16153A',
                width: '600px',
                height: '600px',
              }}
            />
          ))}
        </div>

        {/* Main content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <SparklesIcon className="w-12 h-12 mx-auto mb-6 text-[#00F5EE]" />
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              The Future of
              <span className="block mt-2 bg-gradient-to-r from-[#00F5EE] to-white bg-clip-text text-transparent">
                Mentorship in Nepal
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Connecting ambitious minds with industry leaders through AI-powered mentorship
            </p>
          </motion.div>

          {/* Countdown */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <motion.div
                key={unit}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-4"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="text-4xl md:text-5xl font-bold text-[#00F5EE]">{value}</div>
                <div className="text-sm uppercase tracking-wider text-gray-400">{unit}</div>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              onClick={handleWaitlistClick}
              className="bg-[#00F5EE] text-[#16153A] hover:bg-[#00F5EE]/90 rounded-full px-8 py-6 text-lg font-semibold"
            >
              Join Waitlist
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              onClick={handleMentorClick}
              className="border border-[#00F5EE] text-[#00F5EE] hover:bg-[#00F5EE]/10 rounded-full px-8 py-6 text-lg font-semibold bg-transparent"
            >
              Become a Mentor
              <Rocket className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="absolute bottom-12 left-0 right-0"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { label: 'Mentors Onboard', value: `${stats.mentors}+` },
              { label: 'Industries Covered', value: `${stats.industries}+` },
              { label: 'Waitlist Members', value: `${stats.waitlist}+` },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#00F5EE]">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <BrainIcon className="w-8 h-8 text-[#00F5EE]" />,
                title: "AI-Powered Matching",
                description: "Our intelligent system pairs you with mentors who perfectly align with your goals and learning style."
              },
              {
                icon: <GlobeIcon className="w-8 h-8 text-[#00F5EE]" />,
                title: "Local & Global Network",
                description: "Connect with mentors from Nepal and around the world, bringing diverse perspectives to your growth."
              },
              {
                icon: <TrendingUpIcon className="w-8 h-8 text-[#00F5EE]" />,
                title: "Skill-Based Progress",
                description: "Track your growth with detailed analytics and milestone achievements."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#16153A] to-[#1E1D4C]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-gray-300 mb-12">
              To revolutionize mentorship in Nepal by creating an accessible, AI-powered platform that connects ambitious individuals with experienced mentors, fostering growth and innovation across industries.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-[#00F5EE]">For Mentees</h3>
                <ul className="space-y-3 text-left">
                  <li className="flex items-center">
                    <span className="mr-2">✦</span>
                    Personalized mentor matching
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✦</span>
                    Flexible scheduling
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✦</span>
                    Skill development tracking
                  </li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-[#00F5EE]">For Mentors</h3>
                <ul className="space-y-3 text-left">
                  <li className="flex items-center">
                    <span className="mr-2">✦</span>
                    Impact the next generation
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✦</span>
                    Build your network
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✦</span>
                    Earn while sharing knowledge
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Updated Email Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#16153A] border border-[#00F5EE]/20">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">
              {signupType === 'mentor' ? 'Become a Mentor' : 'Join the Waitlist'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubscribe} className="space-y-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/5 border-[#00F5EE]/20 text-white placeholder:text-gray-400"
            />
            <Button type="submit" className="w-full bg-[#00F5EE] text-[#16153A] hover:bg-[#00F5EE]/90">
              {isSubscribed ? "You're on the list! 🎉" : "Get Early Access"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  BrainIcon,
  TrendingUpIcon,
  GlobeIcon,
  SparklesIcon,
  Rocket,
  ArrowRight,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Add industries array at the top of the file
const INDUSTRIES = [
  "Software Development",
  "Data Science",
  "UI/UX Design",
  "Product Management",
  "Digital Marketing",
  "Business Strategy",
  "Finance",
  "Healthcare",
  "Education",
  "Other"
] as const;

export default function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState(() => {
    const targetDate = new Date("2025-01-01");
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();

    return {
      d: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hr: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      min: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      sec: Math.floor((diff % (1000 * 60)) / 1000),
    };
  });
  const [email, setEmail] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [signupType, setSignupType] = useState<"mentee" | "mentor">("mentee");
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({
    mentors: 0,
    industries: 0,
    waitlist: 0,
  });
  const [industry, setIndustry] = useState<string>("");

  // Modified countdown timer logic
  useEffect(() => {
    const targetDate = new Date("2025-01-01");

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
        sec: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fetch stats on component mount
  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/subscribe');
        const data = await response.json();
        if (data) {
          setStats(data);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    }
    fetchStats();
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          type: signupType,
          industry: signupType === 'mentor' ? industry : undefined, // Only send industry for mentors
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to subscribe');
      }

      setIsSubscribed(true);
      setTimeout(() => setIsDialogOpen(false), 2000);

      // Refresh stats after successful subscription
      const statsResponse = await fetch('/api/subscribe');
      const newStats = await statsResponse.json();
      if (newStats) {
        setStats(newStats);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to subscribe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Add handler for "Become a Mentor" button
  const handleMentorClick = () => {
    setSignupType("mentor");
    setEmail("");
    setIndustry("");
    setIsDialogOpen(true);
  };

  const handleWaitlistClick = () => {
    setSignupType("mentee");
    setEmail("");
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#16153A] text-white font-titillium overflow-x-hidden">
      {/* Hero Section */}
      <motion.section
        className="relative min-h-screen"
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
                backgroundColor: i === 0 ? "#00F5EE" : "#16153A",
                width: "600px",
                height: "600px",
              }}
            />
          ))}
        </div>

        {/* Main content */}
        <div className="relative z-10 min-h-[100vh] flex flex-col justify-center items-center px-4 py-8 md:py-12">
          <div className="flex-1 flex flex-col justify-center items-center max-w-4xl mx-auto w-full space-y-8">
            {/* Title and description */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center space-y-8 sm:space-y-6 mb-12 sm:mb-8"
            >
              <SparklesIcon className="w-8 h-8 md:w-12 md:h-12 mx-auto text-[#00F5EE]" />
              <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Saarathi
                <span className="block mt-2 bg-gradient-to-r from-[#00F5EE] to-white bg-clip-text text-transparent text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                  The Future of Mentorship
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-xl mx-auto">
                Connecting ambitious minds with industry leaders, experts and mentors along with the magic of AI
              </p>
            </motion.div>

            {/* Countdown */}
            <div className="w-full max-w-3xl grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 px-4 mb-8 md:mb-12">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <motion.div
                  key={unit}
                  className="bg-white/5 backdrop-blur-lg rounded-xl p-3 md:p-4 flex flex-col items-center justify-center"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#00F5EE] text-center">
                    {value}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-gray-400 text-center">
                    {unit}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons - Move up, before stats */}
            <motion.div
              className="flex flex-col sm:flex-row justify-center items-center gap-3 w-full px-4 sm:px-0 sm:gap-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                onClick={handleWaitlistClick}
                className="w-full sm:w-auto bg-[#00F5EE] text-[#16153A] hover:bg-[#00F5EE]/90 rounded-full px-6 py-6 text-base font-semibold"
              >
                Join Waitlist
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={handleMentorClick}
                className="w-full sm:w-auto border border-[#00F5EE] text-[#00F5EE] hover:bg-[#00F5EE]/10 rounded-full px-6 py-6 text-base font-semibold bg-transparent"
              >
                Become a Mentor
                <Rocket className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>

            {/* Mobile stats section - show only on mobile */}
            <section className="mt-8">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto px-4"
              >
                <div className="grid grid-cols-3 gap-8">
                  {[
                    { label: "Mentors Onboard", value: stats.mentors },
                    { label: "Industries Covered", value: stats.industries },
                    { label: "Waitlist Members", value: stats.waitlist },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="text-center"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <div className="text-2xl md:text-3xl font-bold text-[#00F5EE]">
                        {stat.value}+
                      </div>
                      <div className="text-sm text-gray-400 mt-1">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </section>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-16 md:py-24 px-4 mt-8 md:mt-0">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {[
              {
                icon: <BrainIcon className="w-8 h-8 text-[#00F5EE]" />,
                title: "AI-Powered Matching",
                description:
                  "Our intelligent system pairs you with mentors who perfectly align with your goals and learning style.",
              },
              {
                icon: <GlobeIcon className="w-8 h-8 text-[#00F5EE]" />,
                title: "Local & Global Network",
                description:
                  "Connect with mentors from Nepal and around the world, bringing diverse perspectives to your growth.",
              },
              {
                icon: <TrendingUpIcon className="w-8 h-8 text-[#00F5EE]" />,
                title: "Skill-Based Progress",
                description:
                  "Track your growth with detailed analytics and milestone achievements.",
              },
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
      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-[#16153A] to-[#1E1D4C]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8 md:space-y-12"
          >
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                Our Mission
              </h2>
              <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
                To revolutionize mentorship in Nepal by creating an accessible,
                AI-powered platform that connects ambitious individuals with
                experienced mentors, fostering growth and innovation across
                industries.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-[#00F5EE]">
                  For Mentees
                </h3>
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
                <h3 className="text-xl font-bold mb-4 text-[#00F5EE]">
                  For Mentors
                </h3>
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

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#16153A] border border-[#00F5EE]/20 w-[90%] max-w-md mx-auto p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white text-center">
              {signupType === "mentor" ? "Become a Mentor" : "Join the Waitlist"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubscribe} className="space-y-4 mt-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/5 border-[#00F5EE]/20 text-white placeholder:text-gray-400 h-12 rounded-lg"
            />
            {signupType === "mentor" && (
              <Select
                value={industry}
                onValueChange={setIndustry}
                required
              >
                <SelectTrigger className="bg-white/5 border-[#00F5EE]/20 text-white h-12 rounded-lg">
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent className="bg-[#16153A] border-[#00F5EE]/20">
                  {INDUSTRIES.map((ind) => (
                    <SelectItem
                      key={ind}
                      value={ind}
                      className="text-white hover:bg-white/10"
                    >
                      {ind}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            <Button
              type="submit"
              disabled={signupType === "mentor" && !industry}
              className="w-full bg-[#00F5EE] text-[#16153A] hover:bg-[#00F5EE]/90 py-3 rounded-lg font-semibold disabled:opacity-50"
            >
              {isSubscribed ? "You're on the list! 🎉" : "Get Early Access"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

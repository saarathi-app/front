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
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ShieldCheck,
  Gem,
  Zap,
  Users,
  Clock,
  Target,
  Coins,
  Network,
  GraduationCap,
  Briefcase,
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

// Add new sections data
const BENEFITS = [
  {
    title: "For Mentees",
    icon: GraduationCap,
    points: [
      {
        icon: Target,
        text: "Personalized mentor matching"
      },
      {
        icon: Clock,
        text: "Flexible scheduling"
      },
      {
        icon: TrendingUpIcon,
        text: "Skill development tracking"
      },
      {
        icon: Coins,
        text: "Affordable rates"
      }
    ]
  },
  {
    title: "For Mentors",
    icon: Briefcase,
    points: [
      {
        icon: SparklesIcon,
        text: "Impact the next generation"
      },
      {
        icon: Network,
        text: "Build your network"
      },
      {
        icon: Coins,
        text: "Earn while sharing knowledge"
      },
      {
        icon: Clock,
        text: "Flexible hours"
      }
    ]
  }
] as const;

// Add new constants for Why Saarathi section
const WHY_SAARATHI = [
  {
    icon: BrainIcon,
    title: "First in Nepal",
    description: "Pioneer AI-driven mentorship platform built specifically for Nepal's professional landscape"
  },
  {
    icon: ShieldCheck,
    title: "Verified Experts",
    description: "All mentors are thoroughly vetted with proven track records in their industries"
  },
  {
    icon: Gem,
    title: "Quality Assurance",
    description: "Structured mentorship programs with guaranteed learning outcomes"
  },
  {
    icon: Zap,
    title: "Instant Matching",
    description: "Get matched with the right mentor within minutes using our smart algorithm"
  }
] as const;

// Add platform flow steps
const PLATFORM_FLOW = [
  {
    step: 1,
    title: "Sign Up",
    description: "Create your profile and tell us about your goals"
  },
  {
    step: 2,
    title: "Get Matched",
    description: "Our AI matches you with the perfect mentor based on your needs"
  },
  {
    step: 3,
    title: "Schedule Sessions",
    description: "Book flexible mentoring sessions that fit your schedule"
  },
  {
    step: 4,
    title: "Track Progress",
    description: "Monitor your growth and achieve your goals with structured guidance"
  }
] as const;

// Add new mission cards data with icons
const MISSION_PILLARS = [
  {
    icon: Users,
    title: "Democratize",
    description: "Making quality mentorship accessible to all Nepali professionals"
  },
  {
    icon: Rocket,
    title: "Innovate",
    description: "Leveraging technology to create meaningful connections"
  },
  {
    icon: SparklesIcon,
    title: "Empower",
    description: "Fostering growth and success in Nepal's professional landscape"
  }
] as const;

export default function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState(() => {
    const targetDate = new Date("2025-06-13");
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
    const targetDate = new Date("2025-06-13");

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
        const data = await response.json();
        if (response.status === 409) {
          alert('This email is already registered in our waitlist.');
          return;
        }
        throw new Error('Failed to subscribe');
      }

      setIsSubscribed(true);
      alert('Thank you for joining our waitlist! We will keep you updated on our launch.');
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
          <div className="flex flex-col items-center justify-center flex-1 w-full max-w-4xl mx-auto space-y-8">
            {/* Title and description */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-12 space-y-8 text-center sm:space-y-6 sm:mb-8"
            >
              <SparklesIcon className="w-8 h-8 md:w-12 md:h-12 mx-auto text-[#00F5EE]" />
              <h1 className="text-4xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
                Saarathi
                <span className="block mt-2 bg-gradient-to-r from-[#00F5EE] to-white bg-clip-text text-transparent text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                  The Future of Mentorship
                </span>
              </h1>
              <p className="max-w-xl mx-auto text-base text-gray-400 sm:text-lg md:text-xl">
                Connecting ambitious minds with industry leaders, experts and mentors along with the magic of AI
              </p>
            </motion.div>

            {/* Countdown */}
            <div className="grid w-full max-w-3xl grid-cols-2 gap-3 px-4 mb-8 md:grid-cols-4 md:gap-4 md:mb-12">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <motion.div
                  key={unit}
                  className="flex flex-col items-center justify-center p-3 bg-white/5 backdrop-blur-lg rounded-xl md:p-4"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#00F5EE] text-center">
                    {value}
                  </div>
                  <div className="text-xs tracking-wider text-center text-gray-400 uppercase">
                    {unit}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons - Move up, before stats */}
            <motion.div
              className="flex flex-col items-center justify-center w-full gap-3 px-4 sm:flex-row sm:px-0 sm:gap-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                onClick={handleWaitlistClick}
                className="w-full sm:w-auto bg-[#00F5EE] text-[#16153A] hover:bg-[#00F5EE]/90 rounded-full px-6 py-6 text-base font-semibold"
              >
                Join Waitlist
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                onClick={handleMentorClick}
                className="w-full sm:w-auto border border-[#00F5EE] text-[#00F5EE] hover:bg-[#00F5EE]/10 rounded-full px-6 py-6 text-base font-semibold bg-transparent"
              >
                Become a Mentor
                <Rocket className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>

            {/* Mobile stats section - show only on mobile */}
            <section className="mt-8">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl px-4 mx-auto"
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
                      <div className="mt-1 text-sm text-gray-400">
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

      {/* Mission Section - More focused on vision and impact */}
      <motion.section 
        className="px-4 py-24"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">Our Mission</h2>
          <div className="space-y-8">
            <p className="text-lg text-gray-300">
              To revolutionize professional development in Nepal by breaking down barriers 
              to quality mentorship and creating opportunities for meaningful connections 
              that drive personal and economic growth.
            </p>
            <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-3">
              {MISSION_PILLARS.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative p-6 group bg-white/5 backdrop-blur-lg rounded-xl hover:bg-white/10"
                >
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mb-4"
                  >
                    <div className="mx-auto w-12 h-12 bg-[#00F5EE]/10 rounded-lg flex items-center justify-center">
                      <pillar.icon className="w-6 h-6 text-[#00F5EE]" />
                    </div>
                  </motion.div>
                  <h3 className="mb-2 text-[#00F5EE] font-bold">{pillar.title}</h3>
                  <p className="text-sm text-gray-400">{pillar.description}</p>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#00F5EE]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Benefits Section - Moved right after Mission */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Perfect for Everyone</h2>
            <p className="max-w-2xl mx-auto text-gray-400">
              Whether you&apos;re seeking guidance or want to share your expertise
            </p>
          </motion.div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {BENEFITS.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative p-8 transition-all duration-300 group bg-white/5 backdrop-blur-lg rounded-xl hover:bg-white/10"
              >
                {/* 3D Floating Icon */}
                <div className="absolute -translate-x-1/2 -top-6 left-1/2">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="bg-[#00F5EE] p-4 rounded-2xl shadow-xl"
                  >
                    <benefit.icon className="w-8 h-8 text-[#16153A]" />
                  </motion.div>
                </div>
                
                <h3 className="text-2xl font-bold mb-6 text-[#00F5EE] mt-8 text-center">
                  {benefit.title}
                </h3>
                <ul className="space-y-4">
                  {benefit.points.map((point, pointIndex) => (
                    <motion.li
                      key={point.text}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (index * 0.2) + (pointIndex * 0.1) }}
                      className="flex items-center gap-3 transition-transform duration-300 group-hover:translate-x-2"
                    >
                      <div className="p-2 rounded-lg bg-white/5">
                        <point.icon className="w-4 h-4 text-[#00F5EE]" />
                      </div>
                      <span className="text-gray-300">{point.text}</span>
                    </motion.li>
                  ))}
                </ul>
                
                {/* Decorative gradient */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#00F5EE]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Saarathi Section - Now comes after Benefits */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Why Choose Saarathi?</h2>
            <p className="max-w-2xl mx-auto text-gray-400">
              Experience the future of mentorship with our innovative platform
            </p>
          </motion.div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {WHY_SAARATHI.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="p-6 bg-white/5 backdrop-blur-lg rounded-xl"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 rounded-lg bg-white/5">
                    <item.icon className="w-6 h-6 text-[#00F5EE]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#00F5EE]">{item.title}</h3>
                </div>
                <p className="text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Flow Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#1E1D4C] to-[#16153A]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">How It Works</h2>
            <p className="max-w-2xl mx-auto text-gray-400">
              Your journey to success made simple
            </p>
          </motion.div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {PLATFORM_FLOW.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative p-6 bg-white/5 backdrop-blur-lg rounded-xl"
              >
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#00F5EE] rounded-full flex items-center justify-center text-[#16153A] font-bold">
                  {item.step}
                </div>
                <h3 className="mb-3 text-xl font-bold">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
                {index < PLATFORM_FLOW.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 text-[#00F5EE]" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Links Section */}
      <section className="px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-6 text-2xl font-bold">Connect With Us</h2>
          <div className="flex justify-center space-x-6">
            <a
              href="https://facebook.com/saarathi_app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#00F5EE] transition-colors"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="https://twitter.com/saarathi_app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#00F5EE] transition-colors"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="https://instagram.com/saarathi_app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#00F5EE] transition-colors"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/company/saarathi-app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#00F5EE] transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#16153A] border border-[#00F5EE]/20 w-[90%] max-w-md mx-auto p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center text-white">
              {signupType === "mentor" ? "Become a Mentor" : "Join the Waitlist"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubscribe} className="mt-4 space-y-4">
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

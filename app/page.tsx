'use client';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Code2,
  Cpu,
  Globe,
  Database,
  Lock,
  Palette,
  Zap,
  Layers,
  Terminal,
  Smartphone,
  Briefcase,
  Sword,
  Gem,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  Coffee,
  Ghost,
  Sparkles,
  MousePointer2,
  Target,
  ChevronRight,
  Maximize2,
  Shield,
  Layout,
  TrendingUp,
  Video,
  ChevronDown,
  Wifi
} from 'lucide-react';

/**
 * SAARATHI ACADEMY - v13.0 (The "Orange & Navy" Update)
 * Colors: Deep Navy #001F3D | Vibrant Orange #f8921d | Mist #E6E6E6
 */

// --- Data ---

const TRACKS = [
  // School of Software Engineering
  {
    id: "TR-01",
    category: "Software Engineering",
    title: "Modern Full Stack",
    type: "split", // L1/L2
    icon: <Code2 />,
    levels: [
      {
        label: "L1: The Builder",
        time: "3 Months",
        desc: "React 19, Tailwind v4, Hono/Express, Drizzle ORM, Better-Auth."
      },
      {
        label: "L2: The Architect",
        time: "2.5 Months",
        desc: "Next.js 15, Turborepo, Microservices, Redis, AWS & Docker."
      }
    ]
  },
  {
    id: "TR-02",
    category: "Software Engineering",
    title: "Data Science & AI",
    type: "split",
    icon: <Cpu />,
    levels: [
      {
        label: "L1: Data Analyst",
        time: "3 Months",
        desc: "Polars, Advanced SQL, PowerBI, Scikit-Learn, Hypothesis Testing."
      },
      {
        label: "L2: AI Engineer",
        time: "2.5 Months",
        desc: "RAG Pipelines, LangGraph Agents, Local LLMs, MLOps."
      }
    ]
  },
  {
    id: "TR-03",
    category: "Software Engineering",
    title: "Cloud & Platform Eng",
    type: "split",
    icon: <Globe />,
    levels: [
      {
        label: "L1: Cloud Admin",
        time: "2.5 Months",
        desc: "Linux Bash, AWS Associate, Docker, Python Scripting."
      },
      {
        label: "L2: DevOps / SRE",
        time: "2.5 Months",
        desc: "Kubernetes, Helm, ArgoCD, Terraform, Prometheus/Grafana."
      }
    ]
  },
  {
    id: "TR-09",
    category: "Software Engineering",
    title: ".NET Enterprise",
    type: "single",
    icon: <Database />,
    levels: [
      {
        label: "Mastery: Full Stack",
        time: "3.5 Months",
        desc: "C# 12, .NET 9, Clean Arch, CQRS, Azure Cloud & Microservices."
      }
    ]
  },

  // School of Cybersecurity
  {
    id: "TR-04",
    category: "Cybersecurity",
    title: "Cybersecurity & Cloud",
    type: "split",
    icon: <Shield />,
    levels: [
      {
        label: "L1: Analyst",
        time: "3 Months",
        desc: "Packet Analysis, OWASP Top 10, Linux PrivEsc, Burp Suite."
      },
      {
        label: "L2: Pen Tester",
        time: "2 Months",
        desc: "Cloud Security (AWS/Azure), Active Directory, DevSecOps."
      }
    ]
  },

  // School of Specialized Tech
  {
    id: "TR-05",
    category: "Specialized Tech",
    title: "QA Automation (SDET)",
    type: "single",
    icon: <Terminal />,
    levels: [
      {
        label: "Mastery: SDET",
        time: "3.5 Months",
        desc: "Playwright (No Selenium), TypeScript, Docker for Testing, CI/CD."
      }
    ]
  },
  {
    id: "TR-06",
    category: "Specialized Tech",
    title: "Mobile App (Flutter)",
    type: "single",
    icon: <Smartphone />,
    levels: [
      {
        label: "Mastery: Mobile",
        time: "3.5 Months",
        desc: "Dart 3, Riverpod, Clean Arch, Method Channels, App Store Publish."
      }
    ]
  },

  // School of Digital & Creative Tech
  {
    id: "TR-07",
    category: "Creative Tech",
    title: "Growth & AI Automation",
    type: "single",
    icon: <TrendingUp />,
    levels: [
      {
        label: "Mastery: Growth",
        time: "3.5 Months",
        desc: "Programmatic SEO, Meta/Google Ads, Zapier Automation, CRM."
      }
    ]
  },
  {
    id: "TR-08",
    category: "Creative Tech",
    title: "Product Design (UI/UX)",
    type: "single",
    icon: <Palette />,
    levels: [
      {
        label: "Mastery: Product",
        time: "3 Months",
        desc: "Figma Variables, Auto-Layout, Dev Mode Handoff, User Research."
      }
    ]
  },
  {
    id: "TR-10",
    category: "Creative Tech",
    title: "Visual & Motion Design",
    type: "single",
    icon: <Layout />,
    levels: [
      {
        label: "Mastery: Visual",
        time: "3 Months",
        desc: "Illustrator, Photoshop GenFill, After Effects, Blender 3D."
      }
    ]
  },
];

const MODULES = [
  { id: "M1", title: "Freelance Biz", desc: "Upwork Algo, Pricing & Contracts.", duration: "1 Month", icon: <Briefcase /> },
  { id: "M2", title: "DSA & Logic", desc: "Blind 75 Patterns, Trees, Graphs.", duration: "1.5 Months", icon: <Sword /> },
  { id: "M3", title: "AI Automation", desc: "n8n Deep Dive, No-Code Ops.", duration: "1 Month", icon: <Cpu /> },
  { id: "M4", title: "System Design", desc: "HLD/LLD, CAP, Sharding.", duration: "1 Month", icon: <Layers /> },
  { id: "M5", title: "Viral Editing", desc: "Retention editing (Premiere/CapCut).", duration: "1.5 Months", icon: <Video /> },
];

// --- Components ---

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 10);
      cursorY.set(e.clientY - 10);
    };

    const handleMouseOver = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('.interactive')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-5 h-5 bg-[#f8921d] rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      style={{
        translateX: cursorX,
        translateY: cursorY,
      }}
      animate={{
        scale: isHovering ? 4 : 1,
        opacity: 1,
      }}
      transition={{ type: "tween", ease: "linear", duration: 0.05 }}
    />
  );
};

const Navbar = () => {
  return (
    <nav className="absolute top-0 w-full px-6 py-6 md:px-12 flex justify-between items-center z-50 text-[#E6E6E6]">
      <div className="flex flex-col leading-none select-none group cursor-pointer">
        <span className="text-2xl font-black tracking-tighter group-hover:text-[#f8921d] transition-colors">SAARATHI</span>
        <span className="text-[10px] font-mono tracking-widest opacity-70 uppercase">ACADEMY</span>
      </div>
      <div className="flex items-center gap-6">
        <span className="hidden md:block font-mono text-[10px] opacity-60 tracking-wider uppercase">Old Baneshwor, KTM</span>
        <a href="#join" className="interactive px-5 py-2 border border-[#E6E6E6]/30 bg-[#001F3D]/50 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#E6E6E6] hover:text-[#001F3D] transition-all">
          Apply Now
        </a>
      </div>
    </nav>
  );
};

const RealityCheck = () => {
  return (
    <div className="w-full bg-[#001830] py-24 px-6 border-y border-[#E6E6E6]/5 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="bg-[#001F3D] border border-[#E6E6E6]/10 rounded-lg p-6 md:p-8 font-mono text-sm shadow-2xl relative group">
          {/* Terminal Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#f8921d] to-[#F7B980] rounded-lg opacity-0 group-hover:opacity-10 blur transition duration-1000"></div>

          <div className="flex gap-2 mb-6 border-b border-[#E6E6E6]/10 pb-4 relative z-10">
            <div className="w-3 h-3 rounded-full bg-[#f8921d]/50" />
            <div className="w-3 h-3 rounded-full bg-[#F7B980]/50" />
            <div className="w-3 h-3 rounded-full bg-[#E6E6E6]/50" />
            <span className="ml-auto text-[#E6E6E6]/30 text-xs">saarathi@admin:~</span>
          </div>
          <div className="space-y-4 relative z-10 text-xs md:text-sm">
            <div className="text-[#E6E6E6]/60">
              <span className="text-[#f8921d] mr-2">➜</span>
              <span className="text-[#F7B980]">~</span> saarathi --scan-market
            </div>
            <div className="text-[#E6E6E6] pl-4 border-l border-[#E6E6E6]/10">
              [INFO] Scanning Kathmandu Valley...<br />
              [WARN] 98% of graduates found 'Unemployable'.<br />
              [WARN] Skill gap detected: <span className="text-red-400">CRITICAL</span>
            </div>

            <div className="text-[#E6E6E6]/60 mt-4">
              <span className="text-[#f8921d] mr-2">➜</span>
              <span className="text-[#F7B980]">~</span> run delete_mediocrity.exe
            </div>
            <div className="text-[#f8921d]">
              Warning: Comfort zone will be permanently deleted. Proceed? (Y/n)
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-[#E6E6E6] text-lg md:text-2xl font-bold py-4 pl-4"
            >
              &gt; YOU AIN'T GONNA BE MEDIOCRE. <span className="animate-pulse text-[#f8921d]">_</span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DirectoryItem = ({ item, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={() => setIsOpen(!isOpen)}
      className="interactive relative border-t border-[#E6E6E6]/10 py-6 md:py-8 group cursor-pointer"
    >
      <div className="absolute inset-0 bg-[#E6E6E6]/[0.02] scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300"></div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10 px-2 md:px-4">
        <div className="flex items-center gap-4 md:w-1/3">
          <span className="font-mono text-[#f8921d] text-xs opacity-60">0{index + 1}</span>
          <h3 className="text-xl md:text-2xl font-bold text-[#E6E6E6] group-hover:text-[#f8921d] transition-colors">
            {item.title}
          </h3>
        </div>

        <div className="md:w-1/3 flex items-center gap-2 text-[#E6E6E6]/40 text-xs md:text-sm">
          {React.cloneElement(item.icon, { size: 16 })}
          <p className="font-mono uppercase tracking-wider">{item.category}</p>
        </div>

        <div className="md:w-1/3 flex justify-end items-center">
          <div className={`transition-all duration-300 transform ${isOpen ? 'rotate-180 text-[#f8921d]' : 'rotate-0 text-[#E6E6E6]/40'}`}>
            <ChevronDown size={20} />
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden px-2 md:px-4"
      >
        <div className="pt-6 pb-4 grid md:grid-cols-3 gap-8">
          <div className="md:col-start-2 col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {item.levels.map((lvl, i) => (
                <div key={i} className={`bg-[#001F3D] border border-[#E6E6E6]/10 p-5 rounded-lg hover:border-[#f8921d]/50 transition-colors shadow-lg ${item.type === 'single' ? 'md:col-span-2' : ''}`}>
                  <div className="flex justify-between items-start mb-3">
                    <div className="text-base font-bold text-[#E6E6E6]">{lvl.label}</div>
                    <div className="flex items-center gap-1 text-[10px] text-[#f8921d] font-mono bg-[#f8921d]/10 px-2 py-1 rounded">
                      <Clock size={10} />
                      {lvl.time}
                    </div>
                  </div>
                  <p className="text-xs text-[#E6E6E6]/60 leading-relaxed font-mono">
                    {lvl.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const SkillStore = () => {
  return (
    <div className="mt-32 md:mt-40 relative px-4 md:px-0">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16">
        <div>
          <h3 className="text-3xl md:text-4xl font-black text-[#E6E6E6] mb-4 flex items-center gap-3">
            <Zap className="text-[#f8921d]" fill="#f8921d" size={28} />
            SKILL MODULES
          </h3>
          <p className="text-[#E6E6E6]/60 text-sm max-w-lg leading-relaxed">
            Not everyone needs a full degree. Sometimes you just need to unlock a specific capability.
            <br /> <span className="text-[#f8921d]">Short. Intense. High-ROI.</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {MODULES.map((mod, i) => (
          <motion.div
            key={mod.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="interactive relative bg-[#001830] border border-[#E6E6E6]/5 p-5 rounded-xl group cursor-pointer hover:border-[#f8921d]/50 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-[#F7B980] group-hover:text-[#f8921d] transition-colors p-2 bg-[#001F3D] rounded-lg">
                {React.cloneElement(mod.icon, { size: 20 })}
              </div>
              <div className="flex items-center gap-1 text-[9px] font-mono text-[#E6E6E6]/40 uppercase bg-[#E6E6E6]/5 px-2 py-1 rounded">
                <Clock size={8} />
                {mod.duration}
              </div>
            </div>

            <h4 className="font-bold text-sm text-[#E6E6E6] mb-2 leading-tight group-hover:text-[#f8921d] transition-colors">
              {mod.title}
            </h4>
            <p className="text-[11px] text-[#E6E6E6]/50 leading-relaxed font-light">
              {mod.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const Waitlist = () => {
  const [formState, setFormState] = useState('idle');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    track: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('loading');
    setTimeout(() => setFormState('success'), 1500);
  };

  const inputClasses = "interactive w-full bg-[#E6E6E6] border-2 border-transparent focus:border-[#f8921d] rounded-lg px-4 py-3 text-sm font-bold text-[#001F3D] focus:outline-none transition-all placeholder:text-[#001F3D]/30 placeholder:font-normal";

  return (
    <div className="w-full bg-[#E6E6E6] text-[#001F3D] rounded-[2rem] p-6 md:p-12 relative overflow-hidden shadow-2xl">
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start mb-10 gap-6">
          <div>
            <h3 className="text-3xl md:text-5xl font-black leading-none tracking-tight mb-2">
              SECURE YOUR <span className="text-[#f8921d]">SPOT.</span>
            </h3>
            <p className="text-[#001F3D]/60 text-sm">Join the next cohort of builders.</p>
          </div>

          <div className="flex items-center gap-2 bg-[#001F3D]/5 px-4 py-2 rounded-full">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs font-bold uppercase tracking-wider">Accepting for Jan 2026</span>
          </div>
        </div>

        {formState === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#001F3D] text-[#E6E6E6] p-12 rounded-2xl text-center flex flex-col items-center justify-center min-h-[300px]"
          >
            <CheckCircle2 className="w-16 h-16 text-[#f8921d] mb-6" />
            <h4 className="text-2xl font-bold mb-2">Received.</h4>
            <p className="text-white/60 max-w-xs mx-auto text-sm leading-relaxed">
              We are reviewing your application. You will hear from us shortly.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <input
                  required
                  type="text"
                  placeholder="Full Name"
                  className={inputClasses}
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <input
                  required
                  type="tel"
                  placeholder="Phone (+977)"
                  className={inputClasses}
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div>
              <input
                required
                type="email"
                placeholder="Email Address"
                className={inputClasses}
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="relative">
              <select
                required
                className={`${inputClasses} appearance-none cursor-pointer`}
                value={formData.track}
                onChange={e => setFormData({ ...formData, track: e.target.value })}
              >
                <option value="" disabled>Select Desired Track</option>
                <optgroup label="Career Tracks">
                  {TRACKS.map(t => <option key={t.id} value={t.title}>{t.title} ({t.category})</option>)}
                </optgroup>
                <optgroup label="Specialized Modules">
                  {MODULES.map(m => <option key={m.id} value={m.title}>{m.title} ({m.duration})</option>)}
                </optgroup>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#001F3D]/40">▼</div>
            </div>

            <button disabled={formState === 'loading'} className="interactive w-full bg-[#001F3D] text-[#E6E6E6] py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#f8921d] hover:shadow-xl transition-all mt-4 flex justify-center items-center gap-3 text-sm">
              {formState === 'loading' ? 'Processing...' : 'Submit Application'}
              {formState !== 'loading' && <ArrowRight size={16} />}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default function SaarathiLanding() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div className="min-h-screen bg-[#001F3D] text-[#E6E6E6] font-sans selection:bg-[#f8921d] selection:text-[#001F3D] cursor-none overflow-x-hidden">
      <CustomCursor />
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-32 pb-20 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#f8921d] rounded-full blur-[150px] opacity-10 animate-pulse pointer-events-none" />

        <div className="max-w-[1400px] w-full mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="px-4 py-1 border border-[#F7B980]/30 rounded-full text-[#f8921d] text-[10px] md:text-xs font-bold uppercase tracking-widest bg-[#F7B980]/5 backdrop-blur-sm">
                Anti-Factory Education
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-[7rem] font-black tracking-tighter text-[#E6E6E6] leading-[0.95] mb-12">
              COLLEGE TAUGHT <br />
              <span className="text-[#E6E6E6]/20">HISTORY.</span> WE TEACH <br />
              <span className="text-[#f8921d]">THE FUTURE.</span>
            </h1>

            <div className="flex flex-col md:flex-row gap-12 items-start">
              <p className="max-w-xl text-lg md:text-xl font-light leading-relaxed text-[#E6E6E6]/80 border-l-4 border-[#f8921d] pl-6">
                Small batches. Real projects. <br />
                Guaranteed career launchpad.
              </p>

              <div className="flex gap-12">
                <div>
                  <div className="text-4xl font-black">10</div>
                  <div className="text-[10px] uppercase opacity-50 tracking-wider mt-1 font-mono">Students Max</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-[#f8921d]">L1/L2</div>
                  <div className="text-[10px] uppercase opacity-50 tracking-wider mt-1 font-mono">Career Support</div>
                </div>
              </div>
            </div>

            <div className="mt-12 flex items-center gap-6 text-sm font-mono text-[#E6E6E6]/60">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#f8921d] rounded-full animate-ping"></div>
                <span>Opens 1st Falgun</span>
              </div>
              <div className="hidden md:block w-px h-4 bg-[#E6E6E6]/20"></div>
              <div>Classes Start 20th Falgun</div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-6 md:left-12 flex items-center gap-2 text-[10px] font-mono opacity-50"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          SCROLL TO EXPLORE <ArrowRight className="rotate-90" size={14} />
        </motion.div>
      </section>

      {/* --- REALITY CHECK TERMINAL --- */}
      <RealityCheck />

      {/* --- VIBE CHECK (CREATIVE LAYOUT) --- */}
      <section className="py-24 border-b border-[#E6E6E6]/10 bg-[#001830]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 leading-tight text-center">
            WE ARE <span className="text-[#f8921d]">JUST LIKE YOU.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
            {/* Large Item */}
            <div className="md:col-span-2 md:row-span-2 bg-[#E6E6E6]/5 rounded-3xl p-8 border border-[#E6E6E6]/5 hover:border-[#f8921d]/50 transition-colors flex flex-col justify-between group overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-500">
                <Sparkles size={120} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Vibe Check Passed</h3>
                <p className="text-[#E6E6E6]/60 leading-relaxed">
                  No restictions. No formalities.
                  Just a space built for creators and engineers to flow.
                </p>
              </div>
              <div className="flex gap-2">
                <div className="px-4 py-2 bg-[#f8921d]/10 text-[#f8921d] rounded-full text-xs font-bold">Safe Space</div>
                <div className="px-4 py-2 bg-[#f8921d]/10 text-[#f8921d] rounded-full text-xs font-bold">Zero Politics</div>
              </div>
            </div>

            {/* Tall Item */}
            <div className="md:col-span-1 md:row-span-2 bg-[#f8921d] rounded-3xl p-8 flex flex-col justify-between text-[#001F3D]">
              <Coffee size={40} />
              <div>
                <h4 className="text-xl font-black uppercase mb-1">Unlimited<br />Coffee</h4>
                <p className="text-xs opacity-70">Fuel for your code.</p>
              </div>
            </div>

            {/* Wide Item */}
            <div className="md:col-span-1 bg-[#E6E6E6]/5 rounded-3xl p-6 flex flex-col justify-between border border-[#E6E6E6]/5 hover:border-[#f8921d]/30 transition-colors">
              <Wifi size={32} className="text-[#f8921d]" />
              <span className="font-bold">Zooping<br />WiFi</span>
            </div>

            {/* Normal Items */}
            <div className="md:col-span-1 bg-[#E6E6E6]/5 rounded-3xl p-6 flex flex-col justify-between border border-[#E6E6E6]/5 hover:border-[#f8921d]/30 transition-colors">
              <Ghost size={32} className="text-[#f8921d]" />
              <span className="font-bold">No<br />Judgement</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- DIRECTORY (Tracks) --- */}
      <section className="py-24 px-6 md:px-12">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-xs font-mono text-[#f8921d] mb-2 uppercase tracking-widest">The Catalog</h2>
            <p className="text-4xl md:text-6xl font-black text-[#E6E6E6]">CHOOSE YOUR PATH</p>
          </div>
          <p className="text-right hidden md:block text-[10px] font-mono text-[#E6E6E6]/40">
            UPDATED: JAN 2026<br />
            VERSION 13.0
          </p>
        </div>

        <div className="border-b border-[#E6E6E6]/10">
          {TRACKS.map((track, idx) => (
            <DirectoryItem key={track.id} item={track} index={idx} />
          ))}
        </div>

        {/* --- MODULES SHOWCASE (SKILL STORE) --- */}
        <SkillStore />
      </section>

      {/* --- FOOTER / WAITLIST --- */}
      <section id="join" className="py-24 px-6 md:px-12 flex flex-col md:flex-row gap-16 items-center bg-[#001830]">
        <div className="w-full md:w-1/2">
          <Waitlist />
        </div>
        <div className="w-full md:w-1/2 md:pl-12">
          <h4 className="text-[12vw] md:text-[6vw] font-black leading-none text-[#f8921d] opacity-20 mb-8 select-none">
            SAARATHI
            ACADEMY
          </h4>
          <div className="space-y-4 text-xs md:text-sm font-mono text-[#E6E6E6]/60">
            <div className="flex items-center gap-4">
              <MapPin size={14} className="text-[#f8921d]" />
              <span>Old Baneshwor, Kathmandu</span>
            </div>
            <div className="flex items-center gap-4">
              <Clock size={14} className="text-[#f8921d]" />
              <span>Mon-Fri</span>
            </div>
            <div className="flex items-center gap-4">
              <Terminal size={14} className="text-[#f8921d]" />
              <span>SAARATHI ACADEMY</span>
            </div>
          </div>

          <div className="mt-10 flex gap-6 text-[#E6E6E6] font-bold text-sm md:text-base">
            <a href="#" className="interactive hover:text-[#f8921d] transition-colors hover:underline decoration-[#f8921d] underline-offset-4">INSTAGRAM</a>
            <a href="#" className="interactive hover:text-[#f8921d] transition-colors hover:underline decoration-[#f8921d] underline-offset-4">LINKEDIN</a>
            <a href="#" className="interactive hover:text-[#f8921d] transition-colors hover:underline decoration-[#f8921d] underline-offset-4">TWITTER</a>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&family=JetBrains+Mono:wght@400;500&display=swap');
        
        body {
          cursor: none; /* Hide default cursor for custom one */
        }
        @media (max-width: 768px) {
          body { cursor: auto; }
        }

        .font-mono { font-family: 'JetBrains Mono', monospace; }
        
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #001F3D; }
        ::-webkit-scrollbar-thumb { background: #f8921d; }
      `}</style>
    </div>
  );
}
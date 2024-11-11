"use client"
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { 
  Star, 
  Search, 
  Users, 
  Clock, 
  Target, 
  Sparkles,
  Menu,
  X,
  Facebook,
  Twitter,
  Linkedin
} from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Update mentor data with real images
const featuredMentors = [
  {
    id: 1,
    name: "Dr. Anita Sharma",
    expertise: "Data Science",
    rating: 4.9,
    image: "/images/mentors/mentor-1.jpg",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    expertise: "Business Strategy",
    rating: 4.8,
    image: "/images/mentors/mentor-2.jpg",
  },
  {
    id: 3,
    name: "Priya Patel",
    expertise: "UX Design",
    rating: 4.7,
    image: "/images/mentors/mentor-3.jpg",
  },
  {
    id: 4,
    name: "Vikram Singh",
    expertise: "Machine Learning",
    rating: 4.9,
    image: "/images/mentors/mentor-4.jpg",
  },
];

export default function Homepage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Modern Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 shadow-sm backdrop-blur-md' : 'bg-transparent'
      }`}>
        <div className="max-w-6xl px-4 mx-auto">
          <div className="flex items-center justify-between h-20">
            <Link 
              href="/" 
              className={`text-2xl font-bold transition-colors duration-300 ${
                isScrolled ? 'text-[#16153A]' : 'text-white'
              }`}
            >
              Saarathi
            </Link>

            {/* Desktop Navigation */}
            <div className="items-center hidden space-x-8 md:flex">
              {['About', 'Mentors', 'How it Works'].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`text-sm font-medium transition-colors duration-300 ${
                    isScrolled 
                      ? 'text-gray-600 hover:text-[#16153A]' 
                      : 'text-gray-200 hover:text-white'
                  }`}
                >
                  {item}
                </Link>
              ))}
              <Button 
                variant={isScrolled ? "ghost" : "outline"}
                className={`transition-all duration-300 ${
                  isScrolled 
                    ? 'text-[#16153A] hover:bg-[#16153A] hover:text-white border border-[#16153A]' 
                    : 'text-[#16153A] border-2 border-white hover:bg-white hover:text-[#16153A]'
                }`}
              >
                Sign In
              </Button>
              <Button 
                className="bg-[#00F5EE] text-[#16153A] hover:bg-[#00F5EE]/90 transition-all duration-300"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className={`h-6 w-6 ${isScrolled ? 'text-[#16153A]' : 'text-white'}`} />
              ) : (
                <Menu className={`h-6 w-6 ${isScrolled ? 'text-[#16153A]' : 'text-white'}`} />
              )}
            </Button>
          </div>

          {/* Mobile Navigation - Improved animation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute left-0 right-0 p-4 mt-2 bg-white rounded-lg shadow-lg md:hidden"
              >
                <div className="flex flex-col space-y-4">
                  <Link 
                    href="/about" 
                    className="text-gray-600 hover:text-[#16153A] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About
                  </Link>
                  <Link 
                    href="/mentors" 
                    className="text-gray-600 hover:text-[#16153A] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Mentors
                  </Link>
                  <Link 
                    href="/how-it-works" 
                    className="text-gray-600 hover:text-[#16153A] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    How it Works
                  </Link>
                  <Button 
                    variant="ghost"
                    className="w-full text-[#16153A] hover:bg-[#16153A] hover:text-white transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Button>
                  <Button 
                    className="w-full bg-[#16153A] text-white hover:bg-[#16153A]/90 transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Hero Section - Improved layout */}
      <section className="relative min-h-screen">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/backgrounds/hero-bg.jpg"
            alt="Mentorship background"
            layout="fill"
            objectFit="cover"
            className="brightness-[0.2] transition-all duration-700"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#16153A]/30 to-[#16153A]/80" />
        </div>

        {/* Hero Content - Improved layout and search positioning */}
        <div className="relative flex flex-col items-center justify-center h-screen px-4">
          <div className="max-w-4xl mx-auto space-y-8 text-center">
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
              Unlock Your Potential with the Right Mentor
            </h1>
            <p className="max-w-2xl mx-auto text-lg leading-relaxed text-gray-200 md:text-xl">
              Connect with experts and accelerate your personal and professional growth
            </p>
            
            {/* Search Section - Integrated into hero */}
            <div className="max-w-2xl mx-auto mt-12">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-grow">
                  <Search className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                  <Input 
                    type="text"
                    placeholder="Find a mentor by expertise or keyword..."
                    className="h-12 pl-10 bg-white/90 backdrop-blur-md border-transparent focus:border-[#00F5EE] rounded-full transition-all duration-300"
                  />
                </div>
                <Button 
                  className="h-12 px-8 bg-[#00F5EE] text-[#16153A] hover:bg-[#00F5EE]/90 rounded-full transition-all duration-300"
                >
                  Search
                </Button>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 mt-8 sm:flex-row">
              <Button 
                size="lg"
                className="w-full sm:w-auto bg-[#00F5EE] hover:bg-[#00F5EE]/90 text-[#16153A] font-semibold px-8 rounded-full transition-all duration-300"
              >
                Find a Mentor
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-[#16153A] text-[#16153A] hover:bg-[#16153A] hover:text-white font-semibold px-8 rounded-full transition-all duration-300"
              >
                Become a Mentor
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Mentors - Clean minimal design */}
      <section className="px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#16153A] mb-12">
            Top Mentors on Saarathi
          </h2>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {featuredMentors.map((mentor) => (
                <CarouselItem key={mentor.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="overflow-hidden transition-all duration-300 border border-gray-100 hover:shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center space-y-6">
                        {/* Profile Image */}
                        <div className="relative w-28 h-28 rounded-full overflow-hidden ring-4 ring-[#00F5EE]/10">
                          <Image
                            src={mentor.image}
                            alt={mentor.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Mentor Info */}
                        <div className="space-y-2 text-center">
                          <h3 className="text-xl font-semibold text-[#16153A]">
                            {mentor.name}
                          </h3>
                          <p className="font-medium text-gray-600">
                            {mentor.expertise}
                          </p>
                        </div>

                        {/* Rating - Updated with yellow stars */}
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${
                                  i < Math.floor(mentor.rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "fill-gray-200 text-gray-200"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-medium text-gray-600">
                            {mentor.rating}
                          </span>
                        </div>

                        {/* Single Action Button */}
                        <div className="w-full pt-2">
                          <Button 
                            className="w-full bg-[#16153A] text-white hover:bg-[#16153A]/90 rounded-full transition-all"
                          >
                            View Profile
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 border-[#16153A] text-[#16153A] hover:bg-[#16153A] hover:text-white rounded-full" />
            <CarouselNext className="hidden md:flex -right-12 border-[#16153A] text-[#16153A] hover:bg-[#16153A] hover:text-white rounded-full" />
          </Carousel>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#16153A] mb-16">
            Why Choose Saarathi?
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-4 text-center transition-transform duration-300 hover:translate-y-[-4px]"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#00F5EE]/10">
                  {benefit.icon}
                </div>
                <h3 className="font-semibold text-lg text-[#16153A]">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl px-4 mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center text-[#16153A]">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {[
              {
                name: "Aisha Kapoor",
                role: "Mentee",
                quote:
                  "Saarathi helped me find the perfect mentor for my career transition. The guidance I received was invaluable!",
                image: "/images/testimonials/testimonial-1.jpg",
              },
              {
                name: "Rahul Mehta",
                role: "Mentor",
                quote:
                  "As a mentor on Saarathi, I've had the opportunity to connect with amazing mentees and make a real impact. It's a rewarding experience!",
                image: "/images/testimonials/testimonial-2.jpg",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="transition-shadow duration-300 border-none shadow-lg hover:shadow-xl">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="relative w-20 h-20 mb-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <p className="mb-4 italic text-gray-600">{`"${testimonial.quote}"`}</p>
                  <h4 className="font-semibold text-[#16153A]">{testimonial.name}</h4>
                  <p className="text-gray-500">{testimonial.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#16153A] text-white py-12">
        <div className="max-w-6xl px-4 mx-auto">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-bold">Saarathi</h3>
              <p>Connecting mentors and mentees for a brighter future.</p>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about">About Us</Link>
                </li>
                <li>
                  <Link href="/faq">FAQs</Link>
                </li>
                <li>
                  <Link href="/contact">Contact Us</Link>
                </li>
                <li>
                  <Link href="/terms">Terms & Conditions</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Connect With Us</h4>
              <div className="flex space-x-4">
                <Link href="#" className="hover:text-[#00F5EE] transition-colors">
                  <Facebook className="w-6 h-6" />
                </Link>
                <Link href="#" className="hover:text-[#00F5EE] transition-colors">
                  <Twitter className="w-6 h-6" />
                </Link>
                <Link href="#" className="hover:text-[#00F5EE] transition-colors">
                  <Linkedin className="w-6 h-6" />
                </Link>
              </div>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Language</h4>
              <select className="bg-white text-[#16153A] p-2 rounded">
                <option>English</option>
                <option>Hindi</option>
                <option>Bengali</option>
              </select>
            </div>
          </div>
          <div className="pt-8 mt-8 text-center border-t border-gray-700">
            <p>&copy; 2024 Saarathi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Benefits data
const benefits = [
  {
    icon: <Users className="w-8 h-8 text-[#00F5EE]" />,
    title: "Expert Mentors",
    description: "Connect with industry professionals who've been there and done that."
  },
  {
    icon: <Clock className="w-8 h-8 text-[#00F5EE]" />,
    title: "Flexible Scheduling",
    description: "Book sessions that fit your schedule, any time, anywhere."
  },
  {
    icon: <Target className="w-8 h-8 text-[#00F5EE]" />,
    title: "Personalized Guidance",
    description: "Get tailored advice and feedback for your specific goals."
  },
  {
    icon: <Sparkles className="w-8 h-8 text-[#00F5EE]" />,
    title: "AI-Powered Matching",
    description: "Find the perfect mentor match with our smart algorithm."
  }
];

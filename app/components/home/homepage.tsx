"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
// import { Input } from "@/components/ui/input";
import { Star, Search, Filter, ArrowRight, PlayCircle, CheckCircle2, Calendar, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";



// Dummy data for featured mentors

const featuredMentors = [
  {
    id: 1,
    name: "Dr. Anita Sharma",
    expertise: "Data Science",
    rating: 4.9,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    expertise: "Business Strategy",
    rating: 4.8,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Priya Patel",
    expertise: "UX Design",
    rating: 4.7,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Vikram Singh",
    expertise: "Machine Learning",
    rating: 4.9,
    image: "/placeholder.svg?height=100&width=100",
  },
];

export default function Homepage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Updated with video background option */}
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-[#16153A]/70">
          <Image
            src="/mentorship-hero.jpg" // Replace with actual image
            alt="Mentorship"
            layout="fill"
            objectFit="cover"
            className="mix-blend-overlay"
            priority
          />
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="max-w-4xl mx-auto text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              Unlock Your Potential with the Right Mentor
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-300 md:text-xl">
              Connect with experts and accelerate your personal and professional growth
            </p>
            <div className="flex flex-col justify-center gap-4 mt-8 sm:flex-row">
              <Button 
                size="lg"
                className="bg-[#00F5EE] hover:bg-[#00F5EE]/90 text-[#16153A] font-semibold px-8"
              >
                Find a Mentor
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="text-white border-2 border-white hover:bg-white/10"
              >
                Become a Mentor
                <PlayCircle className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search Section - Elevated and more prominent */}
      <section className="relative z-20 max-w-4xl px-4 mx-auto -mt-28">
        <div className="p-6 bg-white shadow-xl rounded-xl">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-grow">
              <Search className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
              <input
                type="text"
                placeholder="Find a mentor by expertise or keyword..."
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#00F5EE] focus:border-transparent outline-none"
              />
            </div>
            <Button className="bg-[#16153A] hover:bg-[#16153A]/90">
              Search Mentors
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section - New */}
      <section className="px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#16153A] mb-16">
            How Saarathi Works
          </h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {[
              {
                icon: <CheckCircle2 className="h-12 w-12 text-[#00F5EE]" />,
                title: "1. Register",
                description: "Create your profile and tell us about your goals"
              },
              {
                icon: <Search className="h-12 w-12 text-[#00F5EE]" />,
                title: "2. Find Your Mentor",
                description: "Browse and connect with experienced mentors"
              },
              {
                icon: <Calendar className="h-12 w-12 text-[#00F5EE]" />,
                title: "3. Schedule Sessions",
                description: "Book sessions at times that work for you"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-6">{step.icon}</div>
                <h3 className="mb-3 text-xl font-semibold">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Mentors - Updated with better cards */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#16153A] mb-16">
            Top Mentors on Saarathi
          </h2>
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {featuredMentors.map((mentor) => (
                <CarouselItem key={mentor.id} className="md:basis-1/3 lg:basis-1/3">
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="border-0 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center">
                          <div className="relative mb-4">
                            <Image
                              src={mentor.image}
                              alt={mentor.name}
                              width={80}
                              height={80}
                              className="rounded-full"
                            />
                            <div className="absolute -bottom-2 -right-2 bg-[#00F5EE] rounded-full p-1">
                              <MessageSquare className="h-4 w-4 text-[#16153A]" />
                            </div>
                          </div>
                          <h3 className="mb-1 text-lg font-semibold">{mentor.name}</h3>
                          <p className="mb-2 text-sm text-gray-600">{mentor.expertise}</p>
                          <div className="flex items-center mb-4">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="ml-1 text-sm font-medium">{mentor.rating}</span>
                          </div>
                          <Button 
                            variant="outline"
                            className="w-full border-[#00F5EE] text-[#00F5EE] hover:bg-[#00F5EE] hover:text-white"
                          >
                            View Profile
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 mt-16 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center">
            Why Choose Saarathi?
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: "👨‍🏫",
                title: "Expert Mentors",
                description: "Learn from industry professionals",
              },
              {
                icon: "🕰️",
                title: "Flexible Learning",
                description: "Schedule sessions at your convenience",
              },
              {
                icon: "🎯",
                title: "Personalized Guidance",
                description: "Tailored advice for your goals",
              },
              {
                icon: "💰",
                title: "Affordable Rates",
                description: "Quality mentorship within your budget",
              },
            ].map((benefit, index) => (
              <Card key={index}>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 text-4xl">{benefit.icon}</div>
                  <h3 className="mb-2 text-lg font-semibold">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {[
              {
                name: "Aisha Kapoor",
                role: "Mentee",
                quote:
                  "Saarathi helped me find the perfect mentor for my career transition. The guidance I received was invaluable!",
                image: "/placeholder.svg?height=80&width=80",
              },
              {
                name: "Rahul Mehta",
                role: "Mentor",
                quote:
                  "As a mentor on Saarathi, I've had the opportunity to connect with amazing mentees and make a real impact. It's a rewarding experience!",
                image: "/placeholder.svg?height=80&width=80",
              },
            ].map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={80}
                    height={80}
                    className="mb-4 rounded-full"
                  />
                  <p className="mb-4 italic">{`"${testimonial.quote}"`}</p>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-muted-foreground">{testimonial.role}</p>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-facebook"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-twitter"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
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

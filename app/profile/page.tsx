"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  MapPin,
  Star,
  Clock,
  Calendar,
  ChevronDown,
  Globe,
  Award,
  CheckCircle,
  MessageSquare,
  DollarSign,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Layout from "../components/layout/layout"
import { getImageWithFallback } from "@/lib/image-fallback"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

// Mock data - Replace with actual data fetching
const mentorData = {
  id: 1,
  name: "Dr. Anita Sharma",
  image: "/images/mentors/mentor-1.jpg",
  verified: true,
  location: "Kathmandu, Nepal",
  primaryLanguage: "Nepali",
  languages: ["English", "Hindi", "Nepali"],
  experience: 8,
  expertise: ["Software Development", "Career Counseling", "Leadership"],
  rating: 4.8,
  reviewCount: 34,
  bio: `Experienced technology leader with a passion for mentoring the next generation of developers. I specialize in software architecture, career development, and helping mentees navigate the tech industry.

  Having worked with startups and Fortune 500 companies, I bring practical insights and proven strategies to help you achieve your career goals.`,
  certifications: [
    {
      name: "AWS Solutions Architect",
      issuer: "Amazon Web Services",
      year: 2023,
      icon: "/icons/aws-cert.png"
    },
    // ... more certifications
  ],
  sessionTypes: [
    {
      type: "1:1 Session",
      rate: 20,
      duration: 60,
      description: "Personalized mentoring tailored to your needs"
    },
    {
      type: "Group Session",
      rate: 10,
      duration: 90,
      description: "Interactive group sessions (max 5 participants)"
    }
  ],
  reviews: [
    {
      id: 1,
      mentee: {
        name: "Sarah Johnson",
        image: "/images/mentees/mentee-1.jpg"
      },
      rating: 5,
      date: "2024-03-15",
      content: "Dr. Sharma's guidance was invaluable in helping me transition into a senior developer role. Her practical advice and industry insights made a real difference."
    },
    // ... more reviews
  ]
}

export default function MentorProfile() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedTab, setSelectedTab] = useState("individual")
  const router = useRouter()

  return (
    <Layout userType="mentor">
      <div className="min-h-screen bg-[#F9F9F9]">
        <main className="container max-w-5xl px-4 py-8 mx-auto">
          {/* Header Section - Updated with new styling */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center mb-12 md:flex-row md:items-start md:space-x-8"
          >
            {/* Profile Image - Enhanced with hover effect */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="relative w-40 h-40 mb-6 md:mb-0 group"
            >
              <Image
                src={getImageWithFallback(mentorData.image, "mentor")}
                alt={mentorData.name}
                width={160}
                height={160}
                className="object-cover rounded-full ring-4 ring-[#00F5EE]/20 transition-transform duration-300 group-hover:scale-105"
              />
              {mentorData.verified && (
                <Badge 
                  className="absolute bottom-2 -right-2 bg-[#16153A] text-white"
                  variant="secondary"
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Verified
                </Badge>
              )}
            </motion.div>

            {/* Profile Info - Updated layout and styling */}
            <div className="flex-1">
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold text-[#16153A] font-titillium mb-4">
                  {mentorData.name}
                </h1>
                
                {/* Stats Grid - New component */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm">
                    <MapPin className="w-5 h-5 mb-2 text-[#00F5EE]" />
                    <span className="text-sm font-medium text-gray-600">{mentorData.location}</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm">
                    <Globe className="w-5 h-5 mb-2 text-[#00F5EE]" />
                    <span className="text-sm font-medium text-gray-600">{mentorData.primaryLanguage}</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm">
                    <Clock className="w-5 h-5 mb-2 text-[#00F5EE]" />
                    <span className="text-sm font-medium text-gray-600">{mentorData.experience}+ Years</span>
                  </div>
                </div>

                {/* Expertise Tags - Updated styling */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-6 md:justify-start">
                  {mentorData.expertise.map((skill) => (
                    <Badge 
                      key={skill}
                      variant="secondary" 
                      className="px-4 py-1 bg-[#16153A]/5 text-[#16153A] hover:bg-[#16153A]/10 transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>

                {/* Rating - Enhanced visual */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center gap-3 md:justify-start"
                >
                  <div className="flex items-center px-4 py-2 bg-white rounded-full shadow-sm">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(mentorData.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2 font-medium text-[#16153A]">
                      {mentorData.rating}
                    </span>
                  </div>
                  <span className="text-gray-600">
                    ({mentorData.reviewCount} reviews)
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Main Content Grid - Updated layout */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left Column */}
            <div className="space-y-8 lg:col-span-2">
              {/* About Section */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-4 text-xl font-bold text-[#16153A]">About</h2>
                  <div className={`prose text-gray-600 ${!isExpanded && "line-clamp-3"}`}>
                    {mentorData.bio}
                  </div>
                  {mentorData.bio.length > 150 && (
                    <Button
                      variant="ghost"
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="mt-2 text-[#16153A]"
                    >
                      {isExpanded ? "Show Less" : "Read More"}
                      <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`} />
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Certifications Section */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-4 text-xl font-bold text-[#16153A]">
                    Certifications & Qualifications
                  </h2>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {mentorData.certifications.map((cert) => (
                      <TooltipProvider key={cert.name}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center p-3 space-x-3 transition-colors rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                              onClick={() => router.push(`/certifications/${cert.id}`)}
                            >
                              <div className="relative w-8 h-8">
                                <Image
                                  src={cert.icon}
                                  alt={cert.name}
                                  fill
                                  className="object-contain"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "/icons/default-cert.png";
                                  }}
                                />
                              </div>
                              <div>
                                <div className="font-medium text-[#16153A]">
                                  {cert.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {cert.issuer}
                                </div>
                              </div>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Issued {cert.year}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Reviews Section */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-6 text-xl font-bold text-[#16153A]">
                    Reviews
                  </h2>
                  <div className="space-y-6">
                    {mentorData.reviews.map((review) => (
                      <div key={review.id} className="pb-6 border-b last:border-0">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="relative w-10 h-10">
                            <Image
                              src={review.mentee.image}
                              alt={review.mentee.name}
                              fill
                              className="object-cover rounded-full"
                            />
                          </div>
                          <div>
                            <div className="font-medium text-[#16153A]">
                              {review.mentee.name}
                            </div>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${
                                    i < review.rating
                                      ? "text-yellow-400 fill-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                              <span className="ml-2 text-sm text-gray-500">
                                {new Date(review.date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600">{review.content}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Booking Section */}
            <div className="space-y-6">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <Tabs defaultValue={mentorData.sessionTypes[0].type} className="w-full">
                    <TabsList className="w-full mb-4 bg-gray-50">
                      {mentorData.sessionTypes.map((session) => (
                        <TabsTrigger
                          key={session.type}
                          value={session.type}
                          className="flex-1 data-[state=active]:bg-[#16153A] data-[state=active]:text-white"
                        >
                          {session.type}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    <AnimatePresence mode="wait">
                      {mentorData.sessionTypes.map((session) => (
                        <TabsContent
                          key={session.type}
                          value={session.type}
                          className="mt-0"
                        >
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-4"
                          >
                            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                              <div className="text-2xl font-bold text-[#16153A]">
                                ${session.rate}
                                <span className="text-base font-normal text-gray-500">
                                  /hour
                                </span>
                              </div>
                              <Badge variant="secondary" className="bg-[#16153A] text-white">
                                {session.duration} min
                              </Badge>
                            </div>
                            <p className="px-1 text-gray-600">
                              {session.description}
                            </p>
                            <div className="space-y-3">
                              <Button 
                                className="w-full bg-[#16153A] text-white hover:bg-[#16153A]/90 transition-all duration-200"
                                onClick={() => router.push(`/booking/${mentorData.id}`)}
                              >
                                <Calendar className="w-4 h-4 mr-2" />
                                Book Session
                              </Button>
                              <Button 
                                variant="outline" 
                                className="w-full border-[#16153A] text-[#16153A] hover:bg-[#16153A] hover:text-white transition-all duration-200"
                                onClick={() => router.push(`/messages/${mentorData.id}`)}
                              >
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Message
                              </Button>
                            </div>
                          </motion.div>
                        </TabsContent>
                      ))}
                    </AnimatePresence>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Languages Section - Updated styling */}
              <Card className="mt-4 overflow-hidden">
                <CardContent className="p-6">
                  <h2 className="mb-4 text-lg font-semibold text-[#16153A]">
                    Languages
                  </h2>
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {mentorData.languages.map((language) => (
                      <motion.div 
                        key={language}
                        whileHover={{ scale: 1.01 }}
                        className={cn(
                          "flex items-center justify-between p-4 transition-all duration-200 rounded-lg",
                          language === mentorData.primaryLanguage 
                            ? "bg-[#16153A]/5 border border-[#16153A]/20" 
                            : "bg-gray-50 hover:bg-gray-100"
                        )}
                      >
                        <span className={cn(
                          "font-medium",
                          language === mentorData.primaryLanguage 
                            ? "text-[#16153A]" 
                            : "text-gray-600"
                        )}>
                          {language}
                        </span>
                        {language === mentorData.primaryLanguage && (
                          <Badge className="bg-[#16153A] text-white hover:bg-[#16153A]/90">
                            Primary
                          </Badge>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  )
} 
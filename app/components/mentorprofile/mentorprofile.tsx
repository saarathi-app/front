"use client";
import Image from "next/image";
import { MapPin, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FaStar } from "react-icons/fa";
import { useEffect } from "react";

const mentor = {
  name: "Nischal Khanal",
  address: "Kirtipur, Kathmandu",
  expertise: ["Web Development", "System Design", "Cloud Architecture"],
  rating: 4.5,
  totalReviews: 128,
  yearsOfExperience: 5,
  languages: ["English", "Nepali", "Hindi"],
  bio: "Passionate software engineer with 5+ years of experience. Specialized in helping developers level up their full-stack development skills.",
  hourlyRate: 50,
  certifications: [
    { name: "AWS Certified Solutions Architect", year: 2023 },
    { name: "Google Cloud Professional", year: 2022 },
  ],
  sessionTypes: {
    individual: {
      price: 50,
      description: "1-on-1 personalized mentoring tailored to your needs",
      benefits: [
        "Personalized learning path",
        "Direct feedback on your code",
        "Flexible scheduling",
      ],
    },
    group: {
      price: 30,
      maxSize: 4,
      description: "Learn with peers in a collaborative environment",
      benefits: [
        "Cost-effective learning",
        "Peer interaction & networking",
        "Collaborative problem solving",
      ],
    },
  },
  testimonials: [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Frontend Developer",
      content:
        "Nischal is an exceptional mentor who helped me master React and modern web development practices. His practical approach and deep knowledge made complex concepts easy to understand.",
      rating: 5,
      date: "March 2024",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Full Stack Engineer",
      content:
        "The system design sessions with Nischal were invaluable. He has a unique ability to break down complex architectural decisions into manageable pieces.",
      rating: 5,
      date: "February 2024",
    },
    {
      id: 3,
      name: "Priya Patel",
      role: "Cloud Engineer",
      content:
        "Thanks to Nischal's guidance, I successfully transitioned into cloud engineering. His AWS expertise and real-world examples were exactly what I needed.",
      rating: 4,
      date: "January 2024",
    },
  ],
};

export default function MentorProfile() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        const prevButton = document.querySelector(
          "[data-carousel-prev]"
        ) as HTMLButtonElement;
        prevButton?.click();
      }
      if (e.key === "ArrowRight") {
        const nextButton = document.querySelector(
          "[data-carousel-next]"
        ) as HTMLButtonElement;
        nextButton?.click();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#16143B] py-8 px-4 text-white">
      {/* Profile Header */}
      <div className="flex items-center max-w-5xl mx-auto mb-8 space-x-6">
        <Image
          alt="Mentor's image"
          src="/placeholder-avatar.jpg"
          width={128}
          height={128}
          className="object-cover w-32 h-32 border-4 border-green-500 rounded-full"
        />
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-green-500">{mentor.name}</h1>
          <div className="flex items-center space-x-2 text-gray-300">
            <MapPin size={16} />
            <span>{mentor.address}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center text-yellow-400">
              <FaStar />
              <span className="ml-1">{mentor.rating}</span>
            </div>
            <span className="text-gray-300">
              ({mentor.totalReviews} reviews)
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {mentor.expertise.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-sm rounded-full bg-green-500/20"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-5xl mx-auto mb-8">
        <h2 className="mb-4 text-2xl font-semibold">About Me</h2>
        <p className="text-gray-300">{mentor.bio}</p>
        <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-2">
          <div>
            <h3 className="mb-2 font-semibold">Languages</h3>
            <div className="flex flex-wrap gap-2">
              {mentor.languages.map((lang) => (
                <span
                  key={lang}
                  className="px-3 py-1 text-sm rounded-full bg-blue-500/20"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">Certifications</h3>
            {mentor.certifications.map((cert) => (
              <div
                key={cert.name}
                className="flex items-center space-x-2 text-sm text-gray-300"
              >
                <Award size={16} className="text-green-500" />
                <span>
                  {cert.name} ({cert.year})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Session Details */}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold text-center">
          Book a Session
        </h2>
        <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
          {/* Individual Sessions Card */}
          <Card className="bg-white/5 border-0 w-full md:w-[450px]">
            <CardContent className="p-6">
              <div className="flex flex-col h-full">
                <h3 className="mb-2 text-xl font-semibold">
                  Individual Session
                </h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-bold text-green-500">
                    ${mentor.sessionTypes.individual.price}
                  </span>
                  <span className="ml-2 text-gray-400">/hour</span>
                </div>
                <p className="mb-4 text-gray-300">
                  {mentor.sessionTypes.individual.description}
                </p>
                <div className="flex-grow mb-6 space-y-3">
                  {mentor.sessionTypes.individual.benefits.map((benefit) => (
                    <div
                      key={benefit}
                      className="flex items-center text-gray-300"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full bg-green-500 hover:bg-green-600">
                  Book Individual Session
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Group Sessions Card */}
          <Card className="bg-white/5 border-0 w-full md:w-[450px]">
            <CardContent className="p-6">
              <div className="flex flex-col h-full">
                <h3 className="mb-2 text-xl font-semibold">Group Session</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-bold text-green-500">
                    ${mentor.sessionTypes.group.price}
                  </span>
                  <span className="ml-2 text-gray-400">/hour per person</span>
                </div>
                <p className="mb-2 text-gray-300">
                  {mentor.sessionTypes.group.description}
                </p>
                <p className="mb-4 text-sm text-gray-400">
                  Max {mentor.sessionTypes.group.maxSize} participants
                </p>
                <div className="flex-grow mb-6 space-y-3">
                  {mentor.sessionTypes.group.benefits.map((benefit) => (
                    <div
                      key={benefit}
                      className="flex items-center text-gray-300"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full bg-green-500 hover:bg-green-600">
                  Book Group Session
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="mb-8">
        <h2 className="mb-6 text-2xl font-semibold text-center">
          What My Mentees Say
        </h2>
        <Carousel
          className="w-full max-w-5xl mx-auto"
          opts={{
            align: "center",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {mentor.testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.id}
                className="flex items-center pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <Card className="h-full border-0 bg-white/5">
                  <CardContent className="flex flex-col justify-between h-full p-6">
                    <div className="flex flex-col space-y-4">
                      {/* Rating */}
                      <div className="flex justify-center text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={
                              i < testimonial.rating
                                ? "text-yellow-400"
                                : "text-gray-600"
                            }
                          />
                        ))}
                      </div>
                      {/* Content */}
                      <p className="text-center text-gray-300 line-clamp-4">
                        {`"${testimonial.content}"`} 
                      </p>
                      {/* Author */}
                      <div className="mt-4 text-center">
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-gray-400">
                          {testimonial.role}
                        </p>
                        <p className="text-sm text-gray-500">
                          {testimonial.date}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious
              className="absolute left-[-20px] top-1/2 transform -translate-y-1/2 bg-green-500/20 hover:bg-green-500/30 border-none text-white"
              variant="outline"
              data-carousel-prev={true}
            />
            <CarouselNext
              className="absolute right-[-20px] top-1/2 transform -translate-y-1/2 bg-green-500/20 hover:bg-green-500/30 border-none text-white"
              variant="outline"
              data-carousel-next={true}
            />
          </div>
        </Carousel>
      </div>
    </div>
  );
}

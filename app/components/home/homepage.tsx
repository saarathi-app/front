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
import { Star, Search, Filter } from "lucide-react";

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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[600px]">
        <Image
          src="/placeholder.svg?height=600&width=1200"
          alt="Diverse mentors and mentees"
          layout="fill"
          objectFit="cover"
          className="brightness-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
          <h1 className="text-5xl font-bold mb-4">
            Find your perfect mentor and unlock your potential
          </h1>
          <p className="text-xl mb-8">
            Expert mentors in various fields, tailored for your needs.
          </p>
          <div className="space-x-4">
            <Button className="bg-[#16153A] hover:bg-[#16153A]/90 text-white">
              Sign Up as a Mentee
            </Button>
            <Button className="bg-[#00F5EE] hover:bg-[#00F5EE]/90 text-[#16153A]">
              Sign Up as a Mentor
            </Button>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="max-w-4xl mx-auto -mt-8 relative z-10 bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center space-x-4">
          {/* <Input
            type="text"
            placeholder="Search for mentors..."
            className="flex-grow"
          /> */}
          <Button>
            <Search className="mr-2 h-4 w-4" /> Search
          </Button>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Filters
          </Button>
        </div>
      </section>

      {/* Featured Mentors */}
      <section className="max-w-6xl mx-auto mt-16">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Featured Mentors
        </h2>
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {featuredMentors.map((mentor) => (
              <CarouselItem
                key={mentor.id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <Card>
                  <CardContent className="flex flex-col items-center p-6">
                    <Image
                      src={mentor.image}
                      alt={mentor.name}
                      width={100}
                      height={100}
                      className="rounded-full mb-4"
                    />
                    <h3 className="font-semibold text-lg">{mentor.name}</h3>
                    <p className="text-muted-foreground">{mentor.expertise}</p>
                    <div className="flex items-center mt-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1">{mentor.rating}</span>
                    </div>
                    <Button className="mt-4">View Profile</Button>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-100 py-16 mt-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Why Choose Saarathi?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">
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
          <h2 className="text-3xl font-bold mb-12 text-center">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                    className="rounded-full mb-4"
                  />
                  <p className="italic mb-4">{`"${testimonial.quote}"`}</p>
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
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Saarathi</h3>
              <p>Connecting mentors and mentees for a brighter future.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
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
              <h4 className="font-semibold mb-4">Connect With Us</h4>
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
              <h4 className="font-semibold mb-4">Language</h4>
              <select className="bg-white text-[#16153A] p-2 rounded">
                <option>English</option>
                <option>Hindi</option>
                <option>Bengali</option>
              </select>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; 2024 Saarathi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

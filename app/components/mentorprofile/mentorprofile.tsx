'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Data Models
interface ExpertiseTag {
  id: string;
  name: string;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  icon: "award" | "check";
}

interface Language {
  name: string;
  level: string;
}

interface Stat {
  value: string;
  label: string;
}

interface SessionType {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface Review {
  id: string;
  authorName: string;
  authorImage: string;
  rating: number;
  date: string;
  content: string;
  helpfulCount: number;
}

interface MentorData {
  id: string;
  name: string;
  profileImage: string;
  location: string;
  rating: number;
  reviewCount: number;
  bio: string[];
  stats: Stat[];
  expertise: ExpertiseTag[];
  certifications: Certification[];
  languages: Language[];
  sessionTypes: SessionType[];
  timeSlots: TimeSlot[];
  reviews: Review[];
}

// Calendar day interface
interface CalendarDay {
  day: number;
  isCurrentMonth: boolean;
  isSelected: boolean;
}

// Example mentor data (replace with your API call)
const mentorData: MentorData = {
  id: "alex-123",
  name: "Alex Richardson",
  profileImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3",
  location: "San Francisco, CA",
  rating: 4.9,
  reviewCount: 128,
  bio: [
    "I'm a senior software engineer with over a decade of experience in full-stack development, specializing in React, Node.js, and cloud architecture. After leading teams at several Fortune 500 companies and startups, I now dedicate my time to mentoring the next generation of developers.",
    "My approach to mentoring focuses on practical problem-solving skills and career navigation. I believe in teaching not just coding, but the soft skills and industry knowledge that make great engineers stand out. Whether you're just starting your journey or looking to advance to a senior role, I'm here to help you grow."
  ],
  stats: [
    { value: "10+", label: "Years Experience" },
    { value: "250+", label: "Sessions" },
    { value: "5", label: "Languages" },
    { value: "92%", label: "Satisfaction Rate" }
  ],
  expertise: [
    { id: "react", name: "React.js" },
    { id: "node", name: "Node.js" },
    { id: "aws", name: "AWS" },
    { id: "system-design", name: "System Design" },
    { id: "frontend", name: "Frontend Architecture" },
    { id: "career", name: "Career Development" }
  ],
  certifications: [
    { id: "aws", name: "AWS Certified Solutions Architect", issuer: "Amazon Web Services", icon: "award" },
    { id: "gcp", name: "Google Cloud Professional", issuer: "Google Cloud Platform", icon: "award" },
    { id: "scrum", name: "Certified Scrum Master", issuer: "Scrum Alliance", icon: "check" },
    { id: "ms", name: "M.S. Computer Science", issuer: "Stanford University", icon: "check" }
  ],
  languages: [
    { name: "English", level: "Native" },
    { name: "Spanish", level: "Fluent" },
    { name: "French", level: "Intermediate" }
  ],
  sessionTypes: [
    { id: "one-on-one", name: "One-on-One Session", description: "Personalized mentoring tailored to your needs", price: 120 },
    { id: "group", name: "Group Session (3-5 people)", description: "Collaborative learning with peers", price: 65 },
    { id: "code-review", name: "Code Review", description: "Detailed feedback on your project", price: 150 }
  ],
  timeSlots: [
    { id: "1", time: "10:00 AM", available: true },
    { id: "2", time: "11:30 AM", available: true },
    { id: "3", time: "1:00 PM", available: true },
    { id: "4", time: "2:30 PM", available: true },
    { id: "5", time: "4:00 PM", available: true },
    { id: "6", time: "5:30 PM", available: true }
  ],
  reviews: [
    {
      id: "r1",
      authorName: "Sarah Johnson",
      authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3",
      rating: 5,
      date: "3 weeks ago",
      content: "Alex was incredibly helpful in preparing me for my senior developer interviews. His system design knowledge is exceptional, and he provided practical advice that helped me secure offers from two top tech companies. The mock interviews were particularly valuable.",
      helpfulCount: 24
    },
    {
      id: "r2",
      authorName: "Michael Chen",
      authorImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3",
      rating: 4,
      date: "2 months ago",
      content: "Alex has a deep understanding of React and frontend architecture. Our mentoring sessions helped me refactor a complex application and implement better state management. Would definitely recommend for mid to senior developers looking to level up.",
      helpfulCount: 18
    },
    {
      id: "r3",
      authorName: "David Rodriguez",
      authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3",
      rating: 5,
      date: "3 months ago",
      content: "Coming from a non-CS background, I was struggling with system design concepts. Alex broke down complex topics into digestible pieces and created a personalized learning path for me. After 6 months of mentorship, I successfully transitioned to a backend role. Forever grateful!",
      helpfulCount: 32
    }
  ]
};

// Icons
const MapPinIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-5 w-5 mr-1" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const AwardIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-6 w-6" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="12" cy="8" r="7"></circle>
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
  </svg>
);

const CheckIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-6 w-6" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={`h-5 w-5 ${filled ? 'text-yellow-400' : 'text-gray-300'}`} 
    viewBox="0 0 24 24" 
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const MessageIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-5 w-5 mr-1" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
    <polyline points="16 6 12 2 8 6"></polyline>
    <line x1="12" y1="2" x2="12" y2="15"></line>
  </svg>
);

const ThumbsUpIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-4 w-4 mr-1" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
  </svg>
);

const ChevronLeftIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-6 w-6" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const ChevronRightIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-6 w-6" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const CalendarIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-5 w-5 mr-2" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

// -------------------- ProfileHeader Components --------------------
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <StarIcon key={i} filled={i < Math.floor(rating)} />
      ))}
    </div>
  );
};

const StatCard = ({ stat }: { stat: Stat }) => {
  return (
    <div className="text-center p-3 bg-gray-50 rounded-lg">
      <p className="font-bold text-2xl text-[#16153A]">{stat.value}</p>
      <p className="text-gray-600 text-sm">{stat.label}</p>
    </div>
  );
};

function ProfileHeader({ mentor }: { mentor: MentorData }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
      <div className="relative h-32 bg-[#16153A]">
        <div className="absolute -bottom-16 left-8">
          <div className="relative w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white">
            <Image 
              src={mentor.profileImage} 
              alt={`${mentor.name} profile picture`} 
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      
      <div className="pt-20 pb-6 px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#16153A]">{mentor.name}</h1>
            <div className="flex items-center mt-2 text-gray-600">
              <MapPinIcon />
              <span>{mentor.location}</span>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end">
            <div className="flex items-center">
              <div className="flex mr-2">
                <StarRating rating={mentor.rating} />
              </div>
              <span className="font-semibold text-[#16153A]">{mentor.rating}</span>
              <span className="text-gray-500 ml-1">({mentor.reviewCount} reviews)</span>
            </div>
            <button 
              className="mt-2 bg-[#00F5EE] hover:bg-opacity-80 text-[#16153A] font-semibold transition-all duration-300 flex items-center px-4 py-2 rounded-md"
            >
              <MessageIcon />
              Message
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 border-t border-gray-200 pt-6">
          {mentor.stats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>
      </div>
    </div>
  );
}

// -------------------- About Section Components --------------------
const ExpertiseTagItem = ({ tag }: { tag: ExpertiseTag }) => {
  return (
    <span className="px-3 py-1 bg-[#16153A] bg-opacity-10 text-[#16153A] rounded-full text-sm">
      {tag.name}
    </span>
  );
};

const CertificationItem = ({ certification }: { certification: Certification }) => {
  return (
    <div className="flex items-center p-3 border border-gray-200 rounded-lg">
      <div className="flex-shrink-0 mr-3 text-[#16153A]">
        {certification.icon === "award" ? (
          <AwardIcon />
        ) : (
          <CheckIcon />
        )}
      </div>
      <div>
        <h4 className="font-semibold">{certification.name}</h4>
        <p className="text-sm text-gray-600">{certification.issuer}</p>
      </div>
    </div>
  );
};

const LanguageItem = ({ language }: { language: Language }) => {
  return (
    <div className="flex items-center px-3 py-1.5 bg-gray-100 rounded-lg">
      <span className="font-medium">{language.name}</span>
      <span className="ml-2 text-xs text-gray-500">({language.level})</span>
    </div>
  );
};

function AboutSection({ mentor }: { mentor: MentorData }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <h2 className="text-2xl font-semibold text-[#16153A] mb-4">About</h2>
      
      {mentor.bio.map((paragraph, index) => (
        <p key={index} className="mb-6 text-gray-700 leading-relaxed">
          {paragraph}
        </p>
      ))}
      
      <h3 className="text-lg font-semibold text-[#16153A] mb-3">Areas of Expertise</h3>
      <div className="flex flex-wrap gap-2 mb-6">
        {mentor.expertise.map((tag) => (
          <ExpertiseTagItem key={tag.id} tag={tag} />
        ))}
      </div>
      
      <h3 className="text-lg font-semibold text-[#16153A] mb-3">Certifications & Qualifications</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mentor.certifications.map((certification) => (
          <CertificationItem key={certification.id} certification={certification} />
        ))}
      </div>
      
      <h3 className="text-lg font-semibold text-[#16153A] mb-3 mt-6">Languages Spoken</h3>
      <div className="flex flex-wrap gap-3">
        {mentor.languages.map((language, index) => (
          <LanguageItem key={index} language={language} />
        ))}
      </div>
    </div>
  );
}

// -------------------- Reviews Section Components --------------------
const ReviewItem = ({ review }: { review: Review }) => {
  return (
    <div className="bg-white rounded-lg p-6 lg:p-8 shadow-sm h-full">
      <div className="flex items-center mb-6">
        <div className="relative w-14 h-14 rounded-full mr-4 overflow-hidden flex-shrink-0">
          <Image 
            src={review.authorImage} 
            alt={`${review.authorName} profile`}
            width={56}
            height={56}
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{review.authorName}</h3>
          <div className="flex items-center mt-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} filled={i < review.rating} />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">{review.date}</span>
          </div>
        </div>
      </div>
      
      <blockquote className="text-gray-700 mb-6 text-base md:text-lg leading-relaxed">
        "{review.content}"
      </blockquote>
      
      <div className="flex items-center text-sm text-gray-500">
        <button className="flex items-center hover:text-[#16153A] transition-colors">
          <ThumbsUpIcon />
          <span className="ml-1">Helpful ({review.helpfulCount})</span>
        </button>
      </div>
    </div>
  );
};

function ReviewsSection({ mentor }: { mentor: MentorData }) {
  const [sortOption, setSortOption] = useState<"recent" | "helpful" | "highest" | "lowest">("recent");
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Sort reviews based on selected option
  const sortedReviews = [...mentor.reviews].sort((a, b) => {
    switch(sortOption) {
      case "helpful":
        return b.helpfulCount - a.helpfulCount;
      case "highest":
        return b.rating - a.rating;
      case "lowest":
        return a.rating - b.rating;
      case "recent":
      default:
        // For simplicity we're just using the original order as "recent"
        return 0;
    }
  });
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value as "recent" | "helpful" | "highest" | "lowest");
    setActiveIndex(0); // Reset to first review when sorting changes
  };
  
  const nextSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === sortedReviews.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? sortedReviews.length - 1 : prevIndex - 1
    );
  };
  
  // Get current review
  const currentReview = sortedReviews[activeIndex];
  
  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-[#16153A]">Reviews</h2>
        
        <div className="flex space-x-2">
          <select 
            className="bg-white border border-gray-300 text-gray-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00F5EE]"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="recent">Most Recent</option>
            <option value="helpful">Most Helpful</option>
            <option value="highest">Highest Rated</option>
            <option value="lowest">Lowest Rated</option>
          </select>
        </div>
      </div>
      
      <div className="relative w-full overflow-hidden mb-6">
        {/* Single Review Display */}
        <div className="max-w-2xl mx-auto">
          <ReviewItem review={currentReview} />
        </div>
        
        {/* Review Navigation */}
        <div className="flex justify-between items-center mt-8">
          <button 
            onClick={prevSlide} 
            className="flex items-center bg-[#00F5EE] text-[#16153A] hover:bg-opacity-80 transition-opacity rounded-full p-2"
            aria-label="Previous review"
          >
            <ChevronLeftIcon />
          </button>
          
          <div className="text-center">
            <div className="flex justify-center space-x-1 mb-2">
              {sortedReviews.map((_, index) => (
                <div 
                  key={index} 
                  className={`h-2 w-2 rounded-full ${index === activeIndex ? 'bg-[#00F5EE]' : 'bg-gray-300'}`}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
            <p className="text-sm text-gray-500">
              {activeIndex + 1} of {sortedReviews.length}
            </p>
          </div>
          
          <button 
            onClick={nextSlide} 
            className="flex items-center bg-[#00F5EE] text-[#16153A] hover:bg-opacity-80 transition-opacity rounded-full p-2"
            aria-label="Next review"
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <Link href="#" className="text-[#16153A] hover:text-[#00F5EE] font-medium">
          View all {mentor.reviewCount} reviews
        </Link>
      </div>
    </div>
  );
}

// -------------------- Booking Section Component --------------------
function SessionBookingCard({ mentor }: { mentor: MentorData }) {
  const [selectedSessionType, setSelectedSessionType] = useState<string>(mentor.sessionTypes[0]?.id || '');
  const [selectedDate, setSelectedDate] = useState<number>(3); // Default to 3rd of the month
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  
  // Generate calendar data (simplified for this example)
  const calendarDays: CalendarDay[] = [
    { day: 28, isCurrentMonth: false, isSelected: false },
    { day: 29, isCurrentMonth: false, isSelected: false },
    { day: 30, isCurrentMonth: false, isSelected: false },
    { day: 31, isCurrentMonth: false, isSelected: false },
    ...Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      isCurrentMonth: true,
      isSelected: i + 1 === selectedDate
    }))
  ];
  
  // UI helpers
  const getSessionTypeClasses = (sessionId: string) => {
    return `flex items-center justify-between p-3 border ${
      selectedSessionType === sessionId 
        ? 'border-2 border-[#00F5EE]' 
        : 'border-gray-200'
    } rounded-lg cursor-pointer hover:border-[#00F5EE]`;
  };
  
  const getCalendarDayClasses = (day: CalendarDay) => {
    if (!day.isCurrentMonth) return "text-center py-1 text-gray-300";
    
    return `text-center rounded-full w-8 h-8 mx-auto flex items-center justify-center ${
      day.isSelected 
        ? 'text-[#16153A] bg-[#00F5EE]' 
        : 'text-gray-700 hover:bg-gray-100'
    } cursor-pointer`;
  };
  
  const getTimeSlotClasses = (slotId: string) => {
    return `text-center py-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-[#00F5EE] hover:text-[#16153A] font-medium availability-slot ${
      selectedTimeSlot === slotId ? 'bg-[#00F5EE] text-[#16153A]' : ''
    }`;
  };
  
  const handleBookSession = () => {
    if (selectedSessionType && selectedDate && selectedTimeSlot) {
      console.log('Booking:', {
        mentorId: mentor.id,
        sessionType: selectedSessionType,
        date: selectedDate,
        timeSlot: selectedTimeSlot
      });
      // Here you would typically call your booking API
      alert('Booking request submitted!');
    } else {
      alert('Please select a session type, date, and time slot');
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
      <h2 className="text-xl font-semibold text-[#16153A] mb-4">Book a Session</h2>
      
      <div className="space-y-3 mb-6">
        {mentor.sessionTypes.map((sessionType) => (
          <div 
            key={sessionType.id}
            className={getSessionTypeClasses(sessionType.id)}
            onClick={() => setSelectedSessionType(sessionType.id)}
          >
            <div>
              <h3 className="font-medium">{sessionType.name}</h3>
              <p className="text-sm text-gray-600">{sessionType.description}</p>
            </div>
            <div className="text-lg font-semibold text-[#16153A]">${sessionType.price}/hr</div>
          </div>
        ))}
      </div>
      
      <h3 className="font-semibold text-[#16153A] mb-3">Choose a date & time</h3>
      
      <div className="flex justify-between items-center mb-4">
        <button className="text-gray-600 hover:text-[#16153A]">
          <ChevronLeftIcon />
        </button>
        <span className="font-medium">September 2023</span>
        <button className="text-gray-600 hover:text-[#16153A]">
          <ChevronRightIcon />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-6">
        {/* Day headers */}
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
          <div key={day} className="text-center text-xs text-gray-500">{day}</div>
        ))}
        
        {/* Calendar days */}
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={getCalendarDayClasses(day)}
            onClick={() => day.isCurrentMonth && setSelectedDate(day.day)}
          >
            {day.day}
          </div>
        ))}
      </div>
      
      <h3 className="font-semibold text-[#16153A] mb-3">Available time slots for Sep {selectedDate}</h3>
      <div className="grid grid-cols-2 gap-2 mb-6">
        {mentor.timeSlots.map((slot) => (
          <div
            key={slot.id}
            className={getTimeSlotClasses(slot.id)}
            onClick={() => setSelectedTimeSlot(slot.id)}
          >
            {slot.time}
          </div>
        ))}
      </div>
      
      <button 
        className="w-full py-3 bg-[#16153A] hover:bg-opacity-90 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center"
        onClick={handleBookSession}
      >
        <CalendarIcon />
        Book Session
      </button>
      
      <p className="text-xs text-gray-500 text-center mt-4">
        You won't be charged until after the session is completed. Cancellations made 24 hours in advance receive a full refund.
      </p>
    </div>
  );
}

// Main MentorProfilePage component
export default function MentorProfilePage() {
  // In a real app, you would fetch mentor data based on the ID
  const mentor = mentorData;
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Profile Header */}
        <ProfileHeader mentor={mentor} />
        
        {/* Main Content - 2 column layout on large screens */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Column */}
          <div className="w-full lg:w-2/3 space-y-8">
            {/* About Section */}
            <AboutSection mentor={mentor} />
            
            {/* Reviews Section */}
            <ReviewsSection mentor={mentor} />
          </div>
          
          {/* Sidebar Column */}
          <div className="w-full lg:w-1/3">
            {/* Session Booking Card */}
            <SessionBookingCard mentor={mentor} />
          </div>
        </div>
      </div>
    </div>
  );
}
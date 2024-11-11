"use client";
import Image from "next/image";
import { MapPin, Award, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FaStar } from "react-icons/fa";

const MENTEE_DATA = {
  name: "John Smith",
  address: "San Francisco, CA",
  interests: ["Frontend Development", "Mobile Apps", "UI/UX Design"],
  rating: 4.0,
  totalSessions: 24,
  languages: ["English", "Spanish"],
  bio: "Aspiring software developer with a passion for creating beautiful user interfaces. Currently focusing on React and React Native development.",
  learningStyles: ["Visual", "Reading/Writing"] as const,
  goals: [
    "Master React and Next.js",
    "Build a professional portfolio",
    "Land a frontend developer role"
  ],
  achievements: [
    { name: "Completed React Bootcamp", year: 2023 },
    { name: "Built 5 Full-Stack Projects", year: 2023 },
  ],
  preferredSessions: {
    availability: ["Weekday Evenings", "Weekend Mornings"],
    timeZone: "PST",
    sessionLength: "1 hour"
  }
};

export default function MenteeProfile() {
  return (
    <div className="min-h-screen bg-[#16143B] py-8 px-4 text-white">
      {/* Profile Header */}
      <div className="flex items-center space-x-6 mb-8 max-w-5xl mx-auto">
        <Image
          alt="Mentee's image"
          src="/placeholder-avatar.jpg"
          width={128}
          height={128}
          className="w-32 h-32 rounded-full border-4 object-cover border-green-500"
        />
        <div className="space-y-2">
          <h1 className="text-green-500 text-3xl font-bold">{MENTEE_DATA.name}</h1>
          <div className="flex items-center space-x-2 text-gray-300">
            <MapPin size={16} />
            <span>{MENTEE_DATA.address}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center text-yellow-400">
              <FaStar />
              <span className="ml-1">{MENTEE_DATA.rating}</span>
            </div>
            <span className="text-gray-300">
              ({MENTEE_DATA.totalSessions} sessions completed)
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {MENTEE_DATA.interests.map((interest) => (
              <span
                key={interest}
                className="px-3 py-1 bg-green-500/20 rounded-full text-sm"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="mb-8 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">About Me</h2>
        <p className="text-gray-300">{MENTEE_DATA.bio}</p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Languages</h3>
            <div className="flex flex-wrap gap-2">
              {MENTEE_DATA.languages.map((lang) => (
                <span
                  key={lang}
                  className="px-3 py-1 bg-blue-500/20 rounded-full text-sm"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Learning Style</h3>
            <div className="flex flex-wrap gap-2">
              {["Visual", "Auditory", "Reading/Writing", "Kinesthetic"].map((style) => (
                <span
                  key={style}
                  className={`px-3 py-1 rounded-full text-sm ${
                    MENTEE_DATA.learningStyles.includes(style as "Visual" | "Reading/Writing")
                      ? 'bg-green-500/20 text-white'
                      : 'bg-white/5 text-gray-300'
                  }`}
                >
                  {style}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Goals & Achievements */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Goals & Achievements
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          {/* Goals Card */}
          <Card className="bg-white/5 border-0 w-full md:w-[450px]">
            <CardContent className="p-6">
              <div className="flex flex-col h-full">
                <h3 className="text-xl font-semibold mb-4">Learning Goals</h3>
                <div className="space-y-3">
                  {MENTEE_DATA.goals.map((goal) => (
                    <div
                      key={goal}
                      className="flex items-center text-gray-300"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2" />
                      <span>{goal}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements Card */}
          <Card className="bg-white/5 border-0 w-full md:w-[450px]">
            <CardContent className="p-6">
              <div className="flex flex-col h-full">
                <h3 className="text-xl font-semibold mb-4">Achievements</h3>
                {MENTEE_DATA.achievements.map((achievement) => (
                  <div
                    key={achievement.name}
                    className="flex items-center space-x-2 text-gray-300 mb-3"
                  >
                    <Award size={16} className="text-green-500" />
                    <span>
                      {achievement.name} ({achievement.year})
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Session Preferences */}
      <div className="mb-8 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Session Preferences</h2>
        <Card className="bg-white/5 border-0">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Availability</h3>
                <div className="space-y-2">
                  {MENTEE_DATA.preferredSessions.availability.map((time) => (
                    <div key={time} className="text-gray-300 flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2" />
                      {time}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Time Zone</h3>
                <p className="text-gray-300">{MENTEE_DATA.preferredSessions.timeZone}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Preferred Length</h3>
                <p className="text-gray-300">{MENTEE_DATA.preferredSessions.sessionLength}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
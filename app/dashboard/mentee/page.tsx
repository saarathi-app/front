"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { routes } from "@/lib/navigation";
import { getImageWithFallback } from "@/lib/image-fallback";
import {
  Calendar,
  Users,
  Bell,
  Search,
  ChevronDown,
  Star,
  Target,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Sidebar } from "@/app/components/dashboard/sidebar";

// Mock data for demonstration
const upcomingSessions = [
  {
    id: 1,
    mentor: {
      name: "Dr. Anita Sharma",
      image: "/images/mentors/mentor-1.jpg",
      expertise: "Data Science",
    },
    topic: "Introduction to Machine Learning Concepts",
    date: "2024-04-15",
    time: "10:00 AM",
    status: "confirmed",
  },
  // ... more sessions
];

const recommendedMentors = [
  {
    id: 1,
    name: "Rajesh Kumar",
    expertise: "Business Strategy",
    rating: 4.8,
    image: "/images/mentors/mentor-2.jpg",
    hourlyRate: 75,
  },
  // ... more mentors
];

// Add new mock data for goals
const goals = [
  {
    id: 1,
    title: "Complete Data Analysis Training",
    progress: 70,
    deadline: "2024-05-01",
    tasks: [
      { id: 1, title: "Review SQL Basics", completed: true },
      { id: 2, title: "Practice Python Data Analysis", completed: true },
      { id: 3, title: "Complete Statistics Module", completed: false },
    ],
  },
  // ... more goals
];

export default function MenteeDashboard() {
  const { user, isLoading, switchUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'mentee')) {
      router.push(routes.auth.login);
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user || user.role !== 'mentee') {
    return null; // Will redirect in useEffect
  }

  const [activeTab] = useState("upcoming");

  return (
    <div className="flex min-h-screen bg-[#F9F9F9]">
      <Sidebar userType="mentee" />

      {/* Main Content */}
      <main className="flex-1 px-8 py-6 ml-64">
        {/* Top Navigation */}
        <header className="flex items-center justify-between mb-8">
          <div className="relative w-96">
            <Search className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
            <Input
              placeholder="Find mentors or sessions..."
              className="pl-10"
            />
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#16153A] text-white text-xs">
                2
              </span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <div className="relative w-8 h-8 overflow-hidden rounded-full">
                    <Image
                      src={getImageWithFallback(user.image, "mentee")}
                      alt={user.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push(routes.dashboard.profile)}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push(routes.profile.settings)}>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-red-600"
                  onClick={() => {
                    router.push(routes.home)
                    switchUser(null)
                  }}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#16153A]">
            Mentee Dashboard
          </h1>
          <p className="mt-2 text-gray-500">
            Welcome back, Sarah! Here&apos;s your learning journey overview.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Scheduled Sessions",
              value: "3",
              icon: Calendar,
              color: "text-blue-500",
            },
            {
              label: "Favorite Mentors",
              value: "5",
              icon: Star,
              color: "text-yellow-500",
            },
            {
              label: "Learning Hours",
              value: "24",
              icon: Clock,
              color: "text-green-500",
            },
            {
              label: "Goals Progress",
              value: "75%",
              icon: Target,
              color: "text-purple-500",
            },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardContent className="flex items-center gap-4 p-6">
                <div className={`rounded-lg bg-opacity-10 p-3 ${stat.color}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-[#16153A]">
                    {stat.value}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sessions Section */}
        <div className="mb-8">
          <Tabs defaultValue="upcoming" className="w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#16153A]">
                Your Sessions
              </h2>
              <TabsList>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="upcoming">
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <Card key={session.id}>
                    <CardContent className="flex items-center justify-between p-6">
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 overflow-hidden rounded-full">
                          <Image
                            src={session.mentor.image}
                            alt={session.mentor.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#16153A]">
                            {session.mentor.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {session.topic}
                          </p>
                          <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            {session.date} at {session.time}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          className="bg-[#16153A] text-white hover:bg-[#16153A]/90"
                        >
                          Join Call
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="completed">
              <p className="text-gray-500">No completed sessions yet.</p>
            </TabsContent>
          </Tabs>
        </div>

        {/* Recommended Mentors */}
        <div>
          <h2 className="mb-6 text-2xl font-bold text-[#16153A]">
            Recommended Mentors
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recommendedMentors.map((mentor) => (
              <Card
                key={mentor.id}
                className="overflow-hidden transition-all hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative w-20 h-20 overflow-hidden rounded-full">
                      <Image
                        src={mentor.image}
                        alt={mentor.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold text-[#16153A]">
                        {mentor.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {mentor.expertise}
                      </p>
                      <div className="flex items-center justify-center gap-1 mt-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-medium">
                          {mentor.rating}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        ${mentor.hourlyRate}/hour
                      </p>
                    </div>
                    <Button className="w-full bg-[#16153A] text-white hover:bg-[#16153A]/90">
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Goals Progress Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#16153A]">Your Goals</h2>
            <Button
              size="sm"
              className="bg-[#16153A] text-white hover:bg-[#16153A]/90"
            >
              Add Goal
            </Button>
          </div>
          <div className="grid gap-4">
            {goals.map((goal) => (
              <Card key={goal.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-[#16153A]">
                        {goal.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Due {new Date(goal.deadline).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant="secondary">{goal.progress}% Complete</Badge>
                  </div>
                  <Progress value={goal.progress} className="mb-4" />
                  <div className="space-y-2">
                    {goal.tasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center gap-2 text-sm"
                      >
                        <div
                          className={`w-4 h-4 rounded-full ${
                            task.completed ? "bg-green-500" : "bg-gray-200"
                          }`}
                        />
                        <span
                          className={
                            task.completed ? "line-through text-gray-400" : ""
                          }
                        >
                          {task.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

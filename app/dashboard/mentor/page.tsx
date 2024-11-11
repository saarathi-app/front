"use client"

import { useState } from "react"
import {
  Calendar,
  Bell,
  Search,
  ChevronDown,
  Star,
  Clock,
  Users,
  DollarSign,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { Sidebar } from "@/app/components/dashboard/sidebar"

// Mock data for demonstration
const upcomingSessions = [
  {
    id: 1,
    mentee: {
      name: "Sarah Johnson",
      image: "/images/mentees/mentee-1.jpg",
      goal: "Discuss career transition into product management",
    },
    date: "2024-04-15",
    time: "10:00 AM",
    status: "confirmed",
  },
  // ... more sessions
]

const sessionRequests = [
  {
    id: 1,
    mentee: {
      name: "Alex Chen",
      image: "/images/mentees/mentee-2.jpg",
    },
    message: "Would love to get your insights on startup scaling strategies",
    date: "2024-04-16",
    time: "2:00 PM",
    budget: 75,
  },
  // ... more requests
]

export default function MentorDashboard() {
  const [activeTab] = useState("upcoming")

  return (
    <div className="flex min-h-screen bg-[#F9F9F9]">
      <Sidebar userType="mentor" />

      {/* Main Content */}
      <main className="flex-1 px-8 py-6 ml-64">
        {/* Top Navigation */}
        <header className="flex items-center justify-between mb-8">
          <div className="relative w-96">
            <Search className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
            <Input
              placeholder="Search sessions or mentees..."
              className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-[#00F5EE] focus:border-transparent"
            />
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#16153A] text-white text-xs">
                3
              </span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <div className="relative w-8 h-8 overflow-hidden rounded-full">
                    <Image
                      src="/images/mentors/mentor-1.jpg"
                      alt="Profile"
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
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#16153A]">Mentor Dashboard</h1>
          <p className="mt-2 text-gray-500">
            Hello, Dr. Anita! Here&apos;s your overview for today.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Upcoming Sessions",
              value: "3",
              icon: Calendar,
              color: "text-blue-500",
            },
            {
              label: "New Requests",
              value: "5",
              icon: Users,
              color: "text-purple-500",
            },
            {
              label: "Monthly Earnings",
              value: "$1,250",
              icon: DollarSign,
              color: "text-green-500",
            },
            {
              label: "Rating",
              value: "4.9",
              icon: Star,
              color: "text-yellow-500",
            },
          ].map((stat) => (
            <Card key={stat.label} className="transition-all duration-200 hover:shadow-md">
              <CardContent className="flex items-center gap-4 p-6">
                <div className={`rounded-lg bg-opacity-10 p-3 ${stat.color} transition-colors duration-200 hover:bg-opacity-20`}>
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
              <h2 className="text-2xl font-bold text-[#16153A]">Your Sessions</h2>
              <TabsList className="grid w-[400px] grid-cols-2 transition-all duration-200">
                <TabsTrigger 
                  value="upcoming"
                  className="data-[state=active]:bg-[#16153A] data-[state=active]:text-white transition-all duration-200"
                >
                  Upcoming
                </TabsTrigger>
                <TabsTrigger 
                  value="completed"
                  className="data-[state=active]:bg-[#16153A] data-[state=active]:text-white transition-all duration-200"
                >
                  Completed
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="upcoming">
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <Card key={session.id} className="transition-all duration-200 hover:shadow-md">
                    <CardContent className="flex items-center justify-between p-6 space-x-4">
                      <div className="flex items-center gap-6">
                        <div className="relative overflow-hidden rounded-full w-14 h-14 ring-2 ring-offset-2 ring-gray-100">
                          <Image
                            src={session.mentee.image}
                            alt={session.mentee.name}
                            fill
                            className="object-cover transition-transform duration-200 hover:scale-105"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#16153A]">
                            {session.mentee.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {session.mentee.goal}
                          </p>
                          <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            {session.date} at {session.time}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="transition-colors duration-200 hover:bg-gray-50 border-[#16153A] text-[#16153A]"
                        >
                          Reschedule
                        </Button>
                        <Button 
                          variant="default" 
                          size="sm"
                          className="bg-[#16153A] text-white hover:bg-[#16153A]/90 transition-colors duration-200"
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

        {/* Requests Section */}
        <div>
          <h2 className="mb-6 text-2xl font-bold text-[#16153A]">
            Session Requests
          </h2>
          <div className="space-y-4">
            {sessionRequests.map((request) => (
              <Card key={request.id}>
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 overflow-hidden rounded-full">
                      <Image
                        src={request.mentee.image}
                        alt={request.mentee.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#16153A]">
                        {request.mentee.name}
                      </h3>
                      <p className="text-sm text-gray-500">{request.message}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {request.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {request.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          ${request.budget}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      Decline
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-[#16153A] text-white hover:bg-[#16153A]/90 transition-colors duration-200"
                    >
                      Accept
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

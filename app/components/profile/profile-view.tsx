"use client"

import { motion } from "framer-motion"
import {
  MapPin,
  Star,
  Clock,
  Calendar,
  Globe,
  Award,
  CheckCircle,
  MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getImageWithFallback } from "@/lib/image-fallback"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface ProfileViewProps {
  profileData: {
    id: string | number
    name: string
    image?: string
    role: 'mentor' | 'mentee'
    verified?: boolean
    location?: string
    primaryLanguage?: string
    languages?: string[]
    experience?: number
    expertise?: string[]
    rating?: number
    reviewCount?: number
    bio?: string
    hourlyRate?: number
    availability?: string[]
    sessionTypes?: Array<{
      type: string
      duration: number
      price: number
    }>
  }
  isOwnProfile?: boolean
  viewerRole?: 'mentor' | 'mentee' | null
}

export function ProfileView({ 
  profileData,
  isOwnProfile = false,
  viewerRole = null
}: ProfileViewProps) {
  const router = useRouter()

  return (
    <div className="container max-w-7xl px-4 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Left Column - Main Profile */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <Avatar className="w-32 h-32">
                  <AvatarImage 
                    src={getImageWithFallback(profileData.image, profileData.role)} 
                    alt={profileData.name}
                  />
                  <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-3xl font-bold">{profileData.name}</h1>
                    {profileData.verified && (
                      <CheckCircle className="w-6 h-6 text-blue-500" />
                    )}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-gray-500" />
                      <span>{profileData.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-gray-500" />
                      <span>{profileData.primaryLanguage}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-gray-500" />
                      <span>{profileData.experience}+ Years</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{profileData.bio}</p>

                  <div className="flex flex-wrap gap-2">
                    {profileData.expertise?.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional sections like Reviews, etc. */}
        </div>

        {/* Right Column - Booking & Contact */}
        <div className="space-y-6">
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold">
                    ${profileData.hourlyRate}
                    <span className="text-base font-normal text-gray-500">/hour</span>
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-medium">{profileData.rating}</span>
                    <span className="text-gray-500">({profileData.reviewCount})</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  className="w-full bg-[#16153A] hover:bg-[#16153A]/90"
                  onClick={() => router.push(`/booking/${profileData.id}`)}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Session
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => router.push(`/messages/${profileData.id}`)}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Message
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 
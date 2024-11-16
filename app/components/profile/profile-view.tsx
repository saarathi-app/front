"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  MapPin, Star, Clock, Calendar, ChevronDown, Globe,
  Award, CheckCircle, MessageSquare
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getImageWithFallback } from "@/lib/image-fallback"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

export function ProfileView({ profileData }: { profileData: any }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <main className="container max-w-5xl px-4 py-8 mx-auto">
        {/* Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mb-12 md:flex-row md:items-start md:space-x-8"
        >
          {/* Profile Image */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="relative w-40 h-40 mb-6 md:mb-0 group"
          >
            <Image
              src={getImageWithFallback(profileData.image, "mentor")}
              alt={profileData.name}
              width={160}
              height={160}
              className="object-cover rounded-full ring-4 ring-[#00F5EE]/20"
            />
            {profileData.verified && (
              <Badge className="absolute bottom-2 -right-2 bg-[#16153A] text-white">
                <CheckCircle className="w-4 h-4 mr-1" />
                Verified
              </Badge>
            )}
          </motion.div>

          {/* Profile Info */}
          {/* ... rest of the profile view implementation ... */}
        </motion.div>
      </main>
    </div>
  )
} 
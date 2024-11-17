"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Layout from "@/components/layout/layout"
import { ProfileView } from "@/components/profile/profile-view"
import { useAuth } from "@/contexts/auth-context"

export default function PublicProfile() {
  const params = useParams()
  const { user } = useAuth()
  const username = params.username as string
  const [profileData, setProfileData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Replace with actual API call
    setProfileData({
      id: username,
      name: "Dr. Anita Sharma",
      role: "mentor",
      image: "/images/mentors/mentor-1.jpg",
      verified: true,
      location: "Kathmandu, Nepal",
      primaryLanguage: "Nepali",
      languages: ["English", "Hindi", "Nepali"],
      experience: 8,
      expertise: ["Software Development", "Career Counseling", "Leadership"],
      rating: 4.8,
      reviewCount: 34,
      bio: "Experienced technology leader with a passion for mentoring...",
      hourlyRate: 50,
      availability: ["Mon", "Wed", "Fri"],
      sessionTypes: [
        {
          type: "1:1 Session",
          duration: 60,
          price: 50,
        }
      ]
    })
    setLoading(false)
  }, [username])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Layout>
      <ProfileView 
        profileData={profileData}
        isOwnProfile={user?.id === profileData?.id}
        viewerRole={user?.role}
      />
    </Layout>
  )
} 
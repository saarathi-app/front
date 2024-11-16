"use client"

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Layout from '@/app/components/layout/layout'
import { ProfileView } from '@/app/components/profile/profile-view'

export default function PublicProfile() {
  const params = useParams()
  const username = params.username as string
  const [profileData, setProfileData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Fetch profile data based on username
    // For now using mock data
    setProfileData({
      id: username,
      name: "Dr. Anita Sharma",
      image: "/images/mentors/mentor-1.jpg",
      verified: true,
      location: "Kathmandu, Nepal",
      // ... other profile data
    })
    setLoading(false)
  }, [username])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Layout>
      <ProfileView profileData={profileData} />
    </Layout>
  )
} 
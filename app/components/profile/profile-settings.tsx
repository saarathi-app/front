"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getImageWithFallback } from "@/lib/image-fallback"

// Define the type for profile data
interface ProfileData {
  name?: string
  email?: string
  image?: string
  bio?: string
  role?: 'mentor' | 'mentee'
  verified?: boolean
}

export function ProfileSettings({ 
  profileData = {} as ProfileData // Provide default empty object
}) {
  const [isEditing, setIsEditing] = useState(false)

  // Use nullish coalescing for safe access to properties
  const name = profileData?.name ?? ''
  const email = profileData?.email ?? ''
  const bio = profileData?.bio ?? ''
  const image = profileData?.image
  const role = profileData?.role

  // Get the correct image fallback based on user role
  const imageFallbackType = role === 'mentor' ? 'mentor' : 'mentee'

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Personal Information</h2>
            <Button 
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>

          <div className="space-y-4">
            {/* Profile Image Upload */}
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage 
                  src={getImageWithFallback(image, imageFallbackType)} 
                  alt={name}
                />
                <AvatarFallback>
                  {name?.charAt(0) ?? '?'}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button variant="outline">
                  Change Photo
                </Button>
              )}
            </div>

            {/* Form Fields */}
            <div className="grid gap-4 mt-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  defaultValue={name}
                  disabled={!isEditing}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={email}
                  disabled={!isEditing}
                  placeholder="Enter your email"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  defaultValue={bio}
                  disabled={!isEditing}
                  className="h-32"
                  placeholder="Tell us about yourself"
                />
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end mt-6 space-x-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button>
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 
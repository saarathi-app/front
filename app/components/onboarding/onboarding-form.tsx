"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { routes } from "@/lib/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getImageWithFallback } from "@/lib/image-fallback"

interface OnboardingFormProps {
  type: 'mentor' | 'mentee'
  userId: string
  initialData: {
    name: string
    email: string
    image?: string
  }
}

export function OnboardingForm({ type, userId, initialData }: OnboardingFormProps) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    ...initialData,
    bio: '',
    expertise: [],
    languages: [],
    experience: '',
    hourlyRate: '',
    availability: [],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Submit form data to API
    console.log('Form submitted:', formData)
    
    // Redirect to appropriate dashboard
    router.push(type === 'mentor' ? routes.dashboard.mentor : routes.dashboard.mentee)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent className="p-6">
          {step === 1 ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage 
                    src={getImageWithFallback(formData.image, type)} 
                    alt={formData.name}
                  />
                  <AvatarFallback>{formData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button variant="outline">Change Photo</Button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="h-32"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {type === 'mentor' && (
                <>
                  <div>
                    <Label htmlFor="expertise">Areas of Expertise</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select expertise" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="software">Software Development</SelectItem>
                        <SelectItem value="career">Career Counseling</SelectItem>
                        <SelectItem value="leadership">Leadership</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="hourlyRate">Hourly Rate (USD)</Label>
                    <Input
                      id="hourlyRate"
                      type="number"
                      value={formData.hourlyRate}
                      onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                    />
                  </div>
                </>
              )}

              <div>
                <Label htmlFor="languages">Languages</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select languages" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ne">Nepali</SelectItem>
                    <SelectItem value="hi">Hindi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6">
            {step > 1 && (
              <Button type="button" variant="outline" onClick={() => setStep(1)}>
                Previous
              </Button>
            )}
            {step === 1 ? (
              <Button type="button" onClick={() => setStep(2)}>
                Next
              </Button>
            ) : (
              <Button type="submit">
                Complete Setup
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </form>
  )
} 
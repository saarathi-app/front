"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
import { Upload } from "lucide-react"
import { cn } from "@/lib/utils"

// Form validation schema
const formSchema = z.object({
  // Personal Information
  profilePicture: z.string().optional(),
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  location: z.string().min(2, "Location is required"),
  linkedin: z.string().url("Must be a valid LinkedIn URL"),
  github: z.string().url("Must be a valid GitHub URL").optional(),
  
  // Professional Information
  currentCompany: z.string().min(2, "Company name is required"),
  designation: z.string().min(2, "Designation is required"),
  experience: z.string().min(1, "Years of experience is required"),
  expertise: z.string().min(2, "Primary expertise is required"),
  secondaryExpertise: z.string().min(2, "Secondary expertise is required"),
  skills: z.string().min(2, "Skills are required"),
  
  // Mentorship Preferences
  availabilityPerWeek: z.string().min(1, "Availability is required"),
  preferredMentees: z.string().min(1, "Preferred number of mentees is required"),
  mentorshipAreas: z.string().min(2, "Mentorship areas are required"),
  mentorshipStyle: z.string().min(2, "Mentorship style is required"),
  
  // Additional Information
  bio: z.string().min(50, "Bio must be at least 50 characters"),
  expectations: z.string().min(50, "Expectations must be at least 50 characters"),
  previousMentoring: z.boolean(),
  previousMentoringDetails: z.string().optional(),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
})

export default function MentorRegistration() {
  const [step, setStep] = useState(1)
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profilePicture: "",
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      currentCompany: "",
      designation: "",
      experience: "",
      expertise: "",
      secondaryExpertise: "",
      skills: "",
      availabilityPerWeek: "",
      preferredMentees: "",
      mentorshipAreas: "",
      mentorshipStyle: "",
      bio: "",
      expectations: "",
      previousMentoring: false,
      previousMentoringDetails: "",
      termsAccepted: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (step < 4) {
      setStep(step + 1)
    } else {
      console.log(values)
      // Handle form submission here
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Mentor Registration - Step {step} of 4
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Personal Information</h3>
                  <FormField
                    control={form.control}
                    name="profilePicture"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profile Picture</FormLabel>
                        <FormControl>
                          <div className="flex items-center space-x-4">
                            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center relative overflow-hidden">
                              {field.value ? (
                                <Image
                                  src={field.value}
                                  alt="Profile preview"
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <Upload className="w-8 h-8 text-gray-400" />
                              )}
                            </div>
                            <Input
                              type="file"
                              accept="image/*"
                              className="flex-1"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  field.onChange(URL.createObjectURL(file));
                                }
                              }}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+977 98XXXXXXXX" {...field} />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Kathmandu, Nepal" {...field} />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="linkedin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LinkedIn Profile</FormLabel>
                          <FormControl>
                            <Input placeholder="https://linkedin.com/in/..." {...field} />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="github"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GitHub Profile (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="https://github.com/..." {...field} />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Professional Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="currentCompany"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Company</FormLabel>
                          <FormControl>
                            <Input placeholder="Company Name" {...field} />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="designation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Designation</FormLabel>
                          <FormControl>
                            <Input placeholder="Senior Developer" {...field} />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Years of Experience</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select years of experience" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="2-3">2-3 years</SelectItem>
                            <SelectItem value="4-5">4-5 years</SelectItem>
                            <SelectItem value="6-8">6-8 years</SelectItem>
                            <SelectItem value="8+">8+ years</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="expertise"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Expertise</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select primary expertise" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="frontend">Frontend Development</SelectItem>
                            <SelectItem value="backend">Backend Development</SelectItem>
                            <SelectItem value="fullstack">Full Stack Development</SelectItem>
                            <SelectItem value="mobile">Mobile Development</SelectItem>
                            <SelectItem value="devops">DevOps</SelectItem>
                            <SelectItem value="data">Data Science</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Technical Skills</FormLabel>
                        <FormControl>
                          <Input placeholder="React, Node.js, Python, etc." {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter your technical skills separated by commas
                        </FormDescription>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Mentorship Preferences</h3>
                  <FormField
                    control={form.control}
                    name="availabilityPerWeek"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Weekly Availability</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select availability" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="2-4">2-4 hours</SelectItem>
                            <SelectItem value="4-6">4-6 hours</SelectItem>
                            <SelectItem value="6-8">6-8 hours</SelectItem>
                            <SelectItem value="8+">8+ hours</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="preferredMentees"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Number of Mentees</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select number of mentees" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1-2">1-2 mentees</SelectItem>
                            <SelectItem value="3-4">3-4 mentees</SelectItem>
                            <SelectItem value="5+">5+ mentees</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mentorshipAreas"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Areas You Can Mentor In</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="e.g., Web Development, System Design, Career Guidance"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Additional Information</h3>
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Professional Bio</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your professional journey..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="previousMentoring"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I have previous mentoring experience
                          </FormLabel>
                        </div>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="termsAccepted"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I agree to the terms and conditions
                          </FormLabel>
                        </div>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <div className="flex justify-between pt-4">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                  >
                    Previous
                  </Button>
                )}
                <Button type="submit" className="ml-auto">
                  {step === 4 ? "Submit Application" : "Next"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
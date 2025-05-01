"use client"
import { useState } from "react";
// import "@/components/ui/form-styles.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, Check, ChevronRight, ChevronLeft, X, Plus, Upload } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define form data types
interface FormData {
  // About You
  photo: string | null;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  jobTitle: string;
  company: string;
  location: string;
  
  // Profile
  category: string;
  skills: Array<{ id: string; name: string; color: string }>;
  bio: string;
  linkedinUrl: string;
  twitterHandle: string;
  personalWebsite: string;
  
  // Experience
  yearsExperience: string;
  languages: Array<{ id: string; name: string; proficiency: string }>;
  certifications: Array<{ id: string; name: string; organization: string; issueDate: string }>;
  sessionRates: Array<{ id: string; name: string; rate: number; enabled: boolean }>;
  availability: Array<{ day: string; time: string; selected: boolean }>;
  introVideoUrl: string;
  featuredArticleUrl: string;
  motivation: string;
  achievement: string;
}

// Define options for select fields
const CATEGORIES = [
  "UX & Design",
  "Engineering",
  "Product Management",
  "Marketing",
  "Career Coaching",
  "Leadership",
  "Entrepreneurship",
  "Data Science"
];

const LANGUAGES = [
  "English",
  "Spanish",
  "French",
  "German",
  "Chinese",
  "Japanese",
  "Korean",
  "Portuguese",
  "Russian",
  "Arabic"
];

const LANGUAGE_PROFICIENCY = [
  "Native",
  "Fluent",
  "Intermediate",
  "Basic"
];

const YEARS_OF_EXPERIENCE = [
  "1-2 years",
  "3-5 years",
  "5-7 years",
  "7-10 years",
  "10+ years"
];

const WEEK_DAYS = [
  { value: "mon", label: "Monday" },
  { value: "tue", label: "Tuesday" },
  { value: "wed", label: "Wednesday" },
  { value: "thu", label: "Thursday" },
  { value: "fri", label: "Friday" },
  { value: "sat", label: "Saturday" },
  { value: "sun", label: "Sunday" }
];

const TIME_SLOTS = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM"
];

const SESSION_TYPES = [
  { id: "1", name: "One-on-One Session", rate: 75, enabled: true },
  { id: "2", name: "Portfolio Review", rate: 60, enabled: false },
  { id: "3", name: "Mock Interview", rate: 100, enabled: false }
];

const SKILL_COLORS = [
  "bg-blue-100 text-blue-800",
  "bg-green-100 text-green-800",
  "bg-purple-100 text-purple-800",
  "bg-yellow-100 text-yellow-800",
  "bg-red-100 text-red-800"
];

// Utility function to generate a unique ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};

export default function MentorRegistration() {
  // State for tracking current step
  const [currentStep, setCurrentStep] = useState<number>(0);
  
  // Form data state
  const [formData, setFormData] = useState<FormData>({
    photo: null,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    jobTitle: "",
    company: "",
    location: "",
    
    category: "",
    skills: [],
    bio: "",
    linkedinUrl: "",
    twitterHandle: "",
    personalWebsite: "",
    
    yearsExperience: "",
    languages: [{ id: generateId(), name: "English", proficiency: "Native" }],
    certifications: [],
    sessionRates: SESSION_TYPES,
    availability: WEEK_DAYS.flatMap(day => 
      TIME_SLOTS.map(time => ({ 
        day: day.value, 
        time, 
        selected: false 
      }))
    ),
    introVideoUrl: "",
    featuredArticleUrl: "",
    motivation: "",
    achievement: "",
  });
  
  // Form validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // New skill input state
  const [newSkill, setNewSkill] = useState<string>("");

  // Steps configuration
  const steps = [
    { id: 0, name: "About you" },
    { id: 1, name: "Profile" },
    { id: 2, name: "Experience" }
  ];
  
  // Progress percentage calculation
  const progressPercentage = ((currentStep + 1) / steps.length) * 100;
  
  // Validation function
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (step === 0) {
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (!formData.email) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
      if (!formData.password) newErrors.password = "Password is required";
      else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
      if (!formData.jobTitle) newErrors.jobTitle = "Job title is required";
      if (!formData.location) newErrors.location = "Location is required";
    }
    
    else if (step === 1) {
      if (!formData.category) newErrors.category = "Category is required";
      if (formData.skills.length === 0) newErrors.skills = "At least one skill is required";
      if (!formData.bio) newErrors.bio = "Bio is required";
      else if (formData.bio.length < 50) newErrors.bio = "Bio should be at least 50 characters";
      if (!formData.linkedinUrl) newErrors.linkedinUrl = "LinkedIn URL is required";
    }
    
    else if (step === 2) {
      if (!formData.yearsExperience) newErrors.yearsExperience = "Years of experience is required";
      if (formData.languages.length === 0) newErrors.languages = "At least one language is required";
      if (!formData.motivation) newErrors.motivation = "Motivation is required";
      if (!formData.achievement) newErrors.achievement = "Achievement is required";
      // Check if at least one session type is enabled
      if (!formData.sessionRates.some(rate => rate.enabled)) {
        newErrors.sessionRates = "At least one session type must be enabled";
      }
      // Check if at least one availability slot is selected
      if (!formData.availability.some(slot => slot.selected)) {
        newErrors.availability = "At least one availability slot must be selected";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle next step
  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };
  
  // Handle previous step
  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      // This is where you would submit the form data to your backend
      console.log("Form submitted:", formData);
      alert("Form submitted successfully!");
    }
  };
  
  // Update form data
  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear validation error for this field if it exists
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };
  
  // Add a new skill
  const addSkill = () => {
    if (newSkill.trim()) {
      const colorIndex = Math.floor(Math.random() * SKILL_COLORS.length);
      const skill = {
        id: generateId(),
        name: newSkill.trim(),
        color: SKILL_COLORS[colorIndex]
      };
      
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
      
      setNewSkill("");
      
      // Clear skills validation error if it exists
      if (errors.skills) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.skills;
          return newErrors;
        });
      }
    }
  };
  
  // Remove a skill
  const removeSkill = (id: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
  };
  
  // Add a language
  const addLanguage = () => {
    setFormData(prev => ({
      ...prev,
      languages: [...prev.languages, { id: generateId(), name: "", proficiency: "" }]
    }));
  };
  
  // Remove a language
  const removeLanguage = (id: string) => {
    if (formData.languages.length > 1) {
      setFormData(prev => ({
        ...prev,
        languages: prev.languages.filter(lang => lang.id !== id)
      }));
    }
  };
  
  // Update language
  const updateLanguage = (id: string, field: "name" | "proficiency", value: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.map(lang => 
        lang.id === id ? { ...lang, [field]: value } : lang
      )
    }));
  };
  
  // Add a certification
  const addCertification = () => {
    setFormData(prev => ({
      ...prev,
      certifications: [
        ...prev.certifications, 
        { id: generateId(), name: "", organization: "", issueDate: "" }
      ]
    }));
  };
  
  // Remove a certification
  const removeCertification = (id: string) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(cert => cert.id !== id)
    }));
  };
  
  // Update certification
  const updateCertification = (
    id: string, 
    field: "name" | "organization" | "issueDate", 
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.map(cert => 
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    }));
  };
  
  // Toggle session type
  const toggleSessionType = (id: string) => {
    setFormData(prev => ({
      ...prev,
      sessionRates: prev.sessionRates.map(session => 
        session.id === id ? { ...session, enabled: !session.enabled } : session
      )
    }));
  };
  
  // Update session rate
  const updateSessionRate = (id: string, rate: number) => {
    setFormData(prev => ({
      ...prev,
      sessionRates: prev.sessionRates.map(session => 
        session.id === id ? { ...session, rate } : session
      )
    }));
  };
  
  // Toggle availability slot
  const toggleAvailability = (day: string, time: string) => {
    setFormData(prev => ({
      ...prev,
      availability: prev.availability.map(slot => 
        slot.day === day && slot.time === time 
          ? { ...slot, selected: !slot.selected } 
          : slot
      )
    }));
  };
  
  // Handle file upload for profile photo
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateFormData("photo", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-4">Apply as a Mentor</h1>
        <div className="flex justify-center mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div 
                className={`flex items-center justify-center h-10 w-10 rounded-full 
                  ${index <= currentStep 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-200 text-gray-600'
                  }`}
              >
                {index < currentStep ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div 
                  className={`h-1 w-16 ${
                    index < currentStep ? 'bg-primary' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="text-sm font-medium text-center">
          {steps[currentStep].name}
        </div>
        <Progress value={progressPercentage} className="mt-4" />
      </div>
      
      <form onSubmit={handleSubmit}>
        {currentStep === 0 && (
          <Card>
            <CardHeader>
              <CardTitle>About You</CardTitle>
              <CardDescription>
                Tell us about yourself and your professional experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert className="bg-blue-50 border-blue-100">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-700">
                  Filling out the form only takes a couple minutes. We'd love to learn more about 
                  your background and the ins-and-outs of why you'd like to become a mentor.
                </AlertDescription>
              </Alert>

              <div className="flex flex-col items-center mb-6">
                <Label htmlFor="photo-upload" className="mb-2">Profile Photo</Label>
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={formData.photo || ""} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {formData.firstName.charAt(0)}{formData.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <Label 
                    htmlFor="photo-upload" 
                    className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full cursor-pointer"
                  >
                    <Upload className="h-4 w-4" />
                  </Label>
                </div>
                <Input 
                  id="photo-upload" 
                  type="file" 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handlePhotoUpload}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input 
                    id="first-name" 
                    value={formData.firstName}
                    onChange={e => updateFormData("firstName", e.target.value)}
                    className={`form-input ${errors.firstName ? "border-red-500" : ""}`}
                  />
                  {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input 
                    id="last-name" 
                    value={formData.lastName}
                    onChange={e => updateFormData("lastName", e.target.value)}
                    className={`form-input ${errors.lastName ? "border-red-500" : ""}`}
                  />
                  {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={formData.email}
                    onChange={e => updateFormData("email", e.target.value)}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password"
                    value={formData.password}
                    onChange={e => updateFormData("password", e.target.value)}
                    className={errors.password ? "border-red-500" : ""}
                  />
                  {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="job-title">Job Title</Label>
                  <Input 
                    id="job-title" 
                    value={formData.jobTitle}
                    onChange={e => updateFormData("jobTitle", e.target.value)}
                    className={errors.jobTitle ? "border-red-500" : ""}
                  />
                  {errors.jobTitle && <p className="text-red-500 text-sm">{errors.jobTitle}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company (Optional)</Label>
                  <Input 
                    id="company" 
                    value={formData.company}
                    onChange={e => updateFormData("company", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Select 
                  value={formData.location} 
                  onValueChange={value => updateFormData("location", value)}
                >
                  <SelectTrigger className={`form-select ${errors.location ? "border-red-500" : ""}`}>
                    <SelectValue placeholder="Select your location" />
                  </SelectTrigger>
                  <SelectContent className="form-select-content">
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="eu">Europe</SelectItem>
                    <SelectItem value="asia">Asia</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Tell us about your expertise and how you can help mentees
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={value => updateFormData("category", value)}
                >
                  <SelectTrigger className={`form-select ${errors.category ? "border-red-500" : ""}`}>
                    <SelectValue placeholder="Select your primary area of expertise" />
                  </SelectTrigger>
                  <SelectContent className="form-select-content">
                    {CATEGORIES.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Skills & Expertise</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.skills.map(skill => (
                    <Badge 
                      key={skill.id} 
                      className={`${skill.color} px-3 py-1 flex items-center gap-1`}
                    >
                      {skill.name}
                      <X
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removeSkill(skill.id)}
                      />
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    id="skills"
                    placeholder="Add a skill (e.g. React, Data Analysis, UX Research)"
                    value={newSkill}
                    onChange={e => setNewSkill(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    className={errors.skills ? "border-red-500" : ""}
                  />
                  <Button type="button" onClick={addSkill} size="sm">
                    <Plus className="h-4 w-4 mr-1" /> Add
                  </Button>
                </div>
                <p className="text-sm text-gray-500">
                  Press Enter or click Add after typing each skill
                </p>
                {errors.skills && <p className="text-red-500 text-sm">{errors.skills}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself, your expertise, and how you can help mentees..."
                  value={formData.bio}
                  onChange={e => updateFormData("bio", e.target.value)}
                  className={`min-h-32 ${errors.bio ? "border-red-500" : ""}`}
                />
                <p className="text-sm text-gray-500">
                  {formData.bio.length}/500 characters (minimum 50)
                </p>
                {errors.bio && <p className="text-red-500 text-sm">{errors.bio}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn URL</Label>
                <div className="flex rounded-md">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    linkedin.com/in/
                  </span>
                  <Input
                    id="linkedin"
                    placeholder="your-profile"
                    value={formData.linkedinUrl}
                    onChange={e => updateFormData("linkedinUrl", e.target.value)}
                    className={`rounded-l-none ${errors.linkedinUrl ? "border-red-500" : ""}`}
                  />
                </div>
                {errors.linkedinUrl && <p className="text-red-500 text-sm">{errors.linkedinUrl}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter Handle (Optional)</Label>
                  <div className="flex rounded-md">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      @
                    </span>
                    <Input
                      id="twitter"
                      placeholder="username"
                      value={formData.twitterHandle}
                      onChange={e => updateFormData("twitterHandle", e.target.value)}
                      className="rounded-l-none"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Personal Website (Optional)</Label>
                  <Input
                    id="website"
                    placeholder="https://yourwebsite.com"
                    value={formData.personalWebsite}
                    onChange={e => updateFormData("personalWebsite", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Experience & Availability</CardTitle>
              <CardDescription>
                Share your experience and when you're available to mentor
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert className="bg-blue-50 border-blue-100 mb-6">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-700">
                  You're almost there! In this step, show off your accomplishments and how you can help others.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label htmlFor="years-experience">Years of Experience</Label>
                <Select 
                  value={formData.yearsExperience} 
                  onValueChange={value => updateFormData("yearsExperience", value)}
                >
                  <SelectTrigger className={`form-select ${errors.yearsExperience ? "border-red-500" : ""}`}>
                    <SelectValue placeholder="Select your experience level" />
                  </SelectTrigger>
                  <SelectContent className="form-select-content">
                    {YEARS_OF_EXPERIENCE.map(option => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.yearsExperience && <p className="text-red-500 text-sm">{errors.yearsExperience}</p>}
              </div>

              <div className="space-y-4">
                <Label>Languages Spoken</Label>
                {formData.languages.map((language, index) => (
                  <div key={language.id} className="flex gap-2 items-center">
                    <div className="flex-1">
                      <Select 
                        value={language.name} 
                        onValueChange={value => updateLanguage(language.id, "name", value)}
                      >
                        <SelectTrigger className="form-select">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent className="form-select-content">
                          {LANGUAGES.map(lang => (
                            <SelectItem key={lang} value={lang}>
                              {lang}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1">
                      <Select 
                        value={language.proficiency} 
                        onValueChange={value => updateLanguage(language.id, "proficiency", value)}
                      >
                        <SelectTrigger className="form-select">
                          <SelectValue placeholder="Select proficiency" />
                        </SelectTrigger>
                        <SelectContent className="form-select-content">
                          {LANGUAGE_PROFICIENCY.map(prof => (
                            <SelectItem key={prof} value={prof}>
                              {prof}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon" 
                      onClick={() => removeLanguage(language.id)}
                      disabled={formData.languages.length <= 1}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={addLanguage}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Language
                </Button>
                {errors.languages && <p className="text-red-500 text-sm">{errors.languages}</p>}
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Certifications (Optional)</Label>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={addCertification}
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add Certification
                  </Button>
                </div>
                {formData.certifications.map(cert => (
                  <div key={cert.id} className="grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-5">
                      <Input
                        placeholder="Certification name"
                        value={cert.name}
                        onChange={e => updateCertification(cert.id, "name", e.target.value)}
                      />
                    </div>
                    <div className="col-span-4">
                      <Input
                        placeholder="Issuing organization"
                        value={cert.organization}
                        onChange={e => updateCertification(cert.id, "organization", e.target.value)}
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        type="month"
                        value={cert.issueDate}
                        onChange={e => updateCertification(cert.id, "issueDate", e.target.value)}
                      />
                    </div>
                    <div className="col-span-1">
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="icon" 
                        onClick={() => removeCertification(cert.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <Label>Session Rates</Label>
                {errors.sessionRates && <p className="text-red-500 text-sm mb-2">{errors.sessionRates}</p>}
                {formData.sessionRates.map(session => (
                  <div key={session.id} className="flex items-center gap-4 p-4 border rounded-md">
                    <div className="flex-1">
                      <h4 className="font-medium">{session.name}</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">$</span>
                      <Input
                        type="number"
                        min="1"
                        className="w-20"
                        value={session.rate}
                        onChange={e => updateSessionRate(session.id, parseInt(e.target.value) || 0)}
                        disabled={!session.enabled}
                      />
                      <span className="text-sm text-gray-500">/ hour</span>
                    </div>
                    <div>
                      <Button 
                        type="button" 
                        variant={session.enabled ? "default" : "outline"} 
                        size="sm"
                        onClick={() => toggleSessionType(session.id)}
                      >
                        {session.enabled ? "Enabled" : "Disabled"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <Label>Weekly Availability</Label>
                {errors.availability && <p className="text-red-500 text-sm mb-2">{errors.availability}</p>}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Time
                        </th>
                        {WEEK_DAYS.map(day => (
                          <th key={day.value} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {day.label.substring(0, 3)}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {TIME_SLOTS.map(time => (
                        <tr key={time}>
                          <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                            {time}
                          </td>
                          {WEEK_DAYS.map(day => {
                            const slot = formData.availability.find(
                              s => s.day === day.value && s.time === time
                            );
                            return (
                              <td key={`${day.value}-${time}`} className="px-6 py-2 whitespace-nowrap">
                                <Button
                                  type="button"
                                  variant={slot?.selected ? "default" : "outline"}
                                  size="sm"
                                  className="h-6 w-6 p-0"
                                  onClick={() => toggleAvailability(day.value, time)}
                                >
                                  {slot?.selected ? <Check className="h-3 w-3" /> : ""}
                                </Button>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="intro-video">Intro Video URL (Optional)</Label>
                  <Input
                    id="intro-video"
                    placeholder="https://youtube.com/watch?v=..."
                    value={formData.introVideoUrl}
                    onChange={e => updateFormData("introVideoUrl", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="featured-article">Featured Article URL (Optional)</Label>
                  <Input
                    id="featured-article"
                    placeholder="https://medium.com/..."
                    value={formData.featuredArticleUrl}
                    onChange={e => updateFormData("featuredArticleUrl", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="motivation">
                  Why do you want to become a mentor?
                </Label>
                <Textarea
                  id="motivation"
                  placeholder="Share your motivation for mentoring..."
                  value={formData.motivation}
                  onChange={e => updateFormData("motivation", e.target.value)}
                  className={`min-h-24 ${errors.motivation ? "border-red-500" : ""}`}
                />
                {errors.motivation && <p className="text-red-500 text-sm">{errors.motivation}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="achievement">
                  What, in your opinion, has been your greatest achievement so far?
                </Label>
                <Textarea
                  id="achievement"
                  placeholder="Share your accomplishments..."
                  value={formData.achievement}
                  onChange={e => updateFormData("achievement", e.target.value)}
                  className={`min-h-24 ${errors.achievement ? "border-red-500" : ""}`}
                />
                {errors.achievement && <p className="text-red-500 text-sm">{errors.achievement}</p>}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-between mt-6">
          {currentStep > 0 ? (
            <Button type="button" variant="outline" onClick={handlePrevStep}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
          ) : (
            <div></div>
          )}
          
          {currentStep < steps.length - 1 ? (
            <Button type="button" onClick={handleNextStep}>
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit">Submit Application</Button>
          )}
        </div>
      </form>
    </div>
  );
}
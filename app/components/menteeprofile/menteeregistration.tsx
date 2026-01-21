"use client"
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { Upload } from "lucide-react";
import { Slider } from "@/components/ui/slider";

const formSchema = z.object({
  // Personal Information
  profilePicture: z.string().optional(),
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  location: z.string().min(2, "Location is required"),
  
  // Learning Goals
  learningGoals: z.array(
    z.object({
      goal: z.string().min(10, "Goal must be at least 10 characters"),
      timeframe: z.string().min(1, "Timeframe is required"),
    })
  ).min(1, "At least one learning goal is required"),
  
  // Session Preferences
  sessionPreference: z.string().min(1, "Please select a session preference"),
  
  // Budget
  monthlyBudget: z.number().min(500, "Minimum budget is NPR 500"),
  
  // Learning Style
  learningStyle: z.array(z.string()).min(1, "Select at least one learning style"),
  
  // Additional Information
  bio: z.string().min(50, "Bio must be at least 50 characters"),
  expectations: z.string().min(50, "Expectations must be at least 50 characters"),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

const learningStyles = [
  { id: "visual", label: "Visual Learning" },
  { id: "auditory", label: "Auditory Learning" },
  { id: "reading", label: "Reading/Writing" },
  { id: "kinesthetic", label: "Hands-on Learning" },
];

export default function MenteeRegistration() {
  const [step, setStep] = useState(1);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profilePicture: "",
      fullName: "",
      email: "",
      phone: "",
      location: "",
      learningGoals: [{ goal: "", timeframe: "" }],
      sessionPreference: "",
      monthlyBudget: 1000,
      learningStyle: [],
      bio: "",
      expectations: "",
      termsAccepted: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (step < 3) {
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
            Mentee Registration - Step {step} of 3
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
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about yourself and what you want to learn..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Learning Goals</h3>
                  {form.watch("learningGoals").map((_, index) => (
                    <div key={index} className="space-y-4">
                      <FormField
                        control={form.control}
                        name={`learningGoals.${index}.goal`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Goal {index + 1}</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="What do you want to achieve?"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`learningGoals.${index}.timeframe`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Timeframe</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select timeframe" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="1month">1 Month</SelectItem>
                                <SelectItem value="3months">3 Months</SelectItem>
                                <SelectItem value="6months">6 Months</SelectItem>
                                <SelectItem value="1year">1 Year</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => {
                          const currentGoals = form.getValues("learningGoals");
                          form.setValue(
                            "learningGoals",
                            currentGoals.filter((_, i) => i !== index)
                          );
                        }}
                      >
                        Delete Goal
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const currentGoals = form.getValues("learningGoals");
                      form.setValue("learningGoals", [
                        ...currentGoals,
                        { goal: "", timeframe: "" },
                      ]);
                    }}
                  >
                    Add Another Goal
                  </Button>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Preferences & Additional Information</h3>
                  <FormField
                    control={form.control}
                    name="sessionPreference"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Session Type</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select session type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="individual">Individual Sessions</SelectItem>
                            <SelectItem value="group">Group Sessions</SelectItem>
                            <SelectItem value="both">Both Types</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="monthlyBudget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Monthly Budget (NPR)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={500}
                            step={100}
                            placeholder="Enter your budget"
                            {...field}
                            onChange={(e) => {
                              const value = Math.max(500, Number(e.target.value));
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormDescription>
                          Set your monthly budget for mentorship sessions (minimum NPR 500)
                        </FormDescription>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="learningStyle"
                    render={() => (
                      <FormItem>
                        <FormLabel>Learning Style</FormLabel>
                        <div className="grid grid-cols-2 gap-4">
                          {learningStyles.map((style) => (
                            <FormField
                              key={style.id}
                              control={form.control}
                              name="learningStyle"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={style.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(style.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, style.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== style.id
                                                )
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {style.label}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="expectations"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expectations</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="What are your expectations from the mentorship program?"
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
                  {step === 3 ? "Complete Profile" : "Next"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

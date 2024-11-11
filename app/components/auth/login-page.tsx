"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="flex items-center justify-center pt-20 min-h-screen bg-gradient-to-b from-[#16153A]/5 to-white/95 px-4 py-12">
      <div className="w-full max-w-md">
        <Link 
          href="/"
          className="flex items-center justify-center mb-8 text-[#16153A] hover:text-[#16153A]/80 transition-colors"
        >
          <span className="text-2xl font-bold">Saarathi</span>
        </Link>

        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold tracking-tight text-center text-[#16153A]">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-center text-gray-500">
              Sign in to your Saarathi account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="h-11 bg-white border-gray-200"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-gray-700">Password</Label>
                  <Link 
                    href="/auth/forgot-password" 
                    className="text-sm text-[#16153A] hover:text-[#16153A]/80"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    className="h-11 bg-white border-gray-200 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-11 px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-11 bg-[#00F5EE] text-[#16153A] hover:bg-[#00F5EE]/90 font-medium"
              >
                Sign In
              </Button>

              <div className="text-center text-sm text-gray-500">
                Don&apos;t have an account? Let&apos;s create one!{" "}
                <Link href="/auth/signup" className="text-[#16153A] hover:text-[#16153A]/80 font-medium">
                  Sign up
                </Link>
              </div>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-500 bg-white">Or continue with</span>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <Button 
                variant="outline" 
                size="icon" 
                className="w-11 h-11 border-gray-200 hover:bg-gray-50/50"
              >
                <Github className="w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="w-11 h-11 border-gray-200 hover:bg-gray-50/50"
              >
                <Twitter className="w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="w-11 h-11 border-gray-200 hover:bg-gray-50/50"
              >
                <Linkedin className="w-5 h-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
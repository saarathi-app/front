"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Bell, ChevronDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

export default function Navbar({ userType }: { userType?: "mentor" | "mentee" }) {
  const [isOpen, setIsOpen] = useState(false)

  const isAuthenticated = Boolean(userType)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/logo.svg"
              alt="Saarathi Logo"
              width={32}
              height={32}
            />
            <span className="text-xl font-bold text-[#16153A]">Saarathi</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {isAuthenticated ? (
              <>
                <div className="relative w-96">
                  <Search className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                  <Input
                    placeholder="Find mentors or sessions..."
                    className="pl-10"
                  />
                </div>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#16153A] text-white text-xs">
                    2
                  </span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="gap-2">
                      <div className="relative w-8 h-8 overflow-hidden rounded-full">
                        <Image
                          src={`/images/${userType}s/${userType}-1.jpg`}
                          alt="Profile"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/about" className="text-gray-600 hover:text-[#16153A]">
                  About
                </Link>
                <Link href="/mentors" className="text-gray-600 hover:text-[#16153A]">
                  Find Mentors
                </Link>
                <Link href="/pricing" className="text-gray-600 hover:text-[#16153A]">
                  Pricing
                </Link>
                <Link href="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-[#16153A] text-white hover:bg-[#16153A]/90">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="p-2 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <div className="px-4 py-4 space-y-4 bg-white">
              {isAuthenticated ? (
                <>
                  <div className="relative">
                    <Search className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                    <Input
                      placeholder="Find mentors or sessions..."
                      className="pl-10"
                    />
                  </div>
                  <Link
                    href="/profile"
                    className="block text-gray-600 hover:text-[#16153A]"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="block text-gray-600 hover:text-[#16153A]"
                  >
                    Settings
                  </Link>
                  <Button
                    variant="ghost"
                    className="w-full text-red-600"
                    onClick={() => {/* Add logout logic */}}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href="/about"
                    className="block text-gray-600 hover:text-[#16153A]"
                  >
                    About
                  </Link>
                  <Link
                    href="/mentors"
                    className="block text-gray-600 hover:text-[#16153A]"
                  >
                    Find Mentors
                  </Link>
                  <Link
                    href="/pricing"
                    className="block text-gray-600 hover:text-[#16153A]"
                  >
                    Pricing
                  </Link>
                  <Link href="/login">
                    <Button variant="ghost" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="w-full bg-[#16153A] text-white hover:bg-[#16153A]/90">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
} 
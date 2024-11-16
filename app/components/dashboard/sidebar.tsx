"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { routes } from "@/lib/navigation"
import { getImageWithFallback } from "@/lib/image-fallback"
import Link from "next/link"
import Image from "next/image"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Home,
  Calendar,
  Users,
  MessageSquare,
  Settings,
} from "lucide-react"

interface SidebarProps {
  userType: "mentor" | "mentee"
}

export function Sidebar({ userType }: SidebarProps) {
  const { user } = useAuth()
  const router = useRouter()

  // Ensure user has correct role for this sidebar
  if (!user || user.role !== userType) {
    return null
  }

  const menuItems = userType === 'mentor' 
    ? [
        { icon: Home, label: 'Dashboard', href: routes.dashboard.mentor },
        { icon: Calendar, label: 'Sessions', href: '/sessions' },
        { icon: Users, label: 'My Mentees', href: '/mentees' },
        { icon: MessageSquare, label: 'Messages', href: '/messages' },
        { icon: Settings, label: 'Settings', href: routes.profile.settings },
      ]
    : [
        { icon: Home, label: 'Dashboard', href: routes.dashboard.mentee },
        { icon: Calendar, label: 'My Sessions', href: '/sessions' },
        { icon: Users, label: 'My Mentors', href: '/mentors' },
        { icon: MessageSquare, label: 'Messages', href: '/messages' },
        { icon: Settings, label: 'Settings', href: routes.profile.settings },
      ]

  return (
    <aside className="fixed left-0 w-64 h-screen bg-white border-r">
      <div className="flex flex-col h-full">
        <div className="p-6">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="Saarathi Logo"
              width={32}
              height={32}
              className="object-contain"
            />
            <span className="text-xl font-bold text-[#16153A]">
              Saarathi
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="flex items-center px-4 py-2 space-x-3 rounded-lg hover:bg-gray-100"
                >
                  <item.icon className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t">
          <div className="flex items-center space-x-3 p-4">
            <Avatar>
              <AvatarImage src={getImageWithFallback(user.image, userType)} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user.role}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
} 
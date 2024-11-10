"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  LayoutDashboard,
  Calendar,
  Users,
  TrendingUp,
  MessageSquare,
  Settings,
  LogOut,
  Target,
  DollarSign,
  BarChart2,
} from "lucide-react"
import Link from "next/link"

interface SidebarProps {
  userType: "mentor" | "mentee"
}

export function Sidebar({ userType }: SidebarProps) {
  const navigationItems = userType === "mentor" 
    ? [
        { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/mentor", active: true },
        { icon: Calendar, label: "Sessions", href: "/dashboard/mentor/sessions" },
        { icon: Users, label: "Requests", href: "/dashboard/mentor/requests" },
        { icon: DollarSign, label: "Earnings", href: "/dashboard/mentor/earnings" },
        { icon: BarChart2, label: "Performance", href: "/dashboard/mentor/performance" },
        { icon: MessageSquare, label: "Messages", href: "/dashboard/mentor/messages" },
        { icon: Settings, label: "Settings", href: "/dashboard/mentor/settings" },
      ]
    : [
        { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/mentee", active: true },
        { icon: Target, label: "Goals", href: "/dashboard/mentee/goals" },
        { icon: Users, label: "Explore Mentors", href: "/dashboard/mentee/explore" },
        { icon: Calendar, label: "Sessions", href: "/dashboard/mentee/sessions" },
        { icon: TrendingUp, label: "Progress", href: "/dashboard/mentee/progress" },
        { icon: MessageSquare, label: "Messages", href: "/dashboard/mentee/messages" },
        { icon: Settings, label: "Settings", href: "/dashboard/mentee/settings" },
      ]

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-[#16153A] text-white">
      <ScrollArea className="h-full">
        <div className="flex flex-col h-full px-4 py-8">
          <div className="mb-8">
            <Link href="/">
              <h2 className="text-2xl font-bold">Saarathi</h2>
            </Link>
          </div>

          <nav className="flex-1 space-y-2">
            {navigationItems.map((item) => (
              <TooltipProvider key={item.label}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href={item.href}>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start gap-3 transition-all duration-200 ${
                          item.active
                            ? "bg-white/10 text-[#00F5EE]"
                            : "hover:bg-white/5 hover:text-[#00F5EE]"
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </nav>

          <Button 
            variant="ghost" 
            className="justify-start gap-3 text-red-400 hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </div>
      </ScrollArea>
    </aside>
  )
} 
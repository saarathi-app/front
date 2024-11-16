"use client"

import { useAuth, UserRole } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { routes } from "@/lib/navigation"

export function UserSwitcher() {
  const { user, switchUser } = useAuth()
  const router = useRouter()

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  const handleSwitch = (role: UserRole) => {
    switchUser(role)
    if (role === 'mentor') {
      router.push(routes.dashboard.mentor)
    } else if (role === 'mentee') {
      router.push(routes.dashboard.mentee)
    } else {
      router.push(routes.home)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white p-4 rounded-lg shadow-lg border">
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-500">
          Current User: {user?.name || 'None'}
        </p>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={user?.role === 'mentor' ? 'default' : 'outline'}
            onClick={() => handleSwitch('mentor')}
          >
            Switch to Mentor
          </Button>
          <Button
            size="sm"
            variant={user?.role === 'mentee' ? 'default' : 'outline'}
            onClick={() => handleSwitch('mentee')}
          >
            Switch to Mentee
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => handleSwitch(null)}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
} 
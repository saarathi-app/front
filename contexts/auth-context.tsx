"use client"

import { createContext, useContext, useState, useEffect } from 'react'

// Define user types
export type UserRole = 'mentor' | 'mentee' | null
export type User = {
  id: string
  name: string
  email: string
  role: UserRole
  image?: string
  verified?: boolean
}

type AuthContextType = {
  user: User | null
  setUser: (user: User | null) => void
  switchUser: (role: UserRole) => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users for testing
const mockUsers = {
  mentor: {
    id: '1',
    name: 'Dr. Anita Sharma',
    email: 'anita.sharma@example.com',
    role: 'mentor' as const,
    image: '/images/mentors/mentor-1.jpg',
    verified: true,
  },
  mentee: {
    id: '2',
    name: 'Rahul Kumar',
    email: 'rahul.kumar@example.com',
    role: 'mentee' as const,
    image: '/images/mentees/mentee-1.jpg',
  },
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate initial auth check
    setIsLoading(false)
  }, [])

  const switchUser = (role: UserRole) => {
    if (!role) {
      setUser(null)
      return
    }
    setUser(mockUsers[role])
  }

  return (
    <AuthContext.Provider value={{ user, setUser, switchUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 
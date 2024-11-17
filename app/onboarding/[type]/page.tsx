"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { routes } from "@/lib/navigation"
import { OnboardingForm } from "@/components/onboarding/onboarding-form"
import Layout from "@/components/layout/layout"

export default function OnboardingPage() {
  const params = useParams()
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const type = params.type as 'mentor' | 'mentee'

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(routes.auth.login)
    }
    // Redirect if user is already onboarded
    if (user?.onboarded) {
      router.push(user.role === 'mentor' ? routes.dashboard.mentor : routes.dashboard.mentee)
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return null
  }

  return (
    <Layout>
      <div className="container max-w-4xl px-4 py-8 mx-auto">
        <h1 className="mb-8 text-3xl font-bold">Complete Your Profile</h1>
        <OnboardingForm 
          type={type} 
          userId={user.id}
          initialData={{
            name: user.name,
            email: user.email,
            image: user.image,
          }}
        />
      </div>
    </Layout>
  )
} 
"use client"

import { useParams } from 'next/navigation'
import { OnboardingForm } from '@/app/components/onboarding/onboarding-form'
import Layout from '@/app/components/layout/layout'

export default function Onboarding() {
  const params = useParams()
  const type = params.type as 'mentor' | 'mentee'

  return (
    <Layout>
      <div className="container max-w-4xl px-4 py-8 mx-auto">
        <h1 className="mb-8 text-3xl font-bold">
          {type === 'mentor' ? 'Mentor' : 'Mentee'} Onboarding
        </h1>
        <OnboardingForm type={type} />
      </div>
    </Layout>
  )
} 
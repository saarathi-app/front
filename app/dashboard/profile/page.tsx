"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { routes } from "@/lib/navigation";
import { ProfileSettings } from "@/app/components/profile/profile-settings";
import { Sidebar } from "@/app/components/dashboard/sidebar";

export default function DashboardProfile() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(routes.auth.login);
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  const profileData = {
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    role: user.role,
    bio: user.bio || "",
    verified: user.verified,
    expertise: user.expertise || [],
    languages: user.languages || [],
    experience: user.experience,
    hourlyRate: user.hourlyRate,
    availability: user.availability || [],
  };

  return (
    <div className="flex min-h-screen bg-[#F9F9F9]">
      <Sidebar userType={user.role} />
      <main className="flex-1 px-8 py-6 ml-64">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-8 text-3xl font-bold">Profile Settings</h1>
          <ProfileSettings 
            profileData={profileData}
            userRole={user.role}
          />
        </div>
      </main>
    </div>
  );
}

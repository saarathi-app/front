"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/app/components/layout/layout";
import { useAuth } from "@/contexts/auth-context";
import { ProfileSettings } from "@/app/components/profile/profile-settings";
import { routes } from "@/lib/navigation";
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
    return null; // Will redirect in useEffect
  }

  const profileData = {
    name: user.name,
    email: user.email,
    image: user.image,
    role: user.role,
    verified: user.verified,
    bio: "", // Add any additional fields from your user object
  };

  return (
    <div className="flex min-h-screen bg-[#F9F9F9]">
      <Sidebar userType={user.role} />
      <main className="flex-1 px-8 py-6 ml-64">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-8 text-3xl font-bold">Profile Settings</h1>
          <ProfileSettings profileData={profileData} />
        </div>
      </main>
    </div>
  );
}

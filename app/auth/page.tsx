import { Metadata } from "next";
import AuthPage from "@/app/components/auth/auth-page";
import SiteLayout from "@/app/components/layout/site-layout";

export const metadata: Metadata = {
  title: "Sign In - Saarathi",
  description: "Sign in to your Saarathi account or create a new one.",
};

export default function AuthRoute() {
  return (
    <SiteLayout>
      <AuthPage />
    </SiteLayout>
  );
}

import { useRouter } from 'next/navigation';
import { routes } from '@/lib/navigation';

export function useAppNavigation() {
  const router = useRouter();

  return {
    goToHome: () => router.push(routes.home),
    goToLogin: () => router.push(routes.auth.login),
    goToSignup: () => router.push(routes.auth.signup),
    goToProfile: (username: string) => router.push(routes.profile.view(username)),
    goToDashboardProfile: () => router.push(routes.dashboard.profile),
    goToMentorDashboard: () => router.push(routes.dashboard.mentor),
    goToMenteeDashboard: () => router.push(routes.dashboard.mentee),
    goToSettings: () => router.push(routes.profile.settings),
    goToOnboarding: (type: 'mentor' | 'mentee') => router.push(routes.onboarding[type]),
  };
} 
export const routes = {
  home: '/',
  about: '/about',
  mentors: '/mentors',
  howItWorks: '/how-it-works',
  auth: {
    login: '/auth/login',
    signup: '/auth/signup',
    forgot: '/auth/forgot-password',
  },
  dashboard: {
    mentor: '/dashboard/mentor',
    mentee: '/dashboard/mentee',
    profile: '/dashboard/profile',
  },
  profile: {
    view: (username: string) => `/profile/${username}`,
    settings: '/profile/settings',
  },
  onboarding: {
    mentor: '/onboarding/mentor',
    mentee: '/onboarding/mentee',
  },
} as const; 
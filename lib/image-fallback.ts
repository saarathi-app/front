export const imageFallbacks = {
  mentor: "/images/mentors/default-mentor.jpg",
  mentee: "/images/mentees/default-mentee.jpg",
  logo: "/logo.png",
  logoWhite: "/logos/light.png",
  logoIcon: "/logos/icon.png",
  certification: "/icons/aws-cert.png"
}

export function getImageWithFallback(imagePath: string, type: keyof typeof imageFallbacks) {
  if (!imagePath || imagePath.startsWith('http')) {
    return imageFallbacks[type]
  }
  return imagePath
} 
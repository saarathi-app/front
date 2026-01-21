import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Saarathi Academy - Anti-Factory Education",
    template: "%s | Saarathi Academy",
  },
  description:
    "Small batches. Real projects. Guaranteed career launchpad in Old Baneshwor. Join Saarathi Academy for hands-on tech education in Nepal.",
  keywords: [
    "tech education Nepal",
    "coding bootcamp Kathmandu",
    "software engineering training",
    "career development",
    "tech skills",
    "programming courses",
    "Old Baneshwor",
    "Saarathi Academy",
  ],
  authors: [{ name: "Saarathi Academy" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.saarathi.app",
    siteName: "Saarathi Academy",
    title: "Saarathi Academy - Anti-Factory Education",
    description:
      "Small batches. Real projects. Join Nepal's premier tech education academy.",
    images: [
      {
        url: "https://www.saarathi.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Saarathi Academy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saarathi Academy - Anti-Factory Education",
    description:
      "Small batches. Real projects. Join Nepal's premier tech education academy.",
    images: ["https://www.saarathi.app/twitter-image.png"],
    creator: "@saarathi_app",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/favicon/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  manifest: "/favicon/site.webmanifest",
  alternates: {
    canonical: "https://www.saarathi.app",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

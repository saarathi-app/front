import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Titillium_Web } from "next/font/google";
import Script from "next/script";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const titilliumWeb = Titillium_Web({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "900"],
  variable: "--font-titillium",
});

export const metadata: Metadata = {
  title: {
    default:
      "Saarathi - Find Your Perfect Mentor | AI-Powered Mentorship Platform in Nepal",
    template: "%s | Saarathi - Professional Mentorship Platform",
  },
  description:
    "Looking to hire a mentor? Saarathi is Nepal's first AI-powered mentorship platform connecting professionals with expert mentors. Get personalized guidance, career development, and skill enhancement. Join our growing community of mentors and mentees.",
  keywords: [
    "hire mentor",
    "find mentor",
    "professional mentorship",
    "career guidance Nepal",
    "mentorship platform",
    "expert mentors",
    "career development",
    "skill enhancement",
    "professional growth",
    "AI mentorship matching",
    "online mentoring",
    "career coaching",
    "professional development Nepal",
    "industry experts",
    "leadership mentoring",
    "tech mentorship",
    "business mentorship",
    "career advancement",
    "professional guidance",
    "skill development",
  ],
  authors: [{ name: "Saarathi Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.saarathi.app",
    siteName: "Saarathi",
    title:
      "Hire Expert Mentors | Saarathi - Nepal's Premier Mentorship Platform",
    description:
      "Transform your career with Saarathi - Nepal's first AI-powered mentorship platform. Connect with verified industry experts, get personalized guidance, and accelerate your professional growth. Join our waitlist today!",
    images: [
      {
        url: "https://www.saarathi.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Saarathi - Find Your Perfect Mentor for Career Growth",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Find Your Perfect Mentor | Saarathi - Nepal's Leading Mentorship Platform",
    description:
      "Looking for professional mentorship? Join Saarathi to connect with expert mentors, get personalized guidance, and accelerate your career growth. Nepal's first AI-powered mentorship platform.",
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
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
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
    other: [
      {
        rel: "mask-icon",
        url: "/favicon/safari-pinned-tab.svg",
        color: "#00F5EE",
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
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Saarathi",
    description:
      "Nepal's first AI-powered mentorship platform connecting professionals with expert mentors",
    url: "https://www.saarathi.app",
    logo: "https://www.saarathi.app/logo.png",
    sameAs: [
      "https://www.linkedin.com/company/saarathi",
      "https://twitter.com/saarathi_app",
      "https://www.facebook.com/saarathiapp",
    ],
    offers: {
      "@type": "Offer",
      name: "Professional Mentorship Services",
      description:
        "Connect with expert mentors for career guidance and professional development",
    },
    serviceType: "Professional Mentorship Platform",
    areaServed: {
      "@type": "Country",
      name: "Nepal",
    },
  };

  return (
    <html
      lang="en"
      className={`${titilliumWeb.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <Script id="metricool" strategy="afterInteractive">
          {`
            function loadScript(a){
              var b=document.getElementsByTagName("head")[0],
              c=document.createElement("script");
              c.type="text/javascript",
              c.src="https://tracker.metricool.com/resources/be.js",
              c.onreadystatechange=a,
              c.onload=a,
              b.appendChild(c)
            }
            loadScript(function(){
              beTracker.t({hash:"5a06fefacee50c52e05bb2568b9766d6"})
            });
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-titillium">{children}</body>
    </html>
  );
}

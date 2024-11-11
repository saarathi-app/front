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
    default: "Saarathi - AI-Powered Global Mentorship Platform",
    template: "%s | Saarathi",
  },
  description: "Connect with expert mentors globally. Saarathi is revolutionizing mentorship with AI-powered matching, personalized guidance, and skill development tracking.",
  keywords: [
    "mentorship platform",
    "global mentors",
    "career guidance",
    "professional development",
    "expert mentorship",
    "skill development",
    "AI-powered mentoring",
    "career growth",
    "professional mentors",
    "international mentorship"
  ],
  authors: [{ name: "Saarathi Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.saarathi.app",
    siteName: "Saarathi",
    title: "Saarathi - AI-Powered Global Mentorship Platform",
    description: "Connect with expert mentors globally. Saarathi is revolutionizing mentorship with AI-powered matching and personalized guidance.",
    images: [
      {
        url: "https://www.saarathi.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Saarathi - AI-Powered Global Mentorship Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saarathi - AI-Powered Global Mentorship Platform",
    description: "Connect with expert mentors globally. Join Saarathi for personalized mentorship and career guidance.",
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
    bing: "your-bing-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      </head>
      <body className="font-titillium">{children}</body>
    </html>
  );
}

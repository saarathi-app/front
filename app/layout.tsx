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
    default: "Saarathi - Nepal's First Mentorship Platform",
    template: "%s | Saarathi",
  },
  description:
    "Connect with experienced mentors to advance your career and personal growth. Saarathi is launching soon!",
  keywords: [
    "mentorship",
    "career development",
    "professional growth",
    "expert advice",
  ],
  authors: [{ name: "Saarathi Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.saarathi.app",
    siteName: "Saarathi",
    title: "Saarathi - Nepal's First Mentorship Platform",
    description:
      "Connect with experienced mentors to advance your career and personal growth. Saarathi is launching soon!",
    images: [
      {
        url: "https://www.saarathi.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Saarathi - Nepal's First Mentorship Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saarathi - Nepal's First Mentorship Platform",
    description:
      "Connect with experienced mentors to advance your career and personal growth. Saarathi is launching soon!",
    images: ["https://www.saarathi.app/twitter-image.png"],
    creator: "@saarathi",
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

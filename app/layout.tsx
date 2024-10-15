import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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

export const metadata: Metadata = {
  title: {
    default: "Saarathi - Expert Mentorship Platform",
    template: "%s | Saarathi",
  },
  description: "Connect with experienced mentors to advance your career and personal growth. Saarathi is launching soon!",
  keywords: ["mentorship", "career development", "professional growth", "expert advice"],
  authors: [{ name: "Saarathi Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.saarathi.app",
    siteName: "Saarathi",
    title: "Saarathi - Expert Mentorship Platform",
    description: "Connect with experienced mentors to advance your career and personal growth. Saarathi is launching soon!",
    images: [
      {
        url: "https://www.saarathi.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Saarathi - Expert Mentorship Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saarathi - Expert Mentorship Platform",
    description: "Connect with experienced mentors to advance your career and personal growth. Saarathi is launching soon!",
    images: ["https://www.saarathi.app/twitter-image.jpg"],
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

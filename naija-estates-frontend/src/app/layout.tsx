import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "NaijaSpaces | Premium Nigerian Real Estate & Short-Term Rentals",
    template: "%s | NaijaSpaces",
  },
  description: "Discover Nigeria's most exceptional real estate. NaijaSpaces offers an exclusive portfolio of luxury mansions, penthouses, commercial shops, and short-term rentals across Lagos, Abuja, and Port Harcourt.",
  keywords: ["Nigerian real estate", "Lagos apartments for rent", "Abuja luxury homes", "Port Harcourt properties", "Short-term rentals Nigeria", "buy property Nigeria", "NaijaSpaces", "commercial shops for rent"],
  authors: [{ name: "NaijaSpaces" }],
  creator: "NaijaSpaces",
  publisher: "NaijaSpaces",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "NaijaSpaces | Premium Nigerian Real Estate",
    description: "Discover Nigeria's most exceptional real estate. NaijaSpaces offers an exclusive portfolio of luxury mansions, penthouses, commercial shops, and short-term rentals.",
    url: "https://naijaspaces.com", // update to actual domain when ready
    siteName: "NaijaSpaces",
    images: [
      {
        url: "https://images.unsplash.com/photo-1613490908578-75c4d6276166?q=80&w=1200&auto=format&fit=crop", 
        width: 1200,
        height: 630,
        alt: "NaijaSpaces Luxury Real Estate",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NaijaSpaces | Premium Nigerian Real Estate",
    description: "Discover Nigeria's most exceptional real estate, from luxury penthouses to commercial shops and short-let apartments.",
    images: ["https://images.unsplash.com/photo-1613490908578-75c4d6276166?q=80&w=1200&auto=format&fit=crop"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

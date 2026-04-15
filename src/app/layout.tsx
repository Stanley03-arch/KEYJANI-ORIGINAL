import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import ThreeBackground from "@/components/ThreeBackground";
import AIBot from "@/components/AIBot";
import "./globals.css";

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-ui-body",
  display: "swap",
});

const displayFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-ui-display",
  display: "swap",
});

const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ui-mono",
  weight: ["400", "500"],
  display: "swap",
});

import { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#08120d",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Keyjani | The Soil Pays the Farmer",
  description:
    "Kenyan climate-tech platform revolutionizing regenerative agriculture through AI, satellite verification, and Web3 carbon rewards.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black",
    title: "Keyjani",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable}`}
    >
      <body className="app-body">
        <ThreeBackground />
        <div className="global-texture" />
        <Navbar />

        <main className="app-main">
          {children}
        </main>

        <AIBot />
      </body>
    </html>
  );
}

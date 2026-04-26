import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SplashCursor from '@/components/effects/SplashCursor';
import LightRays from "@/components/effects/LightRays";
import Navbar from "@/components/home/Navbar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Manish Tiwari",
  description: "Full-Stack Engineer",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      {/*
        KEY: <body> has opacity-0 by default via a CSS class.
        The Hero useEffect will set it to opacity-1 after mount.
        This prevents ANY flash of unstyled/partially-styled content.
      */}
      <body className="min-h-full flex flex-col " style={{ opacity: 0 }}>

        {/* LightRays: position absolute so it doesn't affect layout flow */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <LightRays
            raysOrigin="top-center"
            raysColor="#A855F7"
            raysSpeed={1}
            lightSpread={0.5}
            rayLength={3}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0}
            distortion={0}
            pulsating={true}
            fadeDistance={1}
            saturation={1}
          />
        </div>

        <SplashCursor
          DENSITY_DISSIPATION={9}
          VELOCITY_DISSIPATION={2}
          PRESSURE={0.1}
          CURL={3}
          SPLAT_RADIUS={0.2}
          SPLAT_FORCE={6000}
          COLOR_UPDATE_SPEED={10}
          SHADING
          RAINBOW_MODE={false}
          COLOR="#A855F7"
        />

        {/* Navbar rendered here — Hero animation will target it via querySelector */}
        <Navbar />

        <main className="relative z-10">
          {children}
        </main>

      </body>
    </html>
  );
}
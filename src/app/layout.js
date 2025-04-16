import { Geist, Geist_Mono } from "next/font/google";
import "@fontsource/press-start-2p";
import "./globals.css";
import PageTransitionWrapper from "./components/PageTransitionWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Antonio Lee Portfolio",
  description: "Built with Next.js and styled with TailwindCSS + Framer Motion",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased cursor-none relative bg-black text-white overflow-x-hidden`}>
        {/* Faded Background Logo */}
        <img
          src="/logo.png"
          alt="Background Logo"
          className="fixed opacity-10 z-10 w-[70%] max-w-[1200px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none
          invert brightness-[0.7] saturate-[10] hue-rotate-[90deg] contrast-[1.2]" 
        />

        <PageTransitionWrapper>
          {children}
        </PageTransitionWrapper>
      </body>
    </html>
  );
}

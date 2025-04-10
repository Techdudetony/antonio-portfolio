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
      <head>
        {/* ✅ Optional: You could add meta tags here if needed */}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased cursor-none`}>
        <PageTransitionWrapper>
          {children}
        </PageTransitionWrapper>
      </body>
    </html>
  );
}

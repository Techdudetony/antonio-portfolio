"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function StickyNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/50 px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl sm:text:2xl font-bold text-[#00ff00] font-pixel">Antonio Lee</h1>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8 text-[#00ff00] font-pixel">
          <Link href="/" className="hover:text-lime transition">Home</Link>
          <Link href="/about" className="hover:text-lime transition">About</Link>
          <Link href="/projects" className="hover:text-lime transition">Projects</Link>
          <Link href="/designs" className="hover:text-lime transition">Designs</Link>
          <a
            href="https://github.com/Techdudetony/my-resume/blob/main/Antonio%20Lee%20Resume.pdf"
            className="hover:text-lime transition"
            target="_blank"
            rel="noopener noreferrer">Resume</a>
          <Link href="/#contact" className="hover:text-lime transition">Contact</Link>
          <Link href="/glitch-zone" className="hover:text-lime transition">Glitch Zone</Link>
        </div>

        {/* Mobile Menu Toggle */}
        <motion.button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
          className="md:hidden w-12 h-12 flex flex-col items-center justify-center gap-1 p-2 z-50 fixed top-4 right-4"
          initial={false}
          animate={menuOpen ? "open" : "closed"}
        >
          <motion.span className="block w-8 h-[2px] bg-[#00ff00] origin-center"
            variants={{ open: { rotate: 45, y: 5 }, closed: { rotate: 0, y: 0 } }}
            transition={{ duration: 0.3 }}
          />
          <motion.span className="block w-8 h-[2px] bg-[#00ff00] origin-center"
            variants={{ open: { opacity: 0 }, closed: { opacity: 1 } }}
            transition={{ duration: 0.2 }}
          />
          <motion.span className="block w-8 h-[2px] bg-[#00ff00] origin-center"
            variants={{ open: { rotate: -45, y: -5 }, closed: { rotate: 0, y: 0 } }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </nav>

      {/* Mobile Fullscreen Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center text-3xl font-pixel text-[#00ff00] gap-8">
          <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/projects" onClick={() => setMenuOpen(false)}>Projects</Link>
          <Link href="/designs" onClick={() => setMenuOpen(false)}>Designs</Link>
          <a
            href="https://github.com/Techdudetony/my-resume/blob/main/Antonio%20Lee%20Resume.pdf"
            onClick={() => setMenuOpen(false)}
            target="_blank"
            rel="noopener noreferrer">Resume</a>
          <Link href="/#contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        </div>
      )}
    </>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black text-[#00ff00] font-pixel flex flex-col items-center justify-center px-6 text-center">
      <motion.h1
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-6xl sm:text-8xl mb-6"
      >
        404
      </motion.h1>

      <p className="text-xl sm:text-2xl mb-10 max-w-xl">
        Whoops! Looks like this page fainted from battle.<br />
        But don’t worry — we’ll heal it at the Poké Center.
      </p>

      <img
        src="/404.png"
        alt="Fainted Monster"
        className="w-48 sm:w-64 mb-10 pixel-shadow"
      />

      <Link
        href="/"
        className="inline-block px-6 py-3 border-2 border-[#00ff00] text-[#00ff00] font-pixel tracking-widest hover:bg-[#00ff00] hover:text-black transition"
      >
        Return to Safety <span className="text-3xl">→</span>
      </Link>
    </main>
  );
}

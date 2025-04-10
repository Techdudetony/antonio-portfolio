"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function PageTransitionWrapper({ children }) {
    const pathname = usePathname();
    const [displayChildren, setDisplayChildren] = useState(children);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        setIsTransitioning(true);

        const timeout = setTimeout(() => {
            setDisplayChildren(children);
            setIsTransitioning(false);
        }, 1000); // matches transition duration

        return () => clearTimeout(timeout);
    }, [pathname]);

    return (
        <div className="relative">
            {/* Curtain Overlay with Initials */}
            <AnimatePresence mode="wait">
                {isTransitioning && (
                    <motion.div
                        key="curtain"
                        initial={{ clipPath: "inset(0 100% 0 0)" }}
                        animate={{ clipPath: "inset(0 0% 0 0)" }}
                        exit={{ clipPath: "inset(0 0% 0 100%)" }}
                        transition={{ duration: 1.0, ease: "easeInOut" }}
                        className="fixed inset-0 z-[100] bg-[#00ff00] border-y-8 border-lime flex items-center justify-center"
                    >
                        {/* 🔥 Logo or Initials in Center */}
                        <motion.img
                            src="/logo.png"
                            alt="Logo"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="w-240 h-240 object-contain drop-shadow-xl"
                            draggable={false}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Delay content until after transition */}
            <div className={isTransitioning ? "opacity-0" : "opacity-100 transition-opacity duration-300"}>
                {displayChildren}
            </div>
        </div>
    );
}

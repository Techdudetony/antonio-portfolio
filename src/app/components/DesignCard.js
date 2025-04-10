"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function DesignCard({ title, description, images, isActive, onClick, index }) {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const touchStartX = useRef(null);

    const selectedImage = selectedIndex !== null ? images[selectedIndex] : null;

    // Keyboard Navigation (Escape, Left, Right)
    useEffect(() => {
        const handleKey = (e) => {
            if (selectedIndex !== null) {
                if (e.key === "Escape") setSelectedIndex(null);
                if (e.key === "ArrowRight") setSelectedIndex((prev) => (prev + 1) % images.length);
                if (e.key === "ArrowLeft") setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [selectedIndex, images.length]);

    // Swipe gesture support
    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        if (touchStartX.current === null) return;
        const deltaX = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
                // swipe right
                setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
            } else {
                // swipe left
                setSelectedIndex((prev) => (prev + 1) % images.length);
            }
        }
        touchStartX.current = null;
    };

    return (
        <>
            <div
                onClick={() => onClick(index)}
                className={`border-8 border-[#00ff00] bg-black p-4 rounded-none text-[#00ff00] font-pixel shadow-lg mb-4 transition-all duration-500 ease-in-out
          ${isActive ? "col-span-4" : "col-span-1"}`}
            >
                <h3 className="text-xl mb-2 cursor-pointer hover:underline">{title}</h3>

                <AnimatePresence>
                    {isActive && (
                        <motion.div
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <p className="mb-4 text-sm">{description}</p>
                            <div className="grid grid-cols-3 gap-2">
                                {images.map(({ src, label }, i) => (
                                    <div key={i} className="text-center">
                                        <img
                                            src={src}
                                            alt={label}
                                            className="w-50 border border-lime p-2 cursor-pointer hover:scale-105 transition"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedIndex(i);
                                            }}
                                        />
                                    </div>
                                ))}

                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Modal */}
            {selectedIndex !== null && (
                <div
                    className="fixed inset-0 z-[9999] bg-black bg-opacity-90 flex items-center justify-center"
                    onClick={() => setSelectedIndex(null)}
                >
                    {/* ← Left Arrow */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
                        }}
                        className="absolute left-8 top-1/2 -translate-y-1/2 text-4xl text-lime font-bold z-50"
                    >
                        <span className="text-6xl">←</span>
                    </button>

                    {/* Main Image and Caption */}
                    <div
                        className="relative flex flex-col items-center text-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-2xl font-bold text-[#00ff00] mb-1">{title}</h2>
                        <p className="text-sm text-[#00ff00] mb-4">
                            Screenshot {selectedIndex + 1} — {selectedImage.label}
                        </p>
                        <img
                            src={selectedImage.src}
                            alt={`Zoomed screenshot ${selectedIndex + 1}`}
                            className="max-w-[90vw] max-h-[80vh] border-4 border-lime"
                        />
                    </div>

                    {/* → Right Arrow */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedIndex((prev) => (prev + 1) % images.length);
                        }}
                        className="absolute right-8 top-1/2 -translate-y-1/2 text-4xl text-lime font-bold z-50"
                    >
                        <span className="text-6xl">→</span>
                    </button>
                </div>
            )}
        </>
    );
}

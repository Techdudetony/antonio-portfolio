"use client";

import { Typewriter } from "react-simple-typewriter";
import DesignCard from "../components/DesignCard";
import { motion } from "framer-motion";
import Link from "next/link";

export default function DesignsPage() {
    const projects = [
        {
            title: "CraftSphere",
            description: "CraftSphere is a mobile application that connects artisans and craft lovers through a vibrant marketplace, offering handmade goods, creator profiles, and interactive workshops. Its clean, intuitive design enhances community engagement and creative discovery.",
            images: [
                "/designs/craftsphere/page1.png",
                "/designs/craftsphere/page2.png",
                "/designs/craftsphere/page3.png",
            ],
        },
        {
            title: "LevelUP Task",
            description: "LevelUP Task is a gamified task manager mobile application that turns daily to-dos into reqarding challenges, helping users stay productive through points, progress tracking, and achievement badges. Its playful, user-friendly design encourages consistent goal-setting and motivation.",
            images: [
                "/designs/levelup/page1.png",
                "/designs/levelup/page2.png",
                "/designs/levelup/page3.png",
                "/designs/levelup/page4.png",
                "/designs/levelup/page5.png",
                "/designs/levelup/page6.png",
                "/designs/levelup/page7.png",
                "/designs/levelup/page8.png",
                "/designs/levelup/page9.png",
                "/designs/levelup/page10.png",
                "/designs/levelup/page11.png",
                "/designs/levelup/page12.png",
                "/designs/levelup/page13.png",
                "/designs/levelup/page14.png",
                "/designs/levelup/page15.png",
                "/designs/levelup/page16.png",
                "/designs/levelup/page17.png",
                "/designs/levelup/page18.png",
                "/designs/levelup/page19.png",
            ],
        },
        {
            title: "AUraBloom",
            description: "AUraBloom is a wellness and self-care mobile application that helps users cultivate mindfulness through guided meditations, mood tracking, and daily journaling. It's calming interface, intuitive layout, and soft visuals are designed to promote relaxation and make self-care a seamless part of everyday life.",
            images: [
                "/designs/aurabloom/page1.png",
                "/designs/aurabloom/page2.png",
                "/designs/aurabloom/page3.png",
                "/designs/aurabloom/page4.png",
                "/designs/aurabloom/page5.png",
                "/designs/aurabloom/Help.png",
                "/designs/aurabloom/Menu.png",
            ],
        },
    ]
    return (
        <main className="min-h-screen bg-black text-[#00ff00] font-pixel p-8 space-y-12">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute top-6 left-6 sm:top-10 sm:left-10 z-50"
            >
                <Link
                    href="/"
                    className="text-[#00ff00] hover:text-black font-semibold border border-[#00f00] hover:border-[#00ff00] hover:bg-[#00ff00] px-4 py-2 rounded transition"
                >
                    <span className="text-3xl mr-1">←</span> Back to Home
                </Link>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl font-extrabold text-[#00ff00] text-center mb-12 font-pixel text-center"
            >
                <Typewriter
                    words={["🎮 Design Gallery", "UI Experiments", "Design Showcase"]}
                    loop={0}
                    cursor
                    cursorStyle="|"
                    typeSpeed={80}
                    deleteSpeed={40}
                    delaySpeed={1000}
                />
            </motion.h1>
            <div className="grid gap-12 md:grid-cols-1">
                {projects.map((proj, i) => (
                    <DesignCard key={i} {...proj} />
                ))}
            </div>
        </main>
    );
}


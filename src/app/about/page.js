"use client";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { developerSkills, designerSkills } from "../components/skillsData";
import SkillsCarousel from "../components/SkillsCarousel";

export default function AboutPage() {
    const [activeTab, setActiveTab] = useState("developer");
    const [direction, setDirection] = useState(1); // 1 = left → right, -1 = right → left
    const [skillsView, setSkillsView] = useState("grid");


    const handleTabSwitch = (tab) => {
        if (tab !== activeTab) {
            setDirection(tab === "designer" ? 1 : -1);
            setActiveTab(tab);
        }
    };

    const swipeVariants = {
        initial: (direction) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0,
        }),
        animate: {
            x: 0,
            opacity: 1,
        },
        exit: (direction) => ({
            x: direction > 0 ? -100 : 100,
            opacity: 0,
        }),
    };

    return (
        <main className="min-h-screen bg-black text-[#00ff00] px-6 py-16 font-pixel">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
            >
                <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 text-center">Meet the Developer & Designer</h1>

                <blockquote className="border-l-4 border-[#00ff00] pl-4 italic text-lime-300 mb-8 text-sm sm:text-base">
                    “Develop a passion for learning. If you do, you will never cease to grow.” — Anthony J. D’Angelo
                </blockquote>

                <div className="flex justify-center gap-4 mb-8 mt-6">
                    <button
                        className={`px-6 py-2 border-2 font-pixel transition ${activeTab === "developer"
                            ? "bg-[#00ff00] text-black border-[#00ff00]"
                            : "text-[#00ff00] border-[#00ff00] hover:bg-[#00ff00] hover:text-black"
                            }`}
                        onClick={() => handleTabSwitch("developer")}
                    >
                        💻 Developer
                    </button>
                    <button
                        className={`px-6 py-2 border-2 font-pixel transition ${activeTab === "designer"
                            ? "bg-[#00ff00] text-black border-[#00ff00]"
                            : "text-[#00ff00] border-[#00ff00] hover:bg-[#00ff00] hover:text-black"
                            }`}
                        onClick={() => handleTabSwitch("designer")}
                    >
                        🎨 Designer
                    </button>
                </div>

                <div className="flex justify-end items-center gap-4 mt-8 mb-6">
                    <span className="text-sm text-gray-300">Grid</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={skillsView === "carousel"}
                            onChange={() => setSkillsView(skillsView === "grid" ? "carousel" : "grid")}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lime-500"></div>
                    </label>
                    <span className="text-sm text-gray-300">Carousel</span>
                </div>

                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={activeTab}
                        custom={direction}
                        variants={swipeVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="text-gray-300"
                    >
                        {activeTab === "developer" ? (
                            <div>
                                <h3 className="text-2xl font-bold text-[#00ff00] mb-4">Developer Toolkit</h3>
                                <p className="mb-4">I specialize in building apps with Python, Kotlin, and AI integrations. I love testing, clean UI logic, and building tools like Pokémon save file editors.</p>
                                {developerSkills.map((group) =>
                                    skillsView === "carousel" ? (
                                        <SkillsCarousel key={group.title} title={group.title} items={group.items} />
                                    ) : (
                                        <SkillGroup key={group.title} title={group.title} items={group.items} />
                                    )
                                )}
                            </div>
                        ) : (
                            <div>
                                <h3 className="text-2xl font-bold text-[#00ff00] mb-4">Designer Approach</h3>
                                <p className="mb-4">I design interfaces with retro flair, combining usability with pixel-inspired aesthetics. I’m passionate about creating apps that *feel* good to use.</p>
                                {designerSkills.map((group) =>
                                    skillsView === "carousel" ? (
                                        <SkillsCarousel key={group.title} title={group.title} items={group.items} />
                                    ) : (
                                        <SkillGroup key={group.title} title={group.title} items={group.items} />
                                    )
                                )}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                <section className="space-y-6 text-gray-200 text-base sm:text-lg leading-relaxed mt-12">
                    <p>
                        I'm Antonio Lee — a developer with a passion for building smart, user-centered applications.
                        Currently working as a QA Consultant at CarMax, I bring strong analytical expertise to every project — with a
                        knack for catching the details others miss.
                    </p>

                    <p>
                        I’m pursuing my Bachelor’s in Computer Science with a specialization in Artificial Intelligence. Outside the
                        classroom, I’m hands-on with Python, Kotlin, C++, and C# — building tools like Pokémon save editors,
                        intelligent apps, and sleek UI-driven projects.
                    </p>

                    <p>
                        When I’m not coding or testing, you’ll find me at anime conventions like GalaxyCon or Katsucon (cosplay
                        included), gaming with friends, or hanging out with my dog Rocko. I’m all about blending logic with creativity —
                        and I’m always up for an adventure that sparks innovation.
                    </p>
                </section>

                <Link
                    href="/"
                    className="inline-flex items-center justify-center mt-12 border-2 border-[#00ff00] hover:bg-[#00ff00] hover:text-black text-[#00ff00] px-6 py-3 transition font-bold"
                >
                    <span className="text-3xl mb-3 mr-2">←</span> Back to Home
                </Link>
            </motion.div >
        </main >
    );
}

function SkillGroup({ title, items }) {
    return (
        <div className="text-center">
            <h4 className="text-2xl text-[#00ff00] font-semibold mb-4">{title}</h4>
            <div className="grid grid-cols-2 sm:grd-cols-3 md:grid-cols-4 lg:flex lg:flex-wrap gap-3 justify-center mb-8">
                {items.map(({ name, link }) => (
                    <a
                        key={name}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-black border-4 border-[#00ff00] rounded-none p-4 shadow-lg h-32 w-48 flex flex-col justify-center items-center
                        hover:bg-[#00ff00] hover:text-black text-sm"
                    >
                        {name}
                    </a>
                ))}
            </div>
        </div>
    );
}


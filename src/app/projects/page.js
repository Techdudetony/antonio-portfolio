"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import projectSummaries from "./projectSummaries";
import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";

export default function ProjectsPage() {
    const [repos, setRepos] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const perPage = 1;
    const [showDetails, setShowDetails] = useState(false);
    const [isLoadingRepos, setIsLoadingRepos] = useState(true);
    const [reposError, setReposError] = useState(false);

    const [scrollCooldown, setScrollCooldown] = useState(false);
    const touchStartY = useRef(0);

    const renderProjectSummary = () => {
        if (!currentRepo) return null;
        const summary = projectSummaries[currentRepo.name]?.summary;
        return (
            <p className="text-base leading-relaxed text-white mt-6">
                {summary || "No additional summary provided for this project."}
            </p>
        );
    };

    const handleWheel = (e) => {
        if (scrollCooldown || showDetails) return;
        const direction = e.deltaY > 0 ? 1 : -1;
        paginate(direction);
        setScrollCooldown(true);
        setTimeout(() => setScrollCooldown(false), 800);
    };

    const handleTouchStart = (e) => {
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
        if (scrollCooldown || showDetails) return;
        const touchEndY = e.changedTouches[0].clientY;
        const deltaY = touchStartY.current - touchEndY;
        if (Math.abs(deltaY) > 50) {
            const direction = deltaY > 0 ? 1 : -1;
            paginate(direction);
            setScrollCooldown(true);
            setTimeout(() => setScrollCooldown(false), 800);
        }
    };

    useEffect(() => {
        const fetchReposAndLanguages = async () => {
            try {
                const response = await fetch("https://api.github.com/users/techdudetony/repos?sort=updated");
                const data = await response.json();
                const filtered = data.filter((repo) => !repo.fork);

                // Fetch languages for each repo dynamically
                const enrichedRepos = await Promise.all(
                    filtered.map(async (repo) => {
                        const langRes = await fetch(repo.languages_url);
                        const languages = await langRes.json();
                        return { ...repo, languages };
                    })
                );

                // Add external project manually (with dummy languages if needed)
                const externalProject = {
                    name: "Project_Aura_Bloom",
                    description: "A collaborative mental health app for mood tracking and support.",
                    html_url: "https://github.com/asandoval557/Project_Aura_Bloom",
                    languages: { Kotlin: 1 }, // You can customize this
                };

                setRepos([...enrichedRepos, externalProject]);
                setIsLoadingRepos(false);
                setReposError(enrichedRepos.length === 0);
            } catch (error) {
                console.error("GitHub API error:", error);
                setIsLoadingRepos(false);
                setReposError(true);
            }
        };

        fetchReposAndLanguages();
    }, []);

    const totalPages = Math.ceil(repos.length / perPage);
    const currentRepo = repos[currentPage];

    const [direction, setDirection] = useState(0);
    const paginate = (newDirection) => {
        setDirection(newDirection);
        setCurrentPage((prev) => (prev + newDirection + totalPages) % totalPages);
    };

    const variants = {
        enter: (direction) => ({
            y: direction > 0 ? 300 : -300,
            opacity: 0,
            scale: 0.95,
        }),
        center: { y: 0, opacity: 1, scale: 1 },
        exit: (direction) => ({
            y: direction > 0 ? -300 : 300,
            opacity: 0,
            scale: 0.95,
        }),
    };

    return (
        <main className="min-h-screen bg-black text-[#00f00] px-8 py-20 overflow-hidden">
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
                    words={["My Projects", "Featured Builds", "Creative Work"]}
                    loop={0}
                    cursor
                    cursorStyle="|"
                    typeSpeed={80}
                    deleteSpeed={40}
                    delaySpeed={1000}
                />
            </motion.h1>

            <div className="relative max-w-6xl mx-auto h-[500px]">
                {isLoadingRepos ? (
                    <div className="flex justify-center items-center h-full">
                        <motion.div
                            className="w-10 h-10 border-4 border-[#00ff00] border-t-transparent rounded-full animate-spin"
                            role="status"
                        />
                    </div>
                ) : reposError ? (
                    <div className="text-center text-white">No projects available.</div>
                ) : (
                    <div
                        onWheel={handleWheel}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                        className="h-full relative"
                    >
                        <div className={`${showDetails ? "blur-sm opacity-40" : "opacity-100"} transition-all duration-300`}>
                            <AnimatePresence custom={direction} mode="wait">
                                <motion.div
                                    key={currentPage}
                                    custom={direction}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.5 }}
                                    className="flex items-center justify-center absolute w-full"
                                >
                                    {currentRepo && (
                                        <div className="flex flex-col items-center justify-center text-center p-8 bg-black border-4 border-[#00ff00] rounded-xl shadow-lg w-full">
                                            {/* Icon */}
                                            <img
                                                src={projectSummaries[currentRepo.name]?.icon || "/pixelated-portfolio.png"}
                                                alt={`${currentRepo.name} Icon`}
                                                className="w-24 h-24 mb-4 rounded-full shadow-md"
                                            />
                                            {/* Project Title */}
                                            <h2 className="text-2xl font-bold text-[#00ff00]">{currentRepo.name}</h2>
                                            {/* Project Description */}
                                            <p className="text-white mt-2 mb-4">
                                                {currentRepo.description || "No description provided."}
                                            </p>
                                            {/* More Info Button */}
                                            <button
                                                onClick={() => setShowDetails(true)}
                                                className="mt-6 text-[#00ff00] hover:text-[#a6ffa6] text-lg sm:text-xl transition font-semibold flex items-center gap-2"
                                                aria-label="View more"
                                            >
                                                <span>More Info</span>
                                                <span className="text-2xl">➡</span>
                                            </button>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                )}

                <AnimatePresence>
                    {showDetails && currentRepo && (
                        <motion.div
                            key="details-panel"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ duration: 0.5 }}
                            className="fixed top-0 right-0 h-full w-full md:w-1/2 bg-black border-2 border-[#00ff00] z-50 shadow-xl p-10 overflow-y-auto"
                        >
                            <h2 className="text-3xl font-bold text-[#00ff00] mb-4">{currentRepo.name}</h2>
                            <p className="text-white mb-4">{currentRepo.description || "No description provided."}</p>
                            <a
                                href={currentRepo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block text-[#00ff00] underline hover:text-[#a6ffa6] mb-8"
                            >
                                <span>View on GitHub </span>
                                <span className="text-4xl">→</span>
                            </a>
                            <div className="flex flex-wrap gap-4 mt-4">
                                {currentRepo.languages &&
                                    Object.keys(currentRepo.languages).map((lang) => (
                                        <span
                                            key={lang}
                                            className="bg-[#00ff00] text-black text-s px-2 py-1 rounded-full"
                                        >
                                            {lang}
                                        </span>
                                    ))}
                            </div>
                            <button
                                onClick={() => setShowDetails(false)}
                                className="mt-8 bg-black text-[#00ff00] border border-[#00ff00] hover:bg-[#00ff00] hover:text-black font-semibold px-4 py-2 rounded transition"
                            >
                                ← Back
                            </button>
                            <div className="prose prose-invert max-w-none text-white mt-8">
                                {renderProjectSummary()}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}

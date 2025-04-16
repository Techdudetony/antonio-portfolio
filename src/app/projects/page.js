"use client";

import clsx from "clsx";
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
    const [viewMode, setViewMode] = useState("grid");

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

    const mergeLibraryVariants = (deps = []) => {
        const cleaned = new Set();

        deps.forEach(dep => {
            if (!dep || dep.startsWith("#")) return; // Skip comments and empty lines

            // Normalize name: lowercase, remove version specs and extras
            let base = dep.toLowerCase()
                .replace(/^([^\s=><~!#]+).*/, "$1") // capture only name portion before any version or extras
                .replace(/[^a-z0-9_\-]/gi, "");     // then clean leftover punctuation

            // Remove _sip or similar variants
            base = base.replace(/(_sip|_qt|-qt6|_core|_client)$/, "");

            // Simplify common redundancies
            const aliases = {
                pyqt6_qt6: "pyqt6",
                python_version: null,
                urllib3: "urllib",
                beautifulsoup4: "beautifulsoup",
                beautifulsoup44123: "beautifulsoup",
                certifi20241214: "certifi",
                charsetnormalizer: "charset-normalizer"
            };

            if (aliases[base] === null) return; // Skip non-useful entries
            cleaned.add(aliases[base] || base);
        });

        return [...cleaned];
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
                        const [langRes, depsRes] = await Promise.all([
                            fetch(repo.languages_url),
                            fetch(`https://raw.githubusercontent.com/${repo.owner.login}/${repo.name}/main/requirements.txt`).then(res => res.ok ? res.text() : ''), // fallback if not found
                        ]);

                        const languages = await langRes.json();

                        // Parse dependencies from requirements.txt
                        const dependencies = depsRes
                            ? depsRes
                                .split("\n")
                                .map(line => line.split("==")[0].split(">=")[0].split("<=")[0].trim()) // Remove versions
                                .filter(line => line && !line.startsWith("#")) // Remove empty lines & comments
                                .map(dep => dep.toLowerCase()) // Normalize for deduplication
                            : [];

                        const cleanedDependencies = mergeLibraryVariants(dependencies);
                        return { ...repo, languages, dependencies: cleanedDependencies };
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
        <main
            className={clsx(
                "min-h-screen bg-black text-[#00f00] px-8 py-20 transition-all duration-300",
                viewMode === "grid" ? "overflow-auto" : "overflow-hidden"
            )}
        >
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

            <div className="flex justify-center gap-4 mb-8">
                <button
                    onClick={() => setViewMode("scroll")}
                    className={`font-pixel border-2 px-4 py-2 ${viewMode === "scroll" ? "bg-[#00ff00] text-black" : "bg-black text-[#00ff00]"
                        }`}
                >
                    🎰 Scroll View
                </button>
                <button
                    onClick={() => setViewMode("grid")}
                    className={`font-pixel border-2 px-4 py-2 ${viewMode === "grid" ? "bg-[#00ff00] text-black" : "bg-black text-[#00ff00]"
                        }`}
                >
                    🗂️ Grid View
                </button>
            </div>

            <div className={`relative max-w-6xl mx-auto ${viewMode === "scroll" ? "h-[500px]" : "h-auto"}`}>
                <div className="relative max-w-6xl mx-auto">
                    {isLoadingRepos ? (
                        <div className="flex justify-center items-center h-full">
                            <motion.div className="w-10 h-10 border-4 border-[#00ff00] border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : reposError ? (
                        <div className="text-center text-white">No projects available.</div>
                    ) : viewMode === "scroll" ? (
                        // 🎰 Scroll view
                        <div
                            onWheel={handleWheel}
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                            className="h-[500px] relative"
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
                                                <img
                                                    src={projectSummaries[currentRepo.name]?.icon || "/pixelated-portfolio.png"}
                                                    alt={`${currentRepo.name} Icon`}
                                                    className="w-24 h-24 mb-4 rounded-full shadow-md"
                                                />
                                                <h2 className="text-2xl font-bold text-[#00ff00]">{currentRepo.name}</h2>
                                                <p className="text-white mt-2 mb-4">
                                                    {currentRepo.description || "No description provided."}
                                                </p>
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
                    ) : (
                        // 🗂️ Grid View
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-4">
                            {repos.map((repo) => (
                                <div key={repo.name} className="flip-card w-95 sm:w-80 md:w-96 h-80 sm:h-96 mx-auto">
                                    <div className="flip-inner w-full h-full relative">
                                        {/* FRONT FACE */}
                                        <div className="flip-front flex flex-col items-center justify-center text-center">
                                            <img
                                                src={projectSummaries[repo.name]?.icon || "/pixelated-portfolio.png"}
                                                alt={`${repo.name} Icon`}
                                                className="w-28 h-28 mx-auto mb-4 rounded-full"
                                            />
                                            <h3 className="text-xl mb-2 text-[#00ff00]">{repo.name}</h3>
                                        </div>

                                        {/* BACK FACE */}
                                        <div className="flip-back text-center px-4 py-6">
                                            <p className="text-sm text-white mb-4">
                                                {repo.description || "No description provided."}
                                            </p>
                                            <a
                                                href={repo.html_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#00ff00] underline hover:text-[#a6ffa6]"
                                            >
                                                View on GitHub <span className="text-3xl">→</span>
                                            </a>

                                            {/* 🔧 Dependencies (Truncated) */}
                                            <div className="flex flex-wrap justify-center gap-2 mt-4">
                                                {repo.dependencies?.slice(0, 3).map((dep) => (
                                                    <span
                                                        key={dep}
                                                        className="bg-[#00ff00] text-black text-xs font-pixel px-2 py-1 rounded-full"
                                                    >
                                                        {dep}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

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
                            
                            <div className="mt-6 space-y-4">
                                {/* 🧠 Languages Section */}
                                {currentRepo.languages && (
                                    <div>
                                        <h3 className="text-[#00ff00] font-pixel text-base mb-2">Languages</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {Object.keys(currentRepo.languages).map((lang) => (
                                                <span
                                                    key={lang}
                                                    className="bg-[#00ff00] text-black font-pixel text-sm min-w-[90px] text-center px-2 py-1 rounded-full inline-block"
                                                >
                                                    {lang}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* 🧩 Dependencies Section */}
                                {currentRepo.dependencies?.length > 0 && (
                                    <div>
                                        <h3 className="text-[#00ff00] font-pixel text-base mb-2">Dependencies</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {currentRepo.dependencies.map((dep) => (
                                                <span
                                                    key={dep}
                                                    className="bg-[#00ff00] text-black font-pixel text-sm min-w-[90px] text-center px-2 py-1 rounded-full inline-block"
                                                >
                                                    {dep}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
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

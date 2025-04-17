"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const messages = [
    "A wild bug appeared!",
    "This page rolled a natural 1.",
    "You stepped into the Glitch Zone.",
    "This route is currently blocked by invisible walls.",
    "It’s dangerous to go alone... especially here."
];

const images = [
    "/404.png",
    "/glitch1.png",
    "/glitch2.png",
    "/glitch3.png",
    "/glitch4.png",
    "/glitch5.png"
];

export default function GlitchZone() {
    const [message, setMessage] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
        const randomImage = images[Math.floor(Math.random() * images.length)];
        setImage(randomImage);

        if (randomImage === "/glitch5.png") {
            setMessage("This page rolled a natural 1.");
        } else {
            const otherMessages = messages;
            const randomMsg = otherMessages[Math.floor(Math.random() * otherMessages.length)];
            setMessage(randomMsg);
        }
    }, []);

    return (
        <main className="min-h-screen bg-black text-[#00ff00] font-pixel flex flex-col items-center justify-center px-6 text-center">
            <h1 className="text-5xl sm:text-7xl mb-4">Glitch Zone</h1>

            <p className="text-xl sm:text-2xl mb-10 max-w-xl">{message}</p>

            <div className="glitch" data-text="">
                {image && (
                    <Image
                        src={image}
                        width={400}
                        height={300}
                        alt="Glitched creature"
                        className="pixel-shadow"
                    />
                )}
            </div>

            <a
                href="/"
                className="mt-10 inline-block px-6 py-3 border-2 border-[#00ff00] text-[#00ff00] font-pixel tracking-widest hover:bg-[#00ff00] hover:text-black transition"
            >
                Back to Safety →
            </a>
        </main>
    );
}

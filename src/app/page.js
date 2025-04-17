"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, EffectFade, Autoplay, Pagination } from 'swiper/modules';

export default function Home() {
  const spotlightRef = useRef(null);
  const [showButton, setShowButton] = useState(false) // For 'Back to Top' Button

  const timelineItems = [
    { year: "2012", label: "Started College" },
    { year: "2013", label: "Crew Trainer at Hardees" },
    { year: "2015", label: "Operations Supervisor at AC Moore" },
    { year: "2017", label: "Mechanic/QC at Direct Mail Solutions" },
    { year: "2019", label: "Joined the US Army" },
    { year: "2020", label: "QA Consultant at CarMax" },
    { year: "2023", label: "Full Sail University: Computer Science program begins" },
    { year: "2024", label: "Graduate Computer Science Associate program at Full Sail University" },
    { year: "2025", label: "Computer Science: AI Specialization Bachelors Begins" },
    { year: "2026", label: "Bachelors Graduation Goal" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 100); // show after 100px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll)
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      <main className="relative min-h-screen bg-black overflow-hidden">

        {/* Spotlight Layer */}
        <div
          ref={spotlightRef}
          className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300"
        />

        <section className="relative z-10 px-8 py-20 max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6"
          >
            <Typewriter
              words={["QA Consultant.", "Developer.", "Cosplayer.", "Dog Dad.", "AI Enthusiast."]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={80}
              deleteSpeed={40}
              delaySpeed={1000}
            />
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg text-gray-300 mb-8"
          >
            Developer with strong analytical skills, real-world QA experience at CarMax, and a creative mindset backed by a love for anime, Pokémon, and
            adventures with my dog Rocko.
          </motion.p>

          <h2 className="text-xl font-pixel text-[#00ff00] uppercase mb-4 tracking-widest animate-fade_in">
            Personal Snapshot
          </h2>
          {/* Fun Facts Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: "Con-Goer", icon: "🎭" },
              { label: "Pokémon Fan", icon: "🔥" },
              { label: "Rocko's Human", icon: "🐶" },
              { label: "AI Explorer", icon: "🧠" },
              { label: "Cosplayer", icon: "🌀" },
              { label: "Creative Coder", icon: "💻" },
            ].map((fact, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className="inline-flex items-center gap-2 px-4 py-2 border-2 border-[#00ff00] bg-black text-[#00ff00] font-pixel text-sm 
                tracking-widest shadow-[4px_4px_0px_#00ff00] select-none"
              >
                <h3 className="text-xl font-semibold">{fact.icon} {fact.label}</h3>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="relative z-10 px-8 py-20 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Slideshow */}
          <div className="w-full h-[700px] max-w-[800px] rounded-xl overflow-hidden border border-gray-700 shadow-lg">
            <Swiper
              modules={[EffectFade, Autoplay]}
              effect="fade"
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={true}
              className="w-full h-full"
            >
              {['me.jpg', 'me2.jpg', 'me3.jpg', 'me4.jpg', 'me6.jpg', 'me7.jpg', 'me8.jpg'].map((src, i) => (
                <SwiperSlide key={i}>
                  <img
                    src={`/${src}`}
                    alt={`Antonio ${i}`}
                    className="object-cover w-full h-full transition duration-500 ease-in-out"
                    loading="lazy"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* About Section */}
          <div id="about">
            <h2 className="text-3xl font-bold mb-4 text-[#00ff00] font-pixel">About Me</h2>
            <p className="text-base leading-relaxed text-gray-300 mb-6">
              Developer with a passion for blending logic and creativity. I bring QA precision from CarMax,
              a Computer Science background in AI, and a love for design, Pokémon, and tech that sparks curiosity.
            </p>
            <Link
              href="/about"
              className="inline-block px-6 py-3 border-2 border-[#00ff00] text-[#00ff00] font-pixel tracking-widest hover:bg-[#00ff00] hover:text-black transition"
            >
              Learn More About Me <span className="text-3xl">→</span>
            </Link>
          </div>
        </section>

        {/* Timeline Carousel */}
        <section className="relative z-10 px-4 py-20 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">My Journey</h2>
          <div className="w-full max-w-6xl mx-auto px-4">
            <Swiper
              modules={[EffectCoverflow, Pagination, Autoplay]}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView="auto"
              loop={true}
              speed={700} // speed in ms for smooth transition
              autoplay={{
                delay: 1500, // 1.5 secs between slides
                disableOnInteraction: false // Keeps autoplay running even after manual swipes
              }}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={{ clickable: true }}
              className="timeline-swiper max-w-4xl mx-auto pb-10"
            >
              {timelineItems.map((item, i) => (
                <SwiperSlide
                  key={i}
                  className="!w-72"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gray-1000 border border-lime rounded-none p-8 shadow-lg h-64 w-64 flex flex-col justify-center items-center"
                  >
                    <h3 className="text-xl font-bold text-lime">{item.year}</h3>
                    <p className="text-gray-200 mt-2 text-center">{item.label}</p>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="relative z-10 px-8 py-20 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4"><p>Let&apos;s Connect</p></h2>
          <p className="mb-6 text-white">Want to collaborate, chat tech, or share con stories? Hit me up 👇</p>

          <div className="flex flex-wrap gap-4 mb-6">
            <motion.a
              whileHover={{ scale: 1.05, x: 5, y: -2 }}
              transition={{ type: 'spring', stiffness: 300 }}
              href="mailto:aaleejr12@gmail.com"
              className="font-pixel text-pixel-foreground bg-pixel-background border-4 border-pixel-border px-6 py-4 transition-all 
              duration-150 hover:bg-[#00ff00] hover:text-black hover:border-[#00ff00] hover:shadow-[0_0_10px_#00ff00]"
            >
              📬 Email Me
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05, x: 5, y: -2 }}
              transition={{ type: 'spring', stiffness: 300 }}
              href="https://github.com/techdudetony"
              target="_blank"
              className="font-pixel text-pixel-foreground bg-pixel-background border-4 border-pixel-border px-6 py-4 transition-all 
              duration-150 hover:bg-[#00ff00] hover:text-black hover:border-[#00ff00] hover:shadow-[0_0_10px_#00ff00]"
            >
              🖥️ GitHub
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05, x: 5, y: -2 }}
              transition={{ type: 'spring', stiffness: 300 }}
              href="https://linkedin.com/in/antonioleejr"
              target="_blank"
              className="font-pixel text-pixel-foreground bg-pixel-background border-4 border-pixel-border px-6 py-4 transition-all 
              duration-150 hover:bg-[#00ff00] hover:text-black hover:border-[#00ff00] hover:shadow-[0_0_10px_#00ff00]"
            >
              💼 LinkedIn
            </motion.a>
          </div>
        </section>

        {showButton && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-4 right-4 z-50 bg-transparent border-none p-0 cursor-pointer"
            aria-label="Back to top"
          >
            <img
              src="/up.png"
              alt="Back to top"
              className="w-12 h-12 drop-shadow-[0_0_6px_#00ff00] animate-pulse"
            />
          </button>
        )}
      </main>
    </>
  );
} 

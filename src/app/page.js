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
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const particles = [];

  function hexToRgb(h) {
    const rgb = hslToRgb(...hslStringToArray(h));
    return rgb.join(", ");
  }

  function hslStringToArray(hslString) {
    const hsl = hslString
      .replace(/[^\d,]/g, '')
      .split(',')
      .map(Number);
    return [hsl[0] / 360, hsl[1] / 100, hsl[2] / 100];
  }

  // HSL to RGB conversion
  function hslToRgb(h, s, l) {
    let r, g, b;

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const handleClick = (e) => {
      const origin = { x: e.clientX, y: e.clientY };
      const count = 30;

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const speed = Math.random() * 4 + 2;

        particles.push({
          x: origin.x,
          y: origin.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          radius: Math.random() * 2 + 1,
          color: `hsl(${Math.random() * 360}, 100%, 70%)`,
        });
      }
    };

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resize();
    window.addEventListener("resize", resize);

    const trail = Array(20).fill().map(() => ({ x: 0, y: 0 }));

    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and draw each particle
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.02;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${hexToRgb(p.color)}, ${p.alpha})`;
        ctx.fill();
      }

      trail.unshift({ x: mouse.current.x, y: mouse.current.y });
      trail.pop();

      ctx.beginPath();
      ctx.moveTo(trail[0].x, trail[0].y);

      for (let i = 1; i < trail.length - 2; i++) {
        const xc = (trail[i].x + trail[i + 1].x) / 2;
        const yc = (trail[i].y + trail[i + 1].y) / 2;
        ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
      }

      // Handle the last 2 points
      ctx.lineTo(trail[trail.length - 1].x, trail[trail.length - 1].y);
      
      ctx.strokeStyle = "rgb(0, 255, 0)";
      ctx.lineWidth = 1.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();

      requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);


    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("resize", resize);
    };
  }, []);

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

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-10 pointer-events-none blur-xs"
      />


      <main className="relative min-h-screen bg-black overflow-hidden">
        {/* Spotlight Layer */}
        <div
          ref={spotlightRef}
          className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300"
        />

        {/* Sticky Nav */}
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/50 px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Antonio Lee</h1>
          <div className="space-x-8">
            <a href="#about" className="hover:text-lime transition">About</a>
            <Link href="/projects" className="hover:text-lime transition">Projects</Link>
            <Link href="/designs" className="hover:text-lime transition">Designs</Link>
            <a href="/resume.pdf" className="hover:text-lime transition" target="_blank" rel="noopener noreferrer">Resume</a>
            <a href="#contact" className="hover:text-lime transition">Contact</a>
          </div>
        </nav>

        <section className="relative z-10 px-8 py-20 max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-extrabold mb-6"
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
                className="p-4 border border-gray-700 rounded-lg bg-gray-800/40 shadow-md"
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
            <h2 className="text-3xl font-bold mb-4">About Me</h2>
            <p className="text-base leading-relaxed text-gray-300 mb-4">
              I’m a developer with a passion for building smart, user-centered applications. Currently working as a QA Consultant at CarMax, I bring
              strong analytical expertise to every project — with a knack for catching the details others miss.
            </p>
            <p className="text-base leading-relaxed text-gray-300 mb-4">
              I’m pursuing my Bachelor’s in Computer Science with a specialization in Artificial Intelligence. Outside the classroom, I’m hands-on
              with Python, Kotlin, C++, and C# — building tools like Pokémon save file editors, intelligent apps, and sleek UI-driven projects.
            </p>
            <p className="text-base leading-relaxed text-gray-300">
              When I’m not coding or testing, you’ll find me at anime conventions like GalaxyCon or Katsucon (cosplay included), gaming with friends,
              or hanging out with my dog Rocko. I’m all about blending logic with creativity — and I’m always up for an adventure that sparks innovation.
            </p>
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
              speed={700} // spped in ms for smooth transition
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
      </main>
    </>
  );
} 

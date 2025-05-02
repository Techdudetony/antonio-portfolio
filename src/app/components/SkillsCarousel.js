"use client";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

export default function SkillsCarousel({ title, items }) {
  return (
    <section className="relative z-10 px-2 py-10 max-w-5xl mx-auto">
      <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-[#00ff00]">{title}</h3>

      <Swiper
        modules={[EffectCoverflow, Pagination, Autoplay]}
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView="auto"
        loop
        speed={500}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        className="skills-swiper max-w-4xl mx-auto pb-10"
      >
        {items.map(({ name, link }) => (
          <SwiperSlide key={name} className="!w-52">
            <motion.a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="bg-black border-4 border-[#00ff00] rounded-md h-32 w-48 flex flex-col justify-center items-center px-4 text-center hover:bg-[#00ff00] 
              hover:text-black text-sm font-pixel text-[#00ff00] transition-allZZ"
            >
              {name}
            </motion.a>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

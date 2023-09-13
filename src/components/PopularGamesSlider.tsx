"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import GameCard from "./GameCard";

export default function PopularGamesSlider() {
  return (
    <section>
      <Link href="/games/popular" className="text-lg">
        Popular Games
      </Link>
      <div className="mt-4">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={24}
          slidesPerView={6}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation
        >
          <SwiperSlide>
            <GameCard />
          </SwiperSlide>
          <SwiperSlide>
            <GameCard />
          </SwiperSlide>
          <SwiperSlide>
            <GameCard />
          </SwiperSlide>
          <SwiperSlide>
            <GameCard />
          </SwiperSlide>
          <SwiperSlide>
            <GameCard />
          </SwiperSlide>
          <SwiperSlide>
            <GameCard />
          </SwiperSlide>
          <SwiperSlide>
            <GameCard />
          </SwiperSlide>
          <SwiperSlide>
            <GameCard />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}

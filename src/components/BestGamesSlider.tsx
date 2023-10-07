"use client";

import "swiper/css";
import "swiper/css/navigation";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import GameCard from "./GameCard";

export default function BestGamesSlider({ bestGamesData }: any) {
  return (
    <div>
      <h1 className="mb-4 text-lg">Best Games</h1>
      <div>
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={16}
          slidesPerView={6}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation
          breakpoints={{
            360: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 6,
            },
          }}
        >
          {bestGamesData?.map((gameData: any) => (
            <SwiperSlide key={gameData.id}>
              <GameCard gameData={gameData} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

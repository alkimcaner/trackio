"use client";

import "swiper/css";
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import GameCard from "./GameCard";

export default function GameSlider({ gamesData }: any) {
  return (
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
        {gamesData?.map((gameData: any) => (
          <SwiperSlide key={gameData.id}>
            <GameCard gameData={gameData} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

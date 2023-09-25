"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import GameCard from "./GameCard";

import "swiper/css";
import "swiper/css/navigation";

export default function BestGamesSlider({ bestGamesData }: any) {
  return (
    <div>
      <Link href="/games" className="text-lg">
        Best Games
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

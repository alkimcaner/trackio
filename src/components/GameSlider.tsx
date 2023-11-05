"use client";

import "swiper/css";
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import GameCard from "./GameCard";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

export default function GameSlider({ gamesData }: any) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? (
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
  ) : (
    <div className="grid grid-cols-2 grid-rows-1 gap-4 md:grid-cols-4 lg:grid-cols-6">
      <Skeleton className="aspect-[9/16] w-full" />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>
  );
}

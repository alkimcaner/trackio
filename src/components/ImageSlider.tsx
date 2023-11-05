"use client";

import "swiper/css";
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import SliderImage from "./SliderImage";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

export default function ImageSlider({ images }: any) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? (
    <Swiper
      modules={[Navigation, Autoplay]}
      spaceBetween={16}
      slidesPerView={3}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      navigation
      breakpoints={{
        360: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      }}
    >
      {images?.map((image: any) => (
        <SwiperSlide key={image.id}>
          <SliderImage image={image} />
        </SwiperSlide>
      ))}
    </Swiper>
  ) : (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Skeleton className="aspect-video w-full" />
      <Skeleton />
      <Skeleton />
    </div>
  );
}

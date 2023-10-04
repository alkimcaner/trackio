"use client";

import "swiper/css";
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import GalleryImage from "./GalleryImage";

export default function GameGallery({ images }: any) {
  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      spaceBetween={24}
      slidesPerView={3}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      navigation
    >
      {images?.map((image: any) => (
        <SwiperSlide key={image.id}>
          <GalleryImage image={image} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

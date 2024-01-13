"use client";

import "swiper/css";
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import SliderImage from "./SliderImage";

export default function ImageSlider({ images }: any) {
  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      slidesPerView={1}
      spaceBetween={16}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      navigation
    >
      {images?.map((image: any) => (
        <SwiperSlide key={image.id}>
          <SliderImage image={image} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

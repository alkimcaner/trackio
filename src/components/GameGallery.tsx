"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useState } from "react";

import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import GalleryImage from "./GalleryImage";

interface ImageStatus {
  id: string;
  isLoaded: boolean;
}

export default function GameGallery({ images }: any) {
  const [imageStatus, setImageStatus] = useState<ImageStatus[]>([]);
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

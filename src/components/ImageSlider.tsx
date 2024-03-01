"use client";

import Autoplay from "embla-carousel-autoplay";
import SliderImage from "./SliderImage";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

export default function ImageSlider({ images }: any) {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
    >
      <CarouselContent>
        {images?.map((image: any) => (
          <CarouselItem key={image.id}>
            <SliderImage image={image} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden lg:inline-flex" />
      <CarouselNext className="hidden lg:inline-flex" />
    </Carousel>
  );
}

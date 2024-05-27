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

export default function ImageSlider({ images }: { images: string[] }) {
  if (!images.length) return null;
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
    >
      <CarouselContent>
        {images?.map((image) => (
          <CarouselItem key={image} className="lg:basis-1/2">
            <SliderImage image={image} />
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious className="hidden 2xl:inline-flex" /> */}
      {/* <CarouselNext className="hidden 2xl:inline-flex" /> */}
    </Carousel>
  );
}

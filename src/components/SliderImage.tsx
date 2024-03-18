"use client";
import Image from "next/image";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";

export default function SliderImage({ image }: { image: string }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  if (isError) return null;

  return (
    <>
      {!isLoaded && <Skeleton className="aspect-video w-full" />}
      <Image
        src={image}
        width={1920}
        height={1080}
        alt="Screenshot"
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsError(true)}
        className={`aspect-video rounded-lg object-cover ${
          isLoaded ? "h-full" : "h-0"
        }`}
      />
    </>
  );
}

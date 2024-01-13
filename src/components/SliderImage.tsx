"use client";
import Image from "next/image";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";

export default function SliderImage({ image }: any) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  if (isError) return null;

  return (
    <>
      {!isLoaded && <Skeleton className="aspect-video w-full" />}
      <Image
        src={`https://images.igdb.com/igdb/image/upload/t_screenshot_big/${image?.image_id}.jpg`}
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

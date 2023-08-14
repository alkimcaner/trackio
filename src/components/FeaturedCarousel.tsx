"use client";

import { ProductType } from "@/types/product";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function FeaturedCarousel({
  products,
}: {
  products: ProductType[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout>();

  const handleNext = () => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(handleNext, 5000);

    setCurrentIndex((prev) => {
      if (prev >= products.length - 1) return 0;
      return prev + 1;
    });
  };

  const handleSelect = (index: number) => {
    if (currentIndex === index) return;

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(handleNext, 5000);

    setCurrentIndex(index);
  };

  useEffect(() => {
    timerRef.current = setTimeout(handleNext, 5000);
    return () => clearTimeout(timerRef.current);
  }, [products]);

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
        <motion.img
          key={products[currentIndex]?.imageUrl}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ease: "easeInOut" }}
          src={products[currentIndex]?.imageUrl}
          className="h-full w-full object-cover brightness-75"
        />

        <div className="absolute inset-0 z-10 flex flex-col justify-end gap-2 p-4">
          <Link
            href={`/product/${products[currentIndex]?.id}`}
            className="w-fit text-lg font-bold text-zinc-100 lg:text-3xl"
          >
            {products[currentIndex]?.name}
          </Link>
          <div className="flex flex-wrap gap-2">
            {products[currentIndex]?.tags.map((tag) => (
              <Badge key={crypto.randomUUID()}>{tag}</Badge>
            ))}
          </div>
          <p className="text-sm text-zinc-100 lg:text-base">
            {formatter.format(products[currentIndex]?.price)}
          </p>
          <div className="flex items-center gap-2">
            <Button>Add to Cart</Button>
            <Button variant="outline">+ Add to Wishlist</Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 grid-rows-1 gap-4 lg:w-1/4 lg:grid-cols-1 lg:grid-rows-4">
        {products.map((product, index) => (
          <div
            onClick={() => handleSelect(index)}
            key={crypto.randomUUID()}
            className={`relative flex cursor-pointer flex-col items-center gap-4 overflow-hidden rounded-2xl lg:flex-row lg:p-4 ${
              currentIndex === index && "bg-black/5"
            }`}
          >
            <Image
              src={product.imageUrl}
              alt=""
              width={240}
              height={480}
              className="aspect-[3/4] rounded-xl object-cover brightness-75 lg:w-16"
            />
            <p className="hidden text-lg lg:block">{product.name}</p>

            {currentIndex === index && (
              <motion.div
                key={product.id}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 5, ease: "linear" }}
                className="absolute inset-0 origin-left bg-black/10"
              ></motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

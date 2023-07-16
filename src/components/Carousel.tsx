"use client";

import { ProductType } from "@/types/product";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Carousel({ products }: { products: ProductType[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout>();

  const handlePrevious = () => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(handleNext, 5000);

    setCurrentIndex((prev) => {
      if (prev <= 0) return products.length - 1;
      return prev - 1;
    });
  };

  const handleNext = () => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(handleNext, 5000);

    setCurrentIndex((prev) => {
      if (prev >= products.length - 1) return 0;
      return prev + 1;
    });
  };

  const handleSelect = (index: number) => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(handleNext, 5000);

    setCurrentIndex(index);
  };

  useEffect(() => {
    timerRef.current = setTimeout(handleNext, 5000);
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="relative col-span-3 overflow-hidden rounded-2xl">
        <motion.img
          key={currentIndex}
          layoutId="image"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "circIn" }}
          src={products[currentIndex].imageUrl}
          className="h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 z-10 flex flex-col justify-end gap-2 p-4">
          <p className="text-3xl text-white">{products[currentIndex].name}</p>
          <ul className="flex gap-2">
            {products[currentIndex].tags.map((tag, index) => (
              <li
                key={index}
                className="w-fit rounded-full bg-base-100 px-2 py-1 text-xs"
              >
                {tag}
              </li>
            ))}
          </ul>

          <button className="btn w-fit">
            {formatter.format(products[currentIndex].price)}
            <div className="divid divider divider-horizontal m-0"></div>
            <span>Add to Cart</span>
          </button>
        </div>

        <button
          onClick={handlePrevious}
          className="btn btn-circle absolute left-4 top-4 z-20"
        >
          ❮
        </button>
        <button
          onClick={handleNext}
          className="btn btn-circle absolute right-4 top-4 z-20"
        >
          ❯
        </button>
      </div>
      <div className="grid grid-rows-3 gap-4">
        {products.map((product, index) => (
          <div
            onClick={() => handleSelect(index)}
            key={index}
            className="relative cursor-pointer select-none overflow-hidden rounded-2xl"
          >
            <img
              src={product.imageUrl}
              className={`h-full object-cover ${
                currentIndex === index ? "brightness-75" : "brightness-50"
              }`}
            />
            <div className="absolute inset-0 z-10 flex flex-col justify-end gap-2 p-4">
              <p className="text-xl text-white">{product.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

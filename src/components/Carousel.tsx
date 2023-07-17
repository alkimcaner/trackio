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
  }, [products]);

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="relative col-span-4 aspect-video overflow-hidden rounded-2xl lg:col-span-3">
        <motion.img
          key={currentIndex}
          layoutId="image"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ease: "easeInOut" }}
          src={products[currentIndex]?.imageUrl}
          className="h-full w-full object-cover brightness-75"
        />
        <div className="absolute inset-0 z-10 flex flex-col justify-end gap-2 p-4">
          <p className="text-lg font-bold text-white lg:text-3xl">
            {products[currentIndex]?.name}
          </p>
          <ul className="flex gap-2">
            {products[currentIndex]?.tags.map((tag, index) => (
              <li key={index} className="badge badge-sm lg:badge-md">
                {tag}
              </li>
            ))}
          </ul>
          <p className="text-sm text-white lg:text-base">
            {formatter.format(products[currentIndex]?.price)}
          </p>
          <div className="flex items-center gap-2">
            <button className="btn btn-primary btn-sm w-fit lg:btn-md">
              Add to Cart
            </button>
            <button className="btn btn-ghost btn-sm w-fit text-white lg:btn-md">
              + Add to Wishlist
            </button>
          </div>
        </div>
      </div>
      <div className="col-span-4 grid grid-cols-4 grid-rows-1 gap-4 lg:col-span-1 lg:grid-cols-1 lg:grid-rows-4">
        {products.map((product, index) => (
          <div
            onClick={() => handleSelect(index)}
            key={index}
            className={`relative flex cursor-pointer flex-col items-center gap-4 overflow-hidden rounded-2xl transition duration-500 lg:flex-row lg:p-4 ${
              currentIndex === index && "bg-white/5"
            }`}
          >
            <img
              src={product.imageUrl}
              className="aspect-[3/4] rounded-xl object-cover lg:w-16"
            />
            <p className="hidden text-lg text-white lg:block">{product.name}</p>

            {currentIndex === index && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 5, ease: "linear" }}
                className="absolute inset-0 origin-left bg-white/10"
              ></motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

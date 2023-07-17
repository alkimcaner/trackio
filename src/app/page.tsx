"use client";

import Carousel from "@/components/Carousel";
import { db } from "@/lib/firebase";
import { ProductType } from "@/types/product";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data: ProductType[] = [];
      const querySnapshot = await getDocs(collection(db, "products"));
      querySnapshot.forEach((doc) => {
        data.push(doc.data() as ProductType);
      });
      setProducts(data);
    };

    const fetchDummyData = async () => {
      const res = await fetch("/products.json");
      const data: ProductType[] = await res.json();
      setProducts(data);
    };

    // fetchData();
    fetchDummyData();
  }, []);

  return (
    <main>
      <section className="mx-auto w-full max-w-7xl p-8">
        <Carousel products={products.splice(0, 4)} />
      </section>
    </main>
  );
}

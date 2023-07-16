"use client";

import Carousel from "@/components/Carousel";
import { db } from "@/lib/firebase";
import { ProductType } from "@/types/product";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const test: ProductType[] = [
  {
    name: "Superman 64",
    price: 69,
    tags: ["Action", "Featured"],
    imageUrl: "https://i.ytimg.com/vi/nQ5MsP3VCaQ/maxresdefault.jpg",
  },
  {
    name: "Pepsiman",
    price: 31,
    tags: ["Parkour"],
    imageUrl:
      "https://sm.ign.com/ign_ap/screenshot/default/maxresdefault-32_g3k9.jpg",
  },
  {
    name: "Pizza Tower",
    price: 500,
    tags: ["Parkour", "Platformer"],
    imageUrl: "https://i.ytimg.com/vi/kab-fOsrq_Q/maxresdefault.jpg",
  },
];

export default function Home() {
  const [products, setProducts] = useState<ProductType[]>(test);

  useEffect(() => {
    const fetchData = async () => {
      const docs: ProductType[] = [];
      const querySnapshot = await getDocs(collection(db, "products"));
      querySnapshot.forEach((doc) => {
        docs.push(doc.data() as ProductType);
      });
      setProducts(docs);
    };

    // fetchData();
  }, []);

  return (
    <main>
      <section className="mx-auto w-full max-w-7xl p-8">
        <Carousel products={products} />
      </section>
    </main>
  );
}

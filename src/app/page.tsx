import Card from "@/components/Card";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import { db } from "@/lib/firebase";
import { ProductType } from "@/types/product";
import { collection, getDocs } from "firebase/firestore";

const fetchData = async () => {
  const data: ProductType[] = [];
  const querySnapshot = await getDocs(collection(db, "products"));
  querySnapshot.forEach((doc) => {
    data.push(doc.data() as ProductType);
  });
  return data;
};

const fetchDummyData = async () => {
  const res = await fetch("http://localhost:3000/products.json");
  const data: ProductType[] = await res.json();
  return data;
};

export default async function Home() {
  const products = await fetchDummyData();
  const featuredProducts = products.filter((product) =>
    product.tags.includes("Featured")
  );

  return (
    <main>
      <section className="mx-auto w-full max-w-7xl p-8">
        <FeaturedCarousel products={featuredProducts} />
      </section>

      <section className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-4 p-8 lg:grid-cols-4">
        {products.map((product) => (
          <Card key={crypto.randomUUID()} product={product} />
        ))}
      </section>
    </main>
  );
}

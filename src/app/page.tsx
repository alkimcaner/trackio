import Card from "@/components/Card";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import { db } from "@/lib/firebase";
import { ProductType } from "@/types/product";
import { collection, getDocs } from "firebase/firestore";

const fetchData = async () => {
  const products: ProductType[] = [];
  const querySnapshot = await getDocs(collection(db, "products"));
  querySnapshot.forEach((doc) => {
    let product = doc.data();
    product.id = doc.id;
    products.push(product as ProductType);
  });
  return products;
};

export default async function Home() {
  const products = await fetchData();
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
          <Card key={product.id + ":card"} product={product} />
        ))}
      </section>
    </main>
  );
}

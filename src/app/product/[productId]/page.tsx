import { db } from "@/lib/firebase";
import { ProductType } from "@/types/product";
import { format, fromUnixTime } from "date-fns";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default async function Product({
  params,
}: {
  params: { productId: string };
}) {
  const docRef = doc(db, "products", params.productId);
  const docSnapshot = await getDoc(docRef);
  const product = docSnapshot.data() as ProductType;
  return (
    <main>
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-4 p-8 lg:flex-row">
        <Image
          src={product?.imageUrl}
          alt=""
          width={1280}
          height={720}
          className="aspect-video w-full rounded-2xl object-cover"
        />

        <div className="flex flex-col gap-4 lg:w-1/4">
          <h1 className="text-2xl text-primary-content">{product?.name}</h1>
          <ul className="flex flex-wrap gap-2">
            {product?.tags.map((tag) => (
              <li
                key={crypto.randomUUID()}
                className="badge badge-outline badge-sm lg:badge-md"
              >
                {tag}
              </li>
            ))}
          </ul>
          <span className="text-primary-content">
            {formatter.format(product?.price)}
          </span>
          <button className="btn btn-primary">Add to Cart</button>
          <button className="btn btn-outline">+ Add to Wishlist</button>
          <div className="flex items-center justify-between gap-4">
            <span className="text-primary-content">Metacritic Score</span>
            <span className="rounded-lg bg-green-700 p-1 text-primary-content">
              {product?.metacriticScore}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-primary-content">Developer</span>
            <span className="text-right">{product?.developer}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-primary-content">Publisher</span>
            <span className="text-right">{product?.publisher}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-primary-content">Release Date</span>
            <span className="text-right">
              {product?.releaseDate &&
                format(fromUnixTime(product?.releaseDate), "dd MMM, yyyy")}
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl p-8">
        <h2 className="mb-4 text-primary-content">ABOUT THIS GAME</h2>
        <p>{product?.description}</p>
      </section>
    </main>
  );
}

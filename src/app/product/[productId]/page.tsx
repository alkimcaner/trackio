import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
          <h1 className="text-2xl">{product?.name}</h1>
          <div className="flex flex-wrap gap-2">
            {product?.tags.map((tag) => (
              <Badge key={crypto.randomUUID()}>{tag}</Badge>
            ))}
          </div>
          <span>{formatter.format(product?.price)}</span>
          <Button>Add to Cart</Button>
          <Button variant="outline">+ Add to Wishlist</Button>
          <div className="flex items-center justify-between gap-4">
            <span>Metacritic Score</span>
            <span className="rounded-lg bg-green-500 p-1">
              {product?.metacriticScore}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span>Developer</span>
            <span className="text-right">{product?.developer}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span>Publisher</span>
            <span className="text-right">{product?.publisher}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span>Release Date</span>
            <span className="text-right">
              {product?.releaseDate &&
                format(fromUnixTime(product?.releaseDate), "dd MMM, yyyy")}
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl p-8">
        <h2 className="mb-4">ABOUT THIS GAME</h2>
        <p>{product?.description}</p>
      </section>
    </main>
  );
}

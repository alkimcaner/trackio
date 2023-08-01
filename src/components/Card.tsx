import { ProductType } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Card({ product }: { product: ProductType }) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="group flex select-none flex-col overflow-hidden rounded-2xl bg-zinc-50 shadow-md transition duration-500 hover:bg-zinc-100"
    >
      <div className="aspect-video w-full overflow-hidden">
        <Image
          src={product.imageUrl}
          alt=""
          width={640}
          height={360}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <span className="text-base lg:text-xl">{product.name}</span>
        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <Badge key={crypto.randomUUID()}>{tag}</Badge>
          ))}
        </div>
        <p className="mt-auto">{formatter.format(product.price)}</p>
      </div>
    </Link>
  );
}

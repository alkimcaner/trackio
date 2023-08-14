import { ProductType } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Card({ product }: { product: ProductType }) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="group flex select-none flex-col overflow-hidden rounded-2xl border bg-zinc-50 transition duration-500 hover:shadow-md"
    >
      <div className="aspect-video w-full overflow-hidden">
        <Image
          src={product.imageUrl}
          alt=""
          width={640}
          height={360}
          className="h-full w-full object-cover transition duration-500 will-change-transform group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <span className="text-base font-semibold lg:text-lg">
          {product.name}
        </span>
        <span className="text-sm">{product.description.slice(0, 100)}...</span>
        <p className="mt-auto font-semibold">
          {formatter.format(product.price)}
        </p>
      </div>
    </Link>
  );
}

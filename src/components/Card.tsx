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
      className="group flex select-none flex-col overflow-hidden rounded-2xl bg-base-200 shadow-md transition duration-500 hover:bg-base-300"
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
        <span className="text-base text-primary-content lg:text-xl">
          {product.name}
        </span>
        <ul className="flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <li
              key={crypto.randomUUID()}
              className="badge badge-outline badge-sm lg:badge-md"
            >
              {tag}
            </li>
          ))}
        </ul>
        <p className="mt-auto">{formatter.format(product.price)}</p>
      </div>
    </Link>
  );
}

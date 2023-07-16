import { ProductType } from "@/types/product";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Product(props: ProductType) {
  return (
    <a
      href="#"
      className="group select-none bg-zinc-900 transition duration-500 hover:bg-zinc-800"
    >
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={props.imageUrl}
          alt=""
          className="transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="mb-1 text-xl">{props.name}</h3>
        <ul className="flex gap-2">
          {props.tags.map((tag, index) => (
            <li key={index} className="bg-zinc-700 px-2 py-1 text-xs">
              {tag}
            </li>
          ))}
        </ul>
        <p className="mt-4">{formatter.format(props.price)}</p>
      </div>
    </a>
  );
}

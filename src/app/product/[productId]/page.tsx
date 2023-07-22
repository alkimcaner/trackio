import { ProductType } from "@/types/product";
import { format, fromUnixTime } from "date-fns";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const fetchDummyData = async () => {
  const res = await fetch("http://localhost:3000/products.json");
  const data: ProductType[] = await res.json();
  return data;
};

export default async function Product({
  params,
}: {
  params: { productId: string };
}) {
  const products = await fetchDummyData();
  const product = products.filter(
    (product) => product.id === params.productId
  )[0];
  return (
    <main>
      <section className="mx-auto w-full max-w-7xl p-8">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-3">
            <img
              src={product.imageUrl}
              alt=""
              className="aspect-video h-full w-full rounded-2xl object-cover"
            />
          </div>
          <div className="col-span-1 flex flex-col gap-4">
            <h1 className="text-2xl text-primary-content">{product.name}</h1>
            <p>{product.description}</p>
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
              {formatter.format(product.price)}
            </span>
            <button className="btn btn-primary">Add to Cart</button>
            <button className="btn btn-outline">+ Add to Wishlist</button>
            <div className="flex justify-between">
              <span className="text-primary-content">Metacritic Score</span>
              <span>%{product.metacriticScore}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-primary-content">Developer</span>
              <span>{product.developer}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-primary-content">Publisher</span>
              <span>{product.publisher}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-primary-content">Release Date</span>
              <span>
                {product.releaseDate &&
                  format(fromUnixTime(product.releaseDate), "dd MMM, yyyy")}
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/product.action";

export default async function Home() {
  const latestProduct = await getLatestProducts();

  return (
    <>
      <ProductList data={latestProduct} title="Newest Arrivals" limit={4} />
    </>
  );
}

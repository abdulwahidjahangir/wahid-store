import ProductList from "@/components/shared/product/product-list";
import { getLatestProduct } from "@/lib/actions/product.action";

export default async function Home() {
  const latestProduct = await getLatestProduct();

  return (
    <>
      <ProductList data={latestProduct} title="Newest Arrivals" limit={4} />
    </>
  );
}

import sampleData from "@/db/sample-data";
import ProductList from "@/components/shared/product/product-list";

export default async function Home() {
  console.log(sampleData);
  return (
    <>
      <ProductList
        data={sampleData.products}
        title="Newest Arrivals"
        limit={4}
      />
    </>
  );
}

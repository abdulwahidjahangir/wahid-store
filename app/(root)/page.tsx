import DealCountdown from "@/components/deal-countdown";
import IconBoxes from "@/components/icon.boxes";
import ProductCarousel from "@/components/shared/product/product-carousel";
import ProductList from "@/components/shared/product/product-list";
import ViewAllProductsButton from "@/components/view-all-products-button";
import {
  getLatestProducts,
  getFeaturedProducts,
} from "@/lib/actions/product.action";

export default async function Home() {
  const latestProduct = await getLatestProducts();

  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      {featuredProducts.length > 0 && (
        <ProductCarousel data={featuredProducts} />
      )}
      <ProductList data={latestProduct} title="Newest Arrivals" limit={4} />
      <ViewAllProductsButton />
      <DealCountdown />
      <IconBoxes />
    </>
  );
}

import { z } from "zod";
import { inserProductsSchema } from "@/lib/validator";

export type Product = z.infer<typeof inserProductsSchema> & {
  id: string;
  rating: string;
  createdAt: Date;
};

import { z } from "zod";
import {
  inserProductsSchema,
  insertCartSchema,
  cartItemSchema,
} from "@/lib/validator";

export type Product = z.infer<typeof inserProductsSchema> & {
  id: string;
  rating: string;
  createdAt: Date;
};

export type Cart = z.infer<typeof insertCartSchema>;

export type CartItem = z.infer<typeof cartItemSchema>;

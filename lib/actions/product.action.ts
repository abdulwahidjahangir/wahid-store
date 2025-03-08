"use server";

import { prisma } from "@/db/prisma";
import { convertToPlainObject, formatError } from "../utils";
import { LATEST_PRODUCTS_LIMIT, PAGE_SIZE } from "../constants";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { insertProductsSchema, updateProductSchema } from "../validator";
import { z } from "zod";

// Get latest products
export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: "desc" },
  });

  return convertToPlainObject(data);
}

// GET single product by it's action
export async function getProductBySlug(slug: string) {
  return await prisma.product.findFirst({
    where: { slug: slug },
  });
}

// GET all products
export async function getAllProducts({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  query,
  limit = PAGE_SIZE,
  page,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  category,
}: {
  query: string;
  limit?: number;
  page: number;
  category?: string;
}) {
  const data = await prisma.product.findMany({
    skip: (page - 1) * limit,
    take: limit,
  });

  const dataCounts = await prisma.product.count();

  return {
    data,
    totalPages: Math.ceil(dataCounts / limit),
  };
}

// DELETE a product
export async function deleteProduct(id: string) {
  try {
    const session = await auth();

    if (session?.user?.role !== "admin") {
      throw new Error("You are not authorized to perform this taks");
    }

    const productExists = await prisma.product.findFirst({
      where: { id: id },
    });

    if (!productExists) {
      throw new Error("Product is not found");
    }

    await prisma.product.delete({
      where: { id },
    });

    revalidatePath("/admin/products");

    return { success: true, message: "Product deleted successfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// CREATE a product
export async function createProduct(
  data: z.infer<typeof insertProductsSchema>
) {
  try {
    const session = await auth();

    if (session?.user?.role !== "admin") {
      throw new Error("You are not authorized to perform this taks");
    }

    const product = insertProductsSchema.parse(data);

    await prisma.product.create({
      data: product,
    });

    revalidatePath("/admin/products");

    return { success: true, message: "Product created successfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Update a product
export async function updateProduct(data: z.infer<typeof updateProductSchema>) {
  try {
    const session = await auth();

    if (session?.user?.role !== "admin") {
      throw new Error("You are not authorized to perform this taks");
    }

    const product = updateProductSchema.parse(data);
    const productExists = await prisma.product.findFirst({
      where: { id: product.id },
    });

    if (!productExists) {
      throw new Error("Product not found");
    }

    await prisma.product.update({
      where: { id: product.id },
      data: product,
    });

    revalidatePath("/admin/products");

    return { success: true, message: "Product updated successfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

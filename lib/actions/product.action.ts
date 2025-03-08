"use server";

import { prisma } from "@/db/prisma";
import { convertToPlainObject } from "../utils";
import { LATEST_PRODUCTS_LIMIT, PAGE_SIZE } from "../constants";

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

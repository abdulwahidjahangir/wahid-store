import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Convert prisma object into regular json
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

// Format number with decimal places
export function formatNumberWithDecimal(num: number): string {
  const [intValue, floatValue] = num.toString().split(".");
  return floatValue
    ? `${intValue}.${floatValue.padEnd(2, "0")}`
    : `${intValue}.00`;
}

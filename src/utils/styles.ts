import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ClassValue } from "clsx";
export function cn(...input: Array<ClassValue>) {
    return twMerge(clsx(input))
}
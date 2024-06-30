import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"


//"cn" helps in conditinal and dynamic class name. Helps resolve any conflicts if occurs
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

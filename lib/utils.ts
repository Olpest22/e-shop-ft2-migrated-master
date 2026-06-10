import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export class FormRelease {
  public static extract(e: React.FormEvent<HTMLFormElement>): object{
    e.preventDefault()
    return Object.fromEntries(new FormData(e.currentTarget))
  }
}
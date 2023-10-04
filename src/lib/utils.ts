import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timerId: ReturnType<typeof setTimeout>;
  let context: any;

  return function (this: any, ...args: Parameters<T>): void {
    clearTimeout(timerId);
    context = this;

    timerId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

import type { FoodImage } from "@/types";

/** Resolve food/cart image for img src (string path or imported asset). */
export function imageSrc(image: FoodImage): string {
  if (typeof image === "string") return image;
  return image.src;
}

import type { StaticImageData } from "next/image";

export type FoodImage = string | StaticImageData;

export interface FoodItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: FoodImage;
  category: string;
  thums: FoodImage[];
  feature: boolean;
}

export interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: FoodImage;
  category: string;
  thums: FoodImage[];
  feature: boolean;
  quantity: number;
  Variation: string;
}

export interface ReviewItem {
  name: string;
  rating: number;
  review: string;
  image?: string;
  imageUrl?: string;
}

export interface AppState {
  FoodBank: FoodItem[];
  filtterFood: FoodItem[];
  featureFood: FoodItem[];
  favouriteFood: FoodItem[];
  popUp: boolean;
  popUpCart: FoodItem[];
  cart: CartItem[];
  love: number[];
  ddCart: boolean;
  totalQuantity: number;
  totalFv: number;
  checkOut: CartItem | CartItem[] | Record<string, never>;
  Blog_D: FoodItem[];
  toast: boolean;
  toastMessage: string;
  reviewArr: ReviewItem[];
}

export interface AddToCartPayload {
  id: number;
  quantity: number;
  Variation: string;
  price: number;
}

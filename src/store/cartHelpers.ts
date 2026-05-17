import type { AddToCartPayload, CartItem, FoodItem } from "@/types";

export function buildCartItem(
  filtterFood: FoodItem[],
  payload: AddToCartPayload
): CartItem | null {
  const add = filtterFood.find((el) => el.id === payload.id);
  if (!add) return null;

  return {
    id: add.id,
    name: add.name,
    description: add.description,
    price: payload.price,
    image: add.image,
    category: add.category,
    thums: add.thums,
    feature: add.feature,
    quantity: payload.quantity,
    Variation: payload.Variation,
  };
}

export function calcTotalQuantity(cart: CartItem[]): number {
  return cart.reduce((ac, it) => ac + it.quantity, 0);
}

"use client";

import { useCallback } from "react";
import { useAppDispatch } from "@/store/hooks";
import {
  addBlogDetails,
  addReview,
  addToCart,
  addToWish,
  closeCartDropdown,
  closePopUp,
  handleCheckout,
  hideToast,
  openCartDropdown,
  openPopUp,
  removeCart,
  searchFilter,
  setCategory,
  showToast,
} from "@/store/slices/appSlice";
import type { AddToCartPayload, ReviewItem } from "@/types";

export function useAppActions() {
  const dispatch = useAppDispatch();

  const dispatchToast = useCallback(
    (text: string, delay = 3500) => {
      dispatch(showToast(text));
      setTimeout(() => dispatch(hideToast()), delay);
    },
    [dispatch]
  );

  return {
    AddcartPopUp: (id: number) => dispatch(openPopUp(id)),
    addToCart: (id: number, quantity: number, Variation: string, price: number) => {
      dispatch(addToCart({ id, quantity, Variation, price }));
      setTimeout(() => dispatch(hideToast()), 2000);
    },
    activeCategory: (category: string) => dispatch(setCategory(category)),
    Close: () => dispatch(closePopUp()),
    removeCart: (id: number) => {
      dispatch(removeCart(id));
      setTimeout(() => dispatch(hideToast()), 2000);
    },
    addToWish: (id: number) => dispatch(addToWish(id)),
    CartDropDown: () => dispatch(openCartDropdown()),
    CloseCart: () => dispatch(closeCartDropdown()),
    handleCheckout: (id: number, quantity: number, Variation: string, price: number) =>
      dispatch(handleCheckout({ id, quantity, Variation, price })),
    searchFilter: (value: string) => dispatch(searchFilter(value)),
    addBlogDetails: (id: number) => dispatch(addBlogDetails(id)),
    add_remove_ToToast: dispatchToast,
    revFnc: (newReview: ReviewItem) => dispatch(addReview(newReview)),
  };
}

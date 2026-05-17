"use client";

import { useEffect, useRef, useState } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/store";
import {
  hideToast,
  hydrateFromStorage,
  setFoodData,
} from "@/store/slices/appSlice";
import { getFromStorage } from "@/lib/localStorage";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import type { AppState, CartItem, FoodItem } from "@/types";

function StoreBootstrap() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((s) => s.app.cart);
  const favouriteFood = useAppSelector((s) => s.app.favouriteFood);
  const love = useAppSelector((s) => s.app.love);
  const checkOut = useAppSelector((s) => s.app.checkOut);
  const hydrated = useRef(false);
  const [isLocalHydrated, setIsLocalHydrated] = useState(false);

  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;
    dispatch(
      hydrateFromStorage({
        cart: getFromStorage<CartItem[]>("FoodList", []),
        favouriteFood: getFromStorage<FoodItem[]>("FvList", []),
        love: getFromStorage<number[]>("lovelist", []),
        checkOut: getFromStorage<AppState["checkOut"]>("productdetails", {}),
      })
    );
    dispatch(setFoodData());
    setIsLocalHydrated(true);
  }, [dispatch]);

  useEffect(() => {
    if (!isLocalHydrated) return;
    localStorage.setItem("FoodList", JSON.stringify(cart));
  }, [cart, isLocalHydrated]);

  useEffect(() => {
    if (!isLocalHydrated) return;
    localStorage.setItem("FvList", JSON.stringify(favouriteFood));
  }, [favouriteFood, isLocalHydrated]);

  useEffect(() => {
    if (!isLocalHydrated) return;
    localStorage.setItem("lovelist", JSON.stringify(love));
  }, [love, isLocalHydrated]);

  useEffect(() => {
    if (!isLocalHydrated) return;
    localStorage.setItem("productdetails", JSON.stringify(checkOut));
  }, [checkOut, isLocalHydrated]);

  return null;
}

export function useToastAutoHide(delay = 3500) {
  const dispatch = useAppDispatch();
  const toast = useAppSelector((s) => s.app.toast);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => dispatch(hideToast()), delay);
    return () => clearTimeout(t);
  }, [toast, dispatch, delay]);
}

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<ReturnType<typeof makeStore> | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <StoreBootstrap />
      {children}
    </Provider>
  );
}

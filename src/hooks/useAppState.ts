"use client";

import { useAppSelector } from "@/store/hooks";
import { useAppActions } from "@/hooks/useAppActions";

/** Redux state + actions (replaces legacy Context). */
export function useAppState() {
  const app = useAppSelector((s) => s.app);
  const actions = useAppActions();
  return { ...app, ...actions };
}

"use client";

import StoreProvider from "@/store/StoreProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      {children}
      <ToastContainer className="z-[99999]" />
    </StoreProvider>
  );
}

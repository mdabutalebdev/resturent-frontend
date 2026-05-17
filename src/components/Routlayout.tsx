"use client";

import { useEffect, useState, type ReactNode } from "react";
import Navber from "@/components/Navber";
import SubNav from "@/components/SubNav";
import FooterPart from "@/components/FooterPart";
import CartDropdown from "@/components/CartDropdown";
import { RxCross2 } from "react-icons/rx";
import { useAppState } from "@/hooks/useAppState";
import Toast from "@/components/Toast";
import AddToCartPopUp from "@/components/AddToCartPopUp";

interface RoutlayoutProps {
  children: ReactNode;
}

const Routlayout = ({ children }: RoutlayoutProps) => {
  const { ddCart, CloseCart, cart, toast, popUp, toastMessage } = useAppState();

  const [scVal, setscVal] = useState(false);
  function scroll(e: WheelEvent) {
    if (e.deltaY > 99) {
      setscVal(true);
    } else {
      setscVal(false);
    }
  }

  useEffect(() => {
    const handler = (e: WheelEvent) => scroll(e);
    window.addEventListener("wheel", handler);
    return () => window.removeEventListener("wheel", handler);
  }, []);

  return (
    <div>
      <SubNav
        className={`top-0 fixed duration-300 ${scVal ? "-top-12" : "fixed top-0"} w-full z-[1000]`}
      />
      <Navber
        className={`fixed top-11 duration-300 backdrop-blur-[2px] ${scVal ? "-top-1 fixed backdrop-blur-[11px]" : "fixed top-11"} z-[1000]`}
      />
      {children}

      <div
        className={`w-screen h-screen fixed top-0 left-0 bg-[#00000057] z-[9999] ${ddCart ? "block" : "hidden"}`}
      >
        <div
          className={`w-[30%] h-screen overflow-auto overflow-x-hidden absolute right-0 bg-[#ffffff48] backdrop-blur-[10px] flex flex-col gap-6 items-center`}
        >
          <div className="bg-[#474747] w-full text-center py-3 rounded-b-x relative">
            <h1 className="text-2xl font-bold text-white font-serif">
              Add To Cart
            </h1>

            <button
              onClick={CloseCart}
              className="absolute top-1/2 -translate-y-1/2 right-[30px] text-white text-[22px]"
            >
              <RxCross2 />
            </button>
          </div>
          {cart.map((el) => (
            <CartDropdown key={el.id} item={el} />
          ))}
        </div>
      </div>

      <AddToCartPopUp
        className={`fixed z-[9999] top-0 left-0 ${!popUp ? "hidden" : "block"}`}
      />
      <Toast
        className={`${toast ? "block" : "hidden"}`}
        message={toastMessage}
      />
      <FooterPart />
    </div>
  );
};

export default Routlayout;

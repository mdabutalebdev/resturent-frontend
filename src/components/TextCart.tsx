"use client";

import { imageSrc } from "@/lib/imageSrc";
import { RxCross2 } from "react-icons/rx";
import { useAppState } from "@/hooks/useAppState";
import Link from "next/link";
import type { CartItem } from "@/types";

interface TextCartProps {
  className?: string;
  item: CartItem;
}

const TextCart = ({ className = "", item }: TextCartProps) => {

    const { image, id, name, quantity, price, Variation } = item

    const { removeCart, handleCheckout } = useAppState()

    const handleCheck = (id: number, quantity: number, Variation: string, price: number) => {
        handleCheckout(id, quantity, Variation, price)
    }

    return (
        <div className={`w-[100%] bg-btn rounded-md ${className}`}>
            <div>
                <div className="w-[100%]">
                    <div className="flex items-center justify-between px-4">

                        <div className="flex items-center gap-5 py-3">
                            <img
                                src={imageSrc(image)}
                                alt={name}
                                className=" w-16 border h-16"
                            />

                            <h3 className="block font-semibold text-white">{name}</h3>

                            <h3 className="font-bold border-2 rounded-full py-1 px-2 text-white">{quantity}</h3>

                            <h3 className="block text-white font-bold mr-5">${price * quantity}</h3>
                        </div>

                        <div className="flex items-center gap-5">
                            <Link href={`/singleProduct/${id}`}>
                                <button onClick={() => handleCheck(id, quantity, Variation, price)} className="w-[90px] bg-black text-white p-1 font-semibold rounded-full">
                                    Checkout
                                </button>
                            </Link>

                            <button onClick={() => removeCart(id)} className="text-white text-xl font-bold">
                                <RxCross2 />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    );
};

export default TextCart;
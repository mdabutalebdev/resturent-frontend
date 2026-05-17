"use client";

import { imageSrc } from "@/lib/imageSrc";
import Container from "@/components/Container";
import { RxCross2 } from "react-icons/rx";
import { useAppState } from "@/hooks/useAppState";
import Link from "next/link";
import type { CartItem } from "@/types";

interface CartDropdownProps {
  className?: string;
  item: CartItem;
}

const CartDropdown = ({ className = "", item }: CartDropdownProps) => {

    const { image, id, name, quantity, price, Variation } = item

    const { removeCart, handleCheckout, add_remove_ToToast } = useAppState()

    const handleCheck = (id: number, quantity: number, Variation: string, price: number) => {
        handleCheckout(id, quantity, Variation, price)
    }

    const remove = (id: number) => {
        removeCart(id)
        add_remove_ToToast("Your order has been remove.")
    }

    return (
        <div className={`w-[450px] bg-white rounded-md ${className}`}>
            <Container>
                <div className="">
                    <div className="w-[450px]">
                        <div className="flex items-center justify-between px-4">

                            <div className="flex items-center gap-6 py-3">
                                <img
                                    src={imageSrc(image)}
                                    alt={name}
                                    className=" w-16 border h-16"
                                />

                                <h3 className="block font-semibold text-black">{name}</h3>

                                <h3 className="font-bold border-2 py-1 px-2 text-black">{quantity}</h3>

                                <h3 className="block text-black font-bold mr-5">${(price * quantity).toFixed(2)}</h3>
                            </div>

                            <div className="flex items-center gap-3">
                                <Link href={`/order_food/${id}`}>
                                    <button onClick={() => handleCheck(id, quantity, Variation, price)} className="w-[90px] !bg-btn text-white p-1 font-semibold rounded-full">
                                        Checkout
                                    </button>
                                </Link>

                                <button onClick={() => remove(id)} className="text-black text-xl font-bold">
                                    <RxCross2 />
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </Container >
        </div >
    );
};

export default CartDropdown;
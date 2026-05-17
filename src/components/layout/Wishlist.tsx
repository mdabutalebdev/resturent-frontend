"use client";

import { useAppState } from "@/hooks/useAppState";
import { toast, Bounce } from "react-toastify";
import Container from "@/components/Container";
import SpecialCard from "@/components/SpecialCard";
import { FaHeart } from "react-icons/fa";

const Wishlist = () => {
  const { favouriteFood, addToWish } = useAppState();

  const HandleFavour = (id: number) => {
    toast(
      <div className="flex items-center gap-x-2">
        <FaHeart className="text-red-600" />
        <span>Favourite</span>
      </div>,
      {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      }
    );
    addToWish(id);
  };

  return (
    <div className="mt-[5vw] py-24">
      <Container>
        <div className="flex items-center justify-center gap-x-3 pb-10">
          <h2 className="text-[55px] font-serif font-bold text-prh2">
            Wishlist
          </h2>
          <span className="text-red-600 text-4xl">
            <FaHeart />
          </span>
        </div>
        <div className="grid grid-cols-4">
          {favouriteFood.length < 1 ?
            <div className="text-center w-[1200px]">
              <span className="text-red-500 text-center font-montserrat text-2xl  py-10">
                Your cart is empty
              </span>
            </div>
            :
            favouriteFood?.map((el) => (
              <SpecialCard
                key={el.id}
                item={el}
                heart={true}
                HandleFavourit={() => HandleFavour(el.id)}
              />
            ))
          }
        </div>
      </Container>
    </div>
  );
};

export default Wishlist;

"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Container from "@/components/Container";
import SpecialCard from "@/components/SpecialCard";
import { useAppState } from "@/hooks/useAppState";
import SearchBar from "@/components/SearchBar";

const Menu = () => {
  const menuList = ["All", "Breakfast", "Main Dishes", "Drinks", "Desserts"];
  const collaborate = [
    "/assets/1.png",
    "/assets/2.png",
    "/assets/3.png",
    "/assets/4.png",
    "/assets/5.png",
    "/assets/6.png",
    "/assets/7.png",
    "/assets/8.png",
    "/assets/9.png",
  ];

  const [active, setactive] = useState(menuList[0]);

  const { FoodBank, activeCategory } = useAppState();

  const targetCategory = (el: string) => {
    setactive(el);
    activeCategory(el);
  };

  return (
    <div className="bg-group bg-center bg-no-repeat bg-contain mt-[2vw]">
      <Container>
        <h1 className="pt-24 text-center font-serif font-medium text-[100px] text-prh2">
          Our Menu
        </h1>
        <p className="text-[18px] text-center w-[557px] mx-auto font-sans">
          We consider all the drivers of change gives you the components you
          need to change to create a truly happens.
        </p>

        <div className="flex items-center justify-center mt-10">
          <SearchBar />
        </div>

        <div className="flex justify-center gap-4  py-[50px]">
          {menuList.map((el, idx) => (
            <Button
              key={idx}
              text={el}
              onClick={() => targetCategory(el)}
              className={` w-[150px] !px-0 !py-[10px] text-center font-semibold !hover:bg-btn ${
                active == el ? "!bg-btn text-white border-btn" : false
              }`}
            />
          ))}
        </div>

        <div className="grid grid-cols-4 gap-7">
          {FoodBank.map((el) => (
            <SpecialCard key={el.id} item={el} />
          ))}
        </div>
      </Container>

      <div className="mt-[130px] py-[120px] flex items-center justify-between bg-[#F9F9F7]">
        <Container className={`flex justify-between items-center`}>
          <div className="font-serif w-[346px] text-prh2">
            <h1 className="text-[55px] font-serif font-medium leading-[60px]">
              You can order through apps
            </h1>
            <p className="text-[18px] font-sans leading-[24px] mt-[20px]">
              Lorem ipsum dolor sit amet consectetur adipiscing elit enim
              bibendum sed et aliquet aliquet risus tempor semper.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 w-[828px]">
            {collaborate.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt=""
                className="h-[90px] w-[260px] object-cover"
              />
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Menu;

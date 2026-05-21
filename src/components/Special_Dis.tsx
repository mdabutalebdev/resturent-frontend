"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Button from "@/components/Button";
import Container from "@/components/Container";
import SpecialCard from "@/components/SpecialCard";
import Link from "next/link";
import { useGetTopMenuQuery } from "@/store/api/homepageApi";

interface SpecialDisProps {
  HandleFavourit?: (id: number) => void;
}

const Special_Dis = ({ HandleFavourit }: SpecialDisProps) => {
  const settings = {
    dots: true,
    lazyLoad: "ondemand" as const,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    height: 1000,
  };

  const { data: topDishes } = useGetTopMenuQuery();

  if (!topDishes || !Array.isArray(topDishes) || topDishes.length === 0) {
    return (
      <div className="h-[50vh] flex flex-col items-center justify-center bg-group bg-center bg-no-repeat bg-contain">
        <h1 className="text-center font-serif font-bold text-prh2 text-[45px] pb-5">
          Our Special Dishes
        </h1>
        <p className="text-slate-500 font-medium font-montserrat">
          No special dishes have been configured in the Admin Dashboard yet.
        </p>
      </div>
    );
  }

  // Map API items safely to match the SpecialCard expectations
  const mappedDishes = topDishes.map((item: any, idx: number) => ({
    id: item.id || idx + 100,
    uuid: item.uuid,
    name: item.name,
    description: item.description,
    price: item.price,
    image: item.image,
    category: item.group_name || "Special",
    thums: [item.image],
    feature: true,
  }));

  return (
    <div className="h-[100vh] w-full bg-group bg-center bg-no-repeat bg-contain">
      <h1 className="text-center font-serif font-bold text-prh2 text-[55px] pt-[90px] pb-[60px]">
        Our Special Dishes
      </h1>

      <Container>
        <Slider {...settings}>
          {mappedDishes.map((el) => (
            <SpecialCard key={el.id} item={el} HandleFavourit={HandleFavourit} />
          ))}
        </Slider>

        <div className="flex items-center justify-center">
          <Link href={"/menu"}>
            <Button
              text={"See All"}
              className="px-[56px] py-[16px] bg-black border-black hover:text-black hover:bg-white ease-linear duration-500 text-white mt-[50px]"
            />
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default Special_Dis;
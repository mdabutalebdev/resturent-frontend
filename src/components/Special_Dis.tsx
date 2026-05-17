"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { useAppState } from "@/hooks/useAppState";
import Button from "@/components/Button";
import Container from "@/components/Container";
import SpecialCard from "@/components/SpecialCard";
import Link from "next/link";

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

  const { featureFood } = useAppState();

  return (
    <div className="h-[100vh] w-full bg-group bg-center bg-no-repeat bg-contain">
      <h1 className="text-center font-serif font-bold text-prh2 text-[55px] pt-[90px] pb-[60px]">
        Our Special Dishes
      </h1>

      <Container>
        <Slider {...settings}>
          {featureFood.map((el) => (
            <SpecialCard key={el.id} item={el} />
          ))}
        </Slider>

        <div className="flex items-center justify-center">
          <Link href={'/menu'}>
            <Button
              text={"See All"}
              className={`px-[56px] py-[16px] bg-black border-black hover:text-black ease-linear duration-500 text-white mt-[50px] `}
            />
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default Special_Dis;
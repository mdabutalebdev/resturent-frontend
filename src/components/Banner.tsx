"use client";

import Container from "@/components/Container";
import Button from "@/components/Button";
import Link from "next/link";
import { useGetHeroSectionQuery } from "@/store/api/homepageApi";

const Banner = () => {
  const { data: hero } = useGetHeroSectionQuery();

  if (!hero) return null;

  return (
    <div
      className="bg-no-repeat bg-center bg-cover w-full h-[950px]"
      style={hero.background_image ? { backgroundImage: `url(${hero.background_image})` } : undefined}
    >
      <Container>
        <div className="flex flex-col gap-6 items-center justify-center h-[100vh]">
          {hero.title && (
            <h1 className="text-[100px] text-prh2 font-play leading-[100px] font-bold w-[680px] text-center mx-auto">
              {hero.title}
            </h1>
          )}

          {hero.description && (
            <p className="text-[20px] text-prh2 w-[530px] text-center font-montserrat font-medium">
              {hero.description}
            </p>
          )}

          <div className="flex gap-5">
            {hero.btn1_text && hero.btn1_link && (
              <Link href={hero.btn1_link}>
                <Button
                  text={hero.btn1_text}
                  className="bg-[#C31C1E] border-[#C31C1E] ease-linear duration-500 relative text-white hover:text-[#C31C1E] hover:bg-white"
                />
              </Link>
            )}
            {hero.btn2_text && hero.btn2_link && (
              <Link href={hero.btn2_link}>
                <Button
                  text={hero.btn2_text}
                  className="text-white bg-black border-black hover:text-black hover:bg-white ease-linear duration-500 !px-[52px]"
                />
              </Link>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Banner;
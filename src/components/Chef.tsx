"use client";

import { IoIosCheckmark } from "react-icons/io";
import TitleDes from "@/components/common/TitleDes";
import Container from "@/components/Container";
import Link from "next/link";
import { useGetChefExpertiesQuery } from "@/store/api/homepageApi";

const Chef = () => {
  const { data: chefData } = useGetChefExpertiesQuery();

  if (!chefData) return null;

  const points = Array.isArray(chefData.points) ? chefData.points : [];

  return (
    <div className="bg-[#F3F4F4] py-[100px] relative">
      <div className="absolute top-16 left-0">
        <img src="/assets/onion.png" alt="" className="w-[310]" />
      </div>
      <Container>
        <div className="flex items-center justify-between">
          {/* left */}
          <div className="max-w-[520px]">
            {chefData.title && (
              <TitleDes
                mainTitle={chefData.title}
                p2={true}
                des2={chefData.description || ""}
              />
            )}
            
            {points.length > 0 && (
              <div className="flex gap-y-8 gap-x-3 flex-wrap pt-10">
                {points.map((point: string, index: number) => (
                  <div key={index} className="flex gap-x-2 w-[240px]">
                    <div className="bg-[#EA6D27] w-[22px] h-[20px] rounded-full flex items-center justify-center text-white text-xl shrink-0">
                      <IoIosCheckmark />
                    </div>
                    <h5 className="font-montserrat font-normal text-sm text-prh leading-tight">
                      {point}
                    </h5>
                  </div>
                ))}
              </div>
            )}

            {/* buttons */}
            <div className="pt-10 flex items-center gap-x-2">
              <Link href={"/book_table"}>
                <button className="py-3 rounded-tl-full rounded-bl-full px-8 text-xl font-medium text-white bg-btn border border-btn font-serif hover:bg-transparent hover:text-btn ease-linear duration-500">
                  Book a table
                </button>
              </Link>

              <Link href={"/menu"}>
                <button className="py-3 rounded-tr-full rounded-br-full px-8 text-xl font-medium text-white bg-[#F66A1D] border border-[#F66A1D] font-serif hover:bg-transparent hover:text-[#F66A1D] ease-linear duration-500">
                  Menu
                </button>
              </Link>
            </div>
          </div>

          {/* right */}
          {chefData.image_url && (
            <div>
              <img src={chefData.image_url} alt="Chef Team" className="w-[560px] rounded-2xl object-cover shadow-xl" />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Chef;

"use client";

import Link from "next/link";
import Container from "@/components/Container";
import Button from "@/components/Button";
import CounterUp from "@/components/CounterUp";
import { useGetCountsQuery, useGetAboutUsQuery } from "@/store/api/homepageApi";

const HealthyFood = () => {
  const { data: counts } = useGetCountsQuery();
  const { data: about } = useGetAboutUsQuery();

  const activeCounts = Array.isArray(counts) && counts.length > 0 ? counts : [];

  return (
    <section className="bg-group_bg bg-no-repeat py-96 bg-right relative">
      <div className="absolute top-24">
        <img src="/assets/f_bg_left.png" alt="" />
      </div>
      <Container className="">
        {about && (
          <div className="mt-24">
            {about.title && (
              <h3 className="text-[55px] text-prh2 font-serif leading-[60px] font-medium w-[550px]">
                {about.title}
              </h3>
            )}
            {about.description1 && (
              <p className="text-[18px] text-prh2 font-montserrat font-medium pt-4 w-[600px]">
                {about.description1}
              </p>
            )}
            {about.description2 && (
              <p className="text-base text-prh2 font-montserrat font-normal pt-5 w-[600px]">
                {about.description2}
              </p>
            )}

            {about.button_text && about.button_link && (
              <Link href={about.button_link}>
                <Button
                  text={about.button_text}
                  className="bg-[#C31C1E] border-btn text-white mt-10 hover:text-[#C31C1E] hover:bg-white duration-500 border-2"
                />
              </Link>
            )}
          </div>
        )}

        {activeCounts.length > 0 && (
          <div className="absolute top-0 left-1/2 w-[100%] bg-[#F3F4F4] py-[2vw] justify-center -translate-x-1/2 flex gap-2">
            {activeCounts.map((el: any, idx: number) => {
              return (
                <CounterUp
                  key={idx}
                  item={{
                    num: Number(el.num) || 0,
                    dtl: el.dtl || "",
                    img: el.img || "",
                  }}
                />
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
};

export default HealthyFood;

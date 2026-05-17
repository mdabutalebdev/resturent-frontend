"use client";

import TitleDes from "@/components/common/TitleDes";

import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Container from "../Container";
import Link from "next/link";
import { useAppState } from "@/hooks/useAppState";
import ReviewCard from "../ReviewCard";

const Review = () => {

  let settings = {
    dots: true,
    infinite: true,
    lazyLoad: "ondemand" as const,
    speed: 600,
    slidesToShow: 3,
    height: 1000,
    autoplay: true,
    autoplaySpeed: 1000,
    cssEase: "linear",
  };


  const { reviewArr } = useAppState()


  return (
    <div className="pt-[100px] pb-[50px] relative">
      <div className="absolute top-10 left-0 opacity-45">
        <img src="/assets/searchVector.png" alt="" className="w-[300px]" />
      </div>
      <Container>
        <div>
          <TitleDes
            mainTitle={"What Our Customers Say"}
            className={"max-w-full"}
            textCenter={true}
          />
        </div>
        {/* ALL CARD */}
        <div className="py-10">
          <div className="w-full reviewslide">

            <Slider {...settings} className="">

              <div className="px-3 pb-8">
                <ReviewCard src="/assets/customer1.png" name={`Ama Ampomah`} />
              </div>
              <div className="px-3 pb-8">
                <ReviewCard src="/assets/customer1.png" name={`Ama Ampomah`} />
              </div>
              <div className="px-3 pb-8">
                <ReviewCard src="/assets/customer1.png" name={`Ama Ampomah`} />
              </div>
              <div className="px-3 pb-8">
                <ReviewCard src="/assets/customer1.png" name={`Ama Ampomah`} />
              </div>

              {
                (reviewArr as unknown) !== false &&
                  reviewArr.map((el, idx) => {
                    return (
                      <div key={idx} className="px-3 pb-8">
                        <ReviewCard src={el.imageUrl ?? ""} name={el.name} text={el.review} ratingVal={el.rating} />
                      </div>
                    )
                  })
              }
            </Slider>
          </div>
        </div>



        {/* Button to show/hide the form */}
      </Container>
    </div>
  );
};

export default Review;
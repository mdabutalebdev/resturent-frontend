"use client";

import TitleDes from "@/components/common/TitleDes";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Container from "../Container";
import ReviewCard from "../ReviewCard";
import { useGetTopReviewsQuery } from "@/store/api/homepageApi";

const Review = () => {
  const settings = {
    dots: true,
    infinite: true,
    lazyLoad: "ondemand" as const,
    speed: 600,
    slidesToShow: 3,
    height: 1000,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const { data: topReviews } = useGetTopReviewsQuery();

  if (!topReviews || !Array.isArray(topReviews) || topReviews.length === 0) {
    return (
      <div className="pt-[100px] pb-[50px] relative text-center">
        <Container>
          <TitleDes
            mainTitle="What Our Customers Say"
            className="max-w-full text-center"
            textCenter={true}
          />
          <p className="text-slate-500 font-medium font-montserrat mt-8">
            No customer reviews have been published yet.
          </p>
        </Container>
      </div>
    );
  }

  return (
    <div className="pt-[100px] pb-[50px] relative">
      <div className="absolute top-10 left-0 opacity-45">
        <img src="/assets/searchVector.png" alt="" className="w-[300px]" />
      </div>
      <Container>
        <div>
          <TitleDes
            mainTitle="What Our Customers Say"
            className="max-w-full"
            textCenter={true}
          />
        </div>

        {/* ALL CARD */}
        <div className="py-10">
          <div className="w-full reviewslide">
            <Slider {...settings}>
              {topReviews.map((el: any, idx: number) => {
                return (
                  <div key={idx} className="px-3 pb-8">
                    <ReviewCard
                      src={el.imageUrl || el.src || "/assets/customer1.png"}
                      name={el.review_by || el.name || "Anonymous Customer"}
                      text={el.body || el.text || ""}
                      ratingVal={Number(el.rating) || 5}
                    />
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Review;
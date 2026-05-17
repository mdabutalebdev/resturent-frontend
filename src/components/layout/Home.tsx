"use client";

import Banner from "@/components/Banner";
import Special_Dis from "@/components/Special_Dis";
import HealthyFood from "@/components/HealthyFood";
import Video from "@/components/AboutPage/Video";
import Chef from "@/components/Chef";
import Review from "@/components/AboutPage/Review";
import Articels from "@/components/Articels";
import Link from "next/link";

const Home = () => {
  return (
    <div>
      <Banner />
      <Special_Dis />
      <HealthyFood />
      <Video />
      <Chef />
      <Review />
      <div className="text-center">
        <Link href={'/reviewForm'} >
          <button className="bg-black text-white px-4 py-2 rounded-full"
          >
            Add a Review
          </button>
        </Link>
      </div>
      <Articels />
    </div>
  );
};

export default Home;

"use client";

import VisitDetails from "@/components/AboutPage/VisitDetails";
import Video from "@/components/AboutPage/Video";
import Review from "@/components/AboutPage/Review";
import Delivery from "@/components/AboutPage/Delivery";

const About = () => {
  return (
    <div className="bg-[#F9F9F7]">
      <VisitDetails />
      <Video />
      <Delivery />
      <Review />
    </div>
  );
};

export default About;

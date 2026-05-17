"use client";


import TitleDes from "@/components/common/TitleDes";





import Container from "../Container";

const Delivery = () => {
  return (
    <div className="py-[100px] relative z-10">
      <div className="absolute top-4 left-[45%] -z-10">
        <img src="/assets/vector2.png" alt="" className="opacity-55" />
      </div>
      <div className="absolute right-0 bottom-0 -z-10">
        <img src="/assets/vector.png" alt="" className="w-[328px] opacity-55" />
      </div>
      <Container>
        <div className="flex items-center justify-between ">
          {/* left */}
          <div>
            <img src="/assets/img.png" alt="" className="w-[650px]" />
          </div>
          {/* right */}
          <div className="ml-10">
            <TitleDes
              className={"max-w-[460px]"}
              p2={true}
              mainTitle={"Fastest Food Delivery in City"}
              des2={
                "Our visual designer lets you quickly and of drag a down your way to customapps for both keep desktop. "
              }
            />
            {/* Service */}
            <div className="pt-12 flex flex-col items-start gap-y-5">
              <div className="flex items-center gap-x-4">
                <img src="/assets/Icon1.png" alt="" />
                <h5 className="font-montserrat font-bold text-base text-prh2">
                  Delivery within 30 minutes
                </h5>
              </div>
              <div className="flex items-center gap-x-4">
                <img src="/assets/Icon2.png" alt="" />
                <h5 className="font-montserrat font-bold text-base text-prh2">
                  Online Services Available
                </h5>
              </div>
              <div className="flex items-center gap-x-4">
                <img src="/assets/Icon3.png" alt="" />
                <h5 className="font-montserrat font-bold text-base text-prh2">
                  Best Offer & Prices
                </h5>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Delivery;

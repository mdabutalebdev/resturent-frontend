"use client";

import { imageSrc } from "@/lib/imageSrc";
import Container from "@/components/Container";
import BlogCard from "@/components/BlogCard";
import { useAppState } from "@/hooks/useAppState";
import Link from "next/link";


const BlogPart = () => {
  
  const { FoodBank, addBlogDetails } = useAppState()

  return (
    <section className="py-20 mt-[6vw]">
      <Container>
        <div className="">
          <h3 className="text-[75px] text-prh2 font-serif leading-9 font-regular text-center mx-auto">
            Our Blog & Articles
          </h3>
          <p className="text-[20px] text-prh2 w-[750px] text-center font-montserrat font-medium mx-auto leading-7 pt-12">
            We consider all the drivers of change gives you the components you
            need to change to create a truly happens.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-4 gap-10">
          {
            FoodBank.map((el, idx) => {
              return (
                <Link key={idx} href={`/blog_details/${idx}`} onClick={() => addBlogDetails(el.id)}>
                  < BlogCard
                    src={imageSrc(el.image)}
                    ptext={el.name}
                    headding={el.description.slice(0, 60)}
                  />
                </Link>
              )
            })
          }
        </div>
      </Container>
    </section>
  );
};

export default BlogPart;

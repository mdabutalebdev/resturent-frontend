"use client";

import { imageSrc } from "@/lib/imageSrc";
import Container from "@/components/Container"
import BlogCard from '@/components/BlogCard'
import Button from "@/components/Button";

import { useAppState } from "@/hooks/useAppState";
import Link from "next/link";
const Articels = () => {

  const { FoodBank, addBlogDetails, Blog_D } = useAppState()

  // key={idx} to={`/blog_details/${idx}`}
  return (
    <section className='py-20'>
      <Container className={``}>

        <div className="flex justify-between">
          <h3 className='text-[55px] text-prh2 font-serif leading-[60px] font-medium  w-[550px]'>Our Blog & Articles</h3>
          <Link href={'/blog'}>
            <Button text={"Blog Details"} className={`bg-[#C31C1E] border-btn text-white  hover:text-[#C31C1E] hover:bg-white duration-500 border-2`} />
          </Link>
        </div>

        <div className=" mt-12 flex gap-x-10">

          <div className="h-[735px] w-[550px] bg-white rounded-xl shadow-xl ">

            <img src={(Blog_D as unknown) == false ? "/assets/burger.jpg" : imageSrc(Blog_D[0].thums[0])} alt="blog_one.jpg" className='rounded-t-xl w-full h-[450px] object-cover' />

            <p className={`text-[14px] text-prh2 font-montserrat font-medium leading-5 pt-6 pb-3 ml-3`}>
              {(Blog_D as unknown) == false ? "January 3, 2023" : Blog_D[0].category}

            </p>
            <h3 className={`text-2xl text-prh2 font-serif leading-6 font-medium ml-3`}>
              The secret tips & tricks to prepare a perfect burger & {(Blog_D as unknown) == false ? "pizza" : Blog_D[0].name} for our customers
            </h3>


            <p className='text-[14px] text-prh2 font-montserrat font-medium leading-5 pt-6 pb-3 ml-3'>
              {(Blog_D as unknown) == false ? " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim id, facere hic cumque voluptas tenetur libero, saepe quae nostrum dolorum accusamus maiores! Dolor quas mollitia velit natus illum, magnam libero, iste deserunt architecto tenetur inventore perferendis fugit blanditiis autem eaque quisquam quia eligendi similique hic sint? Obcaecati at ratione error veritatis consequatur." : Blog_D[0].description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-y-5 gap-x-10 h-[730px] ArticlesBlog">
            {
              FoodBank.slice(16, 20).map((el, idx) => {
                return (
                  <div key={idx} onClick={() => addBlogDetails(el.id)}>
                    < BlogCard
                      src={el.thums[0]}
                      ptext={el.name}
                      headding={el.description.slice(0, 60)}
                    />
                  </div>
                )
              })
            }
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Articels
"use client";

import Container from "@/components/Container";
import BlogCard from "@/components/BlogCard";
import Button from "@/components/Button";
import Link from "next/link";
import { useGetTopBlogsQuery } from "@/store/api/homepageApi";

const Articels = () => {
  const { data: blogs } = useGetTopBlogsQuery();

  const activeBlogs = Array.isArray(blogs) && blogs.length > 0 ? blogs : [];

  if (activeBlogs.length === 0) {
    return (
      <section className="py-20 text-center">
        <Container>
          <h3 className="text-[45px] text-prh2 font-serif leading-[50px] font-medium mb-4">
            Our Blog & Articles
          </h3>
          <p className="text-slate-500 font-medium font-montserrat mt-4">
            No blog articles have been configured or published yet.
          </p>
        </Container>
      </section>
    );
  }

  const featuredBlog = activeBlogs[0];
  const sideBlogs = activeBlogs.slice(1, 5); // Up to 4 blogs on the side

  return (
    <section className="py-20">
      <Container className="">
        <div className="flex justify-between items-center">
          <h3 className="text-[55px] text-prh2 font-serif leading-[60px] font-medium w-[550px]">
            Our Blog & Articles
          </h3>
          <Link href={"/blog"}>
            <Button
              text={"See All Blogs"}
              className="bg-[#C31C1E] border-btn text-white hover:text-[#C31C1E] hover:bg-white duration-500 border-2"
            />
          </Link>
        </div>

        <div className="mt-12 flex gap-x-10">
          {/* Main Large Showcase Blog */}
          {featuredBlog && (
            <div className="w-[550px] bg-white rounded-xl shadow-xl overflow-hidden flex flex-col justify-between border border-gray-100 pb-6">
              {featuredBlog.poster && (
                <img
                  src={featuredBlog.poster}
                  alt="Blog Poster"
                  className="w-full h-[450px] object-cover"
                />
              )}
              <div className="px-6 flex-1 flex flex-col justify-between pt-6">
                <div>
                  <p className="text-[14px] text-slate-400 font-montserrat font-bold uppercase tracking-wider mb-2">
                    {featuredBlog.created_at
                      ? new Date(featuredBlog.created_at).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "Gourmet Grill Article"}
                  </p>
                  <h3 className="text-2xl text-prh2 font-serif leading-8 font-semibold mb-4 hover:text-[#C31C1E] duration-200 cursor-pointer">
                    {featuredBlog.title}
                  </h3>
                  <p className="text-sm text-prh font-montserrat leading-6 line-clamp-3">
                    {featuredBlog.content}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Side Blog Cards grid */}
          {sideBlogs.length > 0 && (
            <div className="grid grid-cols-2 gap-y-5 gap-x-10 h-[730px] ArticlesBlog flex-1">
              {sideBlogs.map((el: any, idx: number) => {
                return (
                  <div key={idx} className="cursor-pointer hover:scale-[1.02] duration-200">
                    <BlogCard
                      src={el.poster || "/assets/burger.jpg"}
                      ptext={
                        el.created_at
                          ? new Date(el.created_at).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "Article"
                      }
                      headding={el.title ? el.title.slice(0, 50) + (el.title.length > 50 ? "..." : "") : ""}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default Articels;
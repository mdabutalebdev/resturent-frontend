"use client";

import { useEffect, useState, useRef } from "react";
import { IoIosNotifications } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { FaCartPlus, FaUserCircle } from "react-icons/fa";
import { useAppState } from "@/hooks/useAppState";
import Link from "next/link";
import { useGetMeQuery } from "@/store/api/authApi";
import { useGetContactInfoQuery } from "@/store/api/homepageApi";
import { deleteCookie, getCookie } from "@/lib/cookies";
import { errorMessage, successMessage } from "@/lib/toast";
import Container from "@/components/Container";
import List from "@/components/List";
import { useRouter } from "next/navigation";

interface NavberProps {
  className?: string;
}

const Navber = ({ className }: NavberProps) => {
  const router = useRouter();
  const { data: contactInfo } = useGetContactInfoQuery();

  const list = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Menu",
      path: "/menu",
    },
    {
      name: "Blog",
      path: "/blog",
    },
    {
      name: "Contact",
      path: "/contact",
    }
  ]

  const { totalQuantity, CartDropDown, totalFv } = useAppState()

  const cartBtn = () => {
    CartDropDown()
  }

  // Reactive state to listen to client cookie updates in real-time
  const [authToken, setAuthToken] = useState("");
  const [dropdown, setdropdown] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [sign, setsign] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Click outside handler to dismiss dropdown
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setdropdown(false);
      }
    };
    if (dropdown) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [dropdown]);

  useEffect(() => {
    const checkToken = () => {
      const activeToken = getCookie("token");
      if (activeToken !== authToken) {
        setAuthToken(activeToken);
      }
    };
    checkToken();
    const interval = setInterval(checkToken, 1000);
    return () => clearInterval(interval);
  }, [authToken]);

  const { data, error, refetch } = useGetMeQuery(undefined, {
    skip: !authToken,
  });

  // Re-fetch immediately when token becomes active
  useEffect(() => {
    if (authToken) {
      refetch();
    }
  }, [authToken, refetch]);

  // Extract user details directly from response root
  useEffect(() => {
    if (data) {
      const activeUser = (data?.uuid || data?.email) ? data : (data.data?.user || data.user);
      setUser(activeUser);
      setsign(!!activeUser);
    } else {
      setUser(null);
      setsign(false);
    }
  }, [data, error]);

  const HandleUserOpen = () => {
    setdropdown(!dropdown);
  };

  // Log out
  const HandleLogout = () => {
    setdropdown(false);
    deleteCookie("token");
    setAuthToken("");
    setUser(null);
    setsign(false);
    successMessage("Logged out", "top-center", "dark");
    router.push("/");
    router.refresh();
  };

  const displayName = user?.display_name || user?.first_name || "User";
  const firstLetter = displayName[0].toUpperCase();

  return (
    <div className={`py-1 z-50 bg-[#ffffff98] backdrop-blur-[2px] left-0 w-full ${className}`}>
      <Container className={"flex items-center justify-between"}>

        <Link href={'/'}>
          {contactInfo?.logo_url && (
            <img src={contactInfo.logo_url} alt="Logo" className='w-[100px] h-[80px] object-contain' />
          )}
        </Link>

        <div className="flex items-center">

          <ul className='flex gap-[8px] mr-[200px]'>
            {
              list.map((el, idx) => {
                return (
                  <List to={el.path} key={idx} text={el.name} />
                )
              })
            }
          </ul>


          <div className="flex gap-8 items-center">
            <button className='relative'>
              <IoIosNotifications className='text-2xl' />
              <p className='absolute -top-[14px] -right-3 w-[1.3vw] h-[1.3vw] text-[14px] flex items-center justify-center text-white font-semibold bg-btn rounded-[100%]'>
                0
              </p>
            </button>

            <Link href={'/wishlist'} className='relative'>
              <button className='mt-1'>
                <CiHeart className='text-[26px]' />
                <p className='absolute -top-2 -right-4 w-[1.3vw] h-[1.3vw] text-[14px] flex items-center justify-center text-white font-semibold bg-btn rounded-[100%]'>
                  {totalFv}
                </p>
              </button>
            </Link>


            <button onClick={() => cartBtn()} className='relative'>
              <FaCartPlus className='text-[22px] text-blck' />

              <p className='absolute -top-4 -right-4 w-[1.3vw] h-[1.3vw] text-[14px] flex items-center justify-center text-white font-semibold bg-btn rounded-[100%]'>
                {totalQuantity}
              </p>
            </button>


            <div ref={dropdownRef} className="relative">
              <div
                onClick={HandleUserOpen}
                className="cursor-pointer flex items-center justify-center"
              >
                {sign ? (
                  user?.profile_picture ? (
                    <img
                      src={user.profile_picture}
                      alt="Profile"
                      className="w-[35px] h-[35px] rounded-full object-cover border-2 border-btn"
                    />
                  ) : (
                    <div className="w-[35px] h-[35px] bg-btn text-white text-md font-bold rounded-full flex items-center justify-center font-montserrat shadow-md hover:scale-105 transition-transform duration-200">
                      {firstLetter}
                    </div>
                  )
                ) : (
                  <FaUserCircle className="text-[32px] text-black hover:text-btn transition-colors duration-200" />
                )}
              </div>
              {/* drop down */}
              {dropdown && (
                <div className="absolute bottom-[-218px] right-0 w-[320px] mx-auto border-2 rounded-lg bg-white py-6 mb-10 shadow-xl z-50">
                  <div className="text-center pb-2">
                    <h3 className="font-montserrat font-bold text-lg text-prh2 capitalize">
                      {sign ? displayName : "Accounts"}
                    </h3>
                  </div>
                  {sign ? (
                    <div className="flex gap-x-2 justify-center pb-2">
                      <div className="">
                        <button
                          onClick={HandleLogout}
                          className="font-montserrat font-semibold text-md text-white bg-btn border rounded-full py-2 px-8 cursor-pointer"
                        >
                          Log out
                        </button>
                      </div>
                      <div className="">
                        <Link href={"/details"}>
                          {" "}
                          <button
                            onClick={() => setdropdown(false)}
                            className="font-montserrat font-semibold text-md text-white bg-btn border rounded-full py-2 px-6 cursor-pointer"
                          >
                            Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-x-2 justify-center pb-2">
                      <div className="">
                        <Link onClick={() => setdropdown(false)} href={"/login"}>
                          <button className="font-montserrat font-semibold text-md text-white bg-btn border rounded-full py-2 px-8 cursor-pointer">
                            Login
                          </button>
                        </Link>
                      </div>
                      <div className="">
                        <Link onClick={() => setdropdown(false)} href={"/signup"}>
                          <button className="font-montserrat font-semibold text-md text-white bg-btn border rounded-full py-2 px-6 cursor-pointer">
                            Sign Up
                          </button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>
      </Container>
    </div>
  )
}

export default Navber;
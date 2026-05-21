"use client";

import { MdOutlineEmail } from "react-icons/md";
import { FaTwitter, FaInstagram } from "react-icons/fa";
import { TiSocialFacebook } from "react-icons/ti";
import { FiPhone } from "react-icons/fi";
import Container from "@/components/Container";
import { useGetContactInfoQuery } from "@/store/api/homepageApi";

interface SubNavProps {
  className?: string;
}

const SubNav = ({ className = "" }: SubNavProps) => {
  const { data: contactInfo } = useGetContactInfoQuery();

  if (!contactInfo) return null;

  return (
    <div className={`${className} bg-subNav h-[45px] flex items-center`}>
      <Container className={`flex items-center justify-between`}>
        <div className="flex items-center gap-5">
          {contactInfo.phone && (
            <a href={`tel:${contactInfo.phone}`} className="text-white flex items-center gap-2 font-montserrat">
              <FiPhone />
              {contactInfo.phone}
            </a>
          )}
          {contactInfo.email && (
            <a href={`mailto:${contactInfo.email}`} className="text-white flex items-center gap-2 font-montserrat">
              <MdOutlineEmail />
              {contactInfo.email}
            </a>
          )}
        </div>

        <div className="flex gap-2">
          {contactInfo.twitter_url && (
            <div className="bg-[#5C5C5C] h-7 w-7 rounded-full flex items-center justify-center">
              <a href={contactInfo.twitter_url} target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-white" />
              </a>
            </div>
          )}
          {contactInfo.facebook_url && (
            <div className="bg-[#5C5C5C] h-7 w-7 rounded-full flex items-center justify-center">
              <a href={contactInfo.facebook_url} target="_blank" rel="noopener noreferrer">
                <TiSocialFacebook className="text-white text-[22px]" />
              </a>
            </div>
          )}
          {contactInfo.instagram_url && (
            <div className="bg-[#5C5C5C] h-7 w-7 rounded-full flex items-center justify-center">
              <a href={contactInfo.instagram_url} target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-white" />
              </a>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default SubNav;
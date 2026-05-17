"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavListLinkProps {
  text: string;
  href: string;
}

const NavListLink = ({ text, href }: NavListLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={
        isActive
          ? "list-none text-base py-[4px] px-[16px] rounded-[34px] font-semibold font-montserrat bg-btn text-white"
          : "list-none text-prh2 text-base py-[4px] px-[16px] rounded-[34px] font-semibold font-montserrat"
      }
    >
      <li>{text}</li>
    </Link>
  );
};

export default NavListLink;

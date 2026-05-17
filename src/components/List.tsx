"use client";

import NavListLink from "./NavListLink";

interface ListProps {
  text: string;
  to: string;
}

const List = ({ text, to }: ListProps) => {
  return <NavListLink text={text} href={to} />;
};

export default List;

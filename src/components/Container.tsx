"use client";

import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={`${className} w-[1200px] mx-auto`}>{children}</div>
  );
};

export default Container;

"use client";

interface ButtonProps {
  text: string;
  className?: string;
  onClick?: () => void;
}

const Button = ({ text, className, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${className} py-[15px] px-[32px] cursor-pointer rounded-[118px] text-[16px] leading-[24px] border-[1px] font-bold hover:bg-transparent`}
    >
      {text}
    </button>
  );
};

export default Button;

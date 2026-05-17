"use client";

import { IoClose } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";

interface ToastProps {
  className?: string;
  message: string;
}

const Toast = ({ className = "", message }: ToastProps) => {
    return (
        <div className={`fixed top-5 z-[9999] right-5 w-72 border bg-white shadow-2xl rounded-lg p-4 flex space-x-4 ${className}`}>
            <div className="flex-shrink-0 h-full mt-[5px]">
                <FaCheckCircle className='text-green-500 text-[1vw]' />
            </div>
            <div className="flex-1 ">
                <p className="text-md font-medium text-gray-800">Successfully!</p>
                <p className="text-sm text-gray-600">{message}</p>
            </div>
            <div className="">
                <IoClose />
            </div>
        </div>
    )
}

export default Toast;
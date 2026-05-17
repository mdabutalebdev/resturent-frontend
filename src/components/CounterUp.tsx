"use client";

import { useEffect, useState } from "react";

interface CounterUpProps {
  item: {
    num: number;
    dtl: string;
    img: string;
  };
}

const CounterUp = ({ item }: CounterUpProps) => {

    const { num, dtl, img } = item

    let [printNum, setprintNum] = useState(1)

    let stp = num

    useEffect(() => {
        const interval = setInterval(() => {
            setprintNum((prev) => {
                if (prev >= stp) {
                    clearInterval(interval);
                    return stp;
                }
                return prev + 10;
            });
        }, 10);
        return () => clearInterval(interval);
    }, [stp]);

    return (
        <div className="w-[265px] relative">

            <img src={img} className='absolute left-1/2 top-4 -translate-x-1/2 h-[1.5vw] w-[1.5vw]' />

            <h2 className='text-5xl font-semibold text-center mt-[50px]'>
                {
                    printNum
                    // printNum < 1000000 ?
                    //     printNum < 100000 ?
                    //         printNum < 100000 ? `${(printNum / 1000).toFixed(0)}K` : printNum
                    //         : printNum < 1000000 ? `${(printNum / 100000).toFixed(0)}M` : printNum
                    //     : printNum < 10000000 ? `${(printNum / 1000000).toFixed(0)}B` : printNum
                }K
            </h2>
            <p className='tex-[20px] font-Nunito mt-2 opacity-[60%] text-center mb-[10px]'>{dtl}</p>
        </div>
    )
}

export default CounterUp
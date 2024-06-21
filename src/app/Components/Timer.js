import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import { TimerContext } from "../Context";

const Timer = ({files}) => {
    
    const {elapsedTime, setElapsedTime, isActive} = useContext(TimerContext)
    const startTimeRef = useRef(0);

    useEffect(() => {
        if (isActive) {
            startTimeRef.current = performance.now(); // Capture start time

            const intervalId = setInterval(() => {
                const currentTime = performance.now();
                const timeSinceStart =
                    (currentTime - startTimeRef.current) / 1000; // Calculate elapsed time in seconds
                setElapsedTime(timeSinceStart);
            }, 1); // Update every millisecond for higher precision

            return () => clearInterval(intervalId); // Cleanup function
        }
    }, [isActive]);
    // return <div>{elapsedTime.toFixed(1)}</div>;
    return (
        <div className={`absolute top-12 right-8 flex justify-center  py-2 px-4 rounded-sm items-center  mx-auto mt-4 drop-shadow-md opacity-0 ${files && files.length && 'transition-opacity opacity-100'}`}>
            <Image
                src={`./assets/clock.svg`}
                width={24}
                height={24}
                className="select-none mr-2"
                alt="clock"
            />
            <p className="text-white font-semibold">
                Converted in{" "}
                <span className="text-green-800 bg-green-300 px-2 font-bold">{elapsedTime.toFixed(1)} sec</span>
            </p>
        </div>
    );
};

export default Timer;

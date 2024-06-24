import React, { useContext, useEffect, useState } from "react";
import { TimerContext } from "../Context";

const Header = ({ err }) => {
    const { isActive } = useContext(TimerContext);
    const [progressBarWidth, setProgressBarWidth] = useState(0);
    const [isReset, setIsReset] = useState(false);
    useEffect(() => {
        let timeoutId = null;
        timeoutId = setInterval(() => {
            if (
                !err &&
                progressBarWidth !== 100 &&
                !(progressBarWidth < 0 || progressBarWidth > 100) &&
                isActive
            )
                setProgressBarWidth((prev) => prev + 1);
        }, 1);
        return () => clearTimeout(timeoutId);
    }, [isActive]);

    useEffect(() => {
        if (err) {
            setProgressBarWidth(0);
        } else if (!isActive && progressBarWidth > 0 && !err && !isReset) {
            setProgressBarWidth(100);
            setIsReset(true);
        }
    }, [progressBarWidth]);

    useEffect(() => {
        if (isReset) {
            setTimeout(() => {
                setProgressBarWidth(0);
            }, 2000);
            setIsReset(false)
        }
    }, [isReset]);

    return (
        <div
            key={progressBarWidth}
            className={`bg-gradient-to-r from-yellow-500 to-green-500 text-center pb-0.5 text-white drop-shadow-lg`}
            style={{
                transition: "width 0.3s ease-in-out",
                width: `${progressBarWidth}%`,
            }}
        >
            <a className="bg-black font-orbitron text-2xl py-1 tracking-[.5em] w-screen block" href="/">XLCSV</a>
        </div>
    );
};

export default Header;

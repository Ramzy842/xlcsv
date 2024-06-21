import React, { createContext, useState } from "react";

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
    const [isActive, setIsActive] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);

    return (
        <TimerContext.Provider value={{ isActive, setIsActive, elapsedTime, setElapsedTime }}>
            {children}
        </TimerContext.Provider>
    );
};

export { TimerContext };

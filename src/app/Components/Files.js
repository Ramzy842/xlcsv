"use client";
import React, { useState } from "react";
import Image from "next/image";

const Files = () => {
    const [filesPresent, setFilesPresent] = useState(false);
    return (
        <div className="max-w-7xl bg-gradient-to-b from-cyan-500 to-blue-500 mx-auto absolute bottom-0 right-0 left-0 rounded-t-3xl p-6 drop-shadow-2xl">
            <div className="flex justify-between">
                <div className="flex items-center">
                    <h1 className="font-extrabold text-xl tracking-wide text-black mr-2">
                        Files
                    </h1>
                    <Image src={`./assets/file.svg`} height={20} width={20} />
                </div>

                <button className="flex items-center bg-black py-2 px-3">
                    Download All
                    <Image
                    className="ml-2"
                        src={`./assets/downloadAll.svg`}
                        height={20}
                        width={20}
                    />
                </button>
            </div>

            {filesPresent ? (
                <h1>Files Listed</h1>
            ) : (
                <div className="h-full text-center p-24">
                    <h1 className="text-7xl font-bold text-black">
                        No files yet
                    </h1>
                </div>
            )}
        </div>
    );
};

export default Files;

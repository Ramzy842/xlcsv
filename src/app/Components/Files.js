"use client";
// import React, { useEffect, useState } from "react";
import Image from "next/image";
import File from "./File";

const Files = ({files}) => {
    return (
        <div className="max-w-7xl bg-gradient-to-b from-cyan-500 to-blue-500 mx-auto absolute h-1/2 bottom-0 right-0 left-0 rounded-t-3xl p-6 drop-shadow-2xl ">
            <div className="flex justify-between mb-2">
                <div className="flex items-center">
                    <h1 className="font-extrabold text-xl tracking-wide text-black mr-2">
                        Files
                    </h1>
                    <Image src={`./assets/file.svg`} height={20} width={20} alt="files icon" />
                </div>

                <button className={`${files.length ? "flex" : "hidden"} items-center bg-black py-2 px-3 text-white`}>
                    Download All
                    <Image
                        className="ml-2"
                        src={`./assets/downloadAll.svg`}
                        height={20}
                        width={20}
                        alt="download all files"
                    />
                </button>
            </div>

            {files.length ? (
                <div className="overflow-y-scroll h-[95%] pr-2">
                    {files.map((file, index) => {
                        return <File id={index + 1} file={file} key={index} />;
                    })}
                </div>
            ) : (
                <div className="h-full text-center flex justify-center items-center">
                    <h1 className="text-7xl font-bold text-black">
                        No files yet
                    </h1>
                </div>
            )}
        </div>
    );
};

export default Files;

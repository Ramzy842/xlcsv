"use client";
import React, { useState } from "react";
import Image from "next/image";
import File from "./File";

const Files = () => {
    const [filesPresent, setFilesPresent] = useState(true);
    const [files, setFiles] = useState([
        { id: 0, name: "File_1.csv" },
        { id: 1, name: "File_2.csv" },
        { id: 2, name: "File_3.csv" },
        { id: 3, name: "File_4.csv" },
        { id: 4, name: "File_5.csv" },
        { id: 5, name: "File_7.csv" },
        { id: 6, name: "File_8.csv" },
        { id: 7, name: "File_9.csv" },
        { id: 8, name: "File_10.csv" },
        { id: 9, name: "File_11.csv" },
        { id: 10, name: "File_12.csv" },
        { id: 11, name: "File_13.csv" },
        { id: 12, name: "File_14.csv" },
        { id: 13, name: "File_15.csv" },
        { id: 14, name: "File_16.csv" },
    ]);
    return (
        <div className="max-w-7xl bg-gradient-to-b from-cyan-500 to-blue-500 mx-auto absolute h-1/2 bottom-0 right-0 left-0 rounded-t-3xl p-6 drop-shadow-2xl ">
            <div className="flex justify-between mb-2">
                <div className="flex items-center">
                    <h1 className="font-extrabold text-xl tracking-wide text-black mr-2">
                        Files
                    </h1>
                    <Image src={`./assets/file.svg`} height={20} width={20} alt="files icon" />
                </div>

                <button className="flex items-center bg-black py-2 px-3 text-white">
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

            {filesPresent ? (
                <div className="overflow-y-scroll h-[95%] pr-2">
                    {files.map((file) => {
                        return <File key={file.id} name={file.name} />;
                    })}
                </div>
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

"use client";
// import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import Image from "next/image";
import File from "./File";

const Files = ({ files }) => {
    return (
        <div className={`max-w-6xl bg-files bg-cover bg-no-repeat mx-auto absolute h-1/2 bottom-0 right-0 left-0 rounded-t-xl p-6 drop-shadow-2xl opacity-0 transition-all ${files && files.length && "opacity-100"} `}>
            {/* <div className="bg-black absolute top-0 left-0 right-0 bottom-0 opacity-50 rounded-t-xl">
            </div> */}
            <div className="flex justify-between mb-2">
                <div className="flex items-center">
                    <h1 className="font-extrabold text-xl tracking-wide white mr-2 z-40">
                        Files
                    </h1>
                    <Image
                        src={`./assets/file.svg`}
                        className="z-40"
                        height={20}
                        width={20}
                        alt="files icon"
                    />
                </div>

                <button
                    onClick={() => {
                        files.forEach((element) => {
                            XLSX.writeFile(
                                element.downloadReqs.new_wb,
                                element.downloadReqs.fileNameWithoutExt + ".csv"
                            );
                        });
                    }}
                    className={`${
                        files.length ? "flex" : "hidden"
                    } items-center bg-black py-2 px-3 text-sm text-white z-40 rounded-sm hover:bg-green-600 group transition-all`}
                >
                    Download All
                    <Image
                        className="ml-3"
                        src={`./assets/downloadAll.svg`}
                        height={18}
                        width={18}
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
                    <h1 className="text-7xl font-bold text-white  z-40">
                        No files yet
                    </h1>
                </div>
            )}
        </div>
    );
};

export default Files;

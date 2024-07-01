"use client";
import * as XLSX from "xlsx";
import Image from "next/image";
import File from "./File";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { delay } from "../utils";
import { useEffect, useState } from "react";

const Files = ({ files }) => {
    const [isWaitingDownload, setIsWaitingDownload] = useState(false);
    const storeAndZip = async () => {
        await delay(50);
        const files_csv = files.map((file) => {
            const tmpFile = XLSX.write(file.downloadReqs.new_wb, {
                bookType: "csv",
                type: "binary",
            });
            return tmpFile;
        });
        let storedFiles = {};
        for (let x = 0; x < files.length; x++) {
            storedFiles[files[x].name] = files_csv[x];
        }
        const zip = new JSZip();
        for (const fileName in storedFiles) {
            zip.file(fileName, storedFiles[fileName], { binary: true });
        }
        const zipBlob = await zip.generateAsync({ type: "blob" });
        saveAs(zipBlob, "XLCSV-converted-files");
        setIsWaitingDownload(false);
    };

    useEffect(() => {
        if (isWaitingDownload) storeAndZip();
    }, [isWaitingDownload]);

    return (
        <div
            className={`max-w-6xl bg-files bg-cover bg-no-repeat mx-auto absolute h-1/2 bottom-0 right-0 left-0 rounded-t-xl p-6 drop-shadow-2xl opacity-0 transition-all ${
                files && files.length && "opacity-100"
            } `}
        >
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

                {isWaitingDownload ? (
                    <button
                        disabled
                        className={`${
                            files.length ? "flex" : "hidden"
                        } items-center bg-green-600 py-2 px-3 text-sm text-white z-40 rounded-sm outline-none`}
                    >
                        Preparing Download
                        <Image
                            className="ml-3 animate-spin"
                            src={`./assets/loader.svg`}
                            height={18}
                            width={18}
                            alt="preparing download"
                        />
                    </button>
                ) : (
                    <button
                        onClick={() => {
                            setIsWaitingDownload(true);
                        }}
                        className={`${
                            files.length ? "flex" : "hidden"
                        } items-center bg-green-600 py-2 px-3 text-sm text-white z-40 rounded-sm hover:bg-green-800 group outline-none`}
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
                )}
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

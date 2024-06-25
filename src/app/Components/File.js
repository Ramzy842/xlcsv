import React, { useEffect, useState } from "react";
import Image from "next/image";
import * as XLSX from "xlsx";
import { delay } from "../utils";
const File = ({ file }) => {
    const [isWaitingDownload, setIsWaitingDownload] = useState(false);
    const { name, downloadReqs } = file;
    useEffect(() => {
        if (isWaitingDownload) {
            delay(50).then(() => {
                XLSX.writeFile(
                    downloadReqs.new_wb,
                    downloadReqs.fileNameWithoutExt + ".csv"
                );
                setIsWaitingDownload(false);
            });
        }
    }, [isWaitingDownload]);
    return (
        <div className="w-full bg-black/40 backdrop-blur-md	 rounded-sm flex justify-between items-center px-2 mb-2 py-1 drop-shadow-lg z-40">
            <p className="text-white z-40 text-sm">{name}</p>
            <button
                onClick={() => {
                    setIsWaitingDownload(true);
                }}
            >
                {isWaitingDownload ? (
                    <Image
                        className="ml-3 animate-spin"
                        src={`./assets/loader.svg`}
                        height={18}
                        width={18}
                        alt="preparing download"
                    />
                ) : (
                    <Image
                        priority={true}
                        src={`./assets/upload.svg`}
                        className="select-none	"
                        width={18}
                        height={18}
                        alt="download file"
                    />
                )}
            </button>
        </div>
    );
};

export default File;

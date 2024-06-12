"use client";
import React, { useState } from "react";
import Image from "next/image";
import * as XLSX from "xlsx";

const Uploader = ({ setFiles }) => {
    const [fileName, setFileName] = useState("");
    const [fileSize, setFileSize] = useState("");
    const [filePresent, setFilePresent] = useState(false);

    // const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    async function handler(e) {
        const input = document.querySelector("input");
        e.stopPropagation();
        e.preventDefault();
        let kinds = { folders: 0, files: 0 };
        console.log(input.files[0].type);
        if (
            input.files[0].type === "application/vnd.ms-excel" ||
            input.files[0].type ===
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
            for (let x = 0; x < input.files.length; x++) {
                input.files[x].arrayBuffer().then((res) => {
                    let data = new Uint8Array(res);
                    let wb = XLSX.read(data, { type: "array" });
                    const first_sheet_name = wb.SheetNames[x];
                    let worksheet = wb.Sheets[first_sheet_name];
                    let jsonData = XLSX.utils.sheet_to_json(worksheet, {
                        raw: true,
                    });
                    let newWorkSheet = XLSX.utils.json_to_sheet(jsonData);
                    let new_wb = XLSX.utils.book_new();
                    const fileNameWithoutExt = fileName.substring(
                        0,
                        fileName.lastIndexOf(".")
                    );
                    XLSX.utils.book_append_sheet(
                        new_wb,
                        newWorkSheet,
                        fileNameWithoutExt
                    );
                    setFilePresent(true);

                    setFiles((prev) => [
                        ...prev,
                        {
                            name: `${fileNameWithoutExt}.csv`,
                            downloadReqs: {
                                new_wb,
                                fileNameWithoutExt: fileNameWithoutExt,
                            },
                        },
                    ]);
                });
                if (!input.files[x].type)
                    kinds = { ...kinds, folders: kinds.folders + 1 };
                else kinds = { ...kinds, files: kinds.files + 1 };
            }
            if (kinds.folders == 1) console.log("You dropped 1 folder.");
            else if (kinds.files == 1) console.log("You dropped 1 file.");
            else if (kinds.folders > 1)
                console.log(`You dropped ${kinds.folders} folders!`);
            else if (kinds.files > 1)
                console.log(`You dropped ${kinds.files} files!`);
        }
    }

    function handleInput(e) {
        setFileName(e.target.files[0].name);
        setFileSize(convertBytes(e.target.files[0].size));
    }

    function handleRefresh() {
        setFileName("");
        setFileSize("");
        setFilePresent(false);
        const input = document.querySelector("input");
        input.value = "";
    }
    function convertBytes(value) {
        const units = {
            KB: 1024,
            MB: 1024 * 1024,
            GB: 1024 * 1024 * 1024,
        };

        if (value === 0) return "0 Bytes";
        const bytes = value;
        const i = Math.floor(Math.log(bytes) / Math.log(units.KB));
        const formattedValue = (bytes / Math.pow(units.KB, i)).toFixed(1);

        const unit =
            i >= units.GB / units.KB ? "GB" : ["Bytes", "KB", "MB", "GB"][i];
        return formattedValue + " " + unit;
    }

    return (
        <div
            id="upload-zone"
            className={`w-56 flex flex-col items-center justify-center mx-auto mt-16 bg-black/70 backdrop-blur-xl	 rounded-md p-4 drop-shadow-2xl max-w-xl ${
                fileName &&
                !filePresent &&
                "w-auto  border-b-4 border-yellow-500 "
            } ${filePresent && "border-b-4 w-auto border-green-500"}`}
        >
            {!filePresent && (
                <>
                    <p className="font-semibold mb-4 text-white">
                        Drop Your Folder Here
                    </p>
                    <Image
                        src={`./assets/upload.svg`}
                        width={32}
                        height={32}
                        className="cursor-pointer"
                        alt="upload"
                    />
                </>
            )}
            {fileName && (
                <div className="flex text-white justify-between w-full  ">
                    <div className="w-3/5 max-w-md">
                        <p className="font-bold truncate">
                            File Name:{" "}
                            <span className="font-normal ">{fileName}</span>
                        </p>
                        <p className="font-bold truncate">
                            Size:{" "}
                            <span className="font-normal">{fileSize}</span>
                        </p>
                    </div>
                    {!filePresent && (
                        <div
                            className="flex items-center justify-center cursor-pointer"
                            onClick={handler}
                        >
                            <p className="mr-2">Start conversion</p>
                            <Image
                                src={`./assets/arrow-r.svg`}
                                width={20}
                                height={20}
                                className="cursor-pointer"
                                alt="start conversion"
                            />
                        </div>
                    )}
                    {filePresent && (
                        <div className="flex items-center justify-center select-none">
                            <Image
                                src={`./assets/check.svg`}
                                width={20}
                                height={20}
                                alt="done conversion"
                            />
                        </div>
                    )}
                </div>
            )}

            {/* <input
                accept=".xls, .xlsx"
                className={`${fileName && "hidden"} text-white`}
                type="file"
                onChange={handleInput}
            /> */}

            {fileName && (
                <Image
                    src={"./assets/refresh.svg"}
                    className="cursor-pointer"
                    width={20}
                    height={20}
                    alt="refresh"
                    onClick={handleRefresh}
                />
            )}
        </div>
    );
};

export default Uploader;

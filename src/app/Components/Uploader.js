"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import * as XLSX from "xlsx";
import Error from "./Error";
import { TimerContext } from "../Context";

// function countDropped(kinds) {
//     if (kinds.folders == 1) console.log("You dropped 1 folder.");
//     else if (kinds.files == 1) console.log("You dropped 1 file.");
//     else if (kinds.folders > 1)
//         console.log(`You dropped ${kinds.folders} folders!`);
//     else if (kinds.files > 1) console.log(`You dropped ${kinds.files} files!`);
// }

const Uploader = ({ setFiles }) => {
    const [fileName, setFileName] = useState("");
    const [fileSize, setFileSize] = useState("");
    const [filePresent, setFilePresent] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [dropStatus, setDropStatus] = useState("");
    const { setElapsedTime, setIsActive } = useContext(TimerContext);
    // const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    function GetFileTree(item, path) {
        path = path || "";
        if (item.isFile) {
            item.file(function (file) {
                setUploadedFiles((prev) => [...prev, file]);
            });
        } else if (item.isDirectory) {
            // Get folder contents
            let dirReader = item.createReader();
            dirReader.readEntries(function (entries) {
                for (let x = 0; x < entries.length; x++) {
                    GetFileTree(entries[x], path + item.name + "/");
                }
            });
        }
    }
    function handleUploadedFiles(e) {
        e.stopPropagation();
        e.preventDefault();
        if (e.type === "dragleave") setDropStatus("");
        if (e.type === "dragenter" || e.type === "dragover")
            setDropStatus("border-2 border-green-400");
        let items = e.dataTransfer.items;
        for (let x = 0; x < items.length; x++) {
            let item = items[x].webkitGetAsEntry();
            if (item) GetFileTree(item);
        }
    }

    useEffect(() => {
        if (uploadedFiles.length && uploadedFiles[0]) handleInput();
    }, [uploadedFiles]);
    function handler(e) {
        e.stopPropagation();
        e.preventDefault();
        setIsActive(true);
        for (let x = 0; x < uploadedFiles.length; x++) {
            const isCorrectFileExt =
                uploadedFiles[x].type === "application/vnd.ms-excel" ||
                uploadedFiles[x].type ===
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            if (uploadedFiles[x].type && isCorrectFileExt) {
                uploadedFiles[x].arrayBuffer().then((res) => {
                    let data = new Uint8Array(res);
                    let wb = XLSX.read(data, { type: "array" });
                    const first_sheet_name = wb.SheetNames[x];
                    let worksheet = wb.Sheets[first_sheet_name];
                    let jsonData = XLSX.utils.sheet_to_json(worksheet, {
                        raw: true,
                    });
                    let newWorkSheet = XLSX.utils.json_to_sheet(jsonData);
                    let new_wb = XLSX.utils.book_new();
                    if (uploadedFiles[x]) {
                        const temp_name = uploadedFiles[x].name;
                        const fileNameWithoutExt = uploadedFiles[
                            x
                        ].name.substring(0, temp_name.lastIndexOf("."));
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
                        setIsActive(false);
                    }
                });
            }
        }
    }

    function handleInput() {
        setDropStatus("");
        setFileName(uploadedFiles[uploadedFiles.length - 1].name);
        setFileSize(convertBytes(uploadedFiles[uploadedFiles.length - 1].size));
    }

    function handleRefresh() {
        setFileName("");
        setFileSize("");
        setFilePresent(false);
        setUploadedFiles([]);
        setFiles([]);
        setIsActive(false);
        setElapsedTime(0);
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
            className={`w-56 flex flex-col items-center justify-center mx-auto mt-16 bg-black/70 backdrop-blur-xl rounded-md p-4 drop-shadow-2xl max-w-lg ${
                fileName &&
                !filePresent &&
                "w-auto  border-b-4 border-yellow-500 "
            } ${
                filePresent && "border-b-4 w-auto border-green-500"
            } ${dropStatus}`}
        >
            {!uploadedFiles.length && (
                <div
                    className="flex flex-col items-center"
                    onDragEnter={handleUploadedFiles}
                    onDragOver={handleUploadedFiles}
                    onDrop={handleUploadedFiles}
                    onDragLeave={handleUploadedFiles}
                >
                    <p className="font-semibold mb-4 text-white ">
                        Drop Your Files Here
                    </p>
                    <Image
                        src={`./assets/upload.svg`}
                        width={24}
                        height={24}
                        className="select-none"
                        alt="upload"
                    />
                </div>
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

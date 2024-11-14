"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import * as XLSX from "xlsx";
import { TimerContext } from "../Context";
import { convertBytes, delay, getTotalSize } from "../utils";

const Uploader = ({
    files,
    setFiles,
    setErr,
    err,
    folderName,
    setFolderName,
    uploadedFiles,
    setUploadedFiles,
}) => {
    const [fileName, setFileName] = useState("");
    const [tempFiles, setTempFiles] = useState([]);
    const [fileSize, setFileSize] = useState("");
    const [dropStatus, setDropStatus] = useState("");
    const { setElapsedTime, setIsActive, isActive } = useContext(TimerContext);

    function GetFileTree(item, path) {
        path = path || "";
        if (item.isFile) {
            if (!isExcelFile(item.fullPath)) {
                handleRefresh();
                return;
            }

            item.file(function (file) {
                setUploadedFiles((prev) => [...prev, file]);
            });
        } else if (item.isDirectory) {
            setFolderName(item.name);
            let dirReader = item.createReader();
            dirReader.readEntries(function (entries) {
                for (let x = 0; x < entries.length; x++) {
                    GetFileTree(entries[x], path + item.name + "/");
                }
            });
        }
    }
    function isExcelFile(file) {
        const extension = file.substring(file.lastIndexOf("."));
        if (extension == ".xls" || extension == ".xlsx") return true;
        return false;
    }
    function handleUploadedFiles(e) {
        e.stopPropagation();
        e.preventDefault();
        handleRefresh();
        if (e.type === "dragenter" || e.type === "dragover")
            setDropStatus("border-4 border-green-400");
        else setDropStatus("");
        let items = e.dataTransfer.items;
        for (let x = 0; x < items.length; x++) {
            let item = items[x].webkitGetAsEntry();
            if (item) GetFileTree(item);
        }
    }

    useEffect(() => {
        if (uploadedFiles.length && uploadedFiles[0]) handleInput();
    }, [uploadedFiles]);

    useEffect(() => {
        if (
            tempFiles.length &&
            tempFiles.length === uploadedFiles.length &&
            !err
        ) {
            setFiles(tempFiles);
            setIsActive(false);
        }
    }, [tempFiles]);

    function convertFile(res, file) {
        let data = new Uint8Array(res);
        let wb = XLSX.read(data, {cellDates: true, type: "array" });
        const first_sheet_name = wb.SheetNames[0];
        let worksheet = wb.Sheets[first_sheet_name];
        let jsonData = XLSX.utils.sheet_to_json(worksheet, {
            raw: true,
            defval: "",
            blankrows: true,
            skipHidden: false,
            header: "A"
        });
        let newWorkSheet = XLSX.utils.json_to_sheet(jsonData, { skipHeader: true});
        let new_wb = XLSX.utils.book_new();
        let temp_name = null;
        if (file) temp_name = file.name;
        const fileNameWithoutExt = temp_name.substring(
            0,
            temp_name.lastIndexOf(".")
        );
        XLSX.utils.book_append_sheet(new_wb, newWorkSheet, "sheet");
        setTempFiles((prev) => [
            ...prev,
            {
                name: `${fileNameWithoutExt}.csv`,
                downloadReqs: {
                    new_wb,
                    fileNameWithoutExt: fileNameWithoutExt,
                },
            },
        ]);
    }

    function handler(e) {
        e.stopPropagation();
        e.preventDefault();
        if (e.target.nodeName == "DIV") e.target.classList.add("hidden");
        else e.target.parentNode.classList.add("hidden");
        setIsActive(true);
        for (let x = 0; x < uploadedFiles.length; x++) {
            const isCorrectFileExt =
                uploadedFiles[x].type === "application/vnd.ms-excel" ||
                uploadedFiles[x].type ===
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

            if (uploadedFiles[x].type && isCorrectFileExt) {
                uploadedFiles[x]
                    .arrayBuffer()
                    .then((res) => convertFile(res, uploadedFiles[x]))
                    .catch(handleErr);
            }
        }
    }
    useEffect(() => {
        if (err) {
            setIsActive(false);
        }
    }, [err]);
    function handleErr(err) {
        setIsActive(false);
        if (err.message === "Sheet name cannot exceed 31 chars")
            setErr("File name should not exceed 31 letters");
        else setErr(err.message);
        setFiles([]);
    }
    function handleInput() {
        setDropStatus("");
        setFileName(uploadedFiles[uploadedFiles.length - 1].name);
        const size = getTotalSize(uploadedFiles);
        setFileSize(convertBytes(size));
    }
    function handleRefresh() {
        setFileName("");
        setFileSize("");
        setUploadedFiles([]);
        setFiles([]);
        setTempFiles([]);
        setElapsedTime(0);
        setIsActive(false);
        setErr("");
        setFolderName("");
    }

    return (
        <div
            id="upload-zone"
            onDragEnter={handleUploadedFiles}
            onDragOver={handleUploadedFiles}
            onDrop={handleUploadedFiles}
            onDragLeave={handleUploadedFiles}
            className={`select-none ${
                !fileName && "w-120 h-40 p-0"
            } flex flex-col items-center justify-center mx-auto mt-8 bg-black/70 backdrop-blur-xl rounded-md p-4 drop-shadow-2xl max-w-lg ${
                fileName &&
                !files.length &&
                !err &&
                "w-auto h-auto border-b-4 border-yellow-500 "
            } ${
                files.length &&
                files.length === uploadedFiles.length &&
                !err &&
                "border-b-4 w-auto border-green-500"
            } ${dropStatus} ${err && "border-b-4 w-auto border-red-500"} `}
        >
            {!uploadedFiles.length && (
                <div className="flex flex-col items-center w-full h-full justify-center">
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
            {fileName && uploadedFiles.length > 0 && (
                <div className="flex text-white justify-between w-full  ">
                    <div className="w-3/5 max-w-md">
                        <div className="flex items-center mb-2">
                            <Image
                                className="mr-2 select-none"
                                src={`./assets/folder.svg`}
                                height={18}
                                width={18}
                                alt="folder"
                            />
                            <p className="font-bold truncate">
                                Name:{" "}
                                <span className="font-normal ml-1">
                                    {folderName ? folderName : fileName}
                                </span>
                            </p>
                        </div>
                        <div className="flex items-center">
                            <Image
                                className="mr-2 select-none"
                                src={`./assets/database.svg`}
                                height={18}
                                width={18}
                                alt="size"
                            />
                            <p className="font-bold truncate">
                                Size:{" "}
                                <span className="font-normal ml-1">
                                    {fileSize}
                                </span>
                            </p>
                        </div>
                    </div>
                    {fileName && !files.length && !err && (
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
                    {files.length > 0 &&
                        files.length === uploadedFiles.length &&
                        !err && (
                            <div className="flex items-center justify-center select-none">
                                <Image
                                    src={`./assets/check.svg`}
                                    width={20}
                                    height={20}
                                    alt="Conversion done"
                                />
                            </div>
                        )}
                    {err && (
                        <div className="flex items-center justify-center select-none">
                            <Image
                                src={`./assets/x.svg`}
                                width={24}
                                height={24}
                                alt="Conversion Failed"
                            />
                        </div>
                    )}
                </div>
            )}
            {uploadedFiles.length > 0 && (
                <Image
                    src={"./assets/loader.svg"}
                    className={`opacity-0 ${
                        isActive && !err && "opacity-100"
                    } animate-spin select-none`}
                    width={20}
                    height={20}
                    alt="loading"
                />
            )}
            {((files.length > 0 && files.length === uploadedFiles.length) ||
                (err && uploadedFiles.length > 0)) && (
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
